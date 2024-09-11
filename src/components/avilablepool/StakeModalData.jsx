/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import StakeData from "./StakeData";
import SkeletonLoader from "../common/SkeletonLoader";
import StakeDataSelectBitCoins from "./StakeDataSelectBitCoins";

const StakeModalData = ({
  closeModal,
  setAddStaking,
  setAddStakingLoading,
  items,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [selectedToken, setSelected] = useState(null);

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
      <StakeDataSelectBitCoins
        items={items}
        selected={selectedToken}
        setSelected={setSelected}
      />
      <div className="bg-caviar h-[2px] w-full my-6 sm:my-[16px]"></div>

      <div className="w-full mt-8">
        <>
          {isLoading ? (
            loader()
          ) : (
            <StakeData
              closeModal={closeModal}
              setAddStaking={setAddStaking}
              setAddStakingLoading={setAddStakingLoading}
              selectedToken={{
                ...selectedToken,
                apr: items?.apr,
                pendingRewards: items?.pendingRewards,
              }}
              items={items}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default StakeModalData;
