import { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdWarning,
  MdCheckCircle,
  MdEdit,
  MdDelete,
  MdRemoveRedEye,
} from "react-icons/md";
import FilterSelect from "../../UI/Filter/FilterSelect";
import ViewInventoryModal from "./components/ViewInventoryModal";
import FormInventoryModal from "./components/FormInventoryModal";
import DeleteInventoryModal from "./components/DeleteInventoryModal";
import DataTable from "../../UI/DataTable/DataTable";
import type { ColumnsType } from "antd/es/table";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";

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

const mockData: InventoryItem[] = [
  {
    id: "1",
    name: "Xi măng Portland",
    category: "Vật liệu xây",
    sku: "XM-001",
    quantity: 500,
    unit: "Bao",
    minStock: 100,
    price: 85000,
    supplier: "Xi măng Hoàng Thạch",
    location: "Kho A-01",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Cát xây dựng",
    category: "Vật liệu xây",
    sku: "CAT-001",
    quantity: 45,
    unit: "m³",
    minStock: 50,
    price: 250000,
    supplier: "Cát Bình Dương",
    location: "Kho B-02",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Thép D10",
    category: "Thép xây dựng",
    sku: "THEP-D10",
    quantity: 0,
    unit: "Tấn",
    minStock: 5,
    price: 15500000,
    supplier: "Thép Việt Nhật",
    location: "Kho C-03",
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Gạch ống 4 lỗ",
    category: "Gạch xây",
    sku: "GACH-001",
    quantity: 15000,
    unit: "Viên",
    minStock: 5000,
    price: 1500,
    supplier: "Gạch Đồng Tâm",
    location: "Kho A-05",
    status: "in-stock",
  },
  {
    id: "5",
    name: "Sơn nước ngoại thất",
    category: "Sơn",
    sku: "SON-001",
    quantity: 80,
    unit: "Thùng",
    minStock: 30,
    price: 1200000,
    supplier: "Sơn Jotun",
    location: "Kho D-01",
    status: "in-stock",
  },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterWarehouse, setFilterWarehouse] = useState<string>("all");

  // Modal states
  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    item: InventoryItem | null;
  }>({ isOpen: false, item: null });

  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    item: InventoryItem | null;
    mode: "create" | "edit";
  }>({ isOpen: false, item: null, mode: "create" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: InventoryItem | null;
  }>({ isOpen: false, item: null });

  // Compute unique options
  const categories = Array.from(new Set(mockData.map((item) => item.category)));
  const locations = Array.from(new Set(mockData.map((item) => item.location)));

  const categoryOptions = [
    { value: "all", label: "Tất cả danh mục" },
    ...categories.map((c) => ({ value: c, label: c })),
  ];

  const locationOptions = [
    { value: "all", label: "Tất cả kho" },
    ...locations.map((l) => ({ value: l, label: l })),
  ];

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "in-stock", label: "Còn hàng" },
    { value: "low-stock", label: "Sắp hết" },
    { value: "out-of-stock", label: "Hết hàng" },
  ];

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesWarehouse =
      filterWarehouse === "all" || item.location === filterWarehouse;

    return (
      matchesSearch && matchesStatus && matchesCategory && matchesWarehouse
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <MdCheckCircle size={14} />
            Còn hàng
          </span>
        );
      case "low-stock":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <MdWarning size={14} />
            Sắp hết
          </span>
        );
      case "out-of-stock":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <MdWarning size={14} />
            Hết hàng
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Modal handlers
  const handleView = (item: InventoryItem) => {
    setViewModal({ isOpen: true, item });
  };

  const handleEdit = (item: InventoryItem) => {
    setFormModal({ isOpen: true, item, mode: "edit" });
  };

  const handleDelete = (item: InventoryItem) => {
    setDeleteModal({ isOpen: true, item });
  };

  const handleCreate = () => {
    setFormModal({ isOpen: true, item: null, mode: "create" });
  };

  const handleFormSubmit = (data: Partial<InventoryItem>) => {
    console.log("Form submitted:", data);
    // TODO: Implement API call to create/update
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed:", deleteModal.item);
    // TODO: Implement API call to delete
  };

  const columns: ColumnsType<InventoryItem> = [
    {
      title: "Mã SKU",
      dataIndex: "sku",
      key: "sku",
      render: (text) => (
        <span className="text-sm font-medium text-slate-900">{text}</span>
      ),
    },
    {
      title: "Tên vật tư",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{text}</p>
          <p className="text-xs text-slate-500">{record.supplier}</p>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => <span className="text-sm text-slate-700">{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {quantity} {record.unit}
          </p>
          <p className="text-xs text-slate-500">Tối thiểu: {record.minStock}</p>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-sm font-medium text-slate-900">
          {formatCurrency(price)}
        </span>
      ),
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
      render: (text) => <span className="text-sm text-slate-700">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(record)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
            title="Xem chi tiết"
          >
            <MdRemoveRedEye size={18} />
          </button>
          <button
            onClick={() => handleEdit(record)}
            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-150"
            title="Chỉnh sửa"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => handleDelete(record)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
            title="Xóa"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý vật tư</h1>
          <p className="text-slate-600 mt-1">
            Theo dõi và quản lý vật tư xây dựng trong kho
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200 flex items-center gap-2">
            <MdFileDownload size={20} />
            Xuất Excel
          </button>
          <ButtonCus
            type="primary"
            onClick={handleCreate}
            className="w-full sm:w-auto flex items-center gap-[8px]"
          >
            <MdAdd size={20} />
            <span className="pr-[8px]">Thêm mới</span>
          </ButtonCus>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <MdSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mã SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <FilterSelect
              value={filterCategory}
              onChange={setFilterCategory}
              options={categoryOptions}
              placeholder="Danh mục"
              className="w-full sm:w-48"
            />
            <FilterSelect
              value={filterWarehouse}
              onChange={setFilterWarehouse}
              options={locationOptions}
              placeholder="Kho hàng"
              className="w-full sm:w-48"
            />
            <FilterSelect
              value={filterStatus}
              onChange={setFilterStatus}
              options={statusOptions}
              placeholder="Trạng thái"
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <DataTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          emptyText="Không tìm thấy vật tư nào"
          emptyDescription="Hãy thử thay đổi bộ lọc hoặc tìm kiếm lại"
        />
      </div>

      {/* Modals */}
      <ViewInventoryModal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, item: null })}
        item={viewModal.item}
      />

      <FormInventoryModal
        isOpen={formModal.isOpen}
        onClose={() =>
          setFormModal({ isOpen: false, item: null, mode: "create" })
        }
        onSubmit={handleFormSubmit}
        item={formModal.item}
        mode={formModal.mode}
      />

      <DeleteInventoryModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleDeleteConfirm}
        itemName={deleteModal.item?.name || ""}
      />
    </div>
  );
}
