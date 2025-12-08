import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Slider,
  Divider,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from 'react';

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  timeout?: number;
}

const SecuritySettings = () => {
  const [form] = Form.useForm<SecurityFormValues>();
  const [isAutoLogout, setIsAutoLogout] = useState(false);

  const handleSecurityUpdate = (values: SecurityFormValues) => {
    console.log("Security updated:", values);
    message.success("Security settings updated!");
  };

  return (
    <Card>
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <Form form={form} layout="vertical" onFinish={handleSecurityUpdate}>
          <h4 className="font-medium mb-3">Change Password</h4>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please input current password!" },
            ]}
          >
            <Input.Password placeholder="Enter current password" className="size-10" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter new password" className="size-10" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" className="size-10" />
          </Form.Item>

          <Divider />

          <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>

          <Divider />

          <h4 className="font-medium mb-3">Session Management</h4>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto Logout</p>
                <p className="text-sm text-gray-500">
                  Automatically logout after inactivity
                </p>
              </div>
              <Switch  
                checked={isAutoLogout}
                onChange={(checked) => setIsAutoLogout(checked)} />
            </div>
            {!isAutoLogout ? null : (
            <Form.Item label="Session Timeout (minutes)" name="timeout">
              
                  <Slider
                  min={5}
                  max={120}
                  defaultValue={30}
                  marks={{ 5: "5m", 30: "30m", 60: "1h", 120: "2h" }}
                />
            </Form.Item>)}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
          >
            Update Security Settings
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default SecuritySettings;
