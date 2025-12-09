import { useState, useMemo } from "react";
import type { Project } from "../../../types/project";
import { mockProjects } from "../../../data/mockProjects";
import ProjectFormModal from "./ProjectFormModal";
import DataTable from "../../UI/DataTable";
import type { ColumnsType } from "antd/es/table";
import SearchFilter from "../../UI/Filter";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useModals } from "../../../hooks";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";
import { useNavigate } from "react-router-dom";

interface ProjectData extends Project {
  key: string;
}

export default function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const modals = useModals(["create", "update", "delete"] as const);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        (project.description &&
          project.description.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  // Convert to DataTable format
  const dataSource: ProjectData[] = filteredProjects.map((project) => ({
    ...project,
    key: project.id,
  }));

  const statusLabels: Record<Project["status"], string> = {
    planning: "Lên kế hoạch",
    "in-progress": "Đang thực hiện",
    "on-hold": "Tạm dừng",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };

  const statusColors: Record<Project["status"], string> = {
    planning: "bg-blue-100 text-blue-700",
    "in-progress": "bg-orange-100 text-orange-700",
    "on-hold": "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const columns: ColumnsType<ProjectData> = [
    {
      title: "Tên dự án",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-900">{text}</div>
          {record.description && (
            <div className="text-sm text-slate-500 truncate max-w-xs">
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status: Project["status"]) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </span>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      width: 130,
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 130,
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      width: 150,
      align: "center",
      render: (progress: number, record) => {
        // Check if project is overdue
        const isOverdue =
          new Date(record.endDate) < new Date() &&
          record.status !== "completed";

        // Determine progress bar color
        let progressColor = "bg-blue-600"; // default

        if (isOverdue) {
          progressColor = "bg-red-600";
        } else {
          switch (record.status) {
            case "planning":
              progressColor = "bg-blue-600";
              break;
            case "in-progress":
              progressColor = "bg-orange-500";
              break;
            case "on-hold":
              progressColor = "bg-yellow-500";
              break;
            case "completed":
              progressColor = "bg-green-600";
              break;
            case "cancelled":
              progressColor = "bg-red-600";
              break;
          }
        }

        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`${progressColor} h-2 rounded-full transition-all`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className={`text-sm font-medium min-w-[40px] ${isOverdue ? "text-red-600" : "text-slate-700"}`}
            >
              {progress}%
            </span>
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            title="Chỉnh sửa"
            onClick={() => {
              setEditingProject(record);
              modals.update.open();
            }}
          >
            <MdEdit
              className="text-blue-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
          <button
            className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            title="Xóa"
            onClick={() => handleDeleteProject(record.id)}
          >
            <MdDelete
              className="text-red-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
        </div>
      ),
    },
  ];

  const handleAddProject = () => {
    setEditingProject(null);
    modals.create.open();
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSubmit = (projectData: Partial<Project>) => {
    if (editingProject) {
      // Update existing project
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectData } : p
        )
      );
      modals.update.close();
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectData.name || "",
        description: projectData.description || "",
        status: projectData.status || "planning",
        startDate: projectData.startDate || "",
        endDate: projectData.endDate || "",
        progress: projectData.progress || 0,
        assignedStaff: [],
      };
      setProjects([...projects, newProject]);
      modals.create.close();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Quản lý dự án
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổng số: {projects.length} dự án
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="w-full md:w-72">
            <SearchFilter
              placeholder="Tìm kiếm dự án..."
              onSearch={setSearchQuery}
              size="large"
              className="w-full text-black!"
            />
          </div>
          <ButtonCus
            type="primary"
            onClick={handleAddProject}
            className="w-full sm:w-auto flex items-center gap-[8px]"
          >
            <MdAdd size={20} />
            <span className="pr-[8px]">Thêm mới</span>
          </ButtonCus>
        </div>
      </div>

      {/* Table */}
      <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg shadow-sm border border-slate-200">
        <DataTable<ProjectData>
          columns={columns}
          dataSource={dataSource}
          emptyText="Không tìm thấy dự án"
          emptyDescription="Hãy thử tìm kiếm từ khóa khác hoặc thêm mới"
          scroll={{ x: 1000 }}
          onRow={(record) => ({
            onClick: () => navigate(`/dashboard/projects/${record.id}`),
            className: "cursor-pointer",
          })}
        />
      </div>

      {/* Modals */}
      <ProjectFormModal
        isOpen={modals.create.isOpen || modals.update.isOpen}
        onClose={() => {
          modals.create.close();
          modals.update.close();
        }}
        onSubmit={handleSubmit}
        project={editingProject}
      />
    </div>
  );
}
