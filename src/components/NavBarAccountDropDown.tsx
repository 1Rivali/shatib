import { Link, useNavigate } from "react-router-dom";
import {
  consultationsIcon,
  downArrowIcon,
  ordersIcon,
  personOutlineIcon,
  redLogoutIcon,
  useEffect,
  useRef,
  useState,
} from "..";

const NavBarAccountDropDown = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isDropdown) setIsDropdown(false);
    };

    const isSmallScreen = window.innerWidth <= 1024;

    if (!isSmallScreen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isSmallScreen) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isDropdown]);
  return (
    <>
      <div
        ref={buttonRef}
        onMouseEnter={() => {
          if (localStorage.getItem("accessToken")) {
            setIsDropdown(true);
          }
        }}
        onClick={() => {
          if (localStorage.getItem("accessToken")) {
            setIsDropdown((prev) => !prev);
          }
        }}
        className="flex gap-2 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <img src={personOutlineIcon} alt="" />
          <span>الحساب</span>
        </div>
        <img className="w-3" src={downArrowIcon} alt="" />
      </div>
      {isDropdown ? (
        <div
          onMouseLeave={() => setIsDropdown(false)}
          className="absolute top-[85%] z-50 bg-white rounded shadow flex flex-col overflow-hidden max-lg:top-80"
        >
          {userType === "Client" && (
            <>
              <button className="hover:bg-gray-100 px-4 py-2">
                <Link to={"/orders"}>
                  <div className="flex gap-4 items-center">
                    <img className="w-5" src={ordersIcon} alt="" />
                    <span>الطلبات</span>
                  </div>
                </Link>
              </button>

              <button className="hover:bg-gray-100 px-4 py-2">
                <Link to={"/consultations"}>
                  <div className="flex gap-4 items-center">
                    <img className="w-5" src={consultationsIcon} alt="" />
                    <span>الاستشارات</span>
                  </div>
                </Link>
              </button>
            </>
          )}

          {/* <button className="hover:bg-gray-100 px-4 py-2">
            <div className="flex gap-4 items-center">
              <img className="w-5" src={gearIcon} alt="" />
              <span>الإعدادات</span>
            </div>
          </button>
          <button className="hover:bg-gray-100 px-4 py-2">
            <div className="flex gap-4 items-center">
              <img className="w-5" src={shattibIcon} alt="" />
              <span>الضمانات</span>
            </div>
          </button> */}
          <hr />
          <button
            className="hover:bg-gray-100 px-4 py-2"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <div className="flex gap-4 items-center">
              <img className="w-5" src={redLogoutIcon} alt="" />
              <span className="text-red-500">تسجيل الخروج</span>
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default NavBarAccountDropDown;
