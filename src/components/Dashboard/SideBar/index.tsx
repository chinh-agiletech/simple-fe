import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  MdConstruction,
  MdMenu,
  MdChevronRight,
  MdLogout
} from "react-icons/md";
import ModalLogOut from "../ModalLogOut";
import { menuItems, type MenuItem } from "./constant";

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
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div
      className={classNames(
        "h-screen bg-white text-slate-800 transition-all duration-300 ease-in-out flex flex-col shadow-xl border-r border-slate-200 overflow-hidden",
        {
          "w-20": isCollapsed,
          "w-64": !isCollapsed,
        }
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-linear-to-r from-orange-50 to-white min-h-[72px]">
        <div
          className={classNames("flex items-center gap-3", {
            "justify-center w-full": isCollapsed,
          })}
        >
          <div
            onClick={() => isCollapsed && setIsCollapsed(false)}
            className={classNames(
              "w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0",
              {
                "cursor-pointer hover:scale-110 transition-transform":
                  isCollapsed,
              }
            )}
          >
            <MdConstruction className="text-xl text-white" />
          </div>
          <div
            className={classNames(
              "flex flex-col overflow-hidden transition-all duration-300",
              {
                "w-0 opacity-0": isCollapsed,
                "w-auto opacity-100": !isCollapsed,
              }
            )}
          >
            <span className="font-bold text-lg tracking-tight text-slate-800 whitespace-nowrap">
              Vật Tư XD
            </span>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              Quản lý vật tư
            </span>
          </div>
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110 text-slate-600 shrink-0"
          >
            <MdMenu size={20} />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={classNames(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                  {
                    "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20":
                      isActive(item.path),
                    "hover:bg-orange-50 text-slate-700": !isActive(item.path),
                    "justify-center": isCollapsed,
                  }
                )}
                title={isCollapsed ? item.label : ""}
              >
                {/* Active indicator */}
                {isActive(item.path) && !isCollapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                )}

                {/* Icon */}
                <span
                  className={classNames(
                    "shrink-0 transition-colors duration-200",
                    {
                      "text-white": isActive(item.path),
                      "text-slate-500 group-hover:text-orange-600": !isActive(
                        item.path
                      ),
                    }
                  )}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={classNames(
                    "flex-1 text-left font-medium text-sm overflow-hidden transition-all duration-300",
                    {
                      "text-white": isActive(item.path),
                      "text-slate-700 group-hover:text-orange-600": !isActive(
                        item.path
                      ),
                      "w-0 opacity-0": isCollapsed,
                      "w-auto opacity-100": !isCollapsed,
                    }
                  )}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>

                {/* Chevron for submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <MdChevronRight
                    size={18}
                    className={classNames("transition-all duration-300", {
                      "rotate-90": expandedMenus.includes(item.id),
                      "w-0 opacity-0": isCollapsed,
                      "w-auto opacity-100": !isCollapsed,
                    })}
                  />
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
                          className={classNames(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                            {
                              "bg-orange-100 text-orange-600 font-medium":
                                isActive(subItem.path),
                              "text-slate-600 hover:text-orange-600 hover:bg-orange-50":
                                !isActive(subItem.path),
                            }
                          )}
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
          className={classNames(
            "w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-500 hover:text-red-600 group",
            {
              "justify-center": isCollapsed,
            }
          )}
          title={isCollapsed ? "Đăng xuất" : ""}
        >
          <MdLogout
            size={22}
            className="group-hover:scale-110 transition-transform shrink-0"
          />
          <span
            className={classNames(
              "font-medium text-sm overflow-hidden transition-all duration-300",
              {
                "w-0 opacity-0": isCollapsed,
                "w-auto opacity-100": !isCollapsed,
              }
            )}
          >
            <span className="whitespace-nowrap">Đăng xuất</span>
          </span>
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
