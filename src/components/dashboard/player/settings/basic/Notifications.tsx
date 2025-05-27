import React from "react";

interface iNotification {
  title: string;
  description: string;
  push: boolean;
  email: boolean;
  sms: boolean;
}

const Notifications = () => {
  const notifications: iNotification[] = Array(4).fill({
    title: "Messages",
    description: "These are notifications about in app messages",
    push: true,
    email: true,
    sms: false,
  });
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="px-3 sm:px-5 sm:pl-5">
        <h2 className="text-dark text-xs sm:text-12-14 font-semibold">
          Notification Settings
        </h2>
        <p className="text-placeholder text-xs sm:text-10-12 font-semibold">
          We may send you important notifications about your account outside of
          your notifications settings
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-3 sm:mt-5 px-3 sm:px-5">
        {notifications.map((notification, i) => (
          <div key={i} className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-3 sm:p-0 border sm:border-0 rounded-lg sm:rounded-none">
            <div className="flex flex-col font-semibold w-full sm:w-[55%]">
              <h2 className="text-dark text-opacity-[0.88] text-sm sm:text-14-16">
                {notification.title}
              </h2>
              <p className="text-xs sm:text-12-18 text-placeholder leading-relaxed">
                {notification.description}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col w-full sm:w-fit gap-3 sm:gap-3 justify-start sm:justify-between text-xs sm:text-12-14 text-dark font-medium">
              <div className="flex w-fit gap-1 sm:gap-1 items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox flex-shrink-0"
                  checked={notification.push}
                  onChange={(e) => {}}
                />
                <p className="whitespace-nowrap">Push</p>
              </div>
              <div className="flex w-fit gap-1 sm:gap-1 items-center">
                <input
                  type="checkbox"
                  className="flex-shrink-0"
                  checked={notification.email}
                  onChange={(e) => {}}
                />
                <p className="whitespace-nowrap">Email</p>
              </div>
              <div className="flex w-fit gap-1 sm:gap-1 items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox flex-shrink-0"
                  checked={notification.sms}
                  onChange={(e) => {}}
                />
                <p className="whitespace-nowrap">SMS</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="w-full bg-[#E0E0E0] mt-1.5 mb-2" />
    </div>
  );
};

export default Notifications;