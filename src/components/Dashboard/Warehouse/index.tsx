import { useMemo, useState } from "react";
import { Modal, message } from "antd";
import DataTable from "../../UI/DataTable";
import type { ColumnsType } from "antd/es/table";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import SearchFilter from "../../UI/Filter";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";
import FormWarehouse, {
  type DataFormWarehouse,
} from "./components/FormWarehouse";

interface Warehouse {
  id: string;
  sku: string;
  name: string;
  address: string;
  phone: string;
}

const WarehousePage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DataFormWarehouse | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "1",
      sku: "WH-001",
      name: "Kho Hà Nội",
      address: "123 Đường Láng, Đống Đa, Hà Nội",
      phone: "0123456789",
    },
    {
      id: "2",
      sku: "WH-002",
      name: "Kho Hồ Chí Minh",
      address: "456 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0987654321",
    },
    {
      id: "3",
      sku: "WH-003",
      name: "Kho Đà Nẵng",
      address: "789 Trần Phú, Hải Châu, Đà Nẵng",
      phone: "0912345678",
    },
  ]);

  const handleEdit = (record: Warehouse) => {
    setValue({
      id: record.id,
      sku: record.sku,
      name: record.name,
      address: record.address,
      phone: record.phone,
    });
    setOpen(true);
  };

  const handleDelete = (record: Warehouse) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa kho này?</p>
          <p className="font-semibold mt-2">{record.name}</p>
        </div>
      ),
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => {
        setWarehouses((prev) => prev.filter((item) => item.id !== record.id));
        message.success("Xóa kho thành công!");
      },
    });
  };

  const handleSubmit = (data: DataFormWarehouse) => {
    if (data.id) {
      // Update existing warehouse
      setWarehouses((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? {
                ...item,
                name: data.name,
                address: data.address,
                phone: data.phone,
              }
            : item
        )
      );
    } else {
      // Add new warehouse
      const newWarehouse: Warehouse = {
        id: Date.now().toString(),
        sku: `WH-${String(warehouses.length + 1).padStart(3, "0")}`,
        name: data.name,
        address: data.address,
        phone: data.phone,
      };
      setWarehouses((prev) => [...prev, newWarehouse]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setValue(undefined);
  };

  const handleAddNew = () => {
    setValue(undefined);
    setOpen(true);
  };

  const columns: ColumnsType<Warehouse> = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 120,
    },
    {
      title: "Tên kho",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleEdit(record)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            title="Chỉnh sửa"
          >
            <MdEdit
              className="text-blue-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
          <button
            onClick={() => handleDelete(record)}
            className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            title="Xóa"
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

  const filteredData = useMemo(() => {
    if (!searchQuery) return warehouses;

    const query = searchQuery.toLowerCase();
    return warehouses.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(query) ||
        warehouse.address.toLowerCase().includes(query) ||
        warehouse.sku.toLowerCase().includes(query) ||
        warehouse.phone.includes(query)
    );
  }, [warehouses, searchQuery]);

  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="text-3xl font-semibold text-slate-800">
            Quản lý kho
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="w-full md:w-72">
              <SearchFilter
                placeholder="Tìm kiếm kho..."
                onSearch={setSearchQuery}
                size="large"
                className="w-full"
              />
            </div>
            <ButtonCus
              type="primary"
              className="w-full sm:w-auto flex items-center gap-[8px]"
              onClick={handleAddNew}
            >
              <MdAdd size={20} />
              <span className="pr-[8px]">Thêm mới</span>
            </ButtonCus>
          </div>
        </div>
        <DataTable<Warehouse>
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
        />
      </div>
      <FormWarehouse
        open={open}
        value={value}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default WarehousePage;
