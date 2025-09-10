import { toast } from "react-toastify";
import {
  ButtonGold,
  closeCircleIcon,
  shattibIcon,
  TextInput,
  UploadFile,
  usePostForm,
  useState,
} from "..";
import { useRkhamCustomMeasure } from "../hooks/useRkhamCustomMeasure";

const RkhamCustomMeasurePopup = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [step, setStep] = useState(1); // Step state for navigation
  const { postData, isLoading, error, data } = usePostForm(
    "SpecifiedMeasurements",
    "POST"
  );
  const { isShownRkahmCustomMeasureModal, setIsShownRkahmCustomMeasureModal } =
    useRkhamCustomMeasure();

  const [image, setImage] = useState<File | null>(null);

  function handleImageChange(image: File) {
    setImage(image);
  }

  const form = new FormData();

  async function handleFormSend() {
    form.append("width", width);
    form.append("height", height);
    form.append("measurementUnit", measurementUnit);
    form.append("details", details);
    form.append("image", image!);
    form.append("Quantity", quantity.toString());

    await postData(form);
    setIsShownRkahmCustomMeasureModal(false);
    toast.success("تم إرسال طلبك بنجاح", {
      theme: "colored",
      style: { backgroundColor: "#c18a33" },
      icon: () => <img src={shattibIcon} />,
    });
  }

  if (isShownRkahmCustomMeasureModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      {data && setIsShownRkahmCustomMeasureModal(false)}
      {isShownRkahmCustomMeasureModal ? (
        <main className="fixed z-50  flex justify-center items-center top-0 w-full h-full bg-black bg-opacity-50">
          <div className="flex flex-col border bg-white w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 h-5/6 rounded-xl p-6 md:p-8 overflow-scroll no-scrollbar">
            {/* Header */}
            <div className="flex w-full justify-between">
              <h1 className="text-xl md:text-2xl font-bold">
                طلب قياس مخصص من الرخام
              </h1>
              <button
                onClick={() => setIsShownRkahmCustomMeasureModal(false)}
                className="p-1 md:p-2"
              >
                <img src={closeCircleIcon} alt="Close" />
              </button>
            </div>

            <hr className="my-2 md:my-4" />

            {/* Step Content */}
            {step === 1 && (
              <>
                <h2 className="font-bold text-lg md:text-xl ">
                  المعلومات الأساسية
                </h2>
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-1/2">
                    <TextInput
                      blackTitle
                      number
                      title="الطول (cm) "
                      placeholder="أدخل الطول"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      blackTitle
                      number
                      title="العرض (cm)"
                      placeholder="أدخل العرض"
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      blackTitle
                      title="الكمية"
                      placeholder="أدخل الكمية"
                      number
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full md:w-36 rounded py-2 px-4 bg-gray-200 text-center"
                  >
                    التالي
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-bold text-lg md:text-xl">تفاصيل إضافية</h2>
                <div className="flex flex-wrap gap-4">
                  <div className="w-full">
                    <TextInput
                      blackTitle
                      title="الوحدة"
                      placeholder="أدخل الوحدة"
                      onChange={(e) => setMeasurementUnit(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      big
                      blackTitle
                      title="تفاصيل أخرى"
                      placeholder="أدخل معلومات وتفاصيل أكثر عن النوعية"
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[50%] h-[100%] max-h-[35%] my-4 self-center">
                  <UploadFile
                    containImg
                    onImageChange={handleImageChange}
                    title="إضافة ملف"
                    subTitle="أضف ملف أو صورة"
                  />
                </div>
                <div className="flex justify-around gap-4 mt-20">
                  <button
                    onClick={() => setStep(1)}
                    className="w-full md:w-36 rounded py-2 px-4 bg-gray-200 text-center"
                  >
                    السابق
                  </button>
                  <div className="w-full md:w-40">
                    <ButtonGold onClick={handleFormSend} disabled={isLoading}>
                      {isLoading
                        ? "جاري الإرسال..."
                        : error
                        ? "إعادة المحاولة!"
                        : "إرسال"}
                    </ButtonGold>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      ) : null}
    </>
  );
};

export default RkhamCustomMeasurePopup;
