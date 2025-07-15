import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { FC } from "react";

interface AccountMenuProps {
  visible?: boolean;
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
}

const AccountMenu: FC<AccountMenuProps> = ({ visible, user }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 group flex flex-row gap-3 items-center w-full">
          <Image
            src={user.image || "/images/user.jpg"}
            alt="userProfile"
            width={100}
            height={100}
            className="size-8 rounded-md"
          />
          <p className="text-white text-sm group-hover:underline">
            {user.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
