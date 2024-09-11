import { useEffect, useState } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import HeroCard from "./HeroCard";
import { useDispatch, useSelector } from "react-redux";

import { HighestApyIcon, PoolsIcon, TVLIcon, TotalUserIcon } from "../common/Icons";
import { getTotalUsers } from "../../utils/web3Helpers";

const Hero = () => {
	const [tvl, setTVL] = useState(0);
	const [totalUsers, setTotalUsers] = useState(0);
	const [nodedPrice, setNodedPrice] = useState(0);

	const availablePoolList = useSelector((state) => state?.pool?.availablePoolList);
	const isLoading = useSelector((state) => state.pool.isLoading);

	// const calculateTotalLiquidity = (pools) => {
	// 	return pools.reduce((sum, pool) => sum + parseFloat(pool.totalLiquidity || 0), 0);
	// };

	const calculateTotalLiquidity = (pools) => {
		return pools.reduce((sum, pool) => {
			let liquidity = parseFloat(pool.totalLiquidity || 0);
			if (pool?.isNodedPool) {
				liquidity *= nodedPrice;
			}
			return sum + liquidity;
		}, 0);
	};

	useEffect(() => {
		async function fetchRealNodedPrice() {
		  try {
			const response = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://api.mexc.com/api/v3/ticker/price?symbol=NODEDUSDT"));
			const data = await response.json();
			return data.price;
		  } catch (error) {
			console.error("Error fetching the price:", error);
			return null;
		  }
		}
	
		const getPrice = async () => {
		  const price = await fetchRealNodedPrice();
		  setNodedPrice(price);
		};
	
		getPrice();
	
		const intervalId = setInterval(getPrice, 15000);
	
		return () => clearInterval(intervalId);
	  }, []);

	useEffect(() => {
		if (availablePoolList?.length) {
			const temp = calculateTotalLiquidity(availablePoolList);
			setTVL(temp);
		}
	}, [availablePoolList]);

	useEffect(() => {
		const getUsers = async () => {
			const totalUsers = await getTotalUsers();
			setTotalUsers(totalUsers);
		};
		getUsers();
	}, []);

	const highestAPR = availablePoolList?.length ? Math.max(...availablePoolList?.map((x) => x.apr || 0)) : 0;

	return (
		<div className="main_container">
			{isLoading ? (
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-[13px] sm:gap-7 lg:gap-5 xl:gap-[27px] mt-1.5 sm:mt-11">
					<SkeletonLoader height="h-[80px] sm:h-[120px]" />
					<SkeletonLoader height="h-[80px] sm:h-[120px]" />
					<SkeletonLoader height="h-[80px] sm:h-[120px]" />
					<SkeletonLoader height="h-[80px] sm:h-[120px]" />
				</div>
			) : (
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-[13px] sm:gap-7 lg:gap-5 xl:gap-[27px] mt-1.5 sm:mt-11">
					<HeroCard
						item={{
							svg: <PoolsIcon />,
							number: availablePoolList?.length ?? 0,
							name: "Pools",
						}}
					/>
					<HeroCard
						item={{
							svg: <TVLIcon />,
							number: parseFloat(tvl).toFixed(0) || 0,
							name: "TVL",
						}}
					/>
					<HeroCard
						item={{
							svg: <HighestApyIcon />,
							number: `${highestAPR.toFixed(2)}`,
							name: "Highest APR",
						}}
					/>
					<HeroCard
						item={{
							svg: <TotalUserIcon />,
							number: nodedPrice,
							name: "Live Noded Price",
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Hero;
