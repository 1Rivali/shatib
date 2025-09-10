import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  closeCircleIcon,
  goldEngineerIcon,
  shattibIcon,
  TextInput,
  useApi,
  useEngineerRequest,
} from "..";

const EngineerRequestCardModal = () => {
  const { isShownEngineerRequestModal, setIsShownEngineerRequestModal } =
    useEngineerRequest();

  const [formData, setFormData] = useState({
    phoneNumber: "",

    projectCategory: "",
    details: "",
  });

  const { postData, isLoading, error } = useApi(
    "Consultations",
    "POST",
    true,
    true
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      postData(formData).then(() => {
        toast.success("تم إرسال طلبك بنجاح", {
          theme: "colored",
          style: { backgroundColor: "#c18a33" },
          icon: () => <img src={shattibIcon} />,
        });

        setIsShownEngineerRequestModal(false);
      });
      if (error) {
        toast.error("حدث خطأ، يرجى المحاولة مرة أخرى.", { theme: "colored" });
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ في الاتصال. الرجاء المحاولة لاحقاً.", {
        theme: "colored",
      });
    } finally {
      setFormData({
        phoneNumber: "",

        projectCategory: "",
        details: "",
      });
    }
  };

  if (isShownEngineerRequestModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return isShownEngineerRequestModal ? (
    <main className="fixed top-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative rounded-2xl bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-4 md:p-8">
        <button
          onClick={() => setIsShownEngineerRequestModal(false)}
          className="absolute top-4 left-4 z-10"
        >
          <img src={closeCircleIcon} alt="Close" />
        </button>
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg md:text-xl font-semibold">طلب رفع مساحة</h1>
          <img className="mt-2" src={goldEngineerIcon} alt="Engineer Icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-full px-2">
                <TextInput
                  blackTitle
                  title="رقم الهاتف"
                  placeholder="رقم الهاتف"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="w-full md:w-1/2 px-2">
                <TextInput
                  blackTitle
                  title="اختصاص المهندس"
                  placeholder="اختصاص المهندس"
                  name="engineerSpecification"
                  value={formData.engineerSpecification}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full px-2">
                <TextInput
                  blackTitle
                  title="نوع المشروع"
                  placeholder="نوع المشروع"
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full px-2 mt-4">
              <TextInput
                big
                blackTitle
                title="تفاصيل الطلب"
                placeholder="تفاصيل ومعلومات إضافية"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full flex justify-center pt-6">
              <Button size="md" type="submit">
                {isLoading ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  ) : null;
};

export default EngineerRequestCardModal;
