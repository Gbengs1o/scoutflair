import React from 'react';
import bgImage from "@/public/images/frame-3404.png"
import { Urls } from '../../constants/constants';
import Link from 'next/link';

const SignUpSuccessPage: React.FC = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage.src})` }}>
        <div className="absolute inset-0 overflow-hidden bg-[#010e1d]/90">
          <div className="w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto p-4 md:p-8 absolute left-1/2 transform -translate-x-1/2 top-1/3 md:top-1/2 -translate-y-1/3 md:-translate-y-1/2 overflow-hidden rounded-2xl bg-[#f8f8ff]">
            <div className="flex flex-col justify-start items-center gap-6">
              <svg
                width={97}
                height={96}
                viewBox="0 0 97 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M66.781 31.9031L39.6781 59.0063L27.8188 47.1516C27.8073 47.1401 27.7959 47.1287 27.7842 47.1173C26.8376 46.1897 25.3183 46.205 24.3907 47.1516C23.4629 48.0984 23.4784 49.6178 24.425 50.5453L37.9813 64.0969C38.4307 64.5478 39.0415 64.8009 39.6781 64.8C40.3147 64.8006 40.9253 64.5478 41.3747 64.0969L70.1747 35.2969C70.1861 35.2855 70.1976 35.2743 70.209 35.2626C71.1365 34.316 71.1213 32.7967 70.1747 31.8691C69.2281 30.9413 67.7088 30.9568 66.781 31.9031ZM48.5 0C21.9904 0 0.5 21.4904 0.5 48C0.5 74.5096 21.9904 96 48.5 96C74.9967 95.9689 96.4689 74.4967 96.5 48C96.5 21.4904 75.0096 0 48.5 0ZM48.5 91.2C24.6412 91.2 5.3 71.8588 5.3 48C5.3 24.1412 24.6412 4.8 48.5 4.8C72.348 4.82607 91.6739 24.1521 91.7 48C91.7 71.8588 72.3588 91.2 48.5 91.2Z"
                  fill="#03750F"
                  fillOpacity="0.8"
                />
              </svg>
              <div className="flex flex-col justify-start items-center gap-2">
                <p className="text-2xl text-center text-black/80">
                  Account created successfully
                </p>
                <p className="text-sm text-center text-black/80">
                  Check your email to verify your account. Move to <Link href={Urls.LOGIN}><span className='inline-block text-slate-800 font-semibold underline'>Login</span></Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccessPage;
