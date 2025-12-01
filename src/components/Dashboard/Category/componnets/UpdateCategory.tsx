import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface UpdateCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: { name: string; description: string }) => void;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
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
