import React, { FC } from "react";

interface NavbarItemsProps {
  label: string;
}

const NavbarItem: FC<NavbarItemsProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
