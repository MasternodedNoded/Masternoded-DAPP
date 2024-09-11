/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import StakeDataBtn from "./StakeDataBtn";
import StakeDataSummaryCard from "./StakeDataSummaryCard";
import { checkAndApproveToken, getCoinDetails } from "../../utils/web3Helpers";
import { useAccount } from "wagmi";
import usePoolManager from "../../hooks/usePoolManager";
import { toast } from "react-toastify";
import { notifyError } from "../common/customToast";
import { useDispatch } from "react-redux";
import { getAvailablePoolList } from "../../redux/reducers/poolSlices";
import { formatToNumberForm } from "../../utils/bigNumberRepresentation";

const StakeData = ({
  closeModal,
  setAddStaking,
  setAddStakingLoading,
  selectedToken,
  items,
}) => {
  const [coinDetails, setCoinDetails] = useState({});
  const { address } = useAccount();
  const { staking, stakeToNodedPool } = usePoolManager();
  const dispatch = useDispatch();

  const [timer, setTimer] = useState({ index: 0, inSeconds: null });
  const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const reset = () => {
    setTimer({ index: 0, inSeconds: null });
    setAmount(0);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (!!address) {
      const data = getCoinDetails(selectedToken?.address, address).then(
        (data) => {
          setCoinDetails(data);
        }
      );
    }
  }, [selectedToken, address]);

  const onStakePressHandler = async () => {
    try {
      if (!address) return notifyError("Please connect first.");

      await toast.promise(
        checkAndApproveToken(selectedToken.address, address, amount),
        {
          pending: "Approving token...",
          success: "Token approved!",
          error: "Token approval failed!",
        }
      );
      if (selectedToken?.isNodedPool) {
        await toast.promise(stakeToNodedPool(amount, timer?.index, address), {
          pending: "Staking in progress...",
          success: "Staking successful!",
          error: "Staking failed. Please try again.",
        });
      } else {
        await toast.promise(
          staking(items, selectedToken, amount, timer?.index, address),
          {
            pending: "Staking in progress...",
            success: "Staking successful!",
            error: "Staking failed. Please try again.",
          }
        );
      }

      setAddStaking(true);
      setLoading(true);
      setAddStakingLoading(true);
      dispatch(getAvailablePoolList(address));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-3">
        <p className="small_card_heading max-sm:text-md !text-sm sm:!text-base">
          To Stake :
        </p>
        <p className="text-white font-gothamMedium font-medium text-sm sm:text-base">
          <span className="text-cadetgrey">Your Balance</span>
          {` : ${parseFloat(coinDetails?.balance ?? 0).toFixed(2)} ${
            selectedToken?.symbol
          }`}
        </p>
      </div>
      <div className="w-full h-[55px] sm:h-[60px] rounded-[10px] bg-richblack common_box_shadow_2 flex items-center gap-4 justify-between pl-[22px] pr-[10px] mb-4 mt-2.5">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="outline-none bg-transparent text-amber placeholder:text-amber font-gothamBold text-base font-bold w-full"
        />
        <button
          type="submit"
          onClick={() => setAmount(formatToNumberForm(coinDetails?.balance))}
          className="common_box_shadow_2 sm:max-w-[88px] sm:w-full w-[71px] h-10 sm:h-[40px] rounded-rounded60 text-citronne font-gothamMedium font-medium text-base leading-[15px] hover:bg-yellowishorange duration-300 ease-in-out transition hover:text-white "
        >
          Max
        </button>
      </div>
      <div className="flex justify-between gap-3 mt-5">
        <p className="small_card_heading !text-sm sm:!text-base max-sm:leading-[15px]">
          Staked For:
        </p>
        <p className="text-cadetgrey font-gothamMedium font-medium leading-[13px] sm:leading-[17px] text-sm sm:text-base">
          Time your tokens will be locked
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4 sm:mt-3 items-center justify-between w-full">
        {items?.lockupDurations.map((item, index) => (
          <StakeDataBtn
            timer={timer}
            setTimer={setTimer}
            index={index}
            key={index}
            item={item}
          />
        ))}
      </div>
      <div className="bg-caviar h-[2px] w-full mb-[17px] my-[20px]"></div>
      <h2 className="small_card_heading !text-sm sm:!text-base max-sm:leading-[15px]">
        Summary
      </h2>
      <div className="grid grid-cols-2 gap-[10px] my-3 sm:my-2.5">
        <StakeDataSummaryCard
          lockupDurations={items?.lockupDurations}
          selectedToken={selectedToken}
          amount={amount}
          timer={timer}
          items={items}
        />
      </div>
      <div className="flex mt-6 gap-3 items-center justify-center">
        <button
          disabled={amount <= 0 ? true : false}
          onClick={onStakePressHandler}
          type="submit"
          className="max-w-[250px] w-full py-3.5  h-[48px] lg:h-[58px] bg-yellowishorange border-[1px] border-yellowishorange rounded-rounded60 box_shadow_2 hover:text-yellowishbrown hover:bg-transparent transition duration-300 ease-in-out text-white font-gothamBold font-bold sm:text-lg sm:leading-[17px] leading-[15px]"
        >
          Stake
        </button>
        <button
          onClick={() => {
            reset();
            closeModal();
          }}
          type="submit"
          className="max-w-[250px] w-full py-3.5  h-[48px] lg:h-[58px] rounded-rounded60 common_box_shadow_2 text-yellowishbrown hover:bg-yellowishorange hover:text-white transition duration-300 ease-in-out font-gothamBold font-bold text-lg leading-[17px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StakeData;
