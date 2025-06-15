import React from "react";
import Image from "next/image"

interface TestimonialProps {
    image: any,
    name: string,
    location: string,
    testimonial: string
}
const TestimonialCard: React.FC <TestimonialProps> = ({ image, name, location, testimonial }) => {
    return (
        <div className="relative flex justify-center items-center w-full h-auto opacity-100 z-10">
            <div
                className="w-full max-w-md h-auto p-6 rounded-[32px] bg-white"
                style={{ boxShadow: "0px 8px 10px 0 rgba(0,0,0,0.14), 0px 6px 10px 0 rgba(0,0,0,0.14)" }}
            >
                <div className="flex justify-center">
                    <Image className="flex top-0" src={image} alt="" width={300} height={420}/>
                </div>
                <div className="flex flex-col justify-start items-center gap-2">
                    <div className="flex flex-col justify-start items-center self-stretch gap-4">
                        <div className="flex flex-col justify-start items-center gap-3">
                            <div className="flex flex-col justify-center items-center self-stretch gap-1">
                                <p className="w-fit text-[22px] font-bold text-center text-black">
                                    {name}
                                </p>
                                <p className="w-fit text-sm text-center text-black/[0.72]">
                                    {location}
                                </p>
                            </div>
                            <div className="flex justify-center items-center w-full gap-2.5">
                                <p className="text-lg text-center text-black/80">
                                    {testimonial}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-[99.5px] relative">
                            <svg
                                width={15}
                                height={14}
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"                                
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M7.51277 0.12207L9.14337 5.14052L14.4201 5.14052L10.1511 8.2421L11.7817 13.2606L7.51277 10.159L3.24382 13.2606L4.87442 8.2421L0.605465 5.14052L5.88218 5.14052L7.51277 0.12207Z"
                                    fill="#FFA500"
                                />
                            </svg>
                            <svg
                                width={15}
                                height={14}
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"                                
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path
                                    d="M7.7564 0.122009L9.38699 5.14046L14.6637 5.14046L10.3948 8.24204L12.0253 13.2605L7.7564 10.1589L3.48744 13.2605L5.11804 8.24204L0.849087 5.14046L6.1258 5.14046L7.7564 0.122009Z"
                                    fill="#FFA500"
                                />
                            </svg>
                            <svg
                                width={14}
                                height={14}
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"                                
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path
                                    d="M6.99999 0.122009L8.63058 5.14046L13.9073 5.14046L9.63834 8.24204L11.2689 13.2605L6.99999 10.1589L2.73104 13.2605L4.36163 8.24204L0.0926785 5.14046L5.36939 5.14046L6.99999 0.122009Z"
                                    fill="#FFA500"
                                />
                            </svg>
                            <svg
                                width={15}
                                height={14}
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path
                                    d="M7.24361 0.122009L8.8742 5.14046L14.1509 5.14046L9.88197 8.24204L11.5126 13.2605L7.24361 10.1589L2.97466 13.2605L4.60525 8.24204L0.3363 5.14046L5.61301 5.14046L7.24361 0.122009Z"
                                    fill="#FFA500"
                                />
                            </svg>
                            <svg
                                width={15}
                                height={14}
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path
                                    d="M7.48723 1.29715L8.77246 5.25268L8.85399 5.5036H9.11782L13.2769 5.5036L9.91214 7.94825L9.69869 8.10333L9.78022 8.35425L11.0655 12.3098L7.70068 9.86513L7.48723 9.71005L7.27378 9.86513L3.90901 12.3098L5.19424 8.35425L5.27577 8.10333L5.06232 7.94825L1.69755 5.5036L5.85664 5.5036H6.12047L6.202 5.25268L7.48723 1.29715Z"
                                    fill="white"
                                    stroke="black"
                                    strokeWidth="0.726277"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
