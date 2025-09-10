import {
  AccentText,
  downArrowIcon,
  grayCartIcon,
  grayCompanyIcon,
  grayCubeIcon,
  grayPersonIcon,
  StatisticsCard,
  useApi,
  useState,
} from "../..";
import { StatisticsNumber } from "../../models/StatisticsNumber";

const StatisticsPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedYear, setExpandedYear] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState<string>("نوفمبر");
  const [year, setYear] = useState<number>(2024);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setExpanded(false);
  };

  const handleYearChange = (year: number) => {
    setYear(year);
    setExpandedYear(false);
  };

  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const {
    // isLoading: clientsLoading,
    // error: clientsError,
    data: clientsData,
  } = useApi<StatisticsNumber>("Statistics/GetClients", "GET", true);
  const {
    // isLoading: businessesLoading,
    // error: businessesError,
    data: businessesData,
  } = useApi<StatisticsNumber>("Statistics/GetBusinesses", "GET", true);
  const {
    // isLoading: ordersLoading,
    // error: ordersError,
    data: ordersData,
  } = useApi<StatisticsNumber>("Statistics/GetOrders", "GET", true);
  const {
    // isLoading: productsLoading,
    // error: productsError,
    data: productsData,
  } = useApi<StatisticsNumber>("Statistics/GetProducts", "GET", true);
  const {
    // isLoading: profitsLoading,
    // error: profitsError,
    data: profitsData,
  } = useApi<{
    miniProfitsDtos: {
      dateOfOrder: string;
      username: string;
      totalPrice: number;
    }[];
    total: number;
  }>(
    `Statistics/GetProfits?Month=${
      months.indexOf(selectedMonth) + 1
    }&Year=${year}`,
    "GET",
    true
  );

  // TODO DELETE
  // const temp = ["ياسر القحطاني", "سلمان الفرج", "سالم الدوسري", "محمد العويس"];
  return (
    <main className="p-main">
      <AccentText>الإحصائيات</AccentText>
      <h2 className="text-lg font-bold my-4">آخر الإحصائيات</h2>

      <section className="flex gap-4">
        <StatisticsCard
          img={grayCubeIcon}
          title="عدد المنتجات"
          num={productsData?.count || 0}
          color="red"
        />
        <StatisticsCard
          img={grayCartIcon}
          title="عدد الطلبات"
          num={ordersData?.count || 0}
          color="green"
        />
        <StatisticsCard
          img={grayPersonIcon}
          title="عدد الزبائن"
          num={clientsData?.count || 0}
          color="blue"
        />
        <StatisticsCard
          img={grayCompanyIcon}
          title="عدد الشركات"
          num={businessesData?.count || 0}
          color="gold"
        />
      </section>

      <hr className="my-8" />

      <section className="flex">
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">المبيعات الشهرية</h1>
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-gray-100 rounded"
            >
              <div className="flex w-24 gap-2 justify-center">
                <span>{selectedMonth}</span>
                <img className="w-4" src={downArrowIcon} alt="" />
              </div>
            </button>
            <button
              onClick={() => setExpandedYear(!expandedYear)}
              className="bg-gray-100 rounded"
            >
              <div className="flex w-24 gap-2 justify-center">
                <span>{year}</span>
                <img className="w-4" src={downArrowIcon} alt="" />
              </div>
            </button>
            <AccentText>{profitsData?.total || 0} ريال</AccentText>
          </div>
          <img src="/src/assets/imgs/temp/chart.png" alt="" />
        </div>

        {expanded && (
          <div className="absolute mt-20 flex flex-col bg-white rounded shadow-xl">
            {months.map((month) => (
              <button
                onClick={() => handleMonthChange(month)}
                className="hover:bg-gray-100 px-4 py-2"
              >
                <span>{month}</span>
              </button>
            ))}
          </div>
        )}
        {expandedYear && (
          <div className="absolute ms-32 mt-20 flex flex-col bg-white rounded shadow-xl">
            {[2024, 2025, 2026, 2027, 2028].map((year) => (
              <button
                onClick={() => handleYearChange(year)}
                className="hover:bg-gray-100 px-4 py-2"
              >
                <span>{year}</span>
              </button>
            ))}
          </div>
        )}

        {/*   <div className="w-1/3">
          <div className="flex justify-between w-full mb-4">
            <h1 className="text-2xl font-bold">المشتركين الجدد</h1>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-nowrap">عرض الكل</h2>
              <img src={doubleLeftArrowIcon} alt="" />
            </div>
          </div>

          <div className="flex flex-col w-full bg-gray-100 py-8 px-4 rounded-xl shadow-lg">
            <div className="flex gap-4 mx-auto">
              <button className="bg-gray-700 text-white w-32 rounded-full py-2">
                أفراد
              </button>
              <button className="bg-gray-200 w-32 rounded-full py-2">
                شركات
              </button>
            </div>
          
            {temp.map((name) => (
              <div className="flex items-center gap-4 px-12 pt-4">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-xl">{name}</span>
              </div>
            ))}
          </div>
        </div>
          */}
      </section>
    </main>
  );
};

export default StatisticsPage;
