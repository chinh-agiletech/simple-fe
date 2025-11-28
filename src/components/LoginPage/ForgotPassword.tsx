import { Button, Form, Input } from "antd";
import React from "react";

export default function ForgotPassword() {
  const [form] = Form.useForm();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] border border-gray-300 rounded-lg p-10">
        <Form name="forgot-password" form={form}>
          <Form.Item name="email">
            <div className="flex justify-center items-center gap-4">
              <span>Email</span>
              <Input placeholder="Email" />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full">
              Sending
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
