import { toast } from "react-toastify";
import {
  heartIcon,
  addToCartIcon,
  useState,
  Link,
  redHeartIcon,
  AccentText,
  ButtonGold,
  shattibIcon,
} from "..";
import { useLoginModal } from "../hooks/useLoginModal";
import { useRkhamCustomMeasure } from "../hooks/useRkhamCustomMeasure";

interface Props {
  name?: string;
  price?: number;
  id?: number;
  image?: string;
  categoryId?: number;
}

const ProductCard = ({
  name = "جاري التحميل...",
  price = 0,
  id = 0,
  image,
  categoryId,
}: Props) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  const { setIsShownLoginModal } = useLoginModal();
  const { setIsShownRkahmCustomMeasureModal } = useRkhamCustomMeasure();
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = currentCart.findIndex(
      (item: { productId: number }) => item.productId === id
    );

    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({
        productId: id,
        quantity: 1,
        name: name,
        price: price,
        image: image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    toast.success("تمت الإضافة إلى السلة بنجاح", {
      theme: "colored",
      style: { backgroundColor: "#c18a33" },
      icon: () => <img src={shattibIcon} />,
    });
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const existingProductIndex = favorites.findIndex(
      (item: { productId: number }) => item.productId === id
    );

    if (existingProductIndex === -1) {
      favorites.push({
        productId: id,
        name: name,
        price: price,
        image: image,
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    toast.success("تمت الإضافة إلى المفضلة بنجاح", {
      theme: "colored",
      style: { backgroundColor: "#c18a33" },
      icon: () => <img src={shattibIcon} />,
    });
  };

  const [active, setActive] = useState(false);
  return (
    <div className="pb-2 h-80 w-64 rounded-xl bg-gray-50 shadow shadow-gray-500 transition-all duration-700 hover:bg-amber-100">
      <div className="relative h-1/2">
        <Link to={`/product/${id}`}>
          <img
            className="rounded-t-xl h-full w-full object-cover bg-gray-500"
            src={image}
            alt=""
          />
        </Link>
        <button
          onClick={(e) => {
            if (!token) {
              setIsShownLoginModal(true);
            } else {
              console.log("visited favorite");
              e.preventDefault();
              setActive(!active);
              handleAddToFavorites();
            }
          }}
        >
          <div className="absolute top-0 m-2 flex items-center justify-center h-12 w-12 rounded-full bg-white transition-all duration-700 hover:bg-red-200">
            <img src={active ? redHeartIcon : heartIcon} alt="" />
          </div>
        </button>
      </div>
      <Link to={`/product/${id}`}>
        <div className="h-1/2 flex flex-col justify-between p-2">
          {/* <h2 className="text-lg font-bold">طقم شطاف WG 006</h2> */}
          <h2 className="text-lg font-bold">{name}</h2>
          {/* <span className="text-sm text-gray-600 py-1">طقم شطاف</span>
          <p>إمكانية التحكم بالمياه من خلال عصا سهلة الاستخدام</p> */}
          <span>
            {/* <AccentText>50 ريال</AccentText> */}
            <AccentText>{price} ريال</AccentText>
          </span>
          <div className="mx-2 my-1">
            {userType === "Business" ? null : categoryId === 1 ? (
              <div
                onClick={() => {
                  if (!token) {
                    setIsShownLoginModal(true);
                    return;
                  }
                  setIsShownRkahmCustomMeasureModal(true);
                }}
                className="w-15 h-15 flex items-center justify-center cursor-pointer"
              >
                <ButtonGold>طلب قياس مخصص</ButtonGold>
              </div>
            ) : (
              <ButtonGold
                onClick={
                  token
                    ? handleAddToCart
                    : (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return setIsShownLoginModal(true);
                    }
                }
              >
                <div className="flex justify-center">
                  أضف إلى السلة
                  <img className="ps-2" src={addToCartIcon} alt="" />
                </div>
              </ButtonGold>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
