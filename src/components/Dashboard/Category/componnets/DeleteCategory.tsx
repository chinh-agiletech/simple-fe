import { Button, Modal } from "antd";

export interface DelCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: { name: string; description: string }) => void;
}

const DeleteCategory = ({ open, onClose, onSubmit }: DelCategoryProps) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleConfirmDelete = () => {
    if (onSubmit) {
      onSubmit({ name: "", description: "" }); // You can pass actual data here
    }
    onClose();
  };

  return (
    <Modal
      title="Delete Category"
      open={open}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={null}
      centered
      width={400}
    >
      <div className="my-[20px]">
        <p className="text-slate-700">
          Are you sure you want to delete this category?
        </p>
      </div>
      <div className="flex justify-end gap-[8px]">
        <Button
          type="default"
          onClick={handleCloseModal}
          className="rounded-full h-[40px] px-6"
        >
          No
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleConfirmDelete}
          className="rounded-full h-[40px] px-6"
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
