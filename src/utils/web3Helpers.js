import Web3 from "web3";
import { erc20Abi, poolManagerAbi } from "../assets/abis";
import { poolManagerAddress } from "../configs";
import { ethers } from "ethers";

export const getCoinDetails = async (tokenAddress, userAddress) => {
	if (!tokenAddress) return;
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		try {
			const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);

			// Fetching the balance
			const balance = await tokenContract.methods.balanceOf(userAddress).call();

			// Fetching the decimals
			const decimals = await tokenContract.methods.decimals().call();

			// Fetching the symbol
			const symbol = await tokenContract.methods.symbol().call();

			// Convert balance to the appropriate unit
			const balanceInUnits = parseInt(balance) / Math.pow(10, parseInt(decimals));

			return {
				balance: balanceInUnits,
				symbol,
				decimals,
				address: tokenAddress,
			};
		} catch (error) {
			console.error(`Error fetching details for token ${tokenAddress}`, error);
			return null;
		}
	} else {
		console.error("No Ethereum provider found. Please install MetaMask.");
		return null;
	}
};
export const checkAndApproveToken = async (tokenAddress, userAddress, amount) => {
	try {
		const web3 = new Web3(window.ethereum);

		// Fetch the current network gas price in Wei
		const currentGasPriceWei = await web3.eth.getGasPrice();

		// Convert gas price from Wei to Gwei
		const currentGasPriceGwei = web3.utils.fromWei(currentGasPriceWei, "gwei");

		// Increase the gas price by 2-3 Gwei
		const increasedGasPriceGwei = parseFloat(currentGasPriceGwei) + 3; // Adding 3 Gwei

		// Convert the increased gas price back to Wei
		const increasedGasPriceWei = web3.utils.toWei(increasedGasPriceGwei.toString(), "gwei");

		const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
		const allowance = await tokenContract.methods.allowance(userAddress, poolManagerAddress).call();

		const amountInWei = ethers.utils.parseUnits(String(amount), "ether").toString();

		if (parseInt(allowance) < parseInt(amountInWei)) {
			const tx = await tokenContract.methods.approve(poolManagerAddress, amountInWei).send({ from: userAddress, gasPrice: increasedGasPriceWei });
			return tx;
		}

		return allowance;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getTotalUsers = async () => {
	try {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const totalUsers = await contract.methods.totalUsers().call();
			return totalUsers;
		} else {
			throw new Error("No Ethereum provider found. Please install MetaMask.");
		}
	} catch (error) {
		console.error("Error fetching total users:", error);
		return null;
	}
};

export const getUserPools = async (userAddress) => {
	try {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const userPools = await contract.methods.getUserPools(userAddress).call();
			return userPools;
		} else {
			throw new Error("No Ethereum provider found. Please install MetaMask.");
		}
	} catch (error) {
		console.error("Error fetching user pools:", error);
		return null;
	}
};

export const getProjectedReturns = async (amount, apr, durationInSeconds) => {
	try {
		const web3 = new Web3(window.ethereum);
		const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);

		if (!amount) {
			return 0;
		}
		const amountInWei = ethers.utils.parseUnits(String(amount), "ether").toString();

		const projectedInterest = await contract.methods.calculateProjectedReturns(amountInWei, apr * 100, durationInSeconds).call();

		const amountInEth = ethers.utils.formatUnits(projectedInterest, "ether");

		return parseFloat(amountInEth);
	} catch (error) {
		console.error("Error calling calculateProjectedReturns:", error);
		throw error;
	}
};

export const getNodedAprForNonNodedPools = async () => {
	try {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(poolManagerAbi, poolManagerAddress);
			const nodedApr = await contract.methods.nodedApr().call();
			return nodedApr;
		} else {
			throw new Error("No Ethereum provider found. Please install MetaMask.");
		}
	} catch (error) {
		console.error("Error fetching user pools:", error);
		return null;
	}
};