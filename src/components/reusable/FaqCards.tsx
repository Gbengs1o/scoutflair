import React from "react";
import Image from "next/image"
import faqImage from "@/public/images/mystery-box-with-gifts-concept.png"

interface FaqCardProps {
    question: string;
    answer: string
}

export const FaqCardBlue: React.FC <FaqCardProps> = ({question, answer}) => {
    return (
        <div
            className="flex flex-col justify-start items-center relative gap-4 px-6 pt-4 pb-7 rounded-2xl bg-[#4bbac1] border-4 border-[#d1d1d1]"
            style={{ boxShadow: "0px 8px 10px 0 rgba(209,209,209,0.12)" }}
        >
            <Image
                src={faqImage}
                className="w-[54.2px] h-[72.19px] opacity-[0.86] object-cover"
                alt=""
                width={54}
                height={72}
            />
            <div className="flex flex-col justify-start items-center self-stretch relative gap-2">
                <p className="self-stretch w-fit opacity-[0.92] text-2xl font-semibold text-center text-white">
                    {question}
                </p>
                <p className="self-stretch w-fit opacity-80 text-sm text-center text-white">
                    {answer}
                </p>
            </div>
        </div>
    )
}

export const FaqCardWhite: React.FC <FaqCardProps> = ({question, answer}) => {
    return (
        <div
            className="flex flex-col justify-start items-center relative gap-4 px-6 pt-4 pb-7 rounded-2xl bg-white border-4 border-[#d1d1d1]"
            style={{ boxShadow: "0px 8px 10px 0 rgba(209,209,209,0.12)" }}
        >
            <Image
                src={faqImage}
                className="w-[54.2px] h-[72.19px] opacity-[0.86] object-cover"
                alt=""
                width={54}
                height={72}
            />
            <div className="flex flex-col justify-start items-center self-stretch relative gap-2">
                <p className="self-stretch w-fit opacity-[0.92] text-2xl font-semibold text-center text-black">
                    {question}
                </p>
                <p className="self-stretch w-fit opacity-80 text-sm text-center text-black">
                    {answer}
                </p>
            </div>
        </div>
    )
}

