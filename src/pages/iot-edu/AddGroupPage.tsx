import { Row } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { GroupForm } from '@app/components/iot-edu/forms/GroupForm';

//todo add model
export interface Group {
  id: number;
  name: string;
  countStudents: number;
}

export const AddGroupPage: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  return (
    <>
      {/*todo constatn*/}
      <Row justify="center">
        {/*todo translate*/}
        <h2 style={{ fontSize: '2.5em' }}>{'Добавить группу'}</h2>
      </Row>
      <GroupForm />
    </>
  );
};
