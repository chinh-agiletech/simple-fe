import { useState, useMemo } from "react";
import DataTable from "../../UI/DataTable";
import type { ColumnsType } from "antd/es/table";
import CreationCategory from "./componnets/CreationCategory";
import UpdateCategory from "./componnets/UpdateCategory";
import SearchFilter from "../../UI/Filter";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import DeleteCategory from "./componnets/DeleteCategory";
import { useModals } from "../../../hooks";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";
import TextField from '../../UI/TextField/TextField';

interface CategoryData {
  key: string;
  code: string;
  name: string;
  description: string;
  itemCount: number;
  status: "active" | "inactive";
}

export default function Category() {
  // Simplified modal management with custom hook
  const initialCategories: CategoryData[] = [
    {
      key: "1",
      code: "VLXD",
      name: "Vật liệu xây dựng",
      description: "Xi măng, cát, đá, sỏi, bê tông...",
      itemCount: 200,
      status: "active",
    },
    {
      key: "2",
      code: "THEP",
      name: "Sắt thép xây dựng",
      description: "Thép cuộn, thép cây, thép hình...",
      itemCount: 85,
      status: "active",
    },
    {
      key: "3",
      code: "GACH",
      name: "Gạch & Ngói",
      description: "Gạch ống, gạch thẻ, ngói lợp...",
      itemCount: 120,
      status: "active",
    },
    {
      key: "4",
      code: "SON",
      name: "Sơn & Hóa chất",
      description: "Sơn nội ngoại thất, chống thấm...",
      itemCount: 200,
      status: "active",
    },
    {
      key: "5",
      code: "DIEN",
      name: "Thiết bị điện",
      description: "Dây điện, công tắc, ổ cắm, đèn...",
      itemCount: 350,
      status: "active",
    },
    {
      key: "6",
      code: "NUOC",
      name: "Thiết bị nước",
      description: "Ống nước, vòi, van, bồn chứa...",
      itemCount: 180,
      status: "active",
    },
    {
      key: "7",
      code: "NOITHAT",
      name: "Nội thất",
      description: "Cửa, sàn gỗ, tủ bếp...",
      itemCount: 45,
      status: "inactive",
    },
  ];
  const modals = useModals(["create", "update", "delete"] as const);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );
  const [categories, setCategories] =
    useState<CategoryData[]>(initialCategories);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const query = searchQuery.toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }, [categories, searchQuery]);

  const columns: ColumnsType<CategoryData> = [
    {
      title: "Mã danh mục",
      dataIndex: "code",
      key: "code",
      width: 150,
      render: (text) => (
        <TextField element="span" className="font-semibold text-slate-700">
          {text}
        </TextField>
      ),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <TextField element="span" className="font-bold text-slate-900">
          {text}
        </TextField>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <TextField element="span" className="text-slate-600">
          {text}
        </TextField>
      ),
    },
    {
      title: "Số lượng vật tư",
      dataIndex: "itemCount",
      key: "itemCount",
      align: "center",
      width: 150,
      render: (count) => (
        <TextField
          element="span"
          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
        >
          {count} sản phẩm
        </TextField>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <TextField
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {status === "active" ? "Hoạt động" : "Ngừng KD"}
        </TextField>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      align: "center" as const,
      render: (_, record) => (
        <div className="flex gap-2 justify-between max-w-[100px]">
          <ButtonCus
            className="p-2 hover:bg-blue-200 rounded-lg bg-none transition-all duration-200 flex items-center justify-center"
            onClick={() => {
              setSelectedCategory(record);
              modals.update.open();
            }}
          >
            <MdEdit
              className="text-blue-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </ButtonCus>
          <ButtonCus
            className="p-2 hover:bg-red-200 rounded-lg bg-none transition-all duration-200  flex items-center justify-center"
            onClick={modals.delete.open}
          >
            <MdDelete
              className="text-red-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </ButtonCus>
        </div>
      ),
    },
  ];

  const handleSubmit = (values: { name: string; description: string }) => {
    console.log("New category:", values);
    // Add new category to the list
    const newCategory: CategoryData = {
      key: Date.now().toString(),
      code: `CAT-${Math.floor(Math.random() * 1000)}`, // Temporary auto-generated code
      name: values.name,
      description: values.description,
      itemCount: 0,
      status: "active",
    };
    setCategories([...categories, newCategory]);
  };

  const handleUpdate = (values: {
    code: string;
    name: string;
    description: string;
    status: "active" | "inactive";
  }) => {
    console.log("Update category:", values);
    if (selectedCategory) {
      // Update the category in the list
      setCategories(
        categories.map((cat) =>
          cat.key === selectedCategory.key
            ? {
                ...cat,
                code: values.code,
                name: values.name,
                description: values.description,
                status: values.status,
              }
            : cat
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <TextField element="h1" className="text-2xl md:text-3xl font-bold text-slate-900">
            Quản lý danh mục
          </TextField>
        </div>

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
            onClick={modals.create.open}
            className="w-full sm:w-auto flex items-center gap-[8px]"
          >
            <MdAdd size={20} />
            <span className="pr-[8px]">Thêm mới</span>
          </ButtonCus>
        </div>
      </div>
      {/* Table */}
      <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg shadow-sm border border-slate-200">
        <DataTable<CategoryData>
          columns={columns}
          dataSource={filteredCategories}
          emptyText="Không tìm thấy danh mục"
          emptyDescription="Hãy thử tìm kiếm từ khóa khác hoặc thêm mới"
          scroll={{ x: 800 }}
        />
      </div>

      {/* Modals - Clean and simple */}
      <CreationCategory
        open={modals.create.isOpen}
        onClose={modals.create.close}
        onSubmit={handleSubmit}
      />

      <UpdateCategory
        open={modals.update.isOpen}
        onClose={modals.update.close}
        onSubmit={handleUpdate}
        categoryData={selectedCategory}
      />

      <DeleteCategory
        open={modals.delete.isOpen}
        onClose={modals.delete.close}
      />
    </div>
  );
}
