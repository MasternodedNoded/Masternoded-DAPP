import React from "react";
import CountUp from "react-countup";

const Counter = ({ number, name }) => {
	if (name === "Live Noded Price") return <CountUp end={number} decimals={10} duration={2} />;

	const hasDecimals = number % 1 !== 0;
	return (
		<div className="truncate">
			{name === "TVL" ? "$" : null}
			<CountUp end={number} decimals={hasDecimals ? 2 : 0} duration={2} />
			{name === "Highest APR" ? "%" : null}
		</div>
	);
};

export default Counter;
