import {
  facebookIcon,
  instagramIcon,
  linkedinIcon,
  shattibLogoCol,
  whatsappIcon,
} from "..";

const Footer = () => {
  return (
    <footer className="flex items-center w-full py-32 bg-slate-800 text-white max-lg:flex-col max-lg:gap-8">
      <div className="w-1/3 flex flex-col items-center gap-4">
        <img className="w-64" src={shattibLogoCol} alt="" />
        <div className="flex items-center gap-1">
          {/* <img className="text-center h-[21px] w-[21px]" src={xIcon} alt="" /> */}
          <img src={facebookIcon} alt="" />
          <img src={instagramIcon} alt="" />
          <img src={linkedinIcon} alt="" />
          {/* <img src={telegramIcon} alt="" /> */}
          <img src={whatsappIcon} alt="" />
        </div>
      </div>
      <div className="w-2/3 flex gap-8 h-1/2 max-lg:flex-col max-lg:w-full">
        <div className="w-1/2 px-4 max-lg:w-full">
          <h3>
            <b>من نحن؟</b>
          </h3>
          <br />
          <p>
            تأسست شركة شطّب لتلبية احتياج العملاء في سوق مواد التشطيب. أدركنا أن
            العميل يواجه صعوبة في العثور على المنتجات المناسبة بأسعار تنافسية،
            ويعانون من التنقلات بين المتاجر.
            <br />
            <br />
            وبدانا في تحسين هذه العملية من خلال منصتنا الشاملة، التي ستوفر تجربة
            شراء سهلة وموثوقة، حيث يمكن للعميل الاطلاع على جميع مواد التشطيب
            وطلب العينات بسهولة. نحن نعمل على تحسين تجربة مستهلكي مواد التشطيب
            عبر حلول تقنية مبتكرة، مما يجعل عملية الشراء أكثر سلاسة وبساطه.
          </p>
        </div>
        <div className="w-1/2 px-4 max-lg:w-full">
          <h3>
            <b>رؤيتنا؟</b>
          </h3>
          <br />
          <p>
            تقديم حلول تعتمد على الذكاء الاصطناعي لدعم متخذي القرار ومساعدة
            الشركات في تحسين كفاءة عملياتهم واتخاذ قرارات مدروسة بناءً على
            بيانات دقيقة.
          </p>
        </div>
        {/* <img src={paragraphPlaceholder} alt="" /> */}
        {/* <img src={paragraphPlaceholder} alt="" /> */}
        {/* <img src={paragraphPlaceholder} alt="" /> */}
      </div>
    </footer>
  );
};

export default Footer;
