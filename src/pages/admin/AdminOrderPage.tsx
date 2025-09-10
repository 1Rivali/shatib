import { useEffect, useState } from "react";
import {
  AccentText,
  databaseIcon,
  downArrowIcon,
  drawerIcon,
  emailIcon,
  MainPadding,
  OrderItem,
  phoneIcon,
  truckIcon,
  useApi,
  useParams,
} from "../..";

import { Order } from "../../models/Order";

const AdminOrderPage = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useApi<Order>(`Orders/${id}`, "GET", true);
  const { patchData } = useApi(`Orders/${id}`, "PATCH", true);

  // Local state for managing dropdown and the selected status
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  // Effect to update the selected status when the data is loaded
  useEffect(() => {
    if (data) {
      setSelectedStatus(data.status); // Set the status from the API response
    }
  }, [data]); // This will run when `data` changes

  // Function to handle status change
  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    patchData({ orderId: id, newStatus: newStatus }); // Send the status update to the API
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Determine the background color for each status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-yellow-100";
      case "Rejected":
        return "bg-red-100";
      case "Pending":
        return "bg-orange-100";
      case "Shipped":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <main>
      <MainPadding>
        {isLoading ? (
          <span>جاري التحميل...</span>
        ) : error ? (
          <span>حدث خطأ!</span>
        ) : data ? (
          <>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold">الطلب #{data.id}</h1>
              <div className="relative">
                {/* Dropdown Button with downArrowIcon */}
                <button
                  className={`py-1 px-3 rounded-full max-w-32 max-h-fit text-center ${getStatusColor(
                    selectedStatus
                  )} flex gap-2 items-center justify-between`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                >
                  <span>
                    {selectedStatus === "Accepted" && "مقبول"}
                    {selectedStatus === "Rejected" && "مرفوض"}
                    {selectedStatus === "Pending" && "قيد المعالجة"}
                    {selectedStatus === "Shipped" && "مكتمل"}
                  </span>
                  <img
                    src={downArrowIcon}
                    alt="Dropdown"
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-0 right-0 mt-8 w-32 bg-white shadow-md rounded-lg">
                    <ul className="text-sm">
                      {["Accepted", "Rejected", "Pending", "Shipped"].map(
                        (status) => (
                          <li
                            key={status}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleStatusChange(status)}
                          >
                            {status === "Accepted" && "قبول"}
                            {status === "Rejected" && "رفض"}
                            {status === "Pending" && "قيد المعالجة"}
                            {status === "Shipped" && "مكتمل"}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4" />

            <section className="flex flex-wrap items-center gap-8 border-b-2 w-fit p-4">
              <div className="flex items-center gap-4">
                <img src={drawerIcon} alt="" />
                <span className="text-gray-400 font-bold">تاريخ الإنشاء</span>
                <span>{data.dateOfOrder.substring(0, 10)}</span>
              </div>
              <div className="flex items-center gap-4">
                <img src={truckIcon} alt="" />
                <span className="text-gray-400 font-bold">تاريخ التوصيل</span>
                <span>{data.dateOfArrival || "غير محدد"}</span>
              </div>
              <div className="flex items-center gap-4">
                <img src={databaseIcon} alt="" />
                <span className="text-gray-400 font-bold">السعر الكلي</span>
                <AccentText>{data.totalPrice} ريال</AccentText>
              </div>
              <div className="flex items-center gap-4">
                <img src={phoneIcon} alt="" />
                <span className="text-gray-400 font-bold">رقم الهاتف</span>
                <AccentText>{data.phoneNumber} </AccentText>
              </div>
              <div className="flex items-center gap-4">
                <img src={emailIcon} alt="" />
                <span className="text-gray-400 font-bold">
                  البريد الالكتروني
                </span>
                <AccentText>{data.email} </AccentText>
              </div>
            </section>

            <section>
              <h1 className="text-2xl font-bold my-8">المنتجات</h1>
              {data.orderItems === null
                ? null
                : data.orderItems.map((item, index) =>
                    item ? (
                      <OrderItem
                        key={index}
                        image={item.productMainImage}
                        index={index}
                        name={item.productName}
                        quantity={item.quantitiy}
                        price={item.totalPriceForThisProduct}
                        withInstallation={item.withInstallation!}
                      />
                    ) : null
                  )}
            </section>
          </>
        ) : null}
      </MainPadding>
    </main>
  );
};

export default AdminOrderPage;
