import React, { useMemo, useState } from "react";
import DataTable from "../../UI/DataTable";
import type { ColumnsType } from "antd/es/table";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import SearchFilter from "../../UI/Filter";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";

interface Warehouse {
  sku: string;
  name: string;
  address: string;
  phone: string;
}

const WarehousePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const columns: ColumnsType<Warehouse> = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
            <MdEdit
              className="text-blue-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group">
            <MdDelete
              className="text-red-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
        </div>
      ),
    },
  ];

  const data: Warehouse[] = [
    {
      sku: "SKU-001",
      name: "Warehouse 1",
      address: "123 Main St, City",
      phone: "123-456-7890",
    },
    {
      sku: "SKU-002",
      name: "Warehouse 2",
      address: "456 Elm St, City",
      phone: "098-765-4321",
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(query) ||
        warehouse.address.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl font-semibold">Quản lý kho</div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="w-full md:w-72">
              <SearchFilter
                placeholder="Tìm kiếm danh mục..."
                onSearch={setSearchQuery}
                size="large"
                className="w-full"
              />
            </div>
            <ButtonCus
              type="primary"
              className="w-full sm:w-auto flex items-center gap-[8px]"
            >
              <MdAdd size={20} />
              <span className="pr-[8px]">Thêm mới</span>
            </ButtonCus>
          </div>
        </div>
        <DataTable<Warehouse> columns={columns} dataSource={filteredData} />
      </div>
    </>
  );
};

export default WarehousePage;
