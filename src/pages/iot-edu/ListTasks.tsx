import { Button, Row } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useTranslation } from 'react-i18next';
import { ListTable } from '@app/components/iot-edu/tables/ListTable';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole, TEACHER } from '@app/api/iot-edu/FetchDataWithToken';
import { PlusOutlined } from '@ant-design/icons';
import { CircleButtonWithRole } from '@app/components/iot-edu/CircleButtonWithRole';

export const ListTasks: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const checkCourseId = (courseId: string | undefined) => {
    if (courseId !== undefined) {
      return <ListTable courseId={id ?? ''} />;
    } else {
      return <div>Not found course</div>;
    }
  };

  return (
    <>
      {/*todo constatn*/}
      <Row justify="center" style={{ position: 'relative' }}>
        <h2 style={{ fontSize: '2.5em' }}>{'Cписок заданий'}</h2>
        <CircleButtonWithRole role={TEACHER} onClick={() => navigate(`/iot-edu/add-teacher-task/${id ?? ''}`)} />
      </Row>
      {checkCourseId(id)}
    </>
  );
};
