import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify components
// Import CSS for Toastify
import {
  Button,
  emailIcon,
  Link,
  lockIcon,
  personIcon,
  phoneIcon,
  registerBanner,
} from "..";
import TextInput from "../components/TextInput";

const RegisterPage = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isShownPasswordTooltip, setIsShownPasswordTooltip] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true); // State to check email validity
  const navigate = useNavigate();

  // const { postData, isLoading, error } = useApi("Accounts/Register", "POST");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: localStorage.getItem("userType") || "Client", // assuming 'Client' as default role
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      updatePasswordStrength(value);
    }

    if (name === "email") {
      validateEmail(value); // Validate email whenever it changes
    }
  };

  const updatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    setPasswordStrength(strength);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const confirmPassword = e.target.value;
    setPasswordCheck(confirmPassword);
    setPasswordsMatch(formData.password === confirmPassword);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email)); // Set emailValid state based on regex test
  };

  const isFormValid = () => {
    const { displayName, email, phoneNumber, password } = formData;
    return (
      displayName &&
      email &&
      phoneNumber.length === 9 && // Ensure exactly 9 digits
      password &&
      password.length >= 8 &&
      password === passwordCheck &&
      emailValid
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Prefix the phone number with +966
      setFormData((prev) => ({
        ...prev,
        phoneNumber: `+966${prev.phoneNumber}`,
      }));
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": "" },
        body: JSON.stringify(formData),
      };

      const res = await fetch(
        "https://www.ouzon.somee.com/api/Accounts/Register",
        requestOptions
      );
      if (res.ok) {
        navigate("/login");
      } else if (res.status === 400) {
        toast.error(
          "البريد الإلكتروني مستخدم من قبل. يرجى استخدام بريد إلكتروني آخر."
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      toast.error(
        "البريد الإلكتروني مستخدم من قبل. يرجى استخدام بريد إلكتروني آخر."
      );
      setIsLoading(false);
    }
    // postData(formData).then(() => {
    //   if (error) {
    // toast.error(
    //   "البريد الإلكتروني مستخدم من قبل. يرجى استخدام بريد إلكتروني آخر.",
    //   {
    //     theme: "colored",
    //   }
    // );
    //     return;
    //   }

    //   navigate("/login");
    // });
  };

  return (
    <>
      {/* {data && !error ? <Navigate to={"/login"} /> : null} */}
      <div className="flex max-lg:flex-col justify-center items-center min-h-screen max-lg:p-8">
        <div className="w-1/4 flex flex-col justify-center max-lg:w-full">
          <span className="text-yellow-600 text-2xl pb-4">
            أهلاً بك في شطّب!
          </span>
          <span className="text-2xl">إنشاء حساب</span>

          <form onSubmit={handleSubmit}>
            <TextInput
              name="displayName"
              title="الاسم"
              icon={personIcon}
              onChange={handleInputChange}
            />
            <TextInput
              name="email"
              title="البريد الالكتروني"
              icon={emailIcon}
              onChange={handleInputChange}
            />
            {!emailValid && (
              <span className="text-red-600 text-sm mt-1">
                البريد الإلكتروني غير صالح
              </span>
            )}
            <TextInput
              name="phoneNumber"
              title="رقم الهاتف"
              isPhoneNumber
              icon={phoneIcon}
              onChange={handleInputChange}
              value={`${formData.phoneNumber}`} // Prefix +966 added dynamically
            />
            {formData.phoneNumber && formData.phoneNumber.length !== 9 && (
              <span className="text-red-600 text-sm mt-1">
                يجب أن يحتوي رقم الهاتف على 9 أرقام
              </span>
            )}

            <div className="relative">
              <TextInput
                name="password"
                password={true}
                title="كلمة المرور"
                icon={lockIcon}
                onChange={handleInputChange}
              />
              <div
                className={`w-full h-2 mt-2 bg-gray-300 rounded ${
                  formData.password ? "block" : "hidden"
                }`}
              >
                <div
                  style={{ width: `${passwordStrength}%` }}
                  className={`h-full rounded ${
                    passwordStrength < 40
                      ? "bg-red-500"
                      : passwordStrength < 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
              </div>
              <div
                className={`text-sm mt-2 ${
                  formData.password ? "block" : "hidden"
                }`}
              >
                <span className="font-semibold">قوة كلمة المرور: </span>
                <span>
                  {passwordStrength < 40
                    ? "ضعيفة - حاول إضافة المزيد من الأحرف والرموز."
                    : passwordStrength < 80
                    ? "متوسطة - أضف أرقامًا أو رموزًا لتحسين القوة."
                    : "كلمة مرور قوية!"}
                </span>
              </div>
              <div
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setIsShownPasswordTooltip(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) {
                    setIsShownPasswordTooltip(false);
                  }
                }}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsShownPasswordTooltip(!isShownPasswordTooltip);
                  }
                }}
                className="absolute top-3 right-20 w-4 h-4 rounded-full border border-black select-none flex items-center justify-center cursor-pointer text-xs"
              >
                i
              </div>
              <div
                className={`absolute right-16 top-9 bg-gray-100 rounded p-2 ${
                  isShownPasswordTooltip ? "" : "hidden"
                }`}
              >
                <p className="text-sm text-gray-600">
                  استخدم 8 أحرف على الأقل، مع الأحرف الكبيرة والصغيرة والأرقام
                  والرموز لكلمة مرور قوية.
                </p>
              </div>
            </div>

            <TextInput
              name="passwordConfirm"
              password={true}
              title="تأكيد كلمة المرور"
              icon={lockIcon}
              onChange={handlePasswordCheckChange}
            />
            {!passwordsMatch && (
              <span className="text-red-600 text-sm mt-1">
                كلمات المرور غير متطابقة
              </span>
            )}

            <div className="w-full mt-5">
              <Button type="submit" disabeld={!isFormValid()}>
                {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
              </Button>
            </div>
          </form>

          <div className="flex flex-col items-center">
            <span className="pt-4">
              لديك حساب؟{" "}
              <Link to={"/login"}>
                <button>
                  <span className="text-yellow-600 underline">
                    تسجيل الدخول
                  </span>
                </button>
              </Link>
            </span>
          </div>
        </div>
        <div className="px-8 max-lg:py-4"></div>
        <div>
          <img src={registerBanner} alt="" />
        </div>
      </div>

      {/* React Toastify Container for Toasts */}
    </>
  );
};

export default RegisterPage;
