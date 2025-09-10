import { toast } from "react-toastify";
import {
  AccentText,
  addToBoxBlackIcon,
  addToCartIcon,
  ButtonGold,
  leftArrowIcon,
  QuantityControls,
  shattibIcon,
  TitleNumber,
  useEffect,
  useState,
} from "..";
import { useLoginModal } from "../hooks/useLoginModal";
import { useRkhamCustomMeasure } from "../hooks/useRkhamCustomMeasure";
import { CartItem } from "../models/CartItem";
import { Color, Measurement, Product } from "../models/Product";
import { STORAGE_URL } from "../assets/const";

interface Props {
  data?: Product;
}

const ProductDetailsCard = ({ data }: Props) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  const { setIsShownLoginModal } = useLoginModal();
  const [quantity, setQuantity] = useState(1); // Track quantity
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const { setIsShownRkahmCustomMeasureModal } = useRkhamCustomMeasure();

  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    data?.colors[0] || null
  );
  const [isMeasurementDropdownOpen, setIsMeasurementColorDropdownOpen] =
    useState(false);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<Measurement | null>(data?.measurements[0] || null);

  // FOR TESTING
  // const colorOptions: Color[] = [
  //   { id: 0, price: 2, imagePath: "", hexCode: "#FF0000" },
  //   { id: 0, price: 2, imagePath: "", hexCode: "#00FF00" },
  //   { id: 0, price: 2, imagePath: "", hexCode: "#0000FF" },
  // ];
  // const measurementOptions: Measurement[] = [
  //   { id: 0, name: "3x3", price: 20 },
  //   { id: 0, name: "6x6", price: 20 },
  //   { id: 0, name: "9x9", price: 20 },
  // ];

  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  useEffect(() => {
    const productInCart = storedCart.find(
      (item: CartItem) => item.productId === data?.id
    );
    if (productInCart) {
      setQuantity(productInCart.quantity);
    }
  }, [storedCart, data]);

  // const [active, setActive] = useState(false);
  const handleRequestSample = () => {
    const existingSamples = JSON.parse(
      localStorage.getItem("samplesCart") || "[]"
    );

    if (data) {
      // Check if the product already exists in the samples cart
      const productInSamplesCart = existingSamples.find(
        (item: CartItem) => item.productId === data.id
      );

      if (productInSamplesCart) {
        // If the product already exists, replace its quantity with the new one
        productInSamplesCart.quantity = quantity;
      } else {
        // If the product is not in the samples cart, add it with only necessary data
        existingSamples.push({
          productId: data.id,
          name: data.name,
          price: data.price,
          quantity: quantity,
          image: data.images[0].imagePath,
        });
      }

      // Save the updated samples cart to localStorage
      localStorage.setItem("samplesCart", JSON.stringify(existingSamples));
      toast.success("تمت الإضافة إلى العينات بنجاح", {
        theme: "colored",
        style: { backgroundColor: "#c18a33" },
        icon: () => <img src={shattibIcon} />,
      });
    }
  };

  // Add product to cart in localStorage
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (data) {
      // Check if the product already exists in the cart
      const productInCart = existingCart.find(
        (item: CartItem) => item.productId === data.id
      );

      if (productInCart) {
        // If the product already exists, replace its quantity with the new one
        productInCart.quantity = quantity;
        setIncludeInstallation(productInCart.withInstallation || false);
      } else {
        // If the product is not in the cart, add it with only necessary data
        console.log(includeInstallation);
        existingCart.push({
          productId: data.id,
          name: data.name,
          price:
            data.price +
            (selectedColor?.price || 0) +
            (selectedMeasurement?.price || 0),
          image: data.images[0].imagePath,
          quantity: quantity,
          withInstallation: includeInstallation,
          colorId: selectedColor?.id,
          measurementId: selectedMeasurement?.id,
        });
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
      toast.success("تمت الإضافة إلى السلة بنجاح", {
        theme: "colored",
        style: { backgroundColor: "#c18a33" },
        icon: () => <img src={shattibIcon} />,
      });
    }
  };
  // const handleAddToFavorites = () => {
  //   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  //   const existingProductIndex = favorites.findIndex(
  //     (item: { productId: number }) => item.productId === data?.id
  //   );

  //   if (existingProductIndex === -1) {
  //     favorites.push({
  //       productId: data?.id,
  //       name: data?.name,
  //       price: data?.price,
  //       image: data?.images[0].imagePath,
  //     });
  //     localStorage.setItem("favorites", JSON.stringify(favorites));
  //   }
  // };

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [price, setPrice] = useState<number>(data!.price);
  // TODO DELETE
  // const temp = [1, 2, 3, 4, 5];

  if (data) {
    return (
      <>
        {/* MAX-LG */}
        <div className="max-lg:hidden flex justify-between rounded-2xl w-5/6 bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* Right section */}
          <section className="flex flex-col justify-between items-start gap-6 rounded-2xl w-3/4 m-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
              <h2 className="text-lg text-gray-600">{data.brand}</h2>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <AccentText>
                {price +
                  (selectedColor?.price || 0) +
                  (selectedMeasurement?.price || 0)}{" "}
                ريال
              </AccentText>
            </div>
            <hr className="w-full border-gray-200" />
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-stretch gap-6">
                <div className="w-full flex flex-col items-center text-nowrap py-6">
                  <span className="text-xl font-bold mb-4 text-gray-800">
                    اللون
                  </span>
                  <div className="relative">
                    <div
                      onClick={() =>
                        setIsColorDropdownOpen(!isColorDropdownOpen)
                      }
                      className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors duration-200 shadow-sm hover:shadow-md min-w-[140px]"
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{
                          backgroundColor:
                            selectedColor?.hexCode ||
                            data.colors[0]?.hexCode ||
                            "#ccc",
                        }}
                      />
                      <span className="text-gray-700 font-medium">
                        {selectedColor ? "تم الاختيار" : "اختر اللون"}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          isColorDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {isColorDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2 min-w-[140px]">
                        {data.colors.map((color) => (
                          <div
                            key={color.hexCode}
                            onClick={() => {
                              setSelectedColor(color);
                              setIsColorDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                          >
                            <div
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color.hexCode }}
                            />
                            <span className="text-sm text-gray-700">اللون</span>
                            {selectedColor?.hexCode === color.hexCode && (
                              <svg
                                className="w-4 h-4 text-green-500 ml-auto"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full flex flex-col items-center text-nowrap py-6">
                    <span className="text-xl font-bold mb-4 text-gray-800">
                      القياس
                    </span>
                    <div className="relative">
                      <div
                        onClick={() =>
                          setIsMeasurementColorDropdownOpen(
                            !isMeasurementDropdownOpen
                          )
                        }
                        className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors duration-200 shadow-sm hover:shadow-md min-w-[140px]"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">
                            📏
                          </span>
                        </div>
                        <span className="text-gray-700 font-medium">
                          {selectedMeasurement?.name ||
                            data?.measurements[0]?.name ||
                            "اختر القياس"}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            isMeasurementDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {isMeasurementDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2 min-w-[140px]">
                          {data.measurements.map((measurement) => (
                            <div
                              key={measurement.name}
                              onClick={() => {
                                setSelectedMeasurement(measurement);
                                setIsMeasurementColorDropdownOpen(false);
                              }}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <span className="text-blue-600 text-xs">
                                  📏
                                </span>
                              </div>
                              <span className="text-sm text-gray-700">
                                {measurement.name}
                              </span>
                              {selectedMeasurement?.name ===
                                measurement.name && (
                                <svg
                                  className="w-4 h-4 text-green-500 ml-auto"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="w-full">
                  <TitleNumber column subTitle={data.measurementUnit}>
                    وحدة القياس
                  </TitleNumber>
                </div> */}
                <div className="w-full">
                  <TitleNumber column subTitle={data.manufacturingCountry}>
                    بلد التصنيع
                  </TitleNumber>
                </div>
              </div>
            </div>

            <hr className="w-full border-gray-200" />

            {userType === "Client" && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    الكمية
                  </span>
                  <QuantityControls
                    quantity={quantity}
                    onChange={setQuantity}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => {
                      console.log("checked", e.target.checked);
                      if (e.target.checked) {
                        setIncludeInstallation(true);
                        setPrice(data.price + data.installationTeam);
                      } else {
                        setIncludeInstallation(false);
                        setPrice((prev) => prev - data.installationTeam);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-700 font-medium">
                    طلب أعمال التركيب (+{data.installationTeam} ر.س)
                  </label>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col gap-4">
              {userType === "Business" ? null : data.categoryId === 1 ? (
                <div
                  onClick={() => {
                    if (!token) {
                      setIsShownLoginModal(true);
                      return;
                    }
                    setIsShownRkahmCustomMeasureModal(true);
                  }}
                  className="w-full flex items-center justify-center cursor-pointer"
                >
                  <ButtonGold>طلب قياس مخصص</ButtonGold>
                </div>
              ) : (
                <ButtonGold
                  onClick={
                    token ? handleAddToCart : () => setIsShownLoginModal(true)
                  }
                  className="w-full"
                >
                  <div className="flex justify-center gap-2">
                    <img src={addToCartIcon} alt="" />
                    <span>أضف إلى السلة</span>
                  </div>
                </ButtonGold>
              )}

              {userType === "Business" ? null : (
                <button
                  onClick={
                    token
                      ? handleRequestSample
                      : () => setIsShownLoginModal(true)
                  }
                  className="w-full rounded-xl border-2 border-gray-300 py-3 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-center gap-2 text-gray-700 font-medium">
                    <img src={addToBoxBlackIcon} alt="" />
                    <span>طلب عينة</span>
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* Left section */}
          <section className="flex flex-col gap-6 rounded-xl w-full m-8">
            <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
              <img
                className="w-full h-full object-contain"
                src={`${STORAGE_URL}${data.images[activeImageIdx].imagePath}`}
                alt=""
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-xl overflow-hidden shadow-md bg-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    activeImageIdx === index
                      ? "border-2 border-primary ring-2 ring-primary/20"
                      : "border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setActiveImageIdx(index);
                  }}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={`${STORAGE_URL}${image.imagePath}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* LG-MD-SM */}
        <div className="lg:hidden flex flex-col rounded-2xl w-full bg-white shadow-xl border border-gray-200 overflow-hidden">
          {/* Right section */}
          <section className="flex flex-col justify-between items-center gap-6 rounded-2xl w-full p-6">
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
              <h2 className="text-lg text-gray-600">{data.brand}</h2>
            </div>

            <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 w-full">
              <AccentText>{price} ريال</AccentText>
            </div>

            <hr className="w-full border-gray-200" />

            <section className="flex flex-col gap-4 mb-4 rounded-xl w-full">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
                <img
                  className="w-full h-full object-contain"
                  src={`${STORAGE_URL}${data.images[activeImageIdx].imagePath}`}
                  alt=""
                />
                {data.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 w-10 h-10 top-[50%] bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
                      onClick={() => {
                        if (activeImageIdx === data.images.length - 1) {
                          setActiveImageIdx(0);
                        } else {
                          setActiveImageIdx((prev) => (prev += 1));
                        }
                      }}
                    >
                      <img
                        src={leftArrowIcon}
                        className="justify-self-center"
                        alt=""
                      />
                    </button>
                    <button
                      className="absolute right-2 top-[50%] w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
                      onClick={() => {
                        if (activeImageIdx === 0) {
                          setActiveImageIdx(data.images.length - 1);
                        } else {
                          setActiveImageIdx((prev) => (prev -= 1));
                        }
                      }}
                    >
                      <img
                        src={leftArrowIcon}
                        className="rotate-180 justify-self-center"
                      />
                    </button>
                  </>
                )}
              </div>
              {data.images.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {data.images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        activeImageIdx === index
                          ? "border-2 border-primary ring-2 ring-primary/20"
                          : "border border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => {
                        setActiveImageIdx(index);
                      }}
                    >
                      <img
                        className="w-full h-full object-contain"
                        src={`${STORAGE_URL}${image.imagePath}`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <hr className="w-full border-gray-200" />

            <div className="bg-gray-50 rounded-xl p-4 w-full">
              <div className="flex flex-col gap-6 w-full">
                {/* Color and Size Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-lg font-bold mb-3 text-gray-800">
                      اللون
                    </span>
                    <div className="relative w-full max-w-[200px]">
                      <div
                        onClick={() =>
                          setIsColorDropdownOpen(!isColorDropdownOpen)
                        }
                        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors duration-200 shadow-sm hover:shadow-md w-full"
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor:
                              selectedColor?.hexCode ||
                              data.colors[0]?.hexCode ||
                              "#ccc",
                          }}
                        />
                        <span className="text-gray-700 text-sm font-medium">
                          {selectedColor ? "تم الاختيار" : "اختر اللون"}
                        </span>
                        <svg
                          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ml-auto ${
                            isColorDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {isColorDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 w-full">
                          {data.colors.map((color) => (
                            <div
                              key={color.hexCode}
                              onClick={() => {
                                setSelectedColor(color);
                                setIsColorDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                            >
                              <div
                                className="w-4 h-4 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: color.hexCode }}
                              />
                              <span className="text-xs text-gray-700">
                                اللون
                              </span>
                              {selectedColor?.hexCode === color.hexCode && (
                                <svg
                                  className="w-3 h-3 text-green-500 ml-auto"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-lg font-bold mb-3 text-gray-800">
                      القياس
                    </span>
                    <div className="relative w-full max-w-[200px]">
                      <div
                        onClick={() =>
                          setIsMeasurementColorDropdownOpen(
                            !isMeasurementDropdownOpen
                          )
                        }
                        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors duration-200 shadow-sm hover:shadow-md w-full"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">
                            📏
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">
                          {selectedMeasurement?.name ||
                            data?.measurements[0]?.name ||
                            "اختر القياس"}
                        </span>
                        <svg
                          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ml-auto ${
                            isMeasurementDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {isMeasurementDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2 w-full">
                          {data.measurements.map((measurement) => (
                            <div
                              key={measurement.name}
                              onClick={() => {
                                setSelectedMeasurement(measurement);
                                setIsMeasurementColorDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                            >
                              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <span className="text-blue-600 text-xs">
                                  📏
                                </span>
                              </div>
                              <span className="text-xs text-gray-700">
                                {measurement.name}
                              </span>
                              {selectedMeasurement?.id === measurement.id && (
                                <svg
                                  className="w-3 h-3 text-green-500 ml-auto"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Manufacturing Country */}
                <div className="flex justify-center">
                  <TitleNumber column subTitle={data.manufacturingCountry}>
                    بلد التصنيع
                  </TitleNumber>
                </div>
              </div>
            </div>

            <hr className="w-full border-gray-200" />
            {userType === "Client" && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg font-semibold text-gray-800">
                      الكمية
                    </span>
                    <QuantityControls
                      quantity={quantity}
                      onChange={setQuantity}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeInstallation}
                      onChange={(e) => {
                        setPrice(data.price + data.installationTeam);
                        if (e.target.checked) {
                          setIncludeInstallation(true);
                          setPrice(data.price + data.installationTeam);
                        } else {
                          setIncludeInstallation(false);
                          setPrice((prev) => prev - data.installationTeam);
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-700 font-medium">
                      طلب أعمال التركيب (+{data.installationTeam} ر.س)
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col gap-4">
              {data.categoryId === 1 && (
                <div
                  onClick={() => {
                    if (!token) {
                      setIsShownLoginModal(true);
                      return;
                    }
                    setIsShownRkahmCustomMeasureModal(true);
                  }}
                  className="w-full flex items-center justify-center cursor-pointer"
                >
                  <ButtonGold className="w-full">طلب قياس مخصص</ButtonGold>
                </div>
              )}
              {data.categoryId !== 1 && (
                <ButtonGold
                  onClick={
                    token ? handleAddToCart : () => setIsShownLoginModal(true)
                  }
                  className="w-full"
                >
                  <div className="flex justify-center gap-2">
                    <img src={addToCartIcon} alt="" />
                    <span>أضف إلى السلة</span>
                  </div>
                </ButtonGold>
              )}

              <button
                onClick={
                  token ? handleRequestSample : () => setIsShownLoginModal(true)
                }
                className="w-full rounded-xl border-2 border-gray-300 py-3 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-center gap-2 text-gray-700 font-medium">
                  <img src={addToBoxBlackIcon} alt="" />
                  <span>طلب عينة</span>
                </div>
              </button>
            </div>

            {/* <div className="mt-8">
              <h3 className="font-bold">ملاحظات</h3>
              <h3 className="text-gray-500">ملاحظات مرتبطة بالمنتج</h3>
            </div> */}
          </section>
        </div>
      </>
    );
  } else {
    <span>No data</span>;
  }
};

export default ProductDetailsCard;
