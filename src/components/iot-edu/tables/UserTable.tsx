import React, { useCallback, useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Table } from 'components/common/Table/Table';
import { ColumnsType } from 'antd/es/table';
import { Button } from 'components/common/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { useMounted } from '@app/hooks/useMounted';
import { Role, User } from '@app/api/iot-edu/table.api';
import { Pagination } from '@app/api/table.api';
import { changeRole, getUsers } from '@app/api/iot-edu/AuthApi';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const UserTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: User[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const { isMounted } = useMounted();

  const updateData = () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getUsers(initialPagination).then((res) => {
      setTableData({ data: res, pagination: { current: 0, total: 10, pageSize: 2 }, loading: false });
    });
  };

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getUsers(pagination).then((res) => {
        if (isMounted.current) {
          setTableData({ data: res, pagination: { current: 0, total: 10, pageSize: 2 }, loading: false });
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

  const getColorForRole = (role: Role) => {
    switch (role) {
      case Role.Admin:
        return 'var(--error-color)';
      case Role.Teacher:
        return 'var(--success-color)';
      case Role.Student:
        return 'var(--primary-color)';
      default:
        return 'var(--primary-color)';
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: t('iot.tables.users.name'),
      render: (text: string, record) => (
        <span>
          {record.lastName} {record.firstName} {record.username}
        </span>
      ),
    },
    {
      title: t('iot.tables.users.role'),
      render: (text: string, record) => <span>{record.roles.find((x) => x !== undefined)}</span>,
      filterMode: 'tree',
      filterSearch: true,
      filters: [
        {
          text: t('iot.roles.admin'),
          value: Role.Admin,
        },
        {
          text: t('iot.roles.teacher'),
          value: Role.Teacher,
        },
        {
          text: t('iot.roles.student'),
          value: Role.Student,
        },
      ],
      onFilter: (value: string | number | boolean, record: User) => record.roles.toString() === value,
      showSorterTooltip: false,
    },
    {
      title: 'Действие назначения роли',
      dataIndex: 'actions',
      width: '40%',
      render: (text: string, record) => {
        if (record.roles.length > 0 && record.roles[0] === Role.Default) {
          return (
            <div style={{ display: 'flex' }}>
              <Button
                block
                type="primary"
                style={{
                  background: getColorForRole(Role.Student),
                  marginRight: '10px',
                }}
                onClick={() => {
                  changeRole(record.id, Role.Student).then((r) => {
                    if (r.ok) {
                      notificationController.info({ message: 'Роль изменена на Студента' });
                      updateData();
                    }
                  });
                }}
              >
                {'Назначить студентом'}
              </Button>
              <Button
                block
                type="primary"
                style={{
                  background: getColorForRole(Role.Teacher),
                }}
                onClick={() => {
                  changeRole(record.id, Role.Teacher).then((r) => {
                    if (r.ok) {
                      notificationController.info({ message: 'Роль изменена на Преподавателя' });
                      updateData();
                    }
                  });
                }}
              >
                {
                  // t('tables.invite')
                  'Назначить преподавателем'
                }
              </Button>
            </div>
          );
        }
        return <></>;
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
