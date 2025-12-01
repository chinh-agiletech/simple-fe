import React from "react";
import { Card, Button, Divider } from "antd";

const SystemSettings = () => {
  return (
    <div className="space-y-4">
      <Card title="System Information" className="shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Version:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="font-medium">2024-12-01</span>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between">
            <span className="text-gray-600">Database Size:</span>
            <span className="font-medium">45.2 MB</span>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between">
            <span className="text-gray-600">Cache Size:</span>
            <span className="font-medium">12.8 MB</span>
          </div>
        </div>
      </Card>

      <Card title="System Maintenance" className="shadow-sm">
        <div className="space-y-3">
          <Button size="large" block>
            Clear Cache
          </Button>
          <Button size="large" block>
            Optimize Database
          </Button>
          <Button size="large" block>
            Check for Updates
          </Button>
          <Button danger size="large" block>
            Reset to Default Settings
          </Button>
        </div>
      </Card>

      <Card title="About" className="shadow-sm">
        <p className="text-gray-600 mb-4">Dashboard Management System v1.0.0</p>
        <p className="text-sm text-gray-500">
          © 2024 Your Company. All rights reserved.
        </p>
        <div className="mt-4 flex gap-3">
          <Button type="link" className="p-0">
            Terms of Service
          </Button>
          <Button type="link" className="p-0">
            Privacy Policy
          </Button>
          <Button type="link" className="p-0">
            Help Center
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings;
