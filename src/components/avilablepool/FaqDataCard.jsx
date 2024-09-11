/* eslint-disable react/prop-types */

import { formatNumberWithCommas } from "../../utils/addCommas";
import ClaimPopup from "../Claim/ClaimPopup";
import JoinPoolBtn from "../Stake/JoinPoolBtn";
import { images } from "../common/Helper";
import FaqDataCardImg from "./FaqDataCardImg";

const FaqDataCard = ({ items }) => {
  return (
    <div className=" pt-[5px] pb-[17px] px-3 w-full">
      <div className="grid grid-cols-2 gap-3 gap-y-[15px] items-center w-full">
        <div className="px-3 pt-[11px] pb-2.5 rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <div className="flex">
            {/* {images?.map((item, itemIndex) => (
             <FaqDataCardImg item={item} key={itemIndex} />
            ))} */}
            {items?.tokens && (
              <h2 className="small_card_heading">
                {items.tokens.map((x) => x.symbol).join(" / ")}
              </h2>
            )}
          </div>
          <p className="small_card_para pt-[9px] line-clamp-1">Assets</p>
        </div>
        <div className="px-3 pt-[20px] pb-[10px] rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <h2 className="small_card_heading">
          {!items?.isNodedPool && "$"}

            {formatNumberWithCommas(
              parseFloat(items?.totalLiquidity).toFixed(
                items?.totalLiquidity === 0 ? 0 : 6
              )
            )}
          </h2>
          <p className="small_card_para pt-[18px]">TVL</p>
        </div>
        <div className="px-3 pt-[18px] pb-[17px] rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <h2 className="small_card_heading">
          {!items?.isNodedPool && "$"}

            {formatNumberWithCommas(
              parseFloat(items?.stakedByUser)?.toFixed(
                items?.stakedByUser > 0 ? 4 : 2
              )
            )}
          </h2>
          <p className="small_card_para pt-[13px]">Staked</p>
        </div>
        <div className="px-2.5 pt-[18px] pb-[17px] rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <h2 className="small_card_heading">
          {!items?.isNodedPool && "$"}

            {formatNumberWithCommas(
              parseFloat(items?.pendingRewards)?.toFixed(
                items?.pendingRewards === 0 ? 2 : 6
              )
            )}
          </h2>
          <p className="small_card_para pt-[13px] max-sm:line-clamp-1">
            Pending Rewards
          </p>
        </div>

        <div className="px-3 pt-[18px] pb-[17px] rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <h2 className="small_card_heading">{items?.apr}%</h2>
          <p className="small_card_para pt-[13px]">
            {items?.isNodedPool ? "Highest APR" : "APR"}
          </p>
        </div>
        <div className="px-2.5 pt-[18px] pb-[17px] rounded-rounded10 sm:rounded-rounded15 grid_pool_list_bg_img h-[80px]">
          <h2 className="small_card_heading">
            {parseFloat(items?.feePercentage) / 100}%
          </h2>
          <p className="small_card_para pt-[13px] max-sm:line-clamp-1">
            Pool Fee
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-3 mt-[25px]">
        <JoinPoolBtn width="sm:max-w-[162px] w-full" items={items} />
        <ClaimPopup width="max-w-[136px] w-full" items={items} />
      </div>
    </div>
  );
};

export default FaqDataCard;
