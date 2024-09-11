/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RemovedFromStaking from "../avilablepool/RemovedFromStaking";
import ClaimModalData from "./ClaimModalData";
import SkeletonLoader from "../common/SkeletonLoader";

const ClaimPoolBtnModal = ({ closeModal, removed, setRemoved, items }) => {
  const [isUnStakingLoading, setUnStakingLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnStakingLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isUnStakingLoading]);

  return (
    <div
      className={`fixed left-0  flex items-end sm:items-center justify-center z-50  sm:px-4 w-screen h-screen `}
    >
      <div className="bg-richblack max-h-[calc(100%-30px)] rounded-t-[40px] sm:rounded-[30px] border-[1.5px] border-silver border-opacity-20 shadow-[0px_35px_90px_0px_rgba(0,0,0,0.99)] overflow-y-auto max-w-[600px] md:max-w-[700px] hide-scrollbar w-full">
        <div className="flex items-center sm:hidden  pt-[19px] pb-2 justify-center sticky top-0 bg-richblack">
          <button
            onClick={closeModal}
            type="submit"
            className="sm:hidden w-[106px] h-[4px] rounded-full opacity-20 bg-silver"
          ></button>
        </div>
        {removed ? (
          ""
        ) : isUnStakingLoading ? (
          <>
            <div className="p-5 lg:p-6">
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
              <SkeletonLoader height="h-[62px]" />
            </div>
          </>
        ) : (
          <div className={`w-full`}>
            <ClaimModalData
              items={items}
              closeModal={closeModal}
              setUnStakingLoading={setUnStakingLoading}
              setRemoved={setRemoved}
            />
          </div>
        )}

        {/* REMOVE STAKING LOADING AND LIST  */}
        {removed && (
          <RemovedFromStaking
            closeModal={closeModal}
            isUnStakingLoading={isUnStakingLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ClaimPoolBtnModal;
