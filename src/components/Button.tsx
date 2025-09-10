import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  disabeld?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  children,
  size,
  disabeld,
  onClick,
  type = undefined,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabeld}
      className={
        size === "md"
          ? `w-full px-8 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-900 rounded-lg ${
              disabeld ? "bg-opacity-70" : "hover:bg-primary hover:text-black"
            }`
          : `w-full px-24 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-900 rounded-lg ${
              disabeld ? "bg-opacity-70" : "hover:bg-primary hover:text-black"
            }`
      }
    >
      {children}
    </button>
  );
};

export default Button;
