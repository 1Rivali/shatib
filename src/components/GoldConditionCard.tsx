import { trashCanIcon } from "..";
import { categoryImage } from "../assets/json/categoryImage";

interface Props {
  id: number;
  name: string;
  popupShown: boolean;
  setPopupShown: (popupShown: boolean) => void;
  removeCategory: (id: number) => void;
  setPopupCategory: (id: number) => void;
}

const GoldConditionCard = ({
  popupShown,
  setPopupShown,
  name,
  id,
  removeCategory,
  setPopupCategory,
}: Props) => {
  return (
    <div className="w-60 h-52">
      <div className="w-full h-full bg-amber-200">
        <div className="h-40 w-full">
          <img
            className="rounded-b-xl w-full h-full object-cover"
            src={categoryImage(id)}
            alt={name}
          />
        </div>
        <div className="flex justify-between">
          <h1 className="text-2xl p-2">{name}</h1>
        </div>
      </div>
      <div className="flex py-2 gap-4">
        <button
          onClick={() => {
            setPopupCategory(id);
            setPopupShown(!popupShown);
          }}
          className="rounded py-1 px-2 bg-gray-600 text-white"
        >
          أضف معلومات
        </button>
        <button onClick={() => removeCategory(id)}>
          <div className="flex gap-2">
            <img src={trashCanIcon} alt="" />
            <span>إزالة</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GoldConditionCard;
