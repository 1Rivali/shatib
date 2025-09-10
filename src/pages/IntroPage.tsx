import {
  firstPageBanner,
  shattibTextDecoration,
  RegisterCompanyCard,
  RegisterPersonCard,
  Link,
} from "..";

const IntroPage = () => {
  localStorage.clear();
  return (
    <>
      <div className="w-full flex justify-center">
        <div>
          <img className="w-screen" src={firstPageBanner} alt="" />
        </div>
        {/* <div className="absolute w-full flex flex-row justify-between items-start p-8">
          // <img src={shattibLogoRow} alt="" /> 
          <div className="flex items-center">
            <span>EN</span>
            <img className="ps-2" src={earthIcon} alt="" />
          </div>
        </div> */}
      </div>
      <div className="flex flex-col items-start px-24 max-lg:px-8 max-lg:mt-12">
        <img className="pt-2" src={shattibTextDecoration} alt="" />
        <span className="pt-2 text-2xl">
          منصة شاملة لطلب مواد التشطيب بسهولة وسرعة
        </span>
        <span className="pt-8 pe-16 font-bold">اختر نوع الحساب</span>
        <div className="flex place-self-center justify-evenly w-2/3 pt-8 max-lg:flex-col max-lg:h-svh max-lg:items-center max-lg:gap-16 max-lg:mt-12">
          <Link to={"/home"}>
            <RegisterPersonCard />
          </Link>
          <Link to={"/conditions"}>
            <RegisterCompanyCard />
          </Link>
        </div>
      </div>
    </>
  );
};

export default IntroPage;
