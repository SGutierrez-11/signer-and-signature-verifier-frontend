import React from "react";
import SingFile from "./SingFile";
import VerifyFile from "./VerifyFile";

const MainFiles = () => {
  return (
    <div>
      <div className="flex flex-row justify-center text-center mt-8 font-bold text-3xl">
        Signer Verify Files
      </div>
      <div className="flex flex-row justify-center gap-5 mt-10">
        <SingFile />
        <VerifyFile />
      </div>
    </div>
  );
};

export default MainFiles;
