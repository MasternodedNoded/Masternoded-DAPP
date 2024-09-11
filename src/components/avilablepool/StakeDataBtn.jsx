import { secondsToDays } from "../../utils/secondsToDays";

/* eslint-disable react/prop-types */
const StakeDataBtn = ({ index, item, timer, setTimer }) => {
  return (
    <button
      key={index}
      onClick={() => setTimer({index,inSeconds:item})}
      type="button"
      className={`py-[15px] flex items-center justify-center text-base font-gothamBold font-bold leading-[19px] rounded-[6px] ${
        timer?.index === index
          ? "text-tawnyolive staked_for_tabs_bg_img"
          : "common_box_shadow_2 text-heavymetal "
      }`}
    >
      {secondsToDays(item)}
    </button>
  );
};

export default StakeDataBtn;
