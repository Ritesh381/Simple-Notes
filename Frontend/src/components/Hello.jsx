import React from "react";
import TextPressure from "../ui/TextPressure.jsx";

function Hello() {
  return (
    <div className="flex flex-col">
      <TextPressure
        text="Hello User!"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={false}
        textColor="#000000ff"
        strokeColor="#ff0000"
        minFontSize={10}
      />
    </div>
  );
}

export default Hello;
