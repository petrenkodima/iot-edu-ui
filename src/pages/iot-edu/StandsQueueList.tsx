import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stand } from '@app/components/iot-edu/Stand';
import { getQueueStands, StandsQueue } from '@app/api/iot-edu/ExecutorService';

export const StandsQueueList: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const iconActionColor = { color: themeObject[theme].primary };
  const [data, setData] = useState<StandsQueue>({ queue: [] } as StandsQueue);

  useEffect(() => {
    const interval = setInterval(() => {
      getQueueStands(navigate).then((data) => setData(data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Row justify="center">
        <h2 style={{ fontSize: '2.5em' }}>{'Очередь выполнения заданий'}</h2>
      </Row>
      {data.queue.map((stand) => (
        <Stand key={stand.standId} title={'Stand ' + stand.standId} queue={stand}></Stand>
      ))}
    </>
  );
};
