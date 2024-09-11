/* eslint-disable react/prop-types */
import modelcircle from "../../assets/img/model-circle-img.png";
import SkeletonLoader from "../common/SkeletonLoader";

const AddedToStaking = ({ closeModal, isAddStakingLoading }) => {
  return (
    <>
      <div className="p-5 lg:p-6 max-w-[631px] w-full mx-auto flex flex-col items-center">
        <img
          src={modelcircle}
          alt="Added To Staking"
          width={260}
          height={260}
          className="w-[220px] md:w-[260px] h-[220px] md:h-[260px] max-md:mt-7"
        />

        {isAddStakingLoading ? (
          <div className="w-full my-3">
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
            <SkeletonLoader height="h-[62px]" />
          </div>
        ) : (
          <>
            <h1 className="font-gothamMedium font-medium text-[25px] sm:text-[32px] text-white leading-6 sm:leading-[33px] pt-[51px] md:pt-[54px]">
              Added To Staking
            </h1>
            <p className=" font-gothamMedium text-center font-medium text-[18px] text-slategray leading-[26px] sm:leading-[28px] pt-[14px] md:pt-[23px] max-sm:px-1">
              Your tokens are successfully added to staking
            </p>
            <button
              onClick={closeModal}
              className=" w-[162px] sm:max-w-[250px] sm:w-full mx-auto h-12 sm:h-[58px]  border border-yellowishorange rounded-rounded60 bg-yellowishorange box_shadow_1 font-gothamBold font-bold text-md sm:text-[18px] text-white text-center hover:bg-transparent hover:text-yellowishorange duration-300 ease-in-out mt-[27px] md:mt-10  "
            >
              Close
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddedToStaking;
