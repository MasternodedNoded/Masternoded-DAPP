/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import JoinPoolBtnModal from "./JoinPoolBtnModal";
import { useAccount } from "wagmi";
import ButtonToolTip from "../common/customToolTipForBtn";

const JoinPoolBtn = ({ width, items }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [addStaking, setAddStaking] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { isConnected } = useAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const openModal = () => {
    setIsOpenModal(true);
    setRemoved(false);
    setLoading(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setAddStaking(false);
  };

  return (
    <>
      <>
        {!isConnected ? (
          <ButtonToolTip
            id="tooltip-join"
            content={["To join, please connect your wallet."]}
          >
            <button
              disabled={!isConnected}
              onClick={openModal}
              type="submit"
              className={`${width} common_btn px-2 py-4 text-base leading-[15px] common_box_shadow_2`}
            >
              Join Pool
            </button>
          </ButtonToolTip>
        ) : (
          <button
            disabled={!isConnected}
            onClick={openModal}
            type="submit"
            className={`${width} common_btn px-2 py-4 text-base leading-[15px] common_box_shadow_2`}
          >
            Join Pool
          </button>
        )}
      </>
      {isOpenModal && (
        <div
          className={`w-screen h-full top-0 bottom-0 left-0 z-[60] right-0 fixed   ${
            isOpenModal
              ? "bg-opacity-20 bg-[rgba(41,41,41,0.36)] backdrop-filter backdrop-blur-sm "
              : "bg-opacity-0"
          }`}
        ></div>
      )}

      <div
        className={`fixed duration-1000 ease-in-out transition-all left-0 flex items-end sm:items-center justify-center z-[70]  sm:px-4   w-screen h-screen ${
          isOpenModal
            ? "max-sm:bottom-0 sm:top-0 "
            : "max-sm:bottom-[-105%] sm:top-[-150%]"
        }`}
      >
        <JoinPoolBtnModal
          items={items}
          closeModal={closeModal}
          removed={removed}
          setAddStaking={setAddStaking}
          setRemoved={setRemoved}
          addStaking={addStaking}
        />
      </div>
    </>
  );
};

export default JoinPoolBtn;
