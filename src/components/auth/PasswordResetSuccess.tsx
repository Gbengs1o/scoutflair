import React from 'react';
import Link from 'next/link';
import bgImage from "@/public/images/frame-3404.png"
import { Urls } from '../../constants/constants';

const PasswordResetSuccess: React.FC = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      <div className="w-full h-full absolute left-0 top-0 overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage.src})` }}>
        <div className="w-full h-full absolute left-0 top-0 overflow-hidden bg-[#010e1d]/90">          
          <div
            className="flex flex-col justify-start items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 p-8 md:gap-12 md:px-12 md:pt-16 md:pb-36 rounded-2xl bg-white"
            style={{ boxShadow: "0px 6px 10px 0 rgba(0,0,0,0.14)" }}
          >
            <div className="flex flex-col justify-start items-center gap-6 md:gap-10">
              <svg
                width={96}
                height={96}
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M66.281 31.9031L39.1781 59.0063L27.3188 47.1516C27.3073 47.1401 27.2959 47.1287 27.2842 47.1173C26.3376 46.1897 24.8183 46.205 23.8907 47.1516C22.9629 48.0984 22.9784 49.6178 23.925 50.5453L37.4813 64.0969C37.9307 64.5478 38.5415 64.8009 39.1781 64.8C39.8147 64.8006 40.4253 64.5478 40.8747 64.0969L69.6747 35.2969C69.6861 35.2855 69.6976 35.2743 69.709 35.2626C70.6365 34.316 70.6213 32.7967 69.6747 31.8691C68.7281 30.9413 67.2088 30.9568 66.281 31.9031ZM48 0C21.4904 0 0 21.4904 0 48C0 74.5096 21.4904 96 48 96C74.4967 95.9689 95.9689 74.4967 96 48C96 21.4904 74.5096 0 48 0ZM48 91.2C24.1412 91.2 4.8 71.8588 4.8 48C4.8 24.1412 24.1412 4.8 48 4.8C71.848 4.82607 91.1739 24.1521 91.2 48C91.2 71.8588 71.8588 91.2 48 91.2Z"
                  fill="#03750F"
                  fillOpacity="0.8"
                />
              </svg>
              <div className="flex flex-col justify-start items-center gap-2">
                <p className="w-full text-2xl text-center text-black/80">
                  Password Changed!
                </p>
                <p className="w-full text-sm text-center text-black/80">
                  Your password has been changed successfully
                </p>
              </div>
            </div>
            <Link href={Urls.LOGIN} className="flex flex-col justify-center items-center gap-6">
              <button className="flex justify-center items-center w-full h-12 px-6 py-2.5 rounded-[20px] bg-[#f2a725]">
                <p className="text-2xl font-medium text-left text-black">
                  Sign In
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
