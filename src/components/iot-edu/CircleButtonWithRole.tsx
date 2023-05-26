import React from 'react';
import { Button } from 'antd';
import { getRole } from '@app/api/iot-edu/FetchDataWithToken';
import { PlusOutlined } from '@ant-design/icons';

export const CircleButtonWithRole: React.FC<{ role: string; onClick: () => void }> = ({ role, onClick }) => {
  if (getRole() === role) {
    return (
      <div style={{ position: 'absolute', right: '10px', top: '15px' }}>
        <Button size={'middle'} shape="circle" icon={<PlusOutlined style={{ fontSize: '140%' }} onClick={onClick} />} />
      </div>
    );
  }
  return <></>;
};
