import React from "react";
import { Tooltip } from "react-tooltip";

const ButtonToolTip = ({ id, content, children }) => {
  return (
    <div>
      <span data-tooltip-id={id}>{children}</span>
      <Tooltip id={id}>
        <span >{content}</span>
      </Tooltip>
    </div>
  );
};

export default ButtonToolTip;
