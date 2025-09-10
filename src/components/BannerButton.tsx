import { useTranslation } from "react-i18next";
import { ButtonGold, expandCoverImg03, useEngineerRequest } from "..";
import { useLoginModal } from "../hooks/useLoginModal";

const BannerButton = () => {
  const token = localStorage.getItem("accessToken");
  const { setIsShownLoginModal } = useLoginModal();
  const { setIsShownEngineerRequestModal } = useEngineerRequest();

  const handleAuthorizedNavigationButton = () => {
    if (token) {
      setIsShownEngineerRequestModal(true);
      return;
    }
    setIsShownLoginModal(true);
  };
  const { t } = useTranslation();
  const coverImage =
    expandCoverImg03;
  return (
    <div className="relative grid rounded-3xl overflow-hidden w-2/3 h-2/3 max-lg:h-5/6 max-lg:w-11/12">
      {/* <div className="absolute right-4 w-32 h-28 bg-black bg-opacity-25 rounded-bl rounded-br z-20 ">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-2xl">{t("expandTxt")}</h1>
          <h1 className="text-2xl">{t("spaceTxt")}</h1>
        </div>
      </div> */}
      <div className="absolute right-0 z-10 flex flex-col items-center justify-center rounded-3xl h-full w-full bg-opacity-35 bg-black">
        <div className="w-5/6 text-white text-4xl font-bold transition-all duration-700 max-lg:text-lg">
          <h1>{t("engineerRequestTxt")}</h1>
          {/* <h1>
            "احصل على استشارة احترافية من مهندسين ذوي خبرة لرفع مساحة مشاريعك .
          </h1>
          <h1>اطلب استشارتك الآن وحقق رؤيتك بدعم من الخبراء."</h1> */}
        </div>
        <br />
        <br />
        <div
          onClick={() => handleAuthorizedNavigationButton()}
          className="flex w-44 h-20 shadow"
        >
          <ButtonGold>{t("engineerRequestButtonTxt")}</ButtonGold>
        </div>
      </div>
      <img
        className="w-full h-full object-cover absolute opacity-100 blur-sm"
        src={coverImage}
        alt=""
      />
    </div>
  );
};

export default BannerButton;
