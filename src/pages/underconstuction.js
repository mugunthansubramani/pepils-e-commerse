import React from "react";
// import { Lottie } from "lottie-react";
// import animationData from "../assets/lootieFiles/siteUnderConstruction.json"; // Ensure the path is correct
import Navbar from "../components/navbar/navbar"; // Ensure this path is correct

export default function Underconstuction() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row text-center mt-5 pt-5">
          <h1>Site Under Construction</h1>
            {/* <Lottie animationData={animationData} loop={true} autoplay={true} /> */}
        </div>
      </div>
    </>
  );
}
