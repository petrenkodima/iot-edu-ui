import React, { useCallback, useEffect, useState } from 'react';
import { Row, TablePaginationConfig, Tag } from 'antd';
import { Table } from 'components/common/Table/Table';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useMounted } from '@app/hooks/useMounted';
import { getBasicTeacherList, Teacher, User } from '@app/api/iot-edu/table.api';

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}
const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const TeachersTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: Teacher[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getBasicTeacherList(pagination).then((res) => {
        if (isMounted.current) {
          setTableData({ data: res.data, pagination: res.pagination, loading: false });
        }
      });
    },
    [isMounted],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetch(pagination);
  };

  const handleDeleteRow = (rowId: number) => {
    setTableData({
      ...tableData,
      data: tableData.data.filter((item) => item.id !== rowId),
      pagination: {
        ...tableData.pagination,
        total: tableData.pagination.total ? tableData.pagination.total - 1 : tableData.pagination.total,
      },
    });
  };

  const columns: ColumnsType<Teacher> = [
    {
      title: t('iot.tables.users.name'),
      dataIndex: 'user',
      width: '30%',
      render: (user: User) => <span>{user.username}</span>,
    },
    {
      title: 'Курсы',
      dataIndex: 'actions',
      render: (text: string, record: Teacher) => {
        const getColumns = () => {
          return record.nameCourses.map((course) => <Tag key={course}>{course}</Tag>);
        };
        return <Row gutter={[10, 10]}>{getColumns()}</Row>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData.data}
      pagination={tableData.data.length > 10 ? tableData.pagination : false}
      loading={tableData.loading}
      onChange={handleTableChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};
