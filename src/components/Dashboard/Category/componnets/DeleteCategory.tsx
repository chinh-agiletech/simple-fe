import { Modal } from "antd";
import TextField from "../../../UI/TextField/TextField";
import ButtonCus from "../../../UI/ButtonCus/ButtonCus";

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
        <TextField className="text-slate-700">
          Bạn có chắc chắn muốn xóa danh mục này không?
        </TextField>
      </div>
      <div className="flex justify-end gap-[8px]">
        <ButtonCus
          onClick={handleCloseModal}
          className="h-[40px] w-[60px]! bg-none text-black! border border-gray-300 rounded-md!"
        >
          Hủy
        </ButtonCus>
        <ButtonCus
          onClick={handleConfirmDelete}
          className="h-[40px] w-[60px]! rounded-md!"
        >
          Xóa
        </ButtonCus>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
