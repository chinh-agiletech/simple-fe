import { Form, Input, Button, message, Alert } from "antd";
import {
  LockOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const onFinish = (values: PasswordFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Password changed:", values);
      message.success("Đổi mật khẩu thành công!");
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  const validatePassword = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập mật khẩu mới!"));
    }
    if (value.length < 8) {
      return Promise.reject(new Error("Mật khẩu phải có ít nhất 8 ký tự!"));
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return Promise.reject(
        new Error("Mật khẩu phải chứa chữ hoa, chữ thường và số!")
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="max-w-2xl">
      <Alert
        message="Bảo mật tài khoản"
        description="Để bảo vệ tài khoản của bạn, vui lòng không chia sẻ mật khẩu với người khác. Mật khẩu mạnh nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số."
        type="info"
        showIcon
        icon={<SafetyOutlined />}
        className="mb-6"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="mt-[10px]"
      >
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-slate-400" />}
            placeholder="Nhập mật khẩu hiện tại"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[{ validator: validatePassword }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="text-slate-400" />}
            placeholder="Nhập mật khẩu mới"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<CheckCircleOutlined className="text-slate-400" />}
            placeholder="Nhập lại mật khẩu mới"
            size="large"
          />
        </Form.Item>

        {/* Password Requirements */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">
            Yêu cầu mật khẩu:
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              Ít nhất 8 ký tự
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              Chứa ít nhất 1 chữ hoa (A-Z)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              Chứa ít nhất 1 chữ thường (a-z)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              Chứa ít nhất 1 số (0-9)
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button size="large" onClick={() => form.resetFields()}>
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<LockOutlined />}
            loading={loading}
          >
            Đổi mật khẩu
          </Button>
        </div>
      </Form>
    </div>
  );
}
