import { MdWarning, MdClose } from "react-icons/md";

interface DeleteInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteInventoryModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteInventoryModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MdWarning size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Xác nhận xóa</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <MdClose size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-700 text-base leading-relaxed">
            Bạn có chắc chắn muốn xóa vật tư{" "}
            <span className="font-bold text-slate-900">"{itemName}"</span>{" "}
            không?
          </p>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg text-white font-medium rounded-lg transition-all"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
