import React from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";

const Accounts = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <h2 className="text-dark text-xs sm:text-12-14 font-semibold">Linked Accounts</h2>
        <p className="text-placeholder text-[10px] sm:text-10-12 font-semibold">
          Manage your connected accounts
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 text-xs sm:text-12-14 text-dark font-medium">
        <div className="gap-2 flex items-center justify-center sm:justify-start w-full sm:w-fit cursor-pointer py-2 px-3 sm:py-0 sm:px-0 border sm:border-none border-gray-200 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-colors">
          <FcGoogle size={18} className="sm:w-5 sm:h-5" />
          <p>Google</p>
        </div>
        <div className="gap-2 flex items-center justify-center sm:justify-start w-full sm:w-fit cursor-pointer py-2 px-3 sm:py-0 sm:px-0 border sm:border-none border-gray-200 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-colors">
          <FaFacebook size={18} fill="#1877F2" className="sm:w-5 sm:h-5" />
          <p>Facebook</p>
        </div>
        <div className="gap-2 flex items-center justify-center sm:justify-start w-full sm:w-fit cursor-pointer py-2 px-3 sm:py-0 sm:px-0 border sm:border-none border-gray-200 rounded-lg sm:rounded-none hover:bg-gray-50 sm:hover:bg-transparent transition-colors">
          <AiFillTikTok size={18} className="sm:w-5 sm:h-5" />
          <p>TikTok</p>
        </div>
      </div>
    </div>
  );
};

export default Accounts;