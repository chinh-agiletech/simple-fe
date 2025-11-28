import React from "react";
import {
  MdTrendingUp,
  MdShoppingCart,
  MdPeople,
  MdAttachMoney,
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
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">{value}</h3>
          <div className="flex items-center gap-1">
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {change}
            </span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>
        <div
          className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center text-white shadow-lg`}
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
      title: "Total Revenue",
      value: "$45,231",
      change: "12.5%",
      isPositive: true,
      icon: <MdAttachMoney size={28} />,
      color: "bg-linear-to-br from-green-500 to-emerald-600",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "8.2%",
      isPositive: true,
      icon: <MdShoppingCart size={28} />,
      color: "bg-linear-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Total Customers",
      value: "892",
      change: "3.1%",
      isPositive: false,
      icon: <MdPeople size={28} />,
      color: "bg-linear-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: "4.3%",
      isPositive: true,
      icon: <MdTrendingUp size={28} />,
      color: "bg-linear-to-br from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
              Add Product
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Create a new product listing
            </p>
          </button>
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600">
              Add Category
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Organize your products
            </p>
          </button>
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-green-600">
              Add Customer
            </h3>
            <p className="text-sm text-slate-600 mt-1">Register new customer</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              action: "New order received",
              time: "2 minutes ago",
              color: "bg-blue-100 text-blue-600",
            },
            {
              action: "Product updated",
              time: "15 minutes ago",
              color: "bg-purple-100 text-purple-600",
            },
            {
              action: "New customer registered",
              time: "1 hour ago",
              color: "bg-green-100 text-green-600",
            },
            {
              action: "Category created",
              time: "2 hours ago",
              color: "bg-orange-100 text-orange-600",
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
                <p className="font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
