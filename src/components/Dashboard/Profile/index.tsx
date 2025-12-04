import { useState } from "react";
import { Card, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";

type TabType = "profile" | "password";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const items = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Thông tin cá nhân
        </span>
      ),
      children: <EditProfile />,
    },
    {
      key: "password",
      label: (
        <span className="flex items-center gap-2">
          <LockOutlined />
          Đổi mật khẩu
        </span>
      ),
      children: <ChangePassword />,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Hồ sơ cá nhân
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Quản lý thông tin cá nhân và bảo mật tài khoản
        </p>
      </div>

      <Card className="shadow-sm w-[700px]">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as TabType)}
          items={items}
          size="large"
        />
      </Card>
    </div>
  );
}
