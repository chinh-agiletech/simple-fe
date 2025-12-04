import { useState } from "react";
import type { ProjectItem } from "../../../../types/project";
import { mockProjectItems } from "../../../../data/mockProjects";

interface ItemsTabProps {
  projectId: string;
}

const statusLabels = {
  planning: "Lên kế hoạch",
  "in-progress": "Đang thực hiện",
  "on-hold": "Tạm dừng",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function ItemsTab({ projectId }: ItemsTabProps) {
  const [items, setItems] = useState<ProjectItem[]>(
    mockProjectItems.filter((item) => item.projectId === projectId)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ProjectItem>>({});

  const handleEdit = (item: ProjectItem) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSave = (id: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...editData } : item))
    );
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa hạng mục này?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: Date.now().toString(),
      projectId,
      name: "Hạng mục mới",
      description: "",
      status: "planning",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      progress: 0,
    };
    setItems([...items, newItem]);
    setEditingId(newItem.id);
    setEditData(newItem);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Danh sách hạng mục ({items.length})
        </h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Thêm hạng mục
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tên hạng mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tiến độ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {editingId === item.id ? (
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
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editData.status || "planning"}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value as ProjectItem["status"],
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="planning">Lên kế hoạch</option>
                        <option value="in-progress">Đang thực hiện</option>
                        <option value="on-hold">Tạm dừng</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editData.progress || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            progress: Number(e.target.value),
                          })
                        }
                        min="0"
                        max="100"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSave(item.id)}
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
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">
                          {item.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3 text-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có hạng mục nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
