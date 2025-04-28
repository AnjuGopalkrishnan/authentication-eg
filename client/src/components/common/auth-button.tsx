import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  loading,
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      {...props}
      className={` 
                  bg-orange-500 hover:bg-orange-600  w-full flex items-center justify-center gap-x-2 text-white disabled:bg-accent-disable py-3 rounded-sm cursor-pointer mt-5 mb-5
              `}
    >
      <span>{text}</span>
      {loading ? <CgSpinner className="animate-spin" /> : <FaArrowRight />}
    </button>
  );
};

export default AuthButton;
