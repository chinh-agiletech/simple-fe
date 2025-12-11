import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import StatusSwitch from "../../../UI/Switch/StatusSwitch";
import ButtonCus from "../../../UI/ButtonCus/ButtonCus";

interface CategoryData {
  key: string;
  code: string;
  name: string;
  description: string;
  itemCount: number;
  status: "active" | "inactive";
}

interface UpdateCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: {
    code: string;
    name: string;
    description: string;
    status: "active" | "inactive";
  }) => void;
  categoryData?: CategoryData | null;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  open,
  onClose,
  onSubmit,
  categoryData,
}) => {
  const [form] = Form.useForm();

  // Fill form with category data when modal opens
  useEffect(() => {
    if (open && categoryData) {
      form.setFieldsValue({
        code: categoryData.code,
        name: categoryData.name,
        description: categoryData.description,
        status: categoryData.status,
      });
    }
  }, [open, categoryData, form]);

  const onFinish = (values: {
    code: string;
    name: string;
    description: string;
    status: "active" | "inactive";
  }) => {
    console.log("Form values:", values);
    if (onSubmit) {
      onSubmit(values);
    }
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Cập nhật danh mục"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="code"
          label="Mã danh mục"
          rules={[{ required: true, message: "Vui lòng nhập mã danh mục!" }]}
        >
          <Input placeholder="Nhập mã danh mục" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Nhập mô tả danh mục" rows={4} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" valuePropName="status">
          <StatusSwitch status="active" />
        </Form.Item>

        <div className="w-full flex justify-end gap-3">
          <ButtonCus
            onClick={handleCancel}
            className="h-[40px] w-[60px]! rounded-md! border border-gray-300 bg-none! text-black!"
          >
            Hủy
          </ButtonCus>
          <ButtonCus type="primary" className="h-[40px] w-[80px]! rounded-md!">
            Cập nhật
          </ButtonCus>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
