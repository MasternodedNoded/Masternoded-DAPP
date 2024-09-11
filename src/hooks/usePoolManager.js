import Web3 from "web3";
import { BalancerSDK, Network } from "@balancer-labs/sdk";
import { poolManagerAbi, erc20Abi } from "../assets/abis";
import { poolManagerAddress } from "../configs";
import { ethers } from "ethers";

const usePoolManager = () => {
	const balancer = new BalancerSDK({ network: Network.MAINNET });

	const getGasPrice = async () => {
		const web3 = new Web3(window.ethereum);
		// Fetch the current network gas price in Wei
		const currentGasPriceWei = await web3.eth.getGasPrice();

		// Convert gas price from Wei to Gwei
		const currentGasPriceGwei = web3.utils.fromWei(currentGasPriceWei, "gwei");

		// Increase the gas price by 2-3 Gwei
		const increasedGasPriceGwei = parseFloat(currentGasPriceGwei) + 3; // Adding 3 Gwei

		// Convert the increased gas price back to Wei
		const increasedGasPriceWei = web3.utils.toWei(increasedGasPriceGwei.toString(), "gwei");

		return increasedGasPriceWei;
	};
	const staking = async (selectedPool, selectedToken, amount, lockupIndex, userAddress) => {
		const tokensList = selectedPool?.tokens;
		try {
			const swapList = tokensList?.map((token) => ({
				address: token.address,
				decimals: token.decimals,
			}));
			const depositToken = swapList.find((token) => token.address === selectedToken.address);
			if (!depositToken) {
				console.error("Token address not found in swapList");
				return null;
			}
			const pool = await balancer.pools.find(selectedPool.id);

			const depositAmount = ethers.utils.parseUnits(String(amount), depositToken.decimals).toString();
			const tokenAmounts = swapList?.map((x) => (x.address === depositToken.address ? depositAmount : "0"));

			const JoinPool = pool.buildJoin(
				poolManagerAddress,
				swapList?.map((x) => x.address),
				tokenAmounts,
				"150"
			);
			return await stakeToManager(
				JoinPool?.attributes?.poolId,
				JoinPool?.attributes?.joinPoolRequest?.assets,
				JoinPool?.attributes?.joinPoolRequest?.maxAmountsIn,
				lockupIndex,
				JoinPool.attributes.joinPoolRequest.userData,
				userAddress
			);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const stakeToManager = async (selectedPool, addressList, tokenAmounts, lockupIndex = 0, userData, userAddress) => {
		try {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const gasPrice = await getGasPrice();

			return await contract.methods.stake(selectedPool, addressList, tokenAmounts, lockupIndex, userData).send({ from: userAddress, gasPrice: gasPrice });
		} catch (error) {
			console.error("Error during stakeToManager:", error);
			throw error;
		}
	};

	const unstakeToManager = async (selectedPool, stakeIndex, addressList, tokenAmounts, userData, userAddress) => {
		try {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const gasPrice = await getGasPrice();
			return await contract.methods
				.unstake(selectedPool, stakeIndex, addressList, tokenAmounts, userData)
				.send({ from: userAddress, gasPrice: gasPrice });
		} catch (error) {
			console.error("Error during unstakeToManager:", error);
			throw error;
		}
	};

	const unStaking = async (selectedPool, stakeIndex, userAddress, data) => {
		try {
			const pool = await balancer.pools.find(selectedPool);
			const ExitPool = pool?.buildExitExactBPTIn(poolManagerAddress, String(data?.bptAmount), "200", false);
			return await unstakeToManager(
				ExitPool?.attributes?.poolId,
				stakeIndex,
				ExitPool?.attributes?.exitPoolRequest?.assets,
				ExitPool?.attributes?.exitPoolRequest?.minAmountsOut,
				ExitPool.attributes.exitPoolRequest.userData,
				userAddress
			);
		} catch (error) {
			console.error("Error during unStaking:", error);
			throw error;
		}
	};

	const stakeToNodedPool = async (amount, lockupIndex, userAddress) => {
		try {
			if (!window.ethereum) {
				throw new Error("No Ethereum provider found. Please install MetaMask.");
			}
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);

			const amountInWei = ethers.utils.parseUnits(String(amount), 18).toString();
			const gasPrice = await getGasPrice();
			const res = await contract.methods.stakeNoded(amountInWei, lockupIndex).send({ from: userAddress, gasPrice: gasPrice });
			console.log({ res });
			return { status: true, message: "Staking successful" };
		} catch (error) {
			console.error("Error during stakeToNodedPool:", error);
			throw error;
		}
	};
	const unstakeNoded = async (stakeIndex, userAddress) => {
		try {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const gasPrice = await getGasPrice();
			await contract.methods.unstakeNoded(stakeIndex).send({ from: userAddress, gasPrice: gasPrice });
			return { status: true, message: "Unstaking successful" };
		} catch (error) {
			console.error("Error during unstaking:", error);
			throw error;
		}
	};

	return {
		staking,
		unStaking,
		stakeToNodedPool,
		stakeToNodedPool,
		unstakeNoded,
	};
};

export default usePoolManager;
