import { AccentText, OrdersTableRow, useApi } from "../..";

import "../../App.css";
import { Order } from "../../models/Order";

const AdminSamplesPage = () => {
  const { isLoading, error, data } = useApi<Order[]>(
    "Orders/Kind?kind=Sample",
    "GET",
    true,
    false
  );

  return (
    <main className="p-main">
      <AccentText>طلبات العينة</AccentText>
      <table className="mt-8 orders-table">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>تاريخ الإنشاء</th>
            <th>السعر الكلي</th>
            <th>حالة الطلب</th>
            <th>تاريخ التنفيذ</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <span>جاري التحميل...</span>
          ) : error ? (
            <span>حدث خطأ!</span>
          ) : data ? (
            data.map((order) => (
              <OrdersTableRow
                id={order.id}
                dateOfArrival={order.dateOfArrival}
                dateOfOrder={order.dateOfOrder}
                orderItems={order.orderItems}
                status={
                  order.status === "Pending"
                    ? "قيد المعالجة"
                    : order.status === "Accepted"
                    ? "مقبول"
                    : order.status === "Rejected"
                    ? "مرفوض"
                    : order.status === "Shipped"
                    ? "مكتمل"
                    : ""
                }
                totalPrice={order.totalPrice}
              />
            ))
          ) : null}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default AdminSamplesPage;
