import React from "react";

const DeleteAccount = () => {
  return (
    // Added some vertical padding (py-4), responsive horizontal padding, and a border for context
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-3 sm:gap-4 px-4 py-4 sm:px-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/*
        - Mobile: flex-col (default) - stacks items vertically.
        - md and up: md:flex-row, md:justify-between, md:items-center - side-by-side layout.
        - gap-3 sm:gap-4: Provides spacing between stacked items on mobile and between items on desktop.
        - px-4 sm:px-6: Responsive horizontal padding.
        - py-4: Consistent vertical padding.
        - Added border, rounded-lg, bg-white for better visual separation (optional, adapt to your design)
      */}
      <div className="flex flex-col">
        <h2 className="text-dark dark:text-gray-100 text-sm sm:text-base font-semibold">
          {/*
            text-12-14 -> text-sm (14px) on mobile, sm:text-base (16px) on small screens+
            (Assuming text-12-14 was roughly 12-14px)
          */}
          Delete Account
        </h2>
        <p className="text-placeholder dark:text-gray-400 text-xs sm:text-sm font-medium mt-0.5">
          {/*
            text-10-12 -> text-xs (12px) on mobile, sm:text-sm (14px) on small screens+
            (Assuming text-10-12 was roughly 10-12px).
            Changed font-semibold to font-medium for slightly less emphasis than the title.
          */}
          By deleting your account you will lose all your data
        </p>
      </div>

      {/*
        Using a div for the action text for consistency if it were to become a button.
        On mobile (when stacked), it will appear below the text.
        On md+ screens, it will be on the right.
      */}
      <div
        className="text-error text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap hover:underline mt-2 md:mt-0"
        // Consider making this a <button> for better accessibility:
        // onClick={() => console.log("Delete action triggered")}
        // role="button" (if not a button element)
        // tabIndex={0} (if not a button element)
      >
        Delete Account
      </div>
    </div>
  );
};

export default DeleteAccount;