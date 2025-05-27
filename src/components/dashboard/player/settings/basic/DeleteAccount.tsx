import React from "react";

const DeleteAccount = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row px-3 sm:px-5 justify-between items-start sm:items-center gap-3 sm:gap-0">
      <div className="flex flex-col">
        <h2 className="text-dark text-xs sm:text-12-14 font-semibold">
          Delete Account
        </h2>
        <p className="text-placeholder text-xs sm:text-10-12 font-semibold">
          By deleting your account you will lose all your data
        </p>
      </div>
      <h2 className="text-error text-xs sm:text-12-14 font-bold cursor-pointer self-start sm:self-auto">
        Delete Account..
      </h2>
    </div>
  );
};

export default DeleteAccount;