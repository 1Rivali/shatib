import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import AdminSidePanel from "../components/AdminSidePanel";
import { ConfirmDeleteProvider } from "../context/ConfirmDeleteContext";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { LoginModalProvider } from "../context/LoginModalContext";
import LoginModal from "../components/LoginModal";
import { RkahmCustomMeasureProvider } from "../context/RkhamCustomMeasure";

const AdminLayout = () => {
  return (
    <RkahmCustomMeasureProvider>
      <LoginModalProvider>
        <ConfirmDeleteProvider>
          <ConfirmDeleteModal />
          <AdminNavBar />
          <LoginModal />

          <div className="flex">
            <AdminSidePanel />
            <div className="w-full ps-sidepanel pt-16">
              <Outlet />
            </div>
          </div>
        </ConfirmDeleteProvider>
      </LoginModalProvider>
    </RkahmCustomMeasureProvider>
  );
};

export default AdminLayout;
