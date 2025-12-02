import { Modal, Form, Input, message } from "antd";
import { useEffect } from "react";
import ButtonCus from "../../../UI/ButtonCus/ButtonCus";

export interface DataFormWarehouse {
  id?: string;
  sku?: string;
  name: string;
  address: string;
  phone: string;
}

interface FormWarehouseProps {
  open: boolean;
  value?: DataFormWarehouse;
  onClose?: () => void;
  onSubmit?: (data: DataFormWarehouse) => void;
}

const FormWarehouse = ({
  open,
  value,
  onClose,
  onSubmit,
}: FormWarehouseProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && value) {
      form.setFieldsValue(value);
    } else if (open) {
      form.resetFields();
    }
  }, [open, value, form]);

  const handleClose = () => {
    form.resetFields();
    onClose?.();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData: DataFormWarehouse = {
        ...values,
        id: value?.id,
        sku: value?.sku,
      };
      onSubmit?.(formData);
      message.success(
        value?.id ? "Cập nhật kho thành công!" : "Thêm kho thành công!"
      );
      handleClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title={
        <span className="text-xl font-semibold">
          {value?.id ? "Cập nhật kho" : "Thêm kho mới"}
        </span>
      }
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="mt-4" autoComplete="off">
        <Form.Item
          label={<span className="font-medium">Tên kho</span>}
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên kho!" },
            { min: 3, message: "Tên kho phải có ít nhất 3 ký tự!" },
          ]}
        >
          <Input
            placeholder="Nhập tên kho"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium">Địa chỉ</span>}
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ!" },
            { min: 5, message: "Địa chỉ phải có ít nhất 5 ký tự!" },
          ]}
        >
          <Input.TextArea
            placeholder="Nhập địa chỉ kho"
            size="large"
            className="rounded-lg"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium">Số điện thoại</span>}
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ (10-11 số)!",
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            size="large"
            className="rounded-lg"
            maxLength={11}
          />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-2 pt-4">
          <ButtonCus
            type="default"
            onClick={handleClose}
            className="max-w-[100px]"
          >
            Hủy
          </ButtonCus>
          <ButtonCus
            type="primary"
            onClick={handleSubmit}
            className="max-w-[100px]"
          >
            {value?.id ? "Cập nhật" : "Thêm mới"}
          </ButtonCus>
        </div>
      </Form>
    </Modal>
  );
};

export default FormWarehouse;
