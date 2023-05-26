import { Row } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { AddTeacherTaskForm } from '@app/components/iot-edu/forms/AddTeacherTaskForm';
import { useParams } from 'react-router-dom';

//todo add model
export interface Group {
  id: number;
  name: string;
  countStudents: number;
}

export const AddTeacherTaskPage: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  const { course_id } = useParams();
  return (
    <>
      {/*todo constatn*/}
      <Row justify="center">
        <h2 style={{ fontSize: '2.5em' }}>{'Добавить задание'}</h2>
      </Row>
      <AddTeacherTaskForm course_id={course_id ?? ''} />
    </>
  );
};
