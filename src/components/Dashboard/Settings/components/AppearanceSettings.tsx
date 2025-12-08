import {
  Card,
  Form,
  Radio,
  Select,
  Space,
  Button,
  Divider,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useThemeContext } from '../../../../context/ThemeContext';

const { Option } = Select;

interface AppearanceFormValues {
  theme: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  fontSize: string;
}

const AppearanceSettings = () => {
  const [form] = Form.useForm<AppearanceFormValues>();
  const {setTheme} = useThemeContext();
  
  const handleAppearanceUpdate = (values: AppearanceFormValues) => {
    setTheme(values.theme);
    message.success("Appearance settings saved!");
  };

  return (
    <Card>
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAppearanceUpdate}
          initialValues={{
            theme: "light",
            language: "en",
            dateFormat: "MM/DD/YYYY",
            timeFormat: "12h",
            fontSize: "medium",
          }}
        >
          <Form.Item label="Theme" name="theme">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="light">Light Mode</Radio>
                <Radio value="dark">Dark Mode</Radio>
                <Radio value="auto">Auto (System Preference)</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Divider />

          <Form.Item label="Language" name="language">
            <Select size="large">
              <Option value="en">English</Option>
              <Option value="vi">Tiếng Việt</Option>
              <Option value="es">Español</Option>
              <Option value="fr">Français</Option>
              <Option value="de">Deutsch</Option>
              <Option value="ja">日本語</Option>
              <Option value="zh">中文</Option>
            </Select>
          </Form.Item>

          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Date Format" name="dateFormat">
              <Select size="large">
                <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Time Format" name="timeFormat">
              <Select size="large">
                <Option value="12h">12 Hour</Option>
                <Option value="24h">24 Hour</Option>
              </Select>
            </Form.Item>
          </div>

          <Divider />

          <Form.Item label="Font Size" name="fontSize">
            <Radio.Group>
              <Space>
                <Radio value="small">Small</Radio>
                <Radio value="medium">Medium</Radio>
                <Radio value="large">Large</Radio>
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
              Save Appearance
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default AppearanceSettings;
