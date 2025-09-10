import { RegisterCard, yellowBuilding } from "..";

const RegisterCompanyCard = () => {
  return (
    <div
      onClick={() => {
        localStorage.setItem("userType", "Business");
      }}
    >
      <RegisterCard
        image={yellowBuilding}
        title="شركات"
        desc="خدمات الشركات لعرض وشراء مواد التشطيب"
        footer="دخول الشركات"
        color="amber"
      />
    </div>
  );
};

export default RegisterCompanyCard;
