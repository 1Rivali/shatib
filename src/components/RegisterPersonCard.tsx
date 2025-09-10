import { bluePerson, RegisterCard } from "..";

const RegisterPersonCard = () => {
  return (
    <div
      onClick={() => {
        localStorage.setItem("userType", "Client");
      }}
    >
      <RegisterCard
        image={bluePerson}
        title="أفراد"
        desc="خدمات الأفراد لتصفح وشراء مواد التشطيب"
        footer="دخول الأفراد"
        color="sky"
      />
    </div>
  );
};

export default RegisterPersonCard;
