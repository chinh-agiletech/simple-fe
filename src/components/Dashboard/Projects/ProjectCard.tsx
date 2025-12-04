import type { Project } from "../../../types/project";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  planning: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  "on-hold": "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  planning: "Lên kế hoạch",
  "in-progress": "Đang thực hiện",
  "on-hold": "Tạm dừng",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/projects/${project.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa dự án "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[project.status]
          }`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Bắt đầu:</span>
          <span className="text-gray-900">
            {new Date(project.startDate).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Kết thúc:</span>
          <span className="text-gray-900">
            {new Date(project.endDate).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Tiến độ</span>
          <span className="text-gray-900 font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          Sửa
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
