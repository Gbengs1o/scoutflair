import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";

const Accounts = () => {
  return (
    // Added p-4 for some padding, max-w-lg and mx-auto for better demonstration context
    <div className="flex flex-col gap-4 p-4 w-full max-w-lg mx-auto">
      <div className="flex flex-col">
        {/*
          Your custom font sizes like text-12-14 and text-10-12 are specific.
          If you want these to be responsive too, you'd typically define them
          in your tailwind.config.js or use standard Tailwind sizes like text-sm, text-base
          and apply responsive prefixes: e.g., text-sm sm:text-base
        */}
        <h2 className="text-dark text-12-14 font-semibold">Linked Accounts</h2>
        <p className="text-placeholder text-10-12 font-semibold">
          Manage your connected accounts
        </p>
      </div>

      {/* This is the main part for responsiveness */}
      <div
        className="
          flex flex-col sm:flex-row  // Stack vertically by default, row on sm screens and up
          w-full
          gap-4                    // Applies to both flex-col (vertical gap) and flex-row (horizontal gap)
          text-12-14 text-dark font-medium
        "
      >
        <div className="gap-1 flex items-center w-full sm:w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"> {/* Make full width on mobile, fit content on sm+ */}
          <FcGoogle size={20} />
          <p>Google</p>
        </div>
        <div className="gap-1 flex items-center w-full sm:w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"> {/* Make full width on mobile, fit content on sm+ */}
          <FaFacebook size={20} fill="#1877F2" />
          <p>Facebook</p>
        </div>
        <div className="gap-1 flex items-center w-full sm:w-fit cursor-pointer p-2 hover:bg-gray-100 rounded"> {/* Make full width on mobile, fit content on sm+ */}
          <AiFillTikTok size={20} />
          <p>Tiktok</p>
        </div>
      </div>
    </div>
  );
};

export default Accounts;