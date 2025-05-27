"use client"; // Assuming this is for Next.js App Router

import React, { useState } from "react"; // useState is not used in your provided snippet, but kept if needed later

interface iNotification {
  title: string;
  description: string;
  push: boolean;
  email: boolean;
  sms: boolean;
  // Add a unique id if you were managing state changes for individual items
  // id: string;
}

const Notifications = () => {
  // For demonstration, let's make the notifications slightly different
  // and assume they would have unique IDs in a real scenario.
  const initialNotifications: iNotification[] = [
    {
      title: "New Messages",
      description: "Receive notifications for new direct messages and group chats.",
      push: true,
      email: true,
      sms: false,
    },
    {
      title: "Task Updates",
      description: "Get notified about progress and changes in your assigned tasks.",
      push: true,
      email: false,
      sms: false,
    },
    {
      title: "System Alerts",
      description: "Important updates regarding your account or system maintenance.",
      push: true,
      email: true,
      sms: true,
    },
    {
      title: "Promotional Offers",
      description: "Stay informed about new features, special offers, and events.",
      push: false,
      email: true,
      sms: false,
    },
  ];

  // If you need to manage the state of these notifications (e.g., toggling checkboxes)
  // const [notifications, setNotifications] = useState<iNotification[]>(initialNotifications);
  // For this responsiveness task, we'll use the initial static array.
  const notifications = initialNotifications;


  // Placeholder handler - in a real app, this would update state
  const handleCheckboxChange = (
    notificationIndex: number,
    type: keyof Pick<iNotification, "push" | "email" | "sms">
  ) => {
    console.log(`Toggled ${type} for notification ${notificationIndex}`);
    // Example state update (if using useState for `notifications`):
    // setNotifications(prev =>
    //   prev.map((item, idx) =>
    //     idx === notificationIndex ? { ...item, [type]: !item[type] } : item
    //   )
    // );
  };


  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="">
        <h2 className="text-dark dark:text-gray-100 text-base sm:text-lg font-semibold">
          Notification Settings
        </h2>
        <p className="text-placeholder dark:text-gray-400 text-xs sm:text-sm font-medium mt-1">
          We may send you important notifications about your account outside of
          your notifications settings.
        </p>
      </div>

      {/* Notifications List */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*
          - Mobile: grid-cols-1 (default) - each notification takes full width.
          - lg and up: lg:grid-cols-2 - two notifications per row.
          - gap-6 for spacing between notification items.
        */}
        {notifications.map((notification, i) => (
          <div
            key={i} // In a real app, use a stable unique ID: notification.id
            className="w-full flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30"
          >
            {/* Description Part */}
            <div className="flex flex-col md:flex-1">
              <h3 className="text-dark dark:text-gray-100 text-sm sm:text-base font-semibold">
                {/*
                  Using h3 for semantic structure within the list item.
                  Responsive text size.
                */}
                {notification.title}
              </h3>
              <p className="text-placeholder dark:text-gray-400 text-xs/normal sm:text-sm/normal font-normal mt-1">
                {/*
                  text-xs/normal: 12px font with 1.5 line height (18px)
                  sm:text-sm/normal: 14px font with 1.5 line height (21px)
                  Your text-12-18 suggests 12px font, 18px line height.
                  Adjusted font-semibold to font-normal for description for better hierarchy.
                */}
                {notification.description}
              </p>
            </div>

            {/* Checkbox Options Part */}
            <div className="flex flex-row flex-wrap gap-x-6 gap-y-3 items-center md:flex-col md:items-start md:gap-y-2.5 md:flex-none md:w-auto mt-2 md:mt-0">
              {/*
                - Mobile (default for flex): flex-row flex-wrap items-center gap-x-6 gap-y-3
                  Checkboxes are side-by-side and wrap.
                - md and up: md:flex-col md:items-start md:gap-y-2.5 md:flex-none md:w-auto
                  Checkboxes stack vertically, aligned to the start, taking minimal width.
              */}
              {[
                { type: "push", label: "Push" },
                { type: "email", label: "Email" },
                { type: "sms", label: "SMS" },
              ].map((option) => (
                <label // Using label to wrap input and text for better clickability
                  key={option.type}
                  className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm text-dark dark:text-gray-300 font-medium select-none"
                >
                  <input
                    type="checkbox"
                    className="custom-checkbox h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-500 rounded focus:ring-primary-500 dark:focus:ring-primary-400 dark:ring-offset-gray-800 dark:bg-gray-600"
                    checked={notification[option.type as keyof iNotification] as boolean}
                    onChange={() => handleCheckboxChange(i, option.type as keyof Pick<iNotification, "push" | "email" | "sms">)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="w-full border-t border-gray-200 dark:border-gray-600 mt-4 mb-1" />
      {/*
        Changed hr styling to use border-t and Tailwind color utilities.
        Adjusted margin.
      */}
    </div>
  );
};

export default Notifications;