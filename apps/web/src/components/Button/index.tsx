import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`bg-violet-600 hover:bg-violet-700 py-3 px-6 text-slate-50 rounded-lg transition dark:bg-violet-800 dark:hover:bg-violet-900 ${className}`}>{children}</button>
  );
};
