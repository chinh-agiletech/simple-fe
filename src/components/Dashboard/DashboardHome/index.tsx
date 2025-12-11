import React from "react";
import TextField from "../../UI/TextField/TextField";
import classNames from "classnames";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";
import {
  MdConstruction,
  MdBusiness,
  MdInventory2,
  MdWarehouse,
} from "react-icons/md";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  change,
  isPositive,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <TextField className="text-sm font-medium text-slate-600 mb-1">
            {title}
          </TextField>
          <TextField
            element="h3"
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            {value}
          </TextField>
          <div className="flex items-center gap-1">
            <TextField
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {change}
            </TextField>
            <TextField className="text-xs text-slate-500">
              vs last month
            </TextField>
          </div>
        </div>
        <div
          className={classNames(
            "w-14 h-14 rounded-lg flex items-center justify-center text-white shadow-lg",
            color
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const stats = [
    {
      title: "Giá trị vật tư",
      value: "2.5 tỷ",
      change: "15.3%",
      isPositive: true,
      icon: <MdInventory2 size={28} />,
      color: "bg-linear-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Dự án đang thực hiện",
      value: "24",
      change: "8.2%",
      isPositive: true,
      icon: <MdConstruction size={28} />,
      color: "bg-linear-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Nhà cung cấp",
      value: "48",
      change: "5.1%",
      isPositive: true,
      icon: <MdBusiness size={28} />,
      color: "bg-linear-to-br from-slate-500 to-slate-600",
    },
    {
      title: "Mức độ tồn kho",
      value: "87.5%",
      change: "3.2%",
      isPositive: true,
      icon: <MdWarehouse size={28} />,
      color: "bg-linear-to-br from-green-500 to-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <TextField element="h1" className="text-3xl font-bold text-slate-900">
            Tổng quan vật tư
          </TextField>
          <TextField className="text-slate-600 mt-1">
            Quản lý vật tư xây dựng hiệu quả và chuyên nghiệp
          </TextField>
        </div>
        <ButtonCus className="max-w-[120px]">Xuất báo cáo</ButtonCus>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <TextField
          element="h2"
          className="text-xl font-bold text-slate-900 mb-4"
        >
          Thao tác nhanh
        </TextField>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ButtonCus className="p-4 border-2 border-slate-200 rounded-lg bg-none w-full hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">🧱</div>
            <TextField className="font-semibold text-slate-900 group-hover:text-orange-600">
              Thêm vật tư
            </TextField>
            <TextField className="text-sm text-slate-600 mt-1">
              Nhập vật tư xây dựng mới
            </TextField>
          </ButtonCus>
          <ButtonCus className="p-4 border-2 border-slate-200 rounded-lg bg-none w-full hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">🏗️</div>
            <TextField
              element="h3"
              className="font-semibold text-slate-900 group-hover:text-blue-600"
            >
              Dự án mới
            </TextField>
            <TextField className="text-sm text-slate-600 mt-1">
              Tạo dự án xây dựng mới
            </TextField>
          </ButtonCus>
          <ButtonCus className="p-4 border-2 border-slate-200 rounded-lg hover:border-slate-500 bg-none w-full hover:bg-slate-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">🏭</div>
            <TextField className="font-semibold text-slate-900 group-hover:text-slate-600">
              Nhà cung cấp
            </TextField>
            <TextField className="text-sm text-slate-600 mt-1">
              Đăng ký nhà cung cấp mới
            </TextField>
          </ButtonCus>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <TextField
          element="h2"
          className="text-xl font-bold text-slate-900 mb-4"
        >
          Hoạt động gần đây
        </TextField>
        <div className="space-y-4">
          {[
            {
              action: "Nhập vật tư xây dựng",
              time: "5 phút trước",
              color: "bg-orange-100 text-orange-600",
            },
            {
              action: "Cập nhật dự án",
              time: "20 phút trước",
              color: "bg-blue-100 text-blue-600",
            },
            {
              action: "Thêm nhà cung cấp mới",
              time: "1 giờ trước",
              color: "bg-slate-100 text-slate-600",
            },
            {
              action: "Xuất kho vật tư",
              time: "2 giờ trước",
              color: "bg-green-100 text-green-600",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200"
            >
              <div
                className={`w-2 h-2 rounded-full ${activity.color.replace("100", "500")}`}
              ></div>
              <div className="flex-1">
                <TextField element="p" className="font-medium text-slate-900">
                  {activity.action}
                </TextField>
                <TextField element="p" className="text-sm text-slate-500">
                  {activity.time}
                </TextField>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
