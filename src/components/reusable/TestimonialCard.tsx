import React from "react";
import Image, { StaticImageData } from "next/image"; // Assuming image prop is StaticImageData or string

interface TestimonialProps {
  image: StaticImageData | string; // More specific type for Next/Image
  name: string;
  location: string;
  testimonial: string;
  rating?: number; // Optional: to control which stars are filled/empty
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  image,
  name,
  location,
  testimonial,
  rating = 4.5, // Default rating, assuming 5 stars max, last one is half/empty
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    // Outer wrapper to control overall width and centering on the page if needed
    <div className="w-full flex justify-center p-4">
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 py-6 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white shadow-xl flex flex-col items-center"
        // Using Tailwind shadow utility, you can customize this further
        // style={{ boxShadow: "0px 8px 10px 0 rgba(0,0,0,0.14), 0px 6px 10px 0 rgba(0,0,0,0.14)" }}
      >
        {/* Image Container */}
        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] mb-4 sm:mb-5 rounded-full overflow-hidden border-2 border-gray-200">
          {/* Assuming a circular avatar style image based on typical testimonials */}
          <Image
            src={image}
            alt={`${name}'s testimonial photo`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center">
          <p className="text-lg sm:text-xl md:text-[22px] font-bold text-black">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-black/[0.72]">
            {location}
          </p>
        </div>

        {/* Testimonial Text */}
        <div className="w-full my-3 sm:my-4">
          <p className="text-sm sm:text-base md:text-lg text-center text-black/80 leading-relaxed px-2">
            "{testimonial}" {/* Added quotes for emphasis */}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            let starType: 'full' | 'half' | 'empty' = 'empty';
            if (starValue <= fullStars) {
              starType = 'full';
            } else if (starValue === fullStars + 1 && hasHalfStar) {
              starType = 'half';
            }

            return (
              <StarIcon key={index} type={starType} className="w-4 h-4 sm:w-5 sm:h-5" />
            );
          })}
        </div>
      </div>
    </div>
  );
};


// StarIcon component for better reusability and clarity
const StarIcon: React.FC<{ type: 'full' | 'half' | 'empty'; className?: string }> = ({ type, className = "w-5 h-5" }) => {
  if (type === 'full') {
    return (
      <svg
        className={className}
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M7.51277 0.12207L9.14337 5.14052L14.4201 5.14052L10.1511 8.2421L11.7817 13.2606L7.51277 10.159L3.24382 13.2606L4.87442 8.2421L0.605465 5.14052L5.88218 5.14052L7.51277 0.12207Z"
          fill="#FFA500" // Orange color for filled star
        />
      </svg>
    );
  }
  if (type === 'half') {
    // SVG for a half star (you might need to create or find one)
    // This is a simplified example, using a full star with different fill for demo
    return (
      <svg
        className={className}
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="50%" stopColor="#D1D5DB" /> {/* gray for empty part */}
          </linearGradient>
        </defs>
        <path
          d="M7.51277 0.12207L9.14337 5.14052L14.4201 5.14052L10.1511 8.2421L11.7817 13.2606L7.51277 10.159L3.24382 13.2606L4.87442 8.2421L0.605465 5.14052L5.88218 5.14052L7.51277 0.12207Z"
          fill="url(#halfGradient)"
        />
      </svg>
    );
  }
  // Empty star (using the last SVG from your original code, assuming it's the empty one)
  return (
    <svg
      className={className}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M7.48723 1.29715L8.77246 5.25268L8.85399 5.5036H9.11782L13.2769 5.5036L9.91214 7.94825L9.69869 8.10333L9.78022 8.35425L11.0655 12.3098L7.70068 9.86513L7.48723 9.71005L7.27378 9.86513L3.90901 12.3098L5.19424 8.35425L5.27577 8.10333L5.06232 7.94825L1.69755 5.5036L5.85664 5.5036H6.12047L6.202 5.25268L7.48723 1.29715Z"
        // fill="#D1D5DB" // Example: Light gray for empty star outline
        stroke="#A0A0A0" // Example: Darker gray for stroke
        strokeWidth="0.726277"
        fill="transparent" // Make the inside transparent if it's an outline star
      />
    </svg>
  );
};


export default TestimonialCard;