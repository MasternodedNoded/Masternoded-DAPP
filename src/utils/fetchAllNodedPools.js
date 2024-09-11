import Web3 from "web3";
import { poolManagerAbi } from "../assets/abis";
import { poolManagerAddress } from "../configs";

export const fetchAllNodedPools = async (address) => {
  try {
    if (!window?.ethereum) return;
    const web3 = new Web3(window.ethereum);
    let isActive = false;
    const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
    const result = await contract.methods.getNodedPool().call();
    const latestUSDPrice = await fetchNodedUsdPrice();
    const lockupDurations = result[0];
    const apy = result[1];
    let apr = 0;
    apr = Math.max(...result[1]?.map((apr) => parseFloat(apr) / 100)) ?? 0;

    isActive = result[2];
    const feePercentage = result[3];
    let stakesDetails = null;
    let pendingRewards = 0;
    let stakedByUser = 0;
    let totalLiquidity = 0;

    if (address) {
      const userStakesResult = await contract.methods
        .getUserNodedStakes(address)
        .call();
      stakesDetails = userStakesResult[0];
      const nodedStakeInterests = userStakesResult[1];

      // apr = Math.max(...stakesDetails?.map((x) => parseFloat(x.apr) / 100));
      const updatedStakesDetails = stakesDetails.map((stake, index) => {
        const amountInUnits = parseFloat(stake.amount) / Math.pow(10, 18);

        // STAKED AMOUNT
        const currentUSDValue = amountInUnits * parseFloat(latestUSDPrice);
        stakedByUser += currentUSDValue;

        // PENDING REWARDS
        let individualPendingReward =
          parseFloat(nodedStakeInterests[index]) / Math.pow(10, 18);
        individualPendingReward =
          individualPendingReward * parseFloat(latestUSDPrice);

        pendingRewards += individualPendingReward;

        return {
          ...stake,
          individualPendingReward,
          currentUSDValue,
        };
      });

      stakesDetails = {
        ...stakesDetails,
        0: updatedStakesDetails,
        apr,
        apy,
      };
    }
    totalLiquidity = await contract.methods.totalNodedStaked().call();
    totalLiquidity =
      (parseFloat(totalLiquidity) / Math.pow(10, 18)) *
      parseFloat(latestUSDPrice);
    const nodedTokenAddress = await contract.methods.nodedToken().call();

    return {
      lockupDurations,
      apr,
      isActive,
      stakesDetails,
      pendingRewards,
      stakedByUser,
      feePercentage,
      isNodedPool: true,
      name: "Noded Pool",
      tokens: [
        {
          name: "Noded",
          symbol: "NODED",
          address: nodedTokenAddress,
          weight: 1,
          isNodedPool: true,
          apy,
          latestUSDPrice,
        },
      ],
      totalLiquidity,
      apy,
    };
  } catch (error) {
    console.error("Error fetching noded pool data:", error);
    return { error: error.message };
  }
};

async function fetchNodedUsdPrice() {
  return 1;
}
