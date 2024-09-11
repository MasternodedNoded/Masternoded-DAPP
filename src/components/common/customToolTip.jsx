import React from "react";
import { Tooltip } from "react-tooltip";

const CustomTooltip = ({ id, tokens, children }) => {
  return (
    <div>
      <span data-tooltip-id={id}>{children}</span>
      <Tooltip id={id}>
        <ul className="custom-tooltip">
          {tokens?.map((token, index) => (
            <div key={index} className="flex flex-row justify-between gap-4">
              <span>{token?.name}</span>
              <span> {(parseFloat(token?.weight) * 100).toFixed(2)}%</span>
            </div>
          ))}
        </ul>
      </Tooltip>
    </div>
  );
};

export default CustomTooltip;
