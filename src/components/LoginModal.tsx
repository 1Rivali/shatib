import { ButtonGold, Link } from "..";
import { useLoginModal } from "../hooks/useLoginModal";

const LoginModal = () => {
  const { isShownLoginModal, setIsShownLoginModal } = useLoginModal();

  if (isShownLoginModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return isShownLoginModal ? (
    <div className="fixed z-50 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
      <div className="bg-white rounded-xl flex flex-col items-center justify-center gap-6 text-center w-full max-w-lg mx-4 md:w-1/2 lg:w-1/3 p-6">
        <h1 className="text-lg md:text-2xl">
          يرجى تسجيل الدخول للوصول لهذه الصفحة
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link to={"/login"}>
            <div className="w-full md:w-40">
              <ButtonGold>تسجيل دخول</ButtonGold>
            </div>
          </Link>
          <button
            className="rounded bg-gray-200 w-full md:w-20 py-1 px-3"
            onClick={() => setIsShownLoginModal(false)}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
