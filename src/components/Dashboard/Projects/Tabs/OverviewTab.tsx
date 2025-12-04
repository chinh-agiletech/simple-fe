import type { Project } from "../../../../types/project";

interface OverviewTabProps {
  project: Project;
}

const statusLabels = {
  planning: "Lên kế hoạch",
  "in-progress": "Đang thực hiện",
  "on-hold": "Tạm dừng",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusColors = {
  planning: "bg-blue-100 text-blue-800",
  "in-progress": "bg-orange-100 text-orange-800",
  "on-hold": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OverviewTab({ project }: OverviewTabProps) {
  // Calculate days
  const now = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);

  // Days worked (from start date to now, or to end date if completed)
  const daysWorked = Math.max(
    0,
    Math.ceil(
      (Math.min(now.getTime(), endDate.getTime()) - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  // Days remaining (from now to end date, minimum 0)
  const daysRemainingRaw = Math.ceil(
    (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.max(0, daysRemainingRaw);
  const isOverdue = daysRemainingRaw < 0 && project.status !== "completed";

  // Total days
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thông tin chung
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Tên dự án
            </label>
            <p className="text-base text-gray-900">{project.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Trạng thái
            </label>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[project.status]
              }`}
            >
              {statusLabels[project.status]}
            </span>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Mô tả
            </label>
            <p className="text-base text-gray-900">{project.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Ngày bắt đầu
            </label>
            <p className="text-base text-gray-900">
              {new Date(project.startDate).toLocaleDateString("vi-VN")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Ngày kết thúc
            </label>
            <p className="text-base text-gray-900">
              {new Date(project.endDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tiến độ thực hiện
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tiến độ hoàn thành</span>
              <span className="text-gray-900 font-semibold">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all flex items-center justify-end pr-2 ${
                  isOverdue
                    ? "bg-red-600"
                    : project.status === "completed"
                      ? "bg-green-600"
                      : project.status === "in-progress"
                        ? "bg-orange-500"
                        : "bg-blue-600"
                }`}
                style={{ width: `${project.progress}%` }}
              >
                {project.progress > 10 && (
                  <span className="text-xs text-white font-medium">
                    {project.progress}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{daysWorked}</p>
              <p className="text-sm text-gray-600 mt-1">Ngày đã làm</p>
            </div>

            <div
              className={`text-center p-4 rounded-lg ${isOverdue ? "bg-red-50" : "bg-blue-50"}`}
            >
              <p
                className={`text-2xl font-bold ${isOverdue ? "text-red-600" : "text-blue-600"}`}
              >
                {isOverdue ? Math.abs(daysRemainingRaw) : daysRemaining}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {isOverdue ? "Ngày quá hạn" : "Ngày còn lại"}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {project.assignedStaff?.length || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Nhân sự</p>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{totalDays}</p>
              <p className="text-sm text-gray-600 mt-1">Tổng số ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
