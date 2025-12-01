import React from "react";
import {
  Card,
  Form,
  Switch,
  Radio,
  Space,
  Button,
  Divider,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

interface NotificationFormValues {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  frequency: string;
}

const NotificationSettings = () => {
  const [form] = Form.useForm<NotificationFormValues>();

  const handleNotificationUpdate = (values: NotificationFormValues) => {
    console.log("Notification settings:", values);
    message.success("Notification settings saved!");
  };

  return (
    <Card>
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNotificationUpdate}
          initialValues={{
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: false,
            orderUpdates: true,
            promotions: false,
            newsletter: true,
            frequency: "daily",
          }}
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Notification Channels</h4>
              <div className="space-y-4">
                <Form.Item name="emailNotifications" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item name="pushNotifications" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item name="smsNotifications" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>
              </div>
            </div>

            <Divider />

            <div>
              <h4 className="font-medium mb-3">Notification Types</h4>
              <div className="space-y-4">
                <Form.Item name="orderUpdates" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-500">
                        Get notified about order status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </Form.Item>

                <Form.Item name="promotions" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Promotions & Offers</p>
                      <p className="text-sm text-gray-500">
                        Receive promotional emails and special offers
                      </p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item name="newsletter" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">
                        Subscribe to our weekly newsletter
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </Form.Item>
              </div>
            </div>

            <Divider />

            <Form.Item label="Email Digest Frequency" name="frequency">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="realtime">Real-time</Radio>
                  <Radio value="daily">Daily digest</Radio>
                  <Radio value="weekly">Weekly digest</Radio>
                  <Radio value="never">Never</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                size="large"
              >
                Save Preferences
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default NotificationSettings;
