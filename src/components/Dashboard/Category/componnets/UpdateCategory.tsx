import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import StatusSwitch from "../../../UI/Switch/StatusSwitch";

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
          <Button onClick={handleCancel} className="h-[40px]">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="h-[40px]">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
