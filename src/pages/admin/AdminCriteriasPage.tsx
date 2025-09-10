import { AccentText, bluePenIcon, Link, RoundButton, useApi } from "../..";

import "../../App.css";
import { Cirteria } from "../../models/Criteria";
import { useState } from "react";

const AdminCriteriasPage = () => {
  // Initializing state for the selected filter
  const [statusFilter, setStatusFilter] = useState<string>(""); // Empty means "All"

  const { isLoading, error, data } = useApi<Cirteria[]>(
    `Criteria/GetAll${statusFilter ? `?status=${statusFilter}` : ""}`,
    "GET",
    true
  );

  // Handle click on filter buttons
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <main className="p-main">
      <AccentText>الكراسات</AccentText>
      <div className="w-full flex justify-center py-8">
        <RoundButton
          active={statusFilter === ""}
          onClick={() => handleFilterChange("")}
        >
          الكل
        </RoundButton>
        <RoundButton
          active={statusFilter === "Pending"}
          onClick={() => handleFilterChange("Pending")}
        >
          معلقة
        </RoundButton>
        <RoundButton
          active={statusFilter === "Accepted"}
          onClick={() => handleFilterChange("Accepted")}
        >
          مقبولة
        </RoundButton>
        <RoundButton
          active={statusFilter === "Rejected"}
          onClick={() => handleFilterChange("Rejected")}
        >
          مرفوضة
        </RoundButton>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>رقم الكراسة</th>
            <th>عنوان الكراسة</th>
            <th>اسم الزبون</th>
            <th>رقم الهاتف</th>
            <th>تاريخ الإرسال</th>
            <th>الحالة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <span>جاري التحميل...</span>
          ) : error ? (
            <span>حدث خطأ!</span>
          ) : data ? (
            data.map((criteria, index) => (
              <tr key={index}>
                <td>#{criteria.id}</td>
                <td>{criteria.title}</td>
                <td>
                  {criteria.displayName ? criteria.displayName : "لايوجد"}
                </td>
                <td dir="ltr">{criteria.phoneNumber}</td>
                <td>{criteria.dateOfCreation.substring(0, 10)}</td>
                <td>
                  {criteria.status === "Pending" ? (
                    <div className="flex gap-4 w-32 mx-auto justify-center rounded-full bg-yellow-100 py-1">
                      <span>قيد المعالجة</span>
                    </div>
                  ) : criteria.status === "Rejected" ? (
                    <div className="flex gap-4 w-32 mx-auto justify-center rounded-full bg-red-100 py-1">
                      <span>مرفوضة</span>
                    </div>
                  ) : criteria.status === "Accepted" ? (
                    <div className="flex gap-4 w-32 mx-auto justify-center rounded-full bg-green-100 py-1">
                      <span>مقبولة</span>
                    </div>
                  ) : null}
                </td>
                <td>
                  <div className="flex gap-4 w-full justify-center">
                    <Link to={`${criteria.id}`}>
                      <img src={bluePenIcon} alt="" />
                    </Link>
                    {/* <button>
                      <img src={redTrashIcon} alt="" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </main>
  );
};

export default AdminCriteriasPage;
