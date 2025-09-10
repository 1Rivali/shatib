import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en"); // Default to current language

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    localStorage.setItem("lang", newLanguage);
    i18n.changeLanguage(newLanguage); // Update language
    document.body.dir = newLanguage === "en" ? "ltr" : "rtl"; // Adjust text direction
    setLanguage(newLanguage); // Update state
    window.location.reload();
  };

  return (
    <span
      onClick={toggleLanguage}
      style={{ cursor: "pointer", padding: "5px" }}
    >
      {language.toUpperCase()}
    </span>
  );
};

export default LanguageSwitcher;
