/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UnStakeModalTableData from "./UnStakeModalTableData";

const UnStakeModalData = ({
  closeModal,
  setRemoved,
  setUnStakingLoading,
  items,
}) => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [unStakeList, setUnstakeList] = useState([]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index && index !== 0 ? null : index);
  };

  useEffect(() => {
    setUnstakeList(items?.stakesDetails?.[0]);
  }, [items]);

  return (
    <div className="w-full">
      <div className="px-4 flex items-center justify-between mt-[23px] sm:mt-[35px]">
        <p className="modal_table_header">Locked Until</p>
        <p className="modal_table_header">Staked</p>
        <p className="modal_table_header">Locked APR</p>
        <p className="modal_table_header">Total Rewards</p>
        <p className="modal_table_header">Time Remaining</p>
      </div>
      <div className="flex flex-col gap-2.5 sm:gap-[15px] mt-[19px]">
        {unStakeList?.length ? (
          unStakeList?.map((data, index) => {
            if (data.amount <= 0) return null; // Skip if amount is zero
            return (
              <UnStakeModalTableData
                setRemoved={setRemoved}
                poolId={items?.stakesDetails?.poolId}
                setUnStakingLoading={setUnStakingLoading}
                key={index}
                data={data}
                index={index}
                isOpen={openAccordion === index}
                toggleAccordion={toggleAccordion}
                pendingRewards={items?.pendingRewards}
                lockupDurations={items?.lockupDurations}
              />
            );
          })
        ) : (
          <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white text-center py-12">
            Nothing to claim.
          </p>
        )}
      </div>
      <div className="flex items-center justify-center w-full mt-5 sm:mt-7">
        <button
          onClick={closeModal}
          type="submit"
          className="text-white font-gothamBold font-bold leading-[15px] text-[18px] text-center py-4 max-w-[162px] sm:max-w-[250px] w-full h-12 sm:h-[58px] rounded-rounded60 bg-yellowishorange border-[1px] border-yellowishorange box_shadow_2 hover:bg-transparent hover:text-yellowishbrown duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UnStakeModalData;
