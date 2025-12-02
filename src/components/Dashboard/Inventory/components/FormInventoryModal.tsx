import { useState } from "react";
import { MdClose } from "react-icons/md";
import NumberInput from "../../../UI/NumberInput/NumberInput";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  minStock: number;
  price: number;
  supplier: string;
  location: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

interface FormInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<InventoryItem>) => void;
  item?: InventoryItem | null;
  mode: "create" | "edit";
}

export default function FormInventoryModal({
  isOpen,
  onClose,
  onSubmit,
  item,
  mode,
}: FormInventoryModalProps) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "",
    sku: item?.sku || "",
    quantity: item?.quantity || 0,
    unit: item?.unit || "",
    minStock: item?.minStock || 0,
    price: item?.price || 0,
    supplier: item?.supplier || "",
    location: item?.location || "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "minStock" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {mode === "create" ? "Thêm vật tư mới" : "Chỉnh sửa vật tư"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <MdClose size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SKU */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mã SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="VD: XM-001"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tên vật tư <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="VD: Xi măng Portland"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Chọn danh mục</option>
                <option value="Vật liệu xây">Vật liệu xây</option>
                <option value="Thép xây dựng">Thép xây dựng</option>
                <option value="Gạch xây">Gạch xây</option>
                <option value="Sơn">Sơn</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Đơn vị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="VD: Bao, m³, Tấn"
              />
            </div>

            {/* Quantity */}
            <NumberInput
              label="Số lượng"
              name="quantity"
              value={formData.quantity}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, quantity: val }))
              }
              required
              min={0}
              placeholder="0"
            />

            {/* Min Stock */}
            <NumberInput
              label="Mức tối thiểu"
              name="minStock"
              value={formData.minStock}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, minStock: val }))
              }
              required
              min={0}
              placeholder="0"
            />

            {/* Price */}
            <NumberInput
              label="Đơn giá (VND)"
              name="price"
              value={formData.price}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, price: val }))
              }
              required
              min={0}
              placeholder="0"
            />

            {/* Supplier */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nhà cung cấp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="VD: Xi măng Hoàng Thạch"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Vị trí kho <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="VD: Kho A-01"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white font-medium rounded-lg transition-all"
          >
            {mode === "create" ? "Thêm mới" : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
