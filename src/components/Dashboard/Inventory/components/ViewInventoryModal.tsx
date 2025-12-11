import { MdClose, MdWarehouse, MdBusiness, MdLocationOn } from "react-icons/md";
import TextField from '../../../UI/TextField/TextField';

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

interface ViewInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export default function ViewInventoryModal({
  isOpen,
  onClose,
  item,
}: ViewInventoryModalProps) {
  if (!isOpen || !item) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          label: "Còn hàng",
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "low-stock":
        return {
          label: "Sắp hết",
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
      case "out-of-stock":
        return {
          label: "Hết hàng",
          color: "bg-red-100 text-red-700 border-red-200",
        };
      default:
        return { label: "Không xác định", color: "bg-gray-100 text-gray-700" };
    }
  };

  const statusInfo = getStatusInfo(item.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Chi tiết vật tư</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <MdClose size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Status Badge */}
          <div className="mb-6">
            <TextField
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${statusInfo.color}`}
            >
              {statusInfo.label}
            </TextField>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* SKU */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Mã SKU
              </label>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {item.sku}
              </p>
            </div>

            {/* Name */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Tên vật tư
              </label>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {item.name}
              </p>
            </div>

            {/* Category */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Danh mục
              </label>
              <p className="text-base font-medium text-slate-700 mt-1">
                {item.category}
              </p>
            </div>

            {/* Price */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Đơn giá
              </label>
              <p className="text-lg font-bold text-orange-600 mt-1">
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>

          {/* Inventory Info */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MdWarehouse className="text-blue-600" size={24} />
              <h3 className="font-bold text-slate-900">Thông tin kho</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Số lượng hiện tại
                </label>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {item.quantity} {item.unit}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Mức tối thiểu
                </label>
                <p className="text-2xl font-bold text-slate-700 mt-1">
                  {item.minStock} {item.unit}
                </p>
              </div>
            </div>
          </div>

          {/* Supplier & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supplier */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <MdBusiness className="text-slate-600" size={20} />
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Nhà cung cấp
                </label>
              </div>
              <p className="text-base font-medium text-slate-900">
                {item.supplier}
              </p>
            </div>

            {/* Location */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <MdLocationOn className="text-slate-600" size={20} />
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Vị trí kho
                </label>
              </div>
              <p className="text-base font-medium text-slate-900">
                {item.location}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end"></div>
      </div>
    </div>
  );
}
