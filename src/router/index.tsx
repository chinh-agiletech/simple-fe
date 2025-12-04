import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import LoginPage from "../components/LoginPage/LoginPage";
import ForgotPassword from "../components/LoginPage/ForgotPassword";
import Category from "../components/Dashboard/Category";
import Dashboard from "../components/Dashboard";
import DashboardHome from "../components/Dashboard/DashboardHome";
import Settings from "../components/Dashboard/Settings";
import InventoryPage from "../components/Dashboard/Inventory";
import WarehousePage from "../components/Dashboard/Warehouse";
import ProjectList from "../components/Dashboard/Projects";
import ProjectDetail from "../components/Dashboard/Projects/ProjectDetail";
import ProfilePage from "../components/Dashboard/Profile";

function Router() {
  const isAuthenticated = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRouter
              redirectPath="login"
              condition={() => !isAuthenticated}
            />
          }
        >
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="register" element={<h1>Register</h1>} />
        </Route>

        <Route
          path="dashboard"
          element={
            <ProtectedRouter
              redirectPath="/login"
              condition={() => !isAuthenticated}
            />
          }
        >
          <Route element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="category" element={<Category />} />
            <Route path="warehouse" element={<WarehousePage />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route
              path="orders"
              element={<h1 className="text-2xl font-bold">Orders Page</h1>}
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="customers"
              element={<h1 className="text-2xl font-bold">Customers Page</h1>}
            />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
