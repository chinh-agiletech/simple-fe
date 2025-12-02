import {
  MdDashboard,
  MdConstruction,
  MdSettings,
  MdAssessment,
  MdBusiness,
  MdOutlineInventory2,
  MdOutlineCategory,
  MdWarehouse,
} from "react-icons/md";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: <MdDashboard size={22} />,
    path: "/dashboard",
  },
  {
    id: "materials",
    label: "Vật tư",
    icon: <MdOutlineInventory2 size={22} />,
    path: "/dashboard/inventory",
  },
  {
    id: "category",
    label: "Danh mục",
    icon: <MdOutlineCategory size={22} />,
    path: "/dashboard/category",
  },
  {
    id: "warehouse",
    label: "Kho hàng",
    icon: <MdWarehouse size={22} />,
    path: "/dashboard/warehouse",
  },
  {
    id: "projects",
    label: "Dự án",
    icon: <MdConstruction size={22} />,
    path: "/dashboard/orders",
  },
  {
    id: "suppliers",
    label: "Nhà cung cấp",
    icon: <MdBusiness size={22} />,
    path: "/dashboard/customers",
  },
  {
    id: "reports",
    label: "Báo cáo",
    icon: <MdAssessment size={22} />,
    path: "/dashboard/reports",
  },
  {
    id: "settings",
    label: "Cài đặt",
    icon: <MdSettings size={22} />,
    path: "/dashboard/settings",
  },
];