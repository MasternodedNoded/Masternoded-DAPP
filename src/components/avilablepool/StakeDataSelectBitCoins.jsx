import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BitCoinIcon, DropdownIcon, ETHIcon } from "../common/Icons";

const blockchainlist = [
  { icon: <BitCoinIcon />, name: "MATIC - BNB" },
  { icon: <ETHIcon />, name: "ETH - BNB" },
  { icon: <BitCoinIcon />, name: "THETA FUEL - BNB" },
  { icon: <ETHIcon />, name: "BITCOIN - BNB" },
];

export default function StakeDataSelectBitCoins({
  items,
  selected,
  setSelected,
}) {
  const [list, setList] = useState(null);
  useEffect(() => {
    if (items?.tokens?.length) {
      setSelected(items?.tokens[0]);
      setList(items?.tokens);
    }
  }, []);
  return (
    <div>
      <Listbox value={selected} onChange={setSelected} disabled={selected?.isNodedPool}>
        <div className="relative">
          <Listbox.Button className="relative model_select_bg_img  sm:max-w-[544px] w-full mx-auto py-[16px] flex items-center justify-between  rounded-[20px] px-[15px] text-start ">
            <div className="flex gap-[10px] items-center">
              <div className="w-[50px] flex items-center justify-center h-[50px] rounded-[72px] border-[1.5px] border-black/45">
                {/* <img src={maticbnb} alt="stake modal img" /> */}
                <span className=" flex items-center justify-center shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)inset] rounded-[72px]  w-[46px] h-[46px]">
                  {selected?.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-gothamMedium font-medium leading-[1.1] text-xl sm:text-220px] text-white">
                  {selected?.name}
                </p>
                <p
                  className="text-cadetgrey font-gothamMedium font-medium 
                !leading-[1] text-[14px]"
                >
                  {parseFloat(selected?.weight * 100).toFixed(2) ?? 0} %
                </p>
              </div>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-7">
              <DropdownIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-richblack common_box_shadow_2 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list?.map((data, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none font-gothamMedium font-medium py-3 px-8 ${
                      active ? "bg-yellowishorange text-white" : "text-white"
                    }`
                  }
                  value={data}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={` gap-2 truncate flex items-center ${
                          selected ? "font-medium" : "font-medium"
                        }`}
                      >
                        {data.icon}
                        {data.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
