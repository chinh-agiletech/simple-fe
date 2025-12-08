import { Card, Button, Upload, Alert, message } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CloudDownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import ButtonCus from '../../../UI/ButtonCus/ButtonCus';

const DataManagement = () => {
  // Handle data import
  const handleImport: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file imported successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file import failed.`);
    }
  };

  // Handle data export
  const handleExport = (format: string) => {
    message.success(`Exporting data as ${format.toUpperCase()}...`);
    // Simulate export
    setTimeout(() => {
      message.info(`${format.toUpperCase()} file downloaded successfully!`);
    }, 1500);
  };

  // Handle backup
  const handleBackup = () => {
    message.loading("Creating backup...", 2);
    setTimeout(() => {
      message.success("Backup created successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Import Data */}
      <Card title="Import Data" className="shadow-sm mb-4!">
        <Alert
          message="Import your data from CSV, Excel, or JSON files"
          type="info"
          showIcon
          className="mb-2"
        />
        <Upload
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleImport}
          maxCount={1}
        >
          <ButtonCus className="flex justify-center gap-2 border rounded-[14px]! mt-2 font-400 hover:bg-orange-700!">
            <UploadOutlined />
            Select File to Import
          </ButtonCus>
        </Upload>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: CSV, Excel (.xlsx, .xls), JSON
        </p>
      </Card>

      {/* Export Data */}
      <Card title="Export Data" className="shadow-sm mb-4!">
        <div className="flex flex-wrap gap-3">
          <Button
            icon={<FileExcelOutlined />}
            size="large"
            onClick={() => handleExport("csv")}
          >
            Export as CSV
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            size="large"
            onClick={() => handleExport("excel")}
          >
            Export as Excel
          </Button>
          <Button
            icon={<FilePdfOutlined />}
            size="large"
            onClick={() => handleExport("pdf")}
          >
            Export as PDF
          </Button>
          <Button
            icon={<DownloadOutlined />}
            size="large"
            onClick={() => handleExport("json")}
          >
            Export as JSON
          </Button>
        </div>
      </Card>

      {/* Backup & Restore */}
      <Card title="Backup & Restore" className="shadow-sm  mb-4!">
        <div className="space-y-4 flex justify-between">
          <div>
            <h4 className="font-medium mb-2">Create Backup</h4>
            <Button
              icon={<CloudDownloadOutlined />}
              size="large"
              type="primary"
              onClick={handleBackup}
            >
              Create Full Backup
            </Button>
            <p className="text-sm text-gray-500 mt-2">Last backup: Never</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Restore from Backup</h4>
            <Upload accept=".backup,.zip" maxCount={1}>
              <Button icon={<UploadOutlined />} size="large" danger>
                Restore Backup
              </Button>
            </Upload>
            <p className="text-sm text-gray-500 mt-2">
              Warning: This will overwrite current data
            </p>
          </div>
        </div>
      </Card>

      {/* Clear Data */}
      <Card title="Clear Data" className="shadow-sm">
        <Button danger size="large">
          Clear All Data
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Warning: This action cannot be undone
        </p>
      </Card>
    </div>
  );
};

export default DataManagement;
