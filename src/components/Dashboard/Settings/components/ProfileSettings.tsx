import React from "react";
import { Card, Form, Input, Button, Upload, Avatar, Divider } from "antd";
import { UserOutlined, CameraOutlined, SaveOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message } from "antd";

const { TextArea } = Input;

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
}

const ProfileSettings = () => {
  const [form] = Form.useForm<ProfileFormValues>();

  const handleProfileUpdate = (values: ProfileFormValues) => {
    console.log("Profile updated:", values);
    message.success("Profile updated successfully!");
  };

  const avatarUploadProps: UploadProps = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isImage && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success("Avatar updated successfully!");
      }
    },
  };

  return (
    <Card>
      <div className="max-w-2xl">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <Avatar size={100} icon={<UserOutlined />} />
            <Upload {...avatarUploadProps}>
              <Button
                icon={<CameraOutlined />}
                shape="circle"
                className="absolute bottom-0 right-0"
                size="small"
              />
            </Upload>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Profile Picture</h3>
            <p className="text-gray-500 text-sm">
              Upload a new avatar. Max size 2MB
            </p>
          </div>
        </div>

        <Divider />

        {/* Profile Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
          initialValues={{
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            company: "Tech Corp",
            position: "Software Engineer",
            bio: "Passionate developer with 5+ years of experience",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input valid email!",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Company" name="company">
              <Input placeholder="Enter company name" />
            </Form.Item>

            <Form.Item label="Position" name="position">
              <Input placeholder="Enter position" />
            </Form.Item>
          </div>

          <Form.Item label="Bio" name="bio">
            <TextArea rows={4} placeholder="Tell us about yourself" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              size="large"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default ProfileSettings;
