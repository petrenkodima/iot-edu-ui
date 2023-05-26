import { Row } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { UserTable } from '@app/components/iot-edu/tables/UserTable';

//todo add model
export interface Group {
  id: number;
  name: string;
  countStudents: number;
}

export const ListUsers: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  return (
    <>
      {/*todo constatn*/}
      <Row justify="center">
        <h2 style={{ fontSize: '2.5em' }}>{t('iot.list-users-nav-title')}</h2>
      </Row>
      <UserTable />
    </>
  );
};
