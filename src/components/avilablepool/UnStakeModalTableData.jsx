/* eslint-disable react/prop-types */

import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { getFutureDate } from "../../utils/customDates";
import usePoolManager from "../../hooks/usePoolManager";
import { formatNumberWithCommas } from "../../utils/addCommas";
import { getAvailablePoolList } from "../../redux/reducers/poolSlices";
import { useDispatch } from "react-redux";
import { isTimesUp, timeDifference } from "../../utils/getTimeDIfference";
import ButtonToolTip from "../common/customToolTipForBtn";
import Tooltip from "../common/ToolTip";

const UnStakeModalTableData = ({
  data,
  index,
  isOpen,
  toggleAccordion,
  setRemoved,
  setUnStakingLoading,
  poolId,
  pendingRewards,
  lockupDurations,
}) => {
  const { address } = useAccount();
  const { unStaking, unstakeNoded } = usePoolManager();
  const dispatch = useDispatch();

  const unStakePressHandler = async () => {
    if (poolId) {
      await toast.promise(unStaking(poolId, index, address, data), {
        pending: "Unstaking in progress...",
        success: "Unstaking successful!",
        error: "Unstaking failed. Please try again.",
      });
    } else {
      await toast.promise(unstakeNoded(index, address), {
        pending: "Unstaking in progress...",
        success: "Unstaking successful!",
        error: "Unstaking failed. Please try again.",
      });
    }

    dispatch(getAvailablePoolList(address));
    setRemoved(true);
    setUnStakingLoading(true);
  };

  const getDuration = (lockedDate) => {
    const index = lockupDurations.findIndex((x) => x === lockedDate);
    if (index < 0) return "-";
    return getFutureDate(data?.startTime, lockupDurations, index);
  };
  const isDisabled = isTimesUp(data?.startTime, data?.lockupDuration);

  return (
    <div className="bg-richblack rounded-rounded15 common_box_shadow_2 overflow-hidden rounded-[10px]">
      <div className="cursor-pointer" onClick={() => toggleAccordion(index)}>
        <div className="w-full h-[62px] common_box_shadow_2 flex items-center justify-between py-[22px] sm:py-6 pl-[13px] sm:pl-[18px] pr-7 max-sm:h-[55px]">
          <p className="modal_table_data">
            {getDuration(data?.lockupDuration)}
          </p>
          <span className="max-w-24">
            <Tooltip
              id={data?.currentUSDValue + "currentUSDValue"}
              title={formatNumberWithCommas(
                parseFloat(data?.currentUSDValue).toFixed(4)
              )}
            >
              <p className="modal_table_data ellipsis">
                {!!poolId ? "$" : null}
                {formatNumberWithCommas(
                  parseFloat(data?.currentUSDValue).toFixed(4)
                )}
              </p>
            </Tooltip>
          </span>

          <span className="max-w-16">
            <Tooltip
              id={data?.apr + "apr"}
              title={`${formatNumberWithCommas(parseFloat(data?.apr)/ 100)}%`}
            >
              <p className="modal_table_data">
                {formatNumberWithCommas(parseFloat(data?.apr) / 100)} %
              </p>
            </Tooltip>
          </span>

          <span className="max-w-20">
            <Tooltip
              id={data?.individualPendingReward + "individualPendingReward"}
              title={formatNumberWithCommas(
                parseFloat(data?.individualPendingReward)
              )}
            >
              <p className="modal_table_data ellipsis">
                {!!poolId ? "$" : null}

                {formatNumberWithCommas(
                  parseFloat(data?.individualPendingReward).toFixed(
                    data?.individualPendingReward > 0 ? 6 : 2
                  )
                )}
              </p>
            </Tooltip>
          </span>

          <p className="modal_table_data">
            {timeDifference(data?.startTime, data?.lockupDuration)}
          </p>
        </div>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-100 value ease-in-out text-slate-50 text-base bg-richblack ${
          isOpen ? "grid-rows-[1fr] h-fit" : "grid-rows-[0fr] h-fit"
        }`}
      >
        {isDisabled ? (
          <ButtonToolTip
            id="tooltip-unstake"
            content={[
              "Claiming is locked. Please wait for the remaining time..",
            ]}
          >
            <div className="overflow-hidden w-full px-3">
              <div className="flex items-center justify-center w-full mt-1 pb-[14px]">
                <button
                  disabled={isDisabled}
                  onClick={unStakePressHandler}
                  type="submit"
                  className="unstake_btn text-yellowishbrown text-center py-4 max-w-[339px] sm:max-w-[503px] w-full h-[45px] font-gothamBold text-base flex items-center justify-center leading-normal font-bold rounded-rounded60 bg-richblack common_box_shadow_2 hover:bg-yellowishbrown hover:text-white duration-150 transition-all value ease-in-out"
                >
                  Un-Stake
                </button>
              </div>
            </div>
          </ButtonToolTip>
        ) : (
          <div className="overflow-hidden w-full px-3">
            <div className="flex items-center justify-center w-full mt-1 pb-[14px]">
              <button
                disabled={isDisabled}
                onClick={unStakePressHandler}
                type="submit"
                className="unstake_btn text-yellowishbrown text-center py-4 max-w-[339px] sm:max-w-[503px] w-full h-[45px] font-gothamBold text-base flex items-center justify-center leading-normal font-bold rounded-rounded60 bg-richblack common_box_shadow_2 hover:bg-yellowishbrown hover:text-white duration-150 transition-all value ease-in-out"
              >
                Un-Stake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnStakeModalTableData;
