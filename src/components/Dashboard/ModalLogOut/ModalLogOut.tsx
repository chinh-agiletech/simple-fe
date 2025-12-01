import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";

interface ModalLogOutProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalLogOut: React.FC<ModalLogOutProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      closable={false}
    >
      <div className="text-center py-4">
        {/* Icon */}
        <div className="mb-4">
          <ExclamationCircleOutlined
            className="text-yellow-500"
            style={{ fontSize: "48px" }}
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout? You will need to login again to
          access your account.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <Button onClick={onClose} size="large" className="min-w-[100px]">
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={onConfirm}
            size="large"
            icon={<LogoutOutlined />}
            className="min-w-[100px]"
          >
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogOut;
