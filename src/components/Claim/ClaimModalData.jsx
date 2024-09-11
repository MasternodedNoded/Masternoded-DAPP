/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UnStakeModalData from "../avilablepool/UnStakeModalData";
import SkeletonLoader from "../common/SkeletonLoader";

const ClaimModalData = ({
  closeModal,
  setRemoved,
  setUnStakingLoading,
  items,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const loader = () => (
    <>
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
      <SkeletonLoader height="h-[62px]" />
    </>
  );
  return (
    <div className="w-full mx-auto p-5 lg:p-6">
      {isLoading ? (
        loader()
      ) : (
        <UnStakeModalData
          items={items}
          closeModal={closeModal}
          setRemoved={setRemoved}
          setUnStakingLoading={setUnStakingLoading}
        />
      )}
    </div>
  );
};

export default ClaimModalData;
