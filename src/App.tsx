import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ToastContainer } from "react-toastify";
import AdminRouter from "./routes/routers/AdminRouter.tsx";
import MainPagesRouter from "./routes/routers/MainRouter.tsx";
import AdminRouteMiddleware from "./routes/middlewares/AdminRoute.tsx";
import "./App.css";
// Lazy-load standalone components
const IntroPage = lazy(() => import("./pages/IntroPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const OtpPage = lazy(() => import("./pages/OtpPage"));

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <main>
      <ToastContainer rtl={true} />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/otp" element={<OtpPage />} />

          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            {MainPagesRouter.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* Admin Layout Routes */}
          <Route
            path="/admin/*"
            element={<AdminRouteMiddleware element={<AdminLayout />} />}
          >
            {AdminRouter.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
