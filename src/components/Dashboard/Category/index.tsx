import React, { useState, useMemo } from "react";
import DataTable from "../../UI/DataTable";
import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import CreationCategory from "./componnets/CreationCategory";
import SearchFilter from "../../UI/Filter";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteCategory from "./componnets/DeleteCategory";

interface CategoryData {
  key: string;
  name: string;
  description: string;
}

export default function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([
    {
      key: "1",
      name: "Electronics",
      description: "Electronic devices and accessories",
    },
    {
      key: "2",
      name: "Clothing",
      description: "Fashion and apparel items",
    },
    {
      key: "3",
      name: "Books",
      description: "Books and educational materials",
    },
  ]);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "center" as const,
      render: () => (
        <div className="flex gap-3 justify-center">
          <button
            className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            title="Edit"
          >
            <MdEdit
              className="text-blue-600 group-hover:scale-110 transition-transform"
              size={18}
            />
          </button>
          <button
            className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            title="Delete"
            onClick={handleOpenDeleteModal}
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: { name: string; description: string }) => {
    console.log("New category:", values);
    // Add new category to the list
    const newCategory: CategoryData = {
      key: Date.now().toString(),
      name: values.name,
      description: values.description,
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Category Management
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="w-full md:w-72">
            <SearchFilter
              placeholder="Search..."
              onSearch={setSearchQuery}
              size="large"
              className="w-full"
            />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 h-[40px] rounded-full w-full sm:w-auto"
          >
            + Add new
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg shadow-sm border border-slate-200">
        <DataTable<CategoryData>
          columns={columns}
          dataSource={filteredCategories}
          emptyText="No Categories Found"
          emptyDescription="Start by adding your first category"
          scroll={{ x: 800 }}
        />
      </div>

      {/* Create Category Modal */}
      <CreationCategory
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <DeleteCategory open={openDeleteModal} onClose={handleDelete} />
    </div>
  );
}
