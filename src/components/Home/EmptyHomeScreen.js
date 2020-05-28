import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";

function EmptyHomeScreen() {
  return (
    <div className="row dist-cxu-box">
      <div className="bg-light empty-container mb-3 d-flex justify-content-center align-items-center">
        <p>
          <AiOutlineBarChart />
        </p>
      </div>
    </div>
  );
}

export default EmptyHomeScreen;
