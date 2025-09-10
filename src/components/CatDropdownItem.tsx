import { leftArrowIcon } from "..";

interface Props {
  children: string;
  className?: string;
  showLeftIcon?: boolean;
}

const CatDropdownItem = ({
  children,
  className = "",
  showLeftIcon = true,
}: Props) => {
  return (
    <div
      className={`flex justify-between w-fit-content p-4 rounded hover:bg-primary hover:bg-opacity-25 ${className}`}
    >
      <span>{children}</span>
      {showLeftIcon && <img src={leftArrowIcon} alt="" />}
    </div>
  );
};

export default CatDropdownItem;
