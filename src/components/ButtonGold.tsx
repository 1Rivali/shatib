import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonGold = ({
  children,
  disabled = false,
  onClick,
  className = " ",
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        `w-full px-4 py-1 text-xl font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded ${
          disabled ? "bg-opacity-50 hover:bg-opacity-50" : "hover:bg-opacity-80"
        } ${className}` //hover:bg-secondary
      }
    >
      {children}
    </button>
  );
};

export default ButtonGold;
