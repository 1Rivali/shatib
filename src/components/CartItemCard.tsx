import {
  AccentText,
  Link,
  // productImg,
  QuantityControls,
  redTrashIcon,
} from "..";

interface Props {
  name: string;
  deaf?: string;
  price: number;
  quantity: number;
  productId: number;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, newQuantity: number) => void; // Add quantity change handler
  numbered?: boolean;
  remove?: boolean;
  isQuantity?: boolean;
  image?: string;
}

const CartItemCard = ({
  numbered,
  remove,
  name = "طقم شطاف WG004",
  // deaf = "ضمان 10 سنين",
  price = 0,
  quantity = 1,
  productId = 0,
  isQuantity = true,
  image = "",
  onRemove,
  onQuantityChange,
}: Props) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(productId, newQuantity); // Notify parent about the quantity change
  };

  return (
    <div className="flex items-center gap-12 my-8 max-lg:flex-col max-lg:gap-2">
      {numbered ? <h1 className="text-2xl font-bold">1</h1> : null}
      <div className="flex justify-around items-center rounded-xl bg-gray-100 h-32 w-full max-lg:flex-col max-lg:gap-2 max-lg:p-2 max-lg:h-fit">
        <Link to={`/product/${productId}`}>
          <div className="rounded-xl h-28 w-20 max-lg:h-24 max-lg:w-24 overflow-hidden">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        </Link>
        <div>
          <h1 className="text-xl font-bold max-lg:text-base">{name}</h1>
          {/* <h2 className="text-xl font-bold text-gray-400 max-lg:text-base">
            {deaf}
          </h2> */}
        </div>
        {isQuantity ? (
          <div className="w-32 max-lg:w-full max-lg:max-w-32">
            <QuantityControls
              quantity={quantity}
              onChange={handleQuantityChange} // Pass handler to update quantity
            />
          </div>
        ) : null}
        <AccentText>{price} ريال</AccentText>
        {remove ? (
          <button onClick={() => onRemove(productId)}>
            <div className="flex gap-2">
              <img src={redTrashIcon} alt="Remove" />
              <span className="text-red-500 font-bold">إزالة</span>
            </div>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CartItemCard;
