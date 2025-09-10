import { categoryImg01 } from "..";

interface Props {
  children: string;
  id?: number;
  img?: string;
  num?: string;
  onClick?: () => void;
  selected?: boolean;
  size?: string;
}

const CategoryCard = ({
  children,
  // id, img,
  img,
  num,
  onClick,
  selected,
  size,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`h-48 w-56 rounded-xl cursor-pointer ${
        selected ? "bg-primary text-white" : "hover:bg-amber-100"
      } ${size === "sm" && "rounded-full h-12 w-12"}`}
    >
      <div className="flex justify-center items-center h-4/5 rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={img || categoryImg01}
          alt=""
        />
      </div>
      <div className="flex justify-between p-2 gap-2">
        <span>{children}</span>
        <span>{num}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
