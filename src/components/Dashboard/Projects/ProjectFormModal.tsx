import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import type { Project } from "../../../types/project";

const { TextArea } = Input;

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Partial<Project>) => void;
  project?: Project | null;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  project,
}: ProjectFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        progress: project.progress,
      });
    } else {
      form.resetFields();
    }
  }, [project, form]);

  interface FormValues {
    name: string;
    description?: string;
    status: "planning" | "in-progress" | "on-hold" | "completed" | "cancelled";
    startDate: string;
    endDate: string;
    progress?: number;
  }

  const onFinish = (values: FormValues) => {
    const projectData: Partial<Project> = {
      name: values.name,
      description: values.description,
      status: values.status,
      startDate: values.startDate || "",
      endDate: values.endDate || "",
      progress: values.progress || 0,
    };
    onSubmit(projectData);
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={project ? "Sửa dự án" : "Thêm dự án mới"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
      width={700}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ status: "planning", progress: 0 }}
      >
        <Form.Item
          name="name"
          label="Tên dự án"
          rules={[{ required: true, message: "Vui lòng nhập tên dự án!" }]}
        >
          <Input placeholder="Nhập tên dự án" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea placeholder="Nhập mô tả dự án" rows={3} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
          >
            <Input
              type="date"
              placeholder="Chọn ngày bắt đầu"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[
              { required: true, message: "Vui lòng chọn ngày kết thúc!" },
            ]}
          >
            <Input
              type="date"
              placeholder="Chọn ngày kết thúc"
              className="w-full"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="planning">Lên kế hoạch</Select.Option>
              <Select.Option value="in-progress">Đang thực hiện</Select.Option>
              <Select.Option value="on-hold">Tạm dừng</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="progress"
            label="Tiến độ (%)"
            rules={[
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Giá trị từ 0-100!",
              },
            ]}
          >
            <Input type="number" placeholder="0" min={0} max={100} />
          </Form.Item>
        </div>

        <div className="w-full flex justify-end gap-3">
          <Button onClick={handleCancel} className="h-[40px]">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="h-[40px]">
            {project ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
