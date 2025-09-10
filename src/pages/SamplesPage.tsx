import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ButtonGold,
  CartItemCard,
  Link,
  shattibIcon,
  useApi,
  useEffect,
  useState,
} from "..";
import { CartItem } from "../models/CartItem";

const SamplesPage = () => {
  const { isLoading, postData } = useApi("Orders", "POST", true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("samplesCart") || "[]");
    setCart(storedCart);
  }, []);

  // Function to remove a product from the cart
  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("samplesCart", JSON.stringify(updatedCart));
  };

  // Function to update the quantity of an item in the cart
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("samplesCart", JSON.stringify(updatedCart));
  };

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Function to handle the order submission
  const handleOrderSubmit = async () => {
    // Transform the cart data into the required structure
    const orderData = {
      dateOfOrder: new Date().toISOString().split("T")[0], // Format the date as "YYYY-MM-DD"
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      kind: "Sample",
    };

    try {
      await postData(orderData);
      toast.success("تم إنشاء الطلب بنجاح", {
        theme: "colored",
        style: { backgroundColor: "#c18a33" },
        icon: () => <img src={shattibIcon} />,
      });
      localStorage.removeItem("samplesCart");

      navigate("/orders");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <>
      {/* Cart Items List */}
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-center">
            <div className="flex justify-around ms-12 w-3/5 border-b-2 border-b-gray-400 py-1 max-lg:hidden">
              <span className="text-lg text-gray-400">اسم المنتج</span>
              <span className="text-lg text-gray-400">الكمية</span>
              <span className="text-lg text-gray-400">السعر</span>
            </div>
          </div>

          {/* Dynamically render Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-4">لا توجد عينات في السلة</div>
          ) : (
            cart.map((item, index) => (
              <CartItemCard
                key={index}
                productId={item.productId}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                remove
                onRemove={handleRemoveFromCart} // Pass the remove handler
                onQuantityChange={handleQuantityChange} // Pass the quantity change handler
                numbered
              />
            ))
          )}
        </div>
      </div>

      <hr className="h-0.5 border-0 bg-gray-400" />

      {/* Total Price */}
      <div className="flex items-baseline gap-4 justify-end my-4 max-lg:flex-col max-lg:items-center">
        <span className="text-xl">السعر الكلي</span>
        <span className="text-3xl">{totalPrice} ريال</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-end w-full max-lg:justify-center">
        <div className="flex gap-4 w-1/3 max-lg:flex-col max-lg:w-full">
          <Link to={"/category/0/0"}>
            <button className="border border-black rounded py-1 px-3 min-w-44">
              إضافة عينات
            </button>
          </Link>
          <ButtonGold disabled={cart.length === 0} onClick={handleOrderSubmit}>
            {isLoading ? <span>تحميل...</span> : <span>إنشاء طلب</span>}
          </ButtonGold>
        </div>
      </div>
    </>
  );
};

export default SamplesPage;
