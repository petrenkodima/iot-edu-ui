import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@app/api/table.api';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { getAllTasksForCourse, Task } from '@app/api/iot-edu/TaskService';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRole, STUDENT, TEACHER } from '@app/api/iot-edu/FetchDataWithToken';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const ListTable: React.FC<{ courseId: string }> = ({ courseId }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const iconActionColor = { color: themeObject[theme].primary };
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [data, setData] = useState<Task[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllTasksForCourse(courseId, navigate).then((res) => setData(res));
  }, []);

  const columns: ColumnsType<Task> = [
    {
      title: 'id',
      dataIndex: 'id',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Продолжительность',
      dataIndex: 'duration',
      render: (text: string) => <span>{text}</span>,
    },
  ];

  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (getRole() === TEACHER) {
              navigate(`/iot-edu/detail-teacher-task/${record.id}`);
            } else if (getRole() === STUDENT) {
              navigate(`/iot-edu/detail-task/${record.id}`);
            }
          },
        };
      }}
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: 800 }}
      bordered
    />
  );
};
