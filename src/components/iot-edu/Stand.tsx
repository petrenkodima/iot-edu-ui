import React from 'react';
import { Card } from 'antd';
import { StandPlayer } from '@app/components/iot-edu/StandPlayer';
import { StandQueue, TaskQueue } from '@app/api/iot-edu/ExecutorService';
import { Table } from '@app/components/common/Table/Table';
import { ColumnsType } from 'antd/lib/table';

export const Stand: React.FC<{ title: string; queue: StandQueue }> = ({ title, queue }) => {
  const dataSource: TaskQueue[] = queue.queue;

  const columns: ColumnsType<TaskQueue> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Кем запущен',
      dataIndex: 'initiatorUsername',
      key: 'initiatorUsername',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Номер лабораторной',
      dataIndex: 'labID',
      key: 'labID',
    },
    {
      title: 'Роль',
      dataIndex: 'roleUsername',
      key: 'roleUsername',
    },
    {
      title: 'Время на выполнение',
      dataIndex: 'duration',
      key: 'duration',
    },
  ];

  return (
    <Card style={{ marginBottom: '40px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px' }}>{title}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StandPlayer />
      </div>
      <Card style={{ marginTop: '30px' }}>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </Card>
  );
};
