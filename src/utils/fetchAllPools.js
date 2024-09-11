import Web3 from "web3";
import { poolManagerAbi } from "../assets/abis";
import { poolManagerAddress } from "../configs";
import { BalancerSDK, Network } from "@balancer-labs/sdk";
import { getNodedAprForNonNodedPools, getUserPools } from "./web3Helpers";
import { fetchAllNodedPools } from "./fetchAllNodedPools";

const fetchRealNodedPrice = async () => {
  try {
    const response = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(
          "https://api.mexc.com/api/v3/ticker/price?symbol=NODEDUSDT"
        )
    );
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error fetching the price:", error);
    return 1;
  }
};

export const fetchAllPools = async (address) => {
  try {
    if (!window?.ethereum) return;
    const balancer = new BalancerSDK({ network: Network.MAINNET });
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
    const poolIds = await contract.methods.getAllPools().call();
    const userPools = address ? await getUserPools(address) : [];
    const nodedPool = await fetchAllNodedPools(address);
    const fetchRealNodedPriceInUSD = await fetchRealNodedPrice();
    const poolDataPromises = poolIds.map(async (pool) => {
      try {
        let apr = parseFloat(pool.apr) / 100;

        let poolData = await balancer.pools.find(pool.id);
        if (!poolData) return null;
        if (poolData?.symbol !== "NODED") {
          poolData = checkIfNodedAndCorrect(poolData, fetchRealNodedPriceInUSD);

          const nodedPoolIndex = poolData?.tokens?.findIndex(
            (token) => token?.symbol === "NODED"
          );

          if (nodedPoolIndex >= 0) {
            const temp =
              parseFloat(poolData?.tokens[nodedPoolIndex]?.balance) *
              fetchRealNodedPriceInUSD;
            poolData.totalLiquidity =
              parseFloat(poolData?.totalLiquidity) + temp;

            const getNodedApr = await getNodedAprForNonNodedPools();
            apr = (apr + parseFloat(getNodedApr) / 100) / 2;
          }
        }
        let stakesDetails = null;
        let pendingRewards = 0;
        let stakedByUser = 0;

        if (address && userPools.includes(pool.id)) {
          stakesDetails = await contract.methods
            .getAllStakesDetails(address, pool.id)
            .call();

          const updatedStakesDetails = stakesDetails[0].map((stake, i) => {
            const token = poolData.tokens.find(
              (token) =>
                token.address.toLowerCase() === stake.assetAddress.toLowerCase()
            );
            if (!token) return stake;

            const amountInUnits =
              parseFloat(stake.amount) / Math.pow(10, token.decimals);
            const currentUSDValue =
              amountInUnits * parseFloat(token.token.latestUSDPrice);
            stakedByUser += currentUSDValue;
            const getUsdValueForPendingRewards = poolData?.tokens?.find(
              (x) =>
                x.address.toLowerCase() === stake?.assetAddress?.toLowerCase()
            );


            const individualPendingReward =
              parseFloat(stakesDetails.interests[i]) /
              Math.pow(10, token.decimals) * getUsdValueForPendingRewards?.token?.latestUSDPrice;;

     
            pendingRewards +=
              individualPendingReward

            return {
              ...stake,
              individualPendingReward,
              currentUSDValue,
            };
          });

          stakesDetails = {
            ...stakesDetails,
            apr,
            poolId: pool.id,
            0: updatedStakesDetails,
          };
        }

        return {
          ...poolData,
          apr,
          pendingRewards,
          stakedByUser,
          stakesDetails,
          lockupDurations: pool.lockupDurations,
          feePercentage: pool.feePercentage,
          isNodedPool: false,
        };
      } catch (error) {
        console.error("Error fetching pool data for ID:", pool.id, error);
        return null;
      }
    });

    const poolData = await Promise.all(poolDataPromises);
    const filteredPoolData = poolData.filter((pool) => pool !== null);

    const finalData =
      nodedPool?.isActive === true
        ? [nodedPool, ...filteredPoolData]
        : filteredPoolData;

    return {
      error: null,
      status: true,
      data: finalData,
    };
  } catch (err) {
    console.error("Error fetching pools:", err);
    return { error: err, status: false };
  }
};

const checkIfNodedAndCorrect = (poolData, fetchRealNodedPriceInUSD) => {
  // Find the index of the token with the symbol "NODED"
  const nodedPoolIndex = poolData?.tokens?.findIndex(
    (token) => token?.symbol === "NODED"
  );

  // Check if the index was found
  if (nodedPoolIndex !== -1) {
    // Access the token data
    const nodedToken = poolData.tokens[nodedPoolIndex];

    // Check if latestUSDPrice is undefined and update it to 1 if necessary
    if (nodedToken?.token?.latestUSDPrice === undefined) {
      nodedToken.token.latestUSDPrice = fetchRealNodedPriceInUSD;
    }
  }

  // Return the updated poolData for further use, if necessary
  return poolData;
};
