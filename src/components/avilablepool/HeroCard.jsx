/* eslint-disable react/prop-types */

import {
  HighestApyIcon,
  PoolsIcon,
  TotalUserIcon,
  TVLIcon,
} from "../common/Icons";
import Counter from "../common/Counter";

const svgHandler = (name) => {
  switch (name) {
    case "Pools":
      return <PoolsIcon />;
    case "TVL":
      return <TVLIcon />;
    case "Highest APR":
      return <HighestApyIcon />;
    case "Live Noded Price":
      return <TotalUserIcon />;
    default:
      break;
  }
};
const HeroCard = ({ item }) => {
  return (
    <div className="flex items-center hero_card gap-1.5 sm:gap-5 lg:gap-2 xl:gap-4 px-2 py-2.5 sm:p-[15px] ">
      <span className="flex items-center relative justify-center w-[60px] sm:w-[90px] lg:w-[57px] 3xl:w-[90px] h-[60px] sm:h-[90px] lg:h-[53px] 3xl:h-[90px]">
        <span className="absolute top-[55%] left-[57%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
          {svgHandler(item?.name)}
        </span>
      </span>
      <div className="flex flex-col gap-1 3xl:gap-2">
        <span className="small_heading">
          <Counter name ={item?.name} number={item?.number} />
        </span>
        <span className="small_para line-clamp-1">{item?.name}</span>
      </div>
    </div>
  );
};

export default HeroCard;
