import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdCategory,
  MdInventory,
  MdConstruction,
  MdSettings,
  MdMenu,
  MdChevronRight,
  MdLogout,
  MdAssessment,
  MdBusiness,
} from "react-icons/md";
import ModalLogOut from "../ModalLogOut";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: <MdDashboard size={22} />,
    path: "/dashboard",
  },
  {
    id: "materials",
    label: "Vật tư",
    icon: <MdCategory size={22} />,
    path: "/dashboard/category",
  },
  {
    id: "inventory",
    label: "Kho hàng",
    icon: <MdInventory size={22} />,
    path: "/dashboard/products",
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

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setExpandedMenus([]);
    }
  };

  const toggleSubmenu = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter((id) => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      toggleSubmenu(item.id);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-white text-slate-800 transition-all duration-300 ease-in-out flex flex-col shadow-xl border-r border-slate-200`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-linear-to-r from-orange-50 to-white">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
            <MdConstruction className="text-xl" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-800">
                Vật Tư XD
              </span>
              <span className="text-xs text-slate-500">Quản lý vật tư</span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110 text-slate-600"
          >
            <MdMenu size={20} />
          </button>
        )}
      </div>

      {/* Collapsed Menu Button */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mx-auto mt-4 p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110 text-slate-600"
        >
          <MdMenu size={20} />
        </button>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                  ${
                    isActive(item.path)
                      ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                      : "hover:bg-orange-50 text-slate-700"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
                title={isCollapsed ? item.label : ""}
              >
                {/* Active indicator */}
                {isActive(item.path) && !isCollapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                )}

                {/* Icon */}
                <span
                  className={`shrink-0 ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-slate-500 group-hover:text-orange-600"
                  } transition-colors duration-200`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                {!isCollapsed && (
                  <>
                    <span
                      className={`flex-1 text-left font-medium text-sm ${
                        isActive(item.path)
                          ? "text-white"
                          : "text-slate-700 group-hover:text-orange-600"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.submenu && item.submenu.length > 0 && (
                      <MdChevronRight
                        size={18}
                        className={`transition-transform duration-200 ${
                          expandedMenus.includes(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </>
                )}

                {/* Hover effect */}
                {!isActive(item.path) && (
                  <div className="absolute inset-0 bg-linear-to-r from-orange-100/0 via-orange-100/50 to-orange-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>

              {/* Submenu */}
              {item.submenu &&
                item.submenu.length > 0 &&
                expandedMenus.includes(item.id) &&
                !isCollapsed && (
                  <ul className="mt-1 ml-4 space-y-1 border-l-2 border-orange-200 pl-4">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                            ${
                              isActive(subItem.path)
                                ? "bg-orange-100 text-orange-600 font-medium"
                                : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                            }
                          `}
                        >
                          <span className="shrink-0">{subItem.icon}</span>
                          <span className="flex-1 text-left">
                            {subItem.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-linear-to-r from-white to-orange-50">
        <button
          onClick={handleLogoutClick}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-500 hover:text-red-600 group
            ${isCollapsed ? "justify-center" : ""}
          `}
          title={isCollapsed ? "Đăng xuất" : ""}
        >
          <MdLogout
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
          {!isCollapsed && (
            <span className="font-medium text-sm">Đăng xuất</span>
          )}
        </button>
      </div>

      {/* Logout Modal */}
      <ModalLogOut
        open={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
