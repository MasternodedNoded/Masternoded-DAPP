/* eslint-disable react/prop-types */
import SkeletonLoader from "../common/SkeletonLoader";
import TableData from "./TableData";

const AvailblePoolListTable = ({ availablePoolList, isLoading }) => {
  return (
    <div className="overflow-auto px-2 pb-5">
      <div className="max-lg:w-[1280px]  lg:w-full">
        <div className="flex pt-[56px] px-5 gap-3 xl:gap-5 justify-between w-full">
          <p className="small_para w-[168px] max-xl:text-base">
            Available Pool
          </p>
          <p className="small_para w-[125px] text-center max-xl:text-base">
            Assets
          </p>
          <p className="small_para w-[121px] max-xl:text-base">TVL</p>
          <p className="small_para w-[62px] text-start max-xl:text-base">APR</p>
          <p className="small_para w-[80px] text-center max-xl:text-base">
            Staked
          </p>
          <p className="small_para ellipsis w-[123px] text-start max-xl:text-base">
            Earnings
          </p>
          <p className="small_para ellipsis w-[50px] text-start max-xl:text-base">
            Fee
          </p>
          <p className="small_para w-[136px] text-center max-xl:text-base">
            Join
          </p>
          <p className="small_para w-[136px] text-center max-xl:text-base">
            Claim
          </p>
          
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-1 mt-7">
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
            <SkeletonLoader height="h-[94px]" />
          </div>
        ) : (
          <TableData availablePoolList={availablePoolList} />
        )}
      </div>
    </div>
  );
};

export default AvailblePoolListTable;
