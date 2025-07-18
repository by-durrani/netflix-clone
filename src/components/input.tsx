import React, { ChangeEvent, FC } from "react";

interface InputProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: string;
}
const Input: FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="block rounded-md px-6 pt-6 pb-2 w-full text-white bg-neutral-700 appearance-none focus:ring-0 focus:outline-none peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 order-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
