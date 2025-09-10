import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLanguage = localStorage.getItem("lang") || "ar";
i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "ar",
  supportedLngs: ["ar", "en"],
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        homePageTxt: "Home Page",
        categoriesTxt: "Categories",
        allCategoriesTxt: "All Categories",
        subCategoriesTxt: "Sub Categories",
        searchInProductsTxt: "Search Products",
        criteriaTxt: "Criteria",
        cartTxt: "Cart",
        favoriteTxt: "Favorite",
        contactUsTxt: "Contact",
        homePageMainSlideShowDescriptionTxt:
          "A comprehensive platform for viewing and ordering all final cladding materials",
        engineerRequestTxt: `The surveying service provides you with accurate measurements of your project, which will be recorded
            Sizes on your page, allowing you to easily order any product with available sizes
            required
          The surveying service provides you with accurate measurements of your project, which will be recorded
            Sizes on your page, allowing you to easily order any product with available sizes
            required`,
        engineerRequestButtonTxt: "Request to raise a survey",
        expandTxt: "Expand",
        spaceTxt: "Space",
      },
    },
    ar: {
      translation: {
        homePageTxt: "الصفحة الرئيسية",
        categoriesTxt: "التصنيفات",
        allCategoriesTxt: "كل التصنيفات",
        subCategoriesTxt: "التصنيفات الفرعية",
        searchInProductsTxt: "البحث عن المنتجات",
        criteriaTxt: "كراسات الشروط",
        cartTxt: "السلة",
        favoriteTxt: "المفضلة",
        contactUsTxt: "تواصل معنا",
        homePageMainSlideShowDescriptionTxt:
          "منصة شاملة لمعاينة وطلب كافة مواد التشطيب النهائي",
        engineerRequestTxt: `خدمة الرفع المساحي تقدم لك قياسات دقيقة لمشروعك حيث سيتم تسجيل
            المقاسات في صفحتك، مما يتيح لك طلب أي منتج بسهولة مع توفر المقاسات
            المطلوبة
          `,
        engineerRequestButtonTxt: "طلب رفع مساحي",
        expandTxt: "توسيع",
        spaceTxt: "مساحي",
      },
    },
  },
});

export default i18n;
