import { Form, Input, Button, Upload, Avatar, message, Row, Col } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";

export default function EditProfile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Mock user data
  const initialValues = {
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    position: "Quản lý dự án",
    department: "Phòng Kỹ thuật",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const handleUpload: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setAvatarUrl(reader.result as string);
      });
      reader.readAsDataURL(info.file.originFileObj as Blob);
      message.success("Tải ảnh đại diện thành công!");
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ chấp nhận file JPG/PNG!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
      return false;
    }
    return true;
  };

  interface ProfileFormValues {
    fullName: string;
    email: string;
    phone: string;
    position?: string;
    department?: string;
    address?: string;
  }

  const onFinish = (values: ProfileFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Updated profile:", values);
      message.success("Cập nhật thông tin thành công!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl">
      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8 pb-6 border-b">
        <Avatar
          size={120}
          icon={<UserOutlined />}
          src={avatarUrl}
          className="border-4 border-slate-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Ảnh đại diện
          </h3>
          <p className="text-sm text-slate-500 mb-3">JPG, PNG. Tối đa 2MB</p>
          <Upload
            name="avatar"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess?.("ok");
              }, 0);
            }}
          >
            <Button icon={<CameraOutlined />}>Thay đổi ảnh</Button>
          </Upload>
        </div>
      </div>

      {/* Profile Form */}
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-400" />}
                placeholder="Nhập họ và tên"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-slate-400" />}
                placeholder="Nhập email"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-slate-400" />}
                placeholder="Nhập số điện thoại"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="position" label="Chức vụ">
              <Input placeholder="Nhập chức vụ" size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="department" label="Phòng ban">
              <Input placeholder="Nhập phòng ban" size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="address" label="Địa chỉ">
              <Input placeholder="Nhập địa chỉ" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Button size="large" onClick={() => form.resetFields()}>
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
          >
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </div>
  );
}
