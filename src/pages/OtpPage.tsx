import { ButtonGold, Navigate, registerBanner, useApi } from "..";
import { useRef } from "react";

const OtpPage = () => {
  const {
    postData,
    //  isLoading, error,
    data,
  } = useApi("Account/VerifyAccount", "POST");

  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = localStorage.getItem("phoneNumber");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": "" },
        body: JSON.stringify({ destinationPhoneNumber: phoneNumber }),
      };

      await fetch("http://www.ouzon.somee.com/api/Accounts/OTP/sms", requestOptions);
    } catch (error) {
      console.log("OTP Error:", error);
    }
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Join all OTP digits into one string
    const otp = inputRefs.current.map((input) => input?.value).join("");

    postData({ otpCode: otp });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // Ensure only numbers are allowed
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    // If there is a valid digit, move focus to the next field and select the text
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
      // Select the text in the next input
      inputRefs.current[index + 1]?.setSelectionRange(0, 1);
    }
  };

  return (
    <>
      {data ? <Navigate to={"/login"} replace /> : null}
      <form onSubmit={handleSubmit}>
        <div className="flex max-lg:flex-col justify-center items-center min-h-screen max-lg:p-8">
          <div className="w-1/4 flex flex-col justify-center max-lg:w-full">
            <span className="text-yellow-600 text-2xl pb-4">
              أهلاً بك في شطّب!
            </span>
            <span className="text-2xl">تأكيد الحساب</span>

            <div
              dir="ltr"
              className="my-12 flex gap-2 max-sm:gap-0.5 self-center"
            >
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)} // Store input references
                  dir="ltr"
                  className="text-center border-2 border-black h-16 max-sm:h-14 w-12 max-sm:w-10 rounded-xl focus:border-primary focus:outline-none focus:border-4 text-2xl"
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength={1}
                />
              ))}
            </div>

            <div className="w-64 self-center">
              <ButtonGold onClick={() => { }}>تأكيد</ButtonGold>
            </div>

            <span className="mt-6">
              لم يصلك رمز التحقق؟{" "}
              <button onClick={handleSendSms}>
                <span className="text-yellow-600 underline">إعادة إرسال</span>
              </button>
            </span>
          </div>

          <div className="px-8 max-lg:py-4"></div>

          <div>
            <img src={registerBanner} alt="" />
          </div>
        </div>
      </form>
    </>
  );
};

export default OtpPage;
