import { cartIcon, MainPadding, RoundButton, useState } from "..";
import CartPage from "./CartPage";
import {} from "./CartPageContainer";
import SamplesPage from "./SamplesPage";

const CartPageContainer = () => {
  const [cartShown, setCartShown] = useState(true);
  const [samplesShown, setSamplesShown] = useState(false);
  return (
    <main>
      <MainPadding>
        <div className="flex items-center gap-2 pb-8 max-lg:flex-col">
          <img className="w-12 h-12" src={cartIcon} alt="cart" />
          <span className="text-2xl font-bold text-gray-500">السلة</span>
        </div>

        <div className="flex justify-center pb-8 max-lg:flex-col max-lg:items-center max-lg:gap-4">
          <RoundButton
            onClick={() => {
              setCartShown(true);
              setSamplesShown(false);
            }}
            active={cartShown}
          >
            للشراء
          </RoundButton>
          <RoundButton
            onClick={() => {
              setCartShown(false);
              setSamplesShown(true);
            }}
            active={samplesShown}
          >
            العينات
          </RoundButton>
        </div>

        {cartShown && <CartPage />}
        {samplesShown && <SamplesPage />}
      </MainPadding>
    </main>
  );
};

export default CartPageContainer;
