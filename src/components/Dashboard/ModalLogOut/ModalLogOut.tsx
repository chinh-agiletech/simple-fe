import React from "react";
import { Modal } from "antd";
import ButtonCus from "../../UI/ButtonCus/ButtonCus";

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
      title="Logout"
    >
      <div className="">
        <p className="text-gray-600 text-[16px] p-[8px]">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-3 justify-between">
          <ButtonCus
            onClick={onClose}
            className="max-w-[80px]! border border-outline text-black! hover:shadow-amber-500! hover:scale-110!"
            styles={{
              background: "white",
            }}
          >
            Cancel
          </ButtonCus>
          <ButtonCus onClick={onConfirm} className="max-w-[80px]!">
            Logout
          </ButtonCus>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogOut;
