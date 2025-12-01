import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";

interface CategoryData {
  key: string;
  name: string;
  description: string;
}

interface UpdateCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: { name: string; description: string }) => void;
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
        name: categoryData.name,
        description: categoryData.description,
      });
    }
  }, [open, categoryData, form]);
  const onFinish = (values: { name: string; description: string }) => {
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
      title="Update Category"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter category description" rows={4} />
        </Form.Item>
        <div className="w-full flex justify-between">
          <Button onClick={handleCancel} className="h-[40px]">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="h-[40px]">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
