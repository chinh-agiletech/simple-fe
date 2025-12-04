import { Tabs } from "antd";
import {
  UserOutlined,
  BellOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  BgColorsOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ProfileSettings from "./components/ProfileSettings";
import NotificationSettings from "./components/NotificationSettings";
import DataManagement from "./components/DataManagement";
import SecuritySettings from "./components/SecuritySettings";
import AppearanceSettings from "./components/AppearanceSettings";
import SystemSettings from "./components/SystemSettings";

const Settings = () => {
  const tabItems = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Profile
        </span>
      ),
      children: <ProfileSettings />,
    },
    {
      key: "notifications",
      label: (
        <span className="flex items-center gap-2">
          <BellOutlined />
          Notifications
        </span>
      ),
      children: <NotificationSettings />,
    },
    {
      key: "data",
      label: (
        <span className="flex items-center gap-2">
          <DatabaseOutlined />
          Data Management
        </span>
      ),
      children: <DataManagement />,
    },
    {
      key: "security",
      label: (
        <span className="flex items-center gap-2">
          <SafetyOutlined />
          Security
        </span>
      ),
      children: <SecuritySettings />,
    },
    {
      key: "appearance",
      label: (
        <span className="flex items-center gap-2">
          <BgColorsOutlined />
          Appearance
        </span>
      ),
      children: <AppearanceSettings />,
    },
    {
      key: "system",
      label: (
        <span className="flex items-center gap-2">
          <SettingOutlined />
          System
        </span>
      ),
      children: <SystemSettings />,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultActiveKey="profile"
        items={tabItems}
        size="large"
        className="settings-tabs"
      />
    </div>
  );
};

export default Settings;
