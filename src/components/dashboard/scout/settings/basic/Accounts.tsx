import React from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";

const Accounts = () => {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <div className="flex flex-col">
        <h2 className="text-dark text-12-14 font-semibold">Linked Accounts</h2>
        <p className="text-placeholder text-10-12 font-semibold">
          Manage your connected accounts
        </p>
      </div>
      <div className="flex w-full gap-4 text-12-14 text-dark font-medium">
        <div className="gap-1 flex items-center w-fit cursor-pointer">
          <FcGoogle size={20} />
          <p>Google</p>
        </div>
        <div className="gap-1 flex items-center w-fit cursor-pointer">
          <FaFacebook size={20} fill="#1877F2" />
          <p>Facebook</p>
        </div>
        <div className="gap-1 flex items-center w-fit cursor-pointer">
          <AiFillTikTok size={20} />
          <p>Tiktok</p>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
