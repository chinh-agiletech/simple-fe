import { Button, Modal } from "antd";

export interface DelCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const DeleteCategory = ({ open, onClose, onSubmit }: DelCategoryProps) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleConfirmDelete = () => {
    if (onSubmit) {
      onSubmit();
    }
    onClose();
  };

  return (
    <Modal
      title="Xóa danh mục"
      open={open}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={null}
      centered
      width={400}
    >
      <div className="my-[20px]">
        <p className="text-slate-700">
          Bạn có chắc chắn muốn xóa danh mục này không?
        </p>
      </div>
      <div className="flex justify-end gap-[8px]">
        <Button
          type="default"
          onClick={handleCloseModal}
          className="rounded-full h-[40px] px-6"
        >
          Hủy
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleConfirmDelete}
          className="rounded-full h-[40px] px-6"
        >
          Xóa
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
