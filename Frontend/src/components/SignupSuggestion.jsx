import React from "react";
import GradientText from "../ui/GradientText";
import { Link } from "react-router-dom";

function SignupSuggestion() {
  if(localStorage.getItem("token")){ 
    return null;
  }
  return (
    <div className="">
      <GradientText
        colors={["#845dd2ff", "#bc00f5ff", "#1cdcfaff", "#f80505ff", "#00a6ffff"]}
        animationSpeed={1}
        showBorder={false}
        className="custom-class"
      >
        <Link to={"/auth"}>Login/Signup</Link> to save your notes
      </GradientText>
    </div>
  );
}

export default SignupSuggestion;
