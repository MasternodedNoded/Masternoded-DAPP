import { useState } from "react";
import { formatNumberWithCommas } from "../../utils/addCommas";
import { getFutureDate } from "../../utils/customDates";
import { getProjectedReturns } from "../../utils/web3Helpers";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const StakeDataSummaryCard = ({
  selectedToken,
  amount,
  timer,
  lockupDurations,
  items,
}) => {
  const [totalRewards, setTotalRewards] = useState(0);
  const [lockedApr, setLockedApr] = useState(selectedToken?.apr);

  useEffect(() => {
    const newApr = selectedToken?.isNodedPool
      ? parseFloat(selectedToken?.apy[timer?.index]) / 100
      : selectedToken?.apr;
    setLockedApr(newApr);
    if (amount) {
      getProjectedReturns(amount, newApr, lockupDurations[timer?.index])
        .then((x) => {
          const projectedReturns = parseFloat(x);
          const feePercentage = parseFloat(items?.feePercentage) / 100 || 0;
          const fee = (projectedReturns * feePercentage) / 100;
          const rewardsAfterFee = projectedReturns - fee;
          const rewardsInUSDPrice = !selectedToken?.isNodedPool
            ? rewardsAfterFee * selectedToken?.token?.latestUSDPrice
            : rewardsAfterFee;
          setTotalRewards(rewardsInUSDPrice);
        })
        .catch((e) => console.log(e));
    }
  }, [amount, timer, lockupDurations,selectedToken]);

  return (
    <>
      <div className="w-full flex justify-center py-4 px-3 sm:px-5 flex-col gap-2 model_bg_img ">
        <p className="small_card_heading !text-[18px] max-sm:leading-[17px] line-clamp-1">
          {!selectedToken?.isNodedPool && "$"}
          {formatNumberWithCommas(
            totalRewards.toFixed(totalRewards > 0 ? 8 : 0)
          )}
        </p>
        <p className="text-cadetgrey !text-[14px] small_card_para">
          Estimated Rewards
        </p>
      </div>

      <div className="w-full flex justify-center py-4 px-3 sm:px-5 flex-col gap-2 model_bg_img ">
        <p className="small_card_heading !text-[18px] max-sm:leading-[17px]">
          {formatNumberWithCommas(lockedApr)}%
        </p>
        <p className="text-cadetgrey !text-[14px] small_card_para">
          Locked APR
        </p>
      </div>

      <div className="w-full flex justify-center py-4 px-3 sm:px-5 flex-col gap-2 model_bg_img ">
        <p className="small_card_heading !text-[18px] max-sm:leading-[17px] line-clamp-1">
          {amount
            ? formatNumberWithCommas(
                parseFloat(amount).toFixed(amount > 0 ? 2 : 0)
              )
            : 0}{" "}
          {selectedToken?.symbol}
        </p>
        <p className="text-cadetgrey !text-[14px] small_card_para">
          Tokens to Stake
        </p>
      </div>
      <div className="w-full flex justify-center py-4 px-3 sm:px-5 flex-col gap-2 model_bg_img ">
        <p className="small_card_heading !text-[18px] max-sm:leading-[17px]">
          {getFutureDate(
            Math.floor(new Date().getTime() / 1000),
            lockupDurations,
            timer?.index
          )}
        </p>
        <p className="text-cadetgrey !text-[14px] small_card_para">
          Locked Until
        </p>
      </div>
    </>
  );
};

export default StakeDataSummaryCard;
