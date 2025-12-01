import { Table, Empty } from "antd";
import type { TableProps, ColumnsType } from "antd/es/table";

export interface DataTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  dataSource?: T[];
  loading?: boolean;
  emptyText?: string;
  emptyDescription?: string;
}

function DataTable<T extends object>({
  columns,
  dataSource = [],
  loading = false,
  emptyText = "No Data",
  emptyDescription = "There is no data to display",
  ...restProps
}: DataTableProps<T>) {
  const customEmpty = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-600 font-semibold">{emptyText}</p>
          <p className="text-gray-400 text-sm">{emptyDescription}</p>
        </div>
      }
    />
  );

  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      locale={{ emptyText: customEmpty }}
      pagination={{
        // showSizeChanger: true,
        defaultPageSize: 10,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      {...restProps}
    />
  );
}

export default DataTable;
