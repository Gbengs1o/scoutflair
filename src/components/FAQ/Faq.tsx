"use client";
import React, { useState } from "react";

// Assuming these custom colors/fonts are defined in your tailwind.config.js
// primary: "your_primary_color_hex", // e.g., '#007bff'
// primary-2: "your_primary_2_color_hex", // e.g., '#66b0ff'
// ghostwhite: "your_ghostwhite_color_hex", // e.g., '#f8f8ff'
// black-50: "your_black_50_color_hex", // e.g., '#333333'
// fontFamily: {
//   merriweather: ["Merriweather", "serif"],
//   manrope: ["Manrope", "sans-serif"],
//   lato: ["Lato", "sans-serif"],
// }

const Faq = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  const faqData = [
    {
      category: "General Questions",
      items: [
        {
          id: "item-1",
          question: "What is Scoutflair, and how does it work?",
          answer:
            "Scoutflair is a football scouting platform designed to connect talented players with scouts and coaches looking for the next big star. Players can create detailed profiles showcasing their skills, stats, and highlight videos, making it easier for scouts to discover them.",
        },
        {
          id: "item-2",
          question: "Who can use Scoutflair—players, scouts, or coaches?",
          answer:
            "Scoutflair is designed for all football enthusiasts, including players, scouts, and coaches. Players can showcase their skills and stats, scouts can discover promising talent, and coaches can evaluate and recruit players for their teams.",
        },
        {
          id: "item-3",
          question: "Is Scoutflair free to use, or are there subscription plans?",
          answer:
            "Scoutflair offers both free and premium subscription plans. Players can create basic profiles for free, while premium plans unlock additional features such as advanced analytics, video uploads, and direct messaging.",
        },
      ],
    },
    {
      category: "For Players",
      items: [
        {
          id: "item-9",
          question: "How do I create a profile as a player?",
          answer:
            "Creating a profile on Scoutflair is simple. Sign up, fill in your personal details, football experience, key stats, and upload highlight videos. A complete and accurate profile increases your visibility to scouts.",
        },
        {
          id: "item-10",
          question: "How do scouts find my profile?",
          answer:
            "Scouts use Scoutflair’s advanced search and filtering tools to discover players based on specific criteria like position, skills, age, and location. Keeping your profile updated with your latest achievements and videos significantly increases your chances of being found.",
        },
        {
          id: "item-11",
          question: "What happens when a scout shows interest in me?",
          answer:
            "You’ll receive a notification on the platform and via email when a scout expresses interest or views your profile. Premium members may also have direct messaging capabilities to connect with scouts.",
        },
      ],
    },
    {
      category: "For Scouts",
      items: [
        {
          id: "item-4",
          question: "How do I search for players on Scoutflair?",
          answer:
            "Scouts and coaches can easily find players on Scoutflair using the advanced search and filtering system. Simply log into your account and navigate to the Player Search section, where you can filter players based on position, age, nationality, playing style, skill level, and other key attributes.",
        },
        {
          id: "item-5",
          question: "What kind of player data and stats are available?",
          answer:
            "Player profiles include key metrics such as position, height, weight, playing style, match statistics (goals, assists, etc.), performance ratings, and highlight videos. Scouts can filter players based on these stats to find the right talent.",
        },
        {
          id: "item-6",
          question: "Can I contact players directly through the platform?",
          answer:
            "Yes, depending on your subscription plan, Scoutflair allows direct messaging between scouts/coaches and players. This facilitates initial contact and discussions about potential opportunities.",
        },
      ],
    },
    {
      category: "For Coaches",
      items: [
        {
          id: "item-12",
          question: "How can coaches use Scoutflair to find and recruit players?",
          answer:
            "Coaches can leverage Scoutflair to identify, evaluate, and connect with top football talent. The platform provides access to a vast pool of players, each with a detailed profile showcasing stats, skills, and highlight videos, streamlining the recruitment process.",
        },
        {
          id: "item-13",
          question: "Can I track multiple players and compare them?",
          answer:
            "Yes, Scoutflair offers tools for coaches to create watchlists, track multiple players of interest, compare their stats and progress, and make more informed recruitment decisions.",
        },
        {
          id: "item-14",
          question: "Is Scoutflair free to use, or are there subscription plans for coaches?",
          answer:
            "Scoutflair offers various subscription tiers for coaches, from free basic access to premium plans with advanced scouting tools, unlimited player views, and enhanced communication features.",
        },
      ],
    },
    {
      category: "Technical and Support",
      items: [
        {
          id: "item-7",
          question: "Who do I contact for support?",
          answer:
            "If you need assistance, you can reach out to Scoutflair’s support team through the 'Contact Us' page on our website, via email at support@scoutflair.com, or through the live chat feature available during business hours.",
        },
        {
          id: "item-8",
          question: "How do I delete my account if I no longer need it?",
          answer:
            "You can request account deletion by navigating to your account settings page and selecting the 'Delete Account' option. Please note that this action is irreversible. If you need further assistance, contact customer support.",
        },
      ],
    },
    {
      category: "Password Reset",
      items: [
        {
          id: "item-15",
          question: "How do I reset my password if I forget it?",
          answer:
            "If you've forgotten your password, click on the ‘Forgot Password?’ link on the login page. Enter the email address associated with your account, and we'll send you instructions on how to reset your password.",
        },
        {
          id: "item-16",
          question: "What should I do if I experience issues with my profile?",
          answer:
            "If you encounter any technical issues with your profile or any part of the platform, please contact Scoutflair support via the Help Center, submit a support ticket, or email us directly. Provide as much detail as possible about the issue for a quicker resolution.",
        },
      ],
    },
  ];


  return (
    <div className="bg-ghostwhite py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
      {/* Section Heading Tag */}
      <div className="mx-auto md:mx-0 flex items-center gap-2 border border-primary-2 w-fit px-3 py-1.5 rounded-full text-primary font-merriweather font-normal text-xs sm:text-sm mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-2"></span>
        FAQ
      </div>

      {/* Main Title and Sub-Paragraph */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6 lg:gap-10 mb-8 sm:mb-10 md:mb-12">
        <h2 className="font-manrope font-bold text-2xl sm:text-3xl lg:text-4xl text-black-50 md:flex-1 leading-tight">
          Everything You Wanted to Ask <br className="hidden md:block lg:hidden" />
          (But Didn't)
        </h2>
        <p className="font-lato font-normal text-sm sm:text-base lg:text-lg text-black-50 md:flex-1 md:max-w-md lg:max-w-lg">
          Find clear, straightforward answers to the most common questions
          about how Scoutflair works, helping you navigate the platform with ease.
        </p>
      </div>

      {/* FAQ Columns / Single Column */}
      {/* On mobile and tablet (up to lg), categories are in a single column. */}
      {/* On lg and up, categories are distributed into two columns. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-12 gap-y-8 lg:gap-y-10">
        {faqData.map((category, categoryIndex) => (
          <div
            key={category.category}
            // This logic ensures categories are distributed properly in a two-column layout on lg+
            // For single column (mobile/tablet), it doesn't matter as they stack naturally.
            className={`
              lg:col-span-1 
              ${faqData.length % 2 !== 0 && categoryIndex === faqData.length - 1 && columnIndexForLastOddItem(faqData.length) === 1 ? 'lg:col-start-2' : ''} 
              ${faqData.length % 2 !== 0 && categoryIndex === faqData.length - 1 && columnIndexForLastOddItem(faqData.length) === 0 ? 'lg:col-start-1' : ''}
            `}
          >
            <h3 className="font-manrope font-semibold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-primary">
              {category.category}
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              {category.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  openItem={openItem}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine which column the last item should go into if there's an odd number of categories
const columnIndexForLastOddItem = (totalCategories: number) => {
  // Distribute as evenly as possible, last item goes to the shorter column.
  // If totalCategories = 5, first column gets 3, second gets 2. So last item is in first column.
  // If totalCategories = 3, first column gets 2, second gets 1. So last item is in first column.
  const itemsPerColumn = Math.ceil(totalCategories / 2);
  if (totalCategories % 2 !== 0) {
    // If last item is in the first "logical" column
    if ( (totalCategories -1) < itemsPerColumn ) return 0; // should be column 0
    return 0; // Default to first column for odd one out if not fitting perfectly.
              // A more robust distribution might be needed for very complex rules.
              // For simple two column, it's usually first.
  }
  return 0; // Not applicable for even
};


const AccordionItem = ({
  item,
  openItem,
  onToggle,
}: {
  item: { id: string; question: string; answer: string };
  openItem: string | null;
  onToggle: (id: string) => void;
}) => {
  const isOpen = openItem === item.id;
  return (
    <div className="bg-white rounded-lg sm:rounded-xl px-3 py-3 sm:px-4 sm:py-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        type="button"
        className="font-lato font-semibold text-black-50 text-sm sm:text-base md:text-lg flex justify-between items-center w-full text-left cursor-pointer group"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="pr-2">{item.question}</span> {/* Added pr-2 for spacing before icon */}
        <span className={`ml-auto text-xl sm:text-2xl text-primary transform transition-transform duration-300 ease-in-out group-hover:text-opacity-80 flex-shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> {/* Adjusted icon size and stroke */}
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      {/*
        Applying a transition to max-height for smooth open/close.
        The actual max-height value needs to be large enough to accommodate the content.
      */}
      <div
        id={`faq-answer-${item.id}`}
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
        style={{ maxHeight: isOpen ? '1000px' : '0px' }} // Fallback for 'max-h-screen' if not large enough, or use a JS height calculation
      >
        <p className="font-lato font-normal text-black-50 text-xs sm:text-sm md:text-base leading-relaxed mt-2 pt-1 pb-1"> {/* Added pb-1 */}
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default Faq;