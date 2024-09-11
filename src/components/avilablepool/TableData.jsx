/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TableListitem from "./TableListitem";

const TableData = ({ availablePoolList }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-7">
      {!isMetaMaskInstalled ? (
        <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white text-center py-12">
          Please connect MetaMask to continue
          </p>
      ) : availablePoolList && availablePoolList?.length > 0 ? (
        availablePoolList?.map((item, index) => (
          <TableListitem item={item} key={index} />
        ))
      ) : (
        <p className="font-gothamMedium text-lg 2xl:text-xl ellipsis leading-normal text-white text-center py-12">
          No Pool Found
        </p>
      )}
    </div>
  );
};

export default TableData;
