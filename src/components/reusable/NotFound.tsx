import React from "react";
import Image from "next/image"
import NotFoundImg from "../assets/404image.svg";
import bgImage from "@/public/images/frame-3404.png"
import SocialIcons from "./SocialIcons";
import Link from "next/link";
import { Urls } from "@/constants/constants";

const NotFound: React.FC = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="w-full h-full absolute left-0 top-0 overflow-hidden bg-[] bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${bgImage.src})`}}>
                <div className="w-full h-full absolute left-0 top-0 overflow-hidden bg-[#010e1d]/[0.98] flex items-center justify-center">
                    <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-center gap-8 px-4 py-6 bg-white bg-opacity-80 rounded-3xl shadow-lg">
                        <div className="flex flex-col justify-start items-start gap-6 p-4">
                            <div className="flex justify-start items-center w-full gap-4">
                                <svg
                                    width={48}
                                    height={48}
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g clipPath="url(#clip0_224_815)">
                                        <path
                                            d="M24.6205 43.8747L4.13307 23.4182C-1.13811 18.1669 -1.13811 9.64175 4.13307 4.39042C9.40426 -0.870374 17.9367 -0.870374 23.2079 4.39042L43.6954 24.8375C48.9666 30.0983 48.9666 38.614 43.6954 43.8747C38.4242 49.1261 29.8917 49.1261 24.6205 43.8747Z"
                                            fill="#083162"
                                        />
                                        <path
                                            d="M3.55565 24.686L23.3605 44.4519C17.8523 49.3531 9.39567 49.1733 4.115 43.8936C-1.17514 38.6233 -1.36475 30.1834 3.55565 24.686Z"
                                            fill="#F2A725"
                                        />
                                        <path
                                            d="M44.4455 23.4084L24.6406 3.63311C30.1488 -1.26814 38.6055 -1.08836 43.8861 4.19136C49.1763 9.47107 49.3659 17.911 44.4455 23.4084Z"
                                            fill="#F2A725"
                                        />
                                    </g>                                
                                </svg>
                                <p className="opacity-80 text-2xl md:text-3xl font-bold text-left text-[#010e1d]">
                                    Scout
                                    <span className="opacity-80 text-2xl md:text-3xl text-left text-[#010e1d]"> Flair</span>
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-4xl md:text-5xl font-bold text-[#0c1017]">Oops!</p>
                                <p className="mt-4 text-xl md:text-2xl font-bold text-[#010e1d]">
                                    We can’t seem to find the page you’re looking for.
                                </p>
                                <p className="mt-4 text-lg font-bold text-black">Error code: 404</p>
                                <p className="mt-2 text-lg font-bold text-black/75">Here are some helpful links instead:</p>
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link href={Urls.HOME} className="opacity-88 text-lg font-bold text-black">Home</Link>
                                    <Link href={Urls.ABOUT} className="opacity-88 text-lg font-bold text-black">About us</Link>
                                    <Link href={Urls.SERVICES} className="opacity-88 text-lg font-bold text-black">Services</Link>
                                    <Link href={Urls.CONTACT} className="opacity-88 text-lg font-bold text-black">Contact us</Link>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-2 px-4 py-3 rounded-lg drop-shadow-lg">
                                <SocialIcons />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src={NotFoundImg} alt="Not Found" className="w-full h-auto max-w-xs md:max-w-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
