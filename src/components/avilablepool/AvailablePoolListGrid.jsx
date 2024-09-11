/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AvailablePoolGridCard from "./AvailablePoolGridCard";
import Faq from "./Faq";
import SkeletonLoader from "../common/SkeletonLoader";

const AvailablePoolListGrid = ({ availablePoolList, isLoading }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    }
  }, [window]);

  return (
    <div className="w-full pt-[26px] pb-[21px]">
      {!isMetaMaskInstalled ? (
        <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white text-center py-20">
          Please connect MetaMask to continue
        </p>
      ) : (
        <div
          className={` ${
            availablePoolList?.length === 0
              ? ""
              : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-7"
          }`}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-7">
              <SkeletonLoader height="h-[374px]" className="w-full" />
              <SkeletonLoader height="h-[374px]" className="w-full" />
              <SkeletonLoader height="h-[374px]" className="w-full" />
            </div>
          ) : availablePoolList && availablePoolList?.length > 0 ? (
            availablePoolList?.map((items, index) => (
              <AvailablePoolGridCard
                isLoading={isLoading}
                key={index}
                items={items}
              />
            ))
          ) : (
            <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white text-center py-12">
              No Pool Found
            </p>
          )}
          {availablePoolList?.map((items, index) => (
            <Faq
              isLoading={isLoading}
              key={index}
              items={items}
              value={index}
              isOpen={openAccordion === index}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailablePoolListGrid;
