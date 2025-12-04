import { useState } from "react";
import type { Material } from "../../../../types/project";
import { mockMaterials } from "../../../../data/mockProjects";

interface MaterialsTabProps {
  projectId: string;
}

const statusColors = {
  available: "bg-green-100 text-green-800",
  ordered: "bg-yellow-100 text-yellow-800",
  "out-of-stock": "bg-red-100 text-red-800",
};

const statusLabels = {
  available: "Sẵn có",
  ordered: "Đã đặt hàng",
  "out-of-stock": "Hết hàng",
};

export default function MaterialsTab({ projectId }: MaterialsTabProps) {
  const [materials, setMaterials] = useState<Material[]>(
    mockMaterials.filter((m) => m.projectId === projectId)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Material>>({});

  const handleEdit = (material: Material) => {
    setEditingId(material.id);
    setEditData(material);
  };

  const handleSave = (id: string) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, ...editData } : m))
    );
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa vật tư này?")) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const handleAdd = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      projectId,
      name: "Vật tư mới",
      quantity: 0,
      unit: "cái",
      status: "available",
    };
    setMaterials([...materials, newMaterial]);
    setEditingId(newMaterial.id);
    setEditData(newMaterial);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Danh sách vật tư ({materials.length})
        </h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          + Thêm vật tư
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tên vật tư
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Đơn vị
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
            {materials.map((material) => (
              <tr key={material.id} className="hover:bg-gray-50">
                {editingId === material.id ? (
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
                        type="number"
                        value={editData.quantity || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            quantity: Number(e.target.value),
                          })
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editData.unit || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, unit: e.target.value })
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editData.status || "available"}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value as Material["status"],
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="available">Sẵn có</option>
                        <option value="ordered">Đã đặt hàng</option>
                        <option value="out-of-stock">Hết hàng</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSave(material.id)}
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
                        {material.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {material.quantity.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {material.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[material.status]
                        }`}
                      >
                        {statusLabels[material.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-blue-600 hover:text-blue-900 mr-3 text-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
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

        {materials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có vật tư nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
