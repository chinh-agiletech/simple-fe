import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProjects } from "../../../data/mockProjects";
import OverviewTab from "./Tabs/OverviewTab";
import ItemsTab from "./Tabs/ItemsTab";
import MaterialsTab from "./Tabs/MaterialsTab";
import StaffTab from "./Tabs/StaffTab";

type TabType = "overview" | "items" | "materials" | "staff";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy dự án
          </h2>
          <p className="text-gray-500 mb-4">Dự án bạn tìm kiếm không tồn tại</p>
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as TabType, label: "Tổng quan", icon: "📊" },
    { id: "items" as TabType, label: "Hạng mục", icon: "📋" },
    { id: "materials" as TabType, label: "Vật tư", icon: "📦" },
    { id: "staff" as TabType, label: "Nhân sự", icon: "👥" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <span className="mr-2">←</span>
          Quay lại danh sách
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && <OverviewTab project={project} />}
        {activeTab === "items" && <ItemsTab projectId={project.id} />}
        {activeTab === "materials" && <MaterialsTab projectId={project.id} />}
        {activeTab === "staff" && <StaffTab projectId={project.id} />}
      </div>
    </div>
  );
}
