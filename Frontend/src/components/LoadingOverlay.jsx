import React from "react";
import {BlinkBlur} from "react-loading-indicators";

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <BlinkBlur color={["#d3158aff", "#327fcd", "#8213e3ff", "#cd8032"]} size="small" text={message} textColor="" />
      </div>
    </div>
  );
}

export default LoadingOverlay;
