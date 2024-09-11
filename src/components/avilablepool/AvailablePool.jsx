import { useEffect, useState } from "react";
import AvailablePoolListGrid from "./AvailablePoolListGrid";
import AvailblePoolListTable from "./AvailblePoolListTable";
import {
  GridIcon,
  GridIcon2,
  SearchIcon,
  TableIcon,
  TableIcon2,
} from "../common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { getAvailablePoolList } from "../../redux/reducers/poolSlices";
import usePoolManager from "../../hooks/usePoolManager";
import { useAccount, useNetwork } from "wagmi";

const AvailablePool = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const availablePoolList = useSelector(
    (state) => state?.pool?.availablePoolList
  );
  const isLoading = useSelector((state) => state.pool.isLoading);
  useEffect(() => {
    dispatch(getAvailablePoolList(address));
  }, [address]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767 && !active) {
        setActive(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  const filteredPoolList = Array.isArray(availablePoolList)
    ? availablePoolList?.filter((pool) =>
        pool?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : [];

  return (
    <div className="main_container">
      <div className="flex md:items-center max-md:flex-col-reverse mt-[30px] 2xl:mt-[54px] gap-[26px]  justify-between">
        <h1 className="text-[18px] sm:text-[25px] 2xl:text-[35px] whitespace-nowrap text-white font-medium leading-normal font-gothamMedium">
          Available Pool List
        </h1>
        <div className="max-w-[500px] lg:max-w-[663px] w-full flex items-center justify-between gap-3">
          <div className=" flex items-center input_bg_img  py-[18px] pl-[26px] pr-5 gap-[14px]  rounded-rounded60 max-w-[485px] w-full h-[48px] 2xl:h-[60px]">
            <SearchIcon />
            <input
              className="bg-transparent text-white placeholder:text-cadetgrey w-full outline-none"
              type="search"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center max-md:hidden gap-[14px]">
            <button
              onClick={() => {
                setActive(true);
              }}
              className={`bg-richblack flex items-center justify-center rounded-rounded60 w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] ${
                active ? "common_box_shadow" : "common_box_shadow_2"
              }`}
            >
              {active ? <GridIcon /> : <GridIcon2 />}
            </button>
            <button
              onClick={() => {
                setActive(false);
              }}
              className={`bg-richblack flex items-center justify-center rounded-rounded60 w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] ${
                active ? "common_box_shadow_2" : "common_box_shadow"
              }`}
            >
              {active ? <TableIcon2 /> : <TableIcon />}
            </button>
          </div>
        </div>
      </div>

      {active ? (
        <AvailablePoolListGrid
          availablePoolList={filteredPoolList}
          isLoading={isLoading}
        />
      ) : (
        <AvailblePoolListTable
          availablePoolList={filteredPoolList}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AvailablePool;
