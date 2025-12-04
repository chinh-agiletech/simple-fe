import { useState } from "react";
import type { Staff } from "../../../../types/project";
import { mockStaff } from "../../../../data/mockProjects";

interface StaffTabProps {
  projectId: string;
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  active: "Đang làm việc",
  inactive: "Không hoạt động",
};

export default function StaffTab({ projectId }: StaffTabProps) {
  const [staff, setStaff] = useState<Staff[]>(
    mockStaff.filter((s) => s.projectId === projectId)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Staff>>({});

  const handleEdit = (staffMember: Staff) => {
    setEditingId(staffMember.id);
    setEditData(staffMember);
  };

  const handleSave = (id: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, ...editData } : s)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân sự này?")) {
      setStaff(staff.filter((s) => s.id !== id));
    }
  };

  const handleAdd = () => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      projectId,
      name: "Nhân sự mới",
      role: "Nhân viên",
      status: "active",
    };
    setStaff([...staff, newStaff]);
    setEditingId(newStaff.id);
    setEditData(newStaff);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Danh sách nhân sự ({staff.length})
        </h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Thêm nhân sự
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Họ và tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((staffMember) => (
              <tr key={staffMember.id} className="hover:bg-gray-50">
                {editingId === staffMember.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editData.role || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, role: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editData.status || "active"}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value as Staff["status"],
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="active">Đang làm việc</option>
                        <option value="inactive">Không hoạt động</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSave(staffMember.id)}
                        className="text-green-600 hover:text-green-900 mr-3 text-sm"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900 text-sm"
                      >
                        Hủy
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {staffMember.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {staffMember.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {staffMember.role}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[staffMember.status]
                        }`}
                      >
                        {statusLabels[staffMember.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(staffMember)}
                        className="text-blue-600 hover:text-blue-900 mr-3 text-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(staffMember.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có nhân sự nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
