import React from "react";

const DeleteAccount = () => {
  return (
    <div className="w-full flex px-5 justify-between items-center">
      <div className="flex flex-col">
        <h2 className="text-dark text-12-14 font-semibold">Delete Account</h2>
        <p className="text-placeholder text-10-12 font-semibold">
          By deleting your account you will lose all your data
        </p>
      </div>
      <h2 className="text-error text-12-14 font-bold cursor-pointer">
        Delete Account..
      </h2>
    </div>
  );
};

export default DeleteAccount;
