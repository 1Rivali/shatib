import {
  ButtonGold,
  ConditionCard,
  Link,
  MainPadding,
  plusCircleOutlineWhiteIcon,
  RoundButton,
  useApi,
  useState,
} from "..";
import { useLoginModal } from "../hooks/useLoginModal";
import { Cirteria } from "../models/Criteria";

const ConditionDocsPage = () => {
  // Track the selected filter (status)
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const token = localStorage.getItem("accessToken");
  const { setIsShownLoginModal } = useLoginModal();
  // Function to handle button click
  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
  };

  // Use the API hook to fetch data with the status filter
  // TODO:: GETMINE
  const { isLoading, error, data } = useApi<Cirteria[]>(
    statusFilter ? `Criteria/mine?status=${statusFilter}` : "Criteria/mine",
    "GET",
    true
  );

  if (!token) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <center className="">
          <ButtonGold onClick={() => setIsShownLoginModal(true)}>
            <div className="text-nowrap flex gap-2 w-max p-2">
              <img src={plusCircleOutlineWhiteIcon} alt="" />
              <span>أضف كراسة</span>
            </div>
          </ButtonGold>
        </center>
      </div>
    );
  }
  // const { isLoading, error, data } = useApi<Cirteria[]>("Criteria/GetAll");
  return (
    <main>
      <MainPadding>
        <section className="flex items-center max-lg:flex-col max-lg:w-full">
          <h1 className="text-nowrap text-2xl font-bold pb-4">كراسات الشروط</h1>
          <div className="grid w-full">
            <div className="flex gap-2 justify-center max-lg:justify-start max-lg:overflow-x-auto max-lg:whitespace-nowrap max-lg:mb-4">
              {/* Buttons for filtering by status */}
              <RoundButton
                active={statusFilter === null}
                onClick={() => handleStatusChange(null)}
              >
                الكل
              </RoundButton>
              <RoundButton
                active={statusFilter === "Pending"}
                onClick={() => handleStatusChange("Pending")}
              >
                معلًقة
              </RoundButton>
              <RoundButton
                active={statusFilter === "Accepted"}
                onClick={() => handleStatusChange("Accepted")}
              >
                مقبولة
              </RoundButton>
              <RoundButton
                active={statusFilter === "Rejected"}
                onClick={() => handleStatusChange("Rejected")}
              >
                مرفوضة
              </RoundButton>
            </div>
          </div>

          <Link to={"new"}>
            <ButtonGold>
              <div className="text-nowrap flex gap-2 w-max p-2">
                <img src={plusCircleOutlineWhiteIcon} alt="" />
                <span>أضف كراسة</span>
              </div>
            </ButtonGold>
            {/* <AccentText>
              <div className="text-nowrap flex gap-2">
                <span className="underline">أضف كراسة جديدة</span>
                <img src={goldLinkIcon} alt="" />
              </div>
            </AccentText> */}
          </Link>
        </section>
        <section className="flex flex-wrap gap-8 my-16 max-lg:justify-center">
          {isLoading ? (
            <span>جاري التحميل...</span>
          ) : error ? (
            <span>حدث خطأ!</span>
          ) : data?.length === 0 ? (
            <span className="h-[30vh] w-full text-2xl text-center flex items-center justify-center font-bold">
              لا يوجد كراسات بعد
            </span>
          ) : data ? (
            data.map((criteria) => (
              <ConditionCard
                key={criteria.id}
                image={criteria.criteriaItems[0].image}
                criteria={criteria}
                status={criteria.status}
              />
            ))
          ) : null}
          {/* <ConditionCard status="مرفوضة" />
          <ConditionCard status="معلًقة" />
          <ConditionCard status="مقبولة" />
          <ConditionCard status="مرفوضة" />
          <ConditionCard status="معلًقة" />
          <ConditionCard status="مقبولة" />
          <ConditionCard status="مرفوضة" />
          <ConditionCard status="معلًقة" /> */}
        </section>
      </MainPadding>
    </main>
  );
};

export default ConditionDocsPage;
