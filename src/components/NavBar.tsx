import { useNavigate } from "react-router-dom";
import {
  shattibLogoRow,
  searchIcon,
  cartIcon,
  heartIcon,
  TextInput,
  Link,
  NavBarCategoriesDropdownMenu,
  useState,
  menuIcon,
  NavBarAccountDropDown,
  useEffect,
  closeCircleIcon,
} from "..";
import { useLoginModal } from "../hooks/useLoginModal";
// import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import NavBarCategoriesSidebarMenu from "./NavBarCategoriesDropdownMenu";

const NavBar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [sampleCartItemCount, setSampleCartItemCount] = useState(0);
  const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const samplesCart = JSON.parse(localStorage.getItem("samplesCart") || "[]");
  useEffect(() => {
    setCartItemCount(currentCart.length);
    setSampleCartItemCount(samplesCart.length);
  }, [currentCart, samplesCart]);

  const userType = localStorage.getItem("userType") || "Client";
  const token = localStorage.getItem("accessToken");
  const [searchValue, setSearchValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { setIsShownLoginModal } = useLoginModal();
  const navigate = useNavigate();
  const handleAuthorizedNavigationButton = (path: string) => {
    if (token) {
      return navigate(path);
    }
    setIsCollapsed(true);
    setIsShownLoginModal(true);
  };
  // const [cartItemCount, setCartItemCount] = useState<number>(0);

  // // Function to update cart item count from localStorage
  // const updateCartItemCount = () => {
  //   const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const totalItems = currentCart.reduce(
  //     (total: number, item: { quantity: number }) => total + item.quantity,
  //     0
  //   );
  //   setCartItemCount(totalItems);
  // };

  // // Call updateCartItemCount when the component mounts
  // useEffect(() => {
  //   updateCartItemCount();
  // }, []);

  // const { setIsShownEngineerRequestModal } = useEngineerRequest();
  const { t } = useTranslation();
  const [isDiscountShown, setIsDiscountShown] = useState(true);
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-white max-lg:hidden ">
        {isDiscountShown && (
          <div className="w-full h-[45px] bg-primary text-center text-white flex flex-row justify-between items-center px-7">
            <img
              className="justify-self-end cursor-pointer invert"
              src={closeCircleIcon}
              alt=""
              onClick={() => setIsDiscountShown(false)}
            />
            <h4 className="text-xl">توصيل مجاني لجميع الطلبات</h4>
            <div></div>
          </div>
        )}
        <nav className="flex items-center justify-around border-b py-4 px-8">
          <Link to={"/home"}>
            <img src={shattibLogoRow} alt="" />
          </Link>
          <Link to={"/home"}>
            <span>{t("homePageTxt")}</span>
          </Link>
          <NavBarCategoriesSidebarMenu />
          {/* <Link to={"/home"}>
        <span>جميع المنتجات</span>
      </Link> */}
          <Link
            className={userType === "Client" ? "hidden" : ""}
            to={"/conditions"}
          >
            <span>{t("criteriaTxt")}</span>
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?search=${searchValue}`);
            }}
            className="w-96"
          >
            <TextInput
              bordered
              icon={searchIcon}
              iconLink={`/search?search=${searchValue}`}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t("searchInProductsTxt")}
            />
          </form>

          {userType === "Client" && (
            <div
              onClick={() => handleAuthorizedNavigationButton("/cart")}
              className="relative flex flex-col items-center cursor-pointer"
            >
              <div className="absolute -top-2 -right-3 px-2 bg-primary text-white rounded-full">
                {cartItemCount + sampleCartItemCount}
              </div>
              <img src={cartIcon} alt="" />
              <span>{t("cartTxt")}</span>
            </div>
          )}

          {userType === "Client" && (
            <div
              onClick={() => handleAuthorizedNavigationButton("/wishlist")}
              className="flex flex-col items-center cursor-pointer"
            >
              <img src={heartIcon} alt="" />
              <span>{t("favoriteTxt")}</span>
            </div>
          )}

          {/* <div
        onClick={() => {
          setIsShownEngineerRequestModal(true);
        }}
      >
        <ButtonGold>طلب عرض سعر</ButtonGold>
      </div> */}
          {/* {token && ( */}
          <div
            onClick={(e) => {
              if (token) {
                return;
              }
              e.stopPropagation();
              setIsShownLoginModal(true);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full"
          >
            {/* <img src={accountIcon} alt="" /> */}
            <NavBarAccountDropDown />
          </div>
          {/* )} */}
          {/* <LanguageSwitcher /> */}
        </nav>
      </div>

      <div className="lg:hidden">
        <nav className="flex flex-col justify-between border-b items-start p-8 gap-8">
          <div className="flex justify-between w-full">
            <Link to={"/home"}>
              <img src={shattibLogoRow} alt="" />
            </Link>
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              <img src={menuIcon} alt="" />
            </button>
          </div>
          <div className={`flex flex-col gap-6 ${isCollapsed ? "hidden" : ""}`}>
            <Link to={"/home"}>
              <span>{t("homePageTxt")}</span>
            </Link>
            <NavBarCategoriesDropdownMenu />
            {/* <Link to={"/home"}>
        <span>جميع المنتجات</span>
      </Link> */}
            <Link
              className={userType === "Client" ? "hidden" : ""}
              to={"/conditions"}
            >
              <span>{t("criteriaTxt")}</span>
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?search=${searchValue}`);
              }}
              className="w-96 max-lg:w-full max-lg:max-w-72"
            >
              <TextInput
                bordered
                iconLink={`/search?search=${searchValue}`}
                onChange={(e) => setSearchValue(e.target.value)}
                icon={searchIcon}
                placeholder={t("searchInProductsTxt")}
              />
            </form>
            <div className="lg:hidden flex items-center justify-between w-full gap-12">
              <div
                onClick={() => handleAuthorizedNavigationButton("/cart")}
                className="relative flex flex-col items-center"
              >
                {/* <div className="absolute -top-2 -right-3 px-2 bg-primary text-white rounded-full">
            {cartItemCount}
            </div> */}
                <img src={cartIcon} alt="" />
                <span>{t("cartTxt")}</span>
              </div>

              <div
                onClick={() => handleAuthorizedNavigationButton("/wishlist")}
                className="flex flex-col items-center"
              >
                <img src={heartIcon} alt="" />
                <span>{t("favoriteTxt")}</span>
              </div>

              {/* <div
        onClick={() => {
          setIsShownEngineerRequestModal(true);
          }}
          >
          <ButtonGold>طلب عرض سعر</ButtonGold>
          </div> */}
              {/* {token && ( */}
              <div
                onClick={(e) => {
                  if (token) {
                    return;
                  }
                  e.stopPropagation();
                  setIsShownLoginModal(true);
                  setIsCollapsed(true);
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full"
              >
                {/* <img src={accountIcon} alt="" /> */}
                <NavBarAccountDropDown />
              </div>
              {/* )} */}
              {/* <LanguageSwitcher /> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
