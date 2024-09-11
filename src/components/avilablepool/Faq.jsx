/* eslint-disable react/prop-types */
import { formatNumberWithCommas } from "../../utils/addCommas";
import { DropdownIcon } from "../common/Icons";
import SkeletonLoader from "../common/SkeletonLoader";
import CustomTooltip from "../common/customToolTip";
import FaqDataCard from "./FaqDataCard";

const Faq = ({ items, value, isLoading, isOpen, toggleAccordion }) => {
  return (
    <>
      {isLoading ? (
        <div className="md:hidden">
          <SkeletonLoader height="h-[71px]" />
        </div>
      ) : (
        <div className="bg-richblack md:hidden rounded-rounded15 common_box_shadow_2">
          <div
            onClick={() => toggleAccordion(value)}
            className="flex items-center justify-between w-full gap-1 px-3 py-3.5 cursor-pointer"
          >
            <CustomTooltip id={items?.name} tokens={items?.tokens}>
              <span className="small_heading ">{items?.name}</span>
            </CustomTooltip>

            <div className="flex max-w-[160px] w-full items-center justify-end gap-3">
              <button
                type="submit"
                className="flex items-center justify-center bg-richblack w-11 h-11 rounded-full common_box_shadow_2 "
              >
                <span
                  className={`transform ${
                    isOpen
                      ? "rotate-180 duration-700 ease-in-out transition-all"
                      : "rotate-0 duration-700 ease-in-out transition-all"
                  }`}
                >
                  <DropdownIcon />
                </span>
              </button>
            </div>
          </div>
          <div
            className={`grid overflow-hidden transition-all duration-1000 ease-in-out text-slate-500 text-base ${
              isOpen ? "grid-rows-[1fr] h-fit" : "grid-rows-[0fr] h-fit"
            }`}
          >
            <div className="overflow-hidden">
              <FaqDataCard items={items} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Faq;
