/* eslint-disable react/prop-types */

import SkeletonLoader from "../common/SkeletonLoader";
import AvailablePoolGridCardImg from "./AvailablePoolGridCardImg";
import JoinPoolBtn from "../Stake/JoinPoolBtn";
import ClaimPopup from "../Claim/ClaimPopup";
import { images } from "../common/Helper";
import { formatNumberWithCommas } from "../../utils/addCommas";
import CustomTooltip from "../common/customToolTip";
import Tooltip from "../common/ToolTip";

const AvailablePoolGridCard = ({ items, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="max-md:hidden">
          <SkeletonLoader height="h-[374px]" />
        </div>
      ) : (
        <div className="rounded-rounded15 max-md:hidden bg-richblack shadow-[-4px_-4px_24px_0px_rgba(58,58,58,0.53),4px_4px_10px_0px_rgba(0,0,0,0.70)] px-5 pt-[18px] pb-[27px]">
          <div className="flex justify-between gap-2 items-center">
            <CustomTooltip id={items?.name} tokens={items?.tokens}>
              <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white">
                {items?.name}
              </p>
            </CustomTooltip>
          </div>
          <div className="grid grid-cols-2 gap-3 gap-y-5 items-center mt-5">
            <div className="px-4 2xl:pt-[25px] py-4 2xl:py-[14px] available_bg_img">
              <div className="flex">
                {/* {images?.map((img, index) => (
                <AvailablePoolGridCardImg key={index} img={img} index={index} />
              ))} */}
                {items?.tokens && (
                  <h3 className="small_card_heading ellipsis">
                    {items.tokens.map((x) => x.symbol).join(" / ")}
                  </h3>
                )}
              </div>
              <p className="small_card_para pt-[13px] line-clamp-1">Assets</p>
            </div>
            <div className="px-4 2xl:pt-[25px] py-4 2xl:py-[14px] available_bg_img">
              <Tooltip
                id={items?.totalLiquidity + "totalLiquidity"}
                title={
                  formatNumberWithCommas(parseFloat(items?.totalLiquidity)) ?? 0
                }
              >
                <h3 className="small_card_heading ellipsis">
                {!items?.isNodedPool && '$'}

                  {formatNumberWithCommas(
                    parseFloat(items?.totalLiquidity).toFixed(
                      items?.totalLiquidity === 0 ? 0 : 6
                    )
                  )}
                </h3>
              </Tooltip>

              <p className="small_card_para pt-[18px]">TVL</p>
            </div>
            <div className="px-4 py-5 available_bg_img">
              <Tooltip
                id={items?.stakedByUser + "staked"}
                title={
                  formatNumberWithCommas(parseFloat(items?.stakedByUser)) ?? 0
                }
              >
                <h3 className="small_card_heading ellipsis">
                  {!items?.isNodedPool && '$'}
                  {formatNumberWithCommas(
                    parseFloat(items?.stakedByUser)?.toFixed(
                      items?.stakedByUser === 0 ? 2 : 4
                    )
                  )}
                </h3>

                <p className="small_card_para pt-3">Staked</p>
              </Tooltip>
            </div>
            <div className="px-4 py-5 available_bg_img">
              <Tooltip
                id={items?.pendingRewards + "pendingRewards"}
                title={
                  formatNumberWithCommas(parseFloat(items?.pendingRewards)) ?? 0
                }
              >
                <h3 className="small_card_heading ellipsis">
                {!items?.isNodedPool && '$'}

                  {formatNumberWithCommas(
                    parseFloat(items?.pendingRewards)?.toFixed(
                      items?.pendingRewards === 0 ? 2 : 6
                    )
                  )}
                </h3>
                <p className="small_card_para line-clamp-1 pt-3">
                  Pending Rewards
                </p>
              </Tooltip>
            </div>

            <div className="px-4 py-5 available_bg_img">
              <h3 className="small_card_heading">{items?.apr}%</h3>
              <p className="small_card_para pt-3">
                {items?.isNodedPool ? "Highest APR" : "APR"}
              </p>
            </div>
            <div className="px-4 py-5 available_bg_img">
              <h3 className="small_card_heading">
                {parseFloat(items?.feePercentage) / 100}%
              </h3>
              <p className="small_card_para line-clamp-1 pt-3">Pool Fee</p>
            </div>

            <JoinPoolBtn width="max-w-[178px] w-full" items={items} />
            <ClaimPopup width="max-w-[136px] w-full" items={items} />
          </div>
        </div>
      )}
    </>
  );
};

export default AvailablePoolGridCard;
