import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export interface LoginPageProps {
  username: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onChangeForgotPassword = () => {
    navigate("/login/forgot-password");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] border border-gray-300 rounded-lg px-10">
        <h1 className="flex w-full justify-center my-4 font-600 text-xl">
          Admin Login
        </h1>
        <Form
          name="loginForm"
          form={form}
          onFinish={(values) => {
            console.log("Submit values:", values);
          }}
        >
          <Form.Item name="username">
            <div className="mb-4 flex justify-between items-center gap-2">
              <span className="min-w-[70px]">Username</span>
              <Input className="h-[40px]" placeholder="username" />
            </div>
          </Form.Item>
          <Form.Item name="password">
            <div className="mb-4 flex justify-between items-center gap-2">
              <span className="min-w-[70px]">Password</span>
              <Input.Password className="h-[40px]" placeholder="password" />
            </div>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <div className="flex justify-between items-center">
              <Checkbox>Remember me</Checkbox>
              <span
                className="text-blue-500 cursor-pointer hover:font-bold"
                onClick={onChangeForgotPassword}
              >
                Forgot Password?
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[48px]"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Login site
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
