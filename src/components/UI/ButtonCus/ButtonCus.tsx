import React from "react";
import classNames from "classnames";

interface ButtonCusProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: string;
  styles?: React.CSSProperties;
}

const ButtonCus = ({
  children,
  className,
  onClick,
  styles,
}: ButtonCusProps) => {
  return (
    <button
      className={classNames(
        "bg-linear-to-br from-orange-500 to-orange-600 text-white p-2 w-[180px] rounded-full cursor-pointer",
        className
      )}
      onClick={onClick}
      style={styles}
    >
      {children}
    </button>
  );
};

export default ButtonCus;
