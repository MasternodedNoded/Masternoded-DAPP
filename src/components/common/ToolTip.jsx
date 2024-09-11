import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Tooltip = ({ id, title, children }) => {
  return (
    <div>
      <span data-tooltip-id={id}>{children}</span>
      <ReactTooltip id={id}>
        <div>
          <h3 className="tooltip-title">{title}</h3>
        </div>
      </ReactTooltip>
    </div>
  );
};

export default Tooltip;
