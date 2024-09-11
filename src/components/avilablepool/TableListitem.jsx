/* eslint-disable react/prop-types */
import { formatNumberWithCommas } from "../../utils/addCommas";
import ClaimPopup from "../Claim/ClaimPopup";
import JoinPoolBtn from "../Stake/JoinPoolBtn";
import { images } from "../common/Helper";
import Tooltip from "../common/ToolTip";
import CustomTooltip from "../common/customToolTip";

const TableListitem = ({ item }) => {
  return (
    <>
      <article className="flex items-center px-5 w-full h-[94px] justify-between gap-3 xl:gap-5 hero_card">
        <CustomTooltip id={item?.name} tokens={item?.tokens}>
          <p className=" ellipsis font-gothamBold font-bold text-base xl:text-[18px] leading-normal text-white w-[140px]">
            {item?.name}
          </p>
        </CustomTooltip>

        <div className="w-[110px] rounded-[600px] bg-richblack shadow-[-6px_-6px_10px_0px_rgba(255,255,255,0.29)_inset,6px_6px_12px_0px_rgba(33,33,33,0.55)_inset] p-[10px_20px_9px_15px] flex ">
          {item?.tokens && (
            <p className="ellipsis font-gothamMedium font-medium text-[12px]  leading-normal w-[121px]  text-white">
              {item.tokens.map((x) => x.symbol).join(" / ")}
            </p>
          )}
        </div>
        <Tooltip
          id={item?.totalLiquidity + "totalLiquidity"}
          title={formatNumberWithCommas(
            parseFloat(item?.totalLiquidity))}
        >
          <p className=" font-gothamMedium font-medium text-base xl:text-[18px] leading-normal text-white w-[121px] ellipsis">
          {!item?.isNodedPool && '$'}

            {formatNumberWithCommas(
              parseFloat(item?.totalLiquidity).toFixed(
                item?.totalLiquidity === 0 ? 0 : 6
              )
            )}
          </p>
        </Tooltip>
        
        <p className=" font-gothamMedium font-medium text-base xl:text-[18px] leading-normal text-white w-[62px] ">
          {formatNumberWithCommas(item?.apr)}%
        </p>
        <Tooltip
          id={item?.stakedByUser + "stakedByUser"}
          title={formatNumberWithCommas(
            parseFloat(item?.stakedByUser))}
        >
        <p className="ellipsis font-gothamMedium font-medium text-base xl:text-[18px] leading-normal text-white w-[80px] text-left">
        {!item?.isNodedPool && '$'}

          {formatNumberWithCommas(
            parseFloat(item?.stakedByUser)?.toFixed(
              item?.stakedByUser > 0 ? 4 : 2
            )
          )}
        </p>
        </Tooltip>

        <Tooltip
          id={item?.pendingRewards + "pendingRewards"}
          title={formatNumberWithCommas(
            parseFloat(item?.pendingRewards))??0}
        >
        <p className="ellipsis font-gothamMedium font-medium text-base xl:text-[18px] leading-normal text-white w-[123px] text-start">
        {!item?.isNodedPool && '$'}

          {formatNumberWithCommas(
            parseFloat(item?.pendingRewards)?.toFixed(
              item?.pendingRewards > 0 ? 6 : 2
            )
          )}
        </p>
        </Tooltip>

        <p className=" font-gothamMedium font-medium text-base xl:text-[18px] leading-normal text-white w-[50px] text-start">
          {parseFloat(item?.feePercentage) / 100}%
        </p>

        <JoinPoolBtn width="min-w-[100px] max-w-[136px] w-full" items={item} />
        <ClaimPopup width="min-w-[100px] max-w-[136px] w-full" items={item} />
      </article>
    </>
  );
};

export default TableListitem;
