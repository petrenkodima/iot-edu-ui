import { Row } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { GroupTable } from '@app/components/iot-edu/tables/GroupTable';
import { CircleButtonWithRole } from '@app/components/iot-edu/CircleButtonWithRole';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from '@app/api/iot-edu/FetchDataWithToken';

export const ListGroups: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  const navigate = useNavigate();
  return (
    <>
      {/*todo constatn*/}
      <Row justify="center" style={{ position: 'relative' }}>
        <h2 style={{ fontSize: '2.5em' }}>{t('iot.list-groups-nav-title')}</h2>
        <CircleButtonWithRole role={ADMIN} onClick={() => navigate(`/iot-edu/add-group`)} />
      </Row>
      <GroupTable />
    </>
  );
};
