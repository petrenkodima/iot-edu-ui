import React, { useEffect, useState } from 'react';
import { Table } from 'components/common/Table/Table';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useMounted } from '@app/hooks/useMounted';
import { Pagination } from '@app/api/table.api';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { getAllGroups, Group } from '@app/api/iot-edu/GroupSerivece';
import { useNavigate } from 'react-router-dom';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const GroupTable: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const iconActionColor = { color: themeObject[theme].primary };
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<{ data: Group[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();
  const { isMounted } = useMounted();

  // const fetch = useCallback(
  //   (pagination: Pagination) => {
  //     setTableData((tableData) => ({ ...tableData, loading: true }));
  //     getBasicGroupList(pagination).then((res) => {
  //       if (isMounted.current) {
  //         setTableData({ data: res.data, pagination: res.pagination, loading: false });
  //       }
  //     });
  //   },
  //   [isMounted],
  // );

  // useEffect(() => {
  //   fetch(initialPagination);
  // }, [fetch]);
  //
  // const handleTableChange = (pagination: TablePaginationConfig) => {
  //   fetch(pagination);
  // };

  useEffect(() => {
    getAllGroups(navigate).then((groups) =>
      setTableData({
        data: groups,
        pagination: initialPagination,
        loading: false,
      }),
    );
  }, []);

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

  const columns: ColumnsType<Group> = [
    {
      title: t('iot.tables.group.name'),
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
      filterMode: 'tree',
      filterSearch: true,
      filters: [],
      onFilter: (value: string | number | boolean, record: Group) => record.name.includes(value.toString()),
    },
    //todo add count students
    // {
    //   title: t('iot.tables.group.countStudents'),
    //   dataIndex: 'countStudents',
    //   sorter: (a: Group, b: Group) => a.countStudents - b.countStudents,
    //   showSorterTooltip: false,
    // },
    //todo add actions
    // {
    //   title: t('iot.tables.actions'),
    //   dataIndex: 'actions',
    //   width: '15%',
    //   render: (text: string, record: { name: string; id: number }) => {
    //     return (
    //       <Row justify="space-around">
    //         <Button size={'small'}>
    //           <EditOutlined key="edit" style={iconActionColor} />
    //         </Button>
    //         <Button size={'small'} danger>
    //           <DeleteOutlined key="ellipsis" style={{ color: 'danger' }} />
    //         </Button>
    //       </Row>
    //     );
    //   },
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData.data}
      pagination={tableData.pagination}
      loading={tableData.loading}
      // onChange={handleTableChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};
