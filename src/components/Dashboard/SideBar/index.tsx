import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdCategory,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdSettings,
  MdMenu,
  MdChevronRight,
  MdLogout,
} from "react-icons/md";

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
    label: "Dashboard",
    icon: <MdDashboard size={22} />,
    path: "/dashboard",
  },
  {
    id: "category",
    label: "Category",
    icon: <MdCategory size={22} />,
    path: "/dashboard/category",
  },
  {
    id: "products",
    label: "Products",
    icon: <MdInventory size={22} />,
    path: "/dashboard/products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: <MdShoppingCart size={22} />,
    path: "/dashboard/orders",
  },
  {
    id: "customers",
    label: "Customers",
    icon: <MdPeople size={22} />,
    path: "/dashboard/customers",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <MdSettings size={22} />,
    path: "/dashboard/settings",
  },
];

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
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

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl border-r border-slate-700/50`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-sm">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-xl font-bold">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">Admin</span>
              <span className="text-xs text-slate-400">Dashboard</span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <MdMenu size={20} />
          </button>
        )}
      </div>

      {/* Collapsed Menu Button */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mx-auto mt-4 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <MdMenu size={20} />
        </button>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                  ${
                    isActive(item.path)
                      ? "bg-linear-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30"
                      : "hover:bg-slate-700/50"
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
                      : "text-slate-400 group-hover:text-white"
                  } transition-colors duration-200`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium text-sm">
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
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>

              {/* Submenu */}
              {item.submenu &&
                item.submenu.length > 0 &&
                expandedMenus.includes(item.id) &&
                !isCollapsed && (
                  <ul className="mt-1 ml-4 space-y-1 border-l-2 border-slate-700/50 pl-4">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                            ${
                              isActive(subItem.path)
                                ? "bg-slate-700 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
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
      <div className="p-4 border-t border-slate-700/50 backdrop-blur-sm">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-red-500/10 text-red-400 hover:text-red-300 group
            ${isCollapsed ? "justify-center" : ""}
          `}
          title={isCollapsed ? "Logout" : ""}
        >
          <MdLogout
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
}
