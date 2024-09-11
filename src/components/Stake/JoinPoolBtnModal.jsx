/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AddedToStaking from "../avilablepool/AddedToStaking";
import StakeModalData from "../avilablepool/StakeModalData";
import SkeletonLoader from "../common/SkeletonLoader";

const JoinPoolBtnModal = ({
  closeModal,
  removed,
  addStaking,
  setAddStaking,
  setRemoved,
  items,
}) => {
  const [isJoinPoolLoading, setJoinPoolLoading] = useState(true);
  const [isAddStakingLoading, setAddStakingLoading] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setJoinPoolLoading(false);
      setAddStakingLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isAddStakingLoading, isAddStakingLoading, ]);

  return (
    <div
      className={`fixed left-0  flex items-end sm:items-center justify-center z-50  sm:px-4 w-screen h-screen `}
    >
      <div className="bg-richblack max-h-[calc(100%-30px)] rounded-t-[40px] sm:rounded-[30px] border-[1.5px] border-silver border-opacity-20 shadow-[0px_35px_90px_0px_rgba(0,0,0,0.99)] overflow-y-auto sm:max-w-[450px] hide-scrollbar w-full">
        <div className="flex items-center sm:hidden  pt-[19px] pb-2 justify-center sticky top-0 bg-richblack">
          <button
            onClick={closeModal}
            type="submit"
            className="sm:hidden w-[106px] h-[4px] rounded-full opacity-20 bg-silver"
          ></button>
        </div>
        {removed || addStaking ? (
          ""
        ) : isJoinPoolLoading ? (
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
            <StakeModalData
              items={items}
              closeModal={closeModal}
              setAddStakingLoading={setAddStakingLoading}
              setAddStaking={setAddStaking}
              setRemoved={setRemoved}
            />
          </div>
        )}


        {/* ADD UN-STAKING LOADING AND LIST  */}
        {addStaking && (
          <AddedToStaking
            closeModal={closeModal}
            isAddStakingLoading={isAddStakingLoading}
          />
        )}
      </div>
    </div>
  );
};

export default JoinPoolBtnModal;
