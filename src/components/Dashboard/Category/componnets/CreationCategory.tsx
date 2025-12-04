import { Button, Form, Input, Modal } from "antd";
import StatusSwitch from "../../../UI/Switch/StatusSwitch";

export interface CreationCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: {
    code: string;
    name: string;
    description: string;
    status: "active" | "inactive";
  }) => void;
}

export default function CreationCategory({
  open,
  onClose,
  onSubmit,
}: CreationCategoryProps) {
  const [form] = Form.useForm();

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
      title="Thêm danh mục mới"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ status: "active" }}
      >
        <Form.Item
          name="code"
          label="Mã danh mục"
          rules={[{ required: true, message: "Vui lòng nhập mã danh mục!" }]}
        >
          <Input placeholder="Nhập mã danh mục (VD: VLXD)" />
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
            Thêm mới
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
