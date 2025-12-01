import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundGradient}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.orb3}></div>
      </div>

      {/* Login Card */}
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <UserOutlined style={styles.headerIcon} />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to continue to your dashboard</p>
        </div>

        {/* Form */}
        <Form
          name="loginForm"
          form={form}
          onFinish={(values) => {
            console.log("Submit values:", values);
            navigate("/dashboard");
          }}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined style={styles.inputIcon} />}
              placeholder="Username"
              size="large"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={styles.inputIcon} />}
              placeholder="Password"
              size="large"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <div style={styles.rememberRow}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={styles.checkbox}>Remember me</Checkbox>
              </Form.Item>
              <span style={styles.forgotLink} onClick={onChangeForgotPassword}>
                Forgot Password?
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={styles.submitButton}
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span style={styles.signupLink}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Optimized inline styles for better performance
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#0f172a",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    zIndex: 0,
  },
  orb1: {
    position: "absolute",
    top: "-10%",
    left: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)",
    animation: "float 20s ease-in-out infinite",
    filter: "blur(60px)",
  },
  orb2: {
    position: "absolute",
    bottom: "-10%",
    right: "-5%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(240, 147, 251, 0.4) 0%, transparent 70%)",
    animation: "float 25s ease-in-out infinite reverse",
    filter: "blur(60px)",
  },
  orb3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%)",
    animation: "pulse 15s ease-in-out infinite",
    filter: "blur(80px)",
  },
  loginCard: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "440px",
    padding: "48px 40px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    boxShadow:
      "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    marginBottom: "24px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
  },
  headerIcon: {
    fontSize: "36px",
    color: "#ffffff",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#64748b",
    margin: 0,
    fontWeight: "400",
  },
  input: {
    height: "48px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },
  inputIcon: {
    color: "#94a3b8",
    fontSize: "18px",
  },
  rememberRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  checkbox: {
    color: "#475569",
    fontSize: "14px",
  },
  forgotLink: {
    color: "#667eea",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  submitButton: {
    height: "52px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    marginTop: "8px",
  },
  footer: {
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },
  footerText: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  signupLink: {
    color: "#667eea",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
};
