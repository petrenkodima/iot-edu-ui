import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readRole } from '@app/services/localStorage.service';

enum Role {
  ROLE_STUDENT = 'ROLE_STUDENT',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_TEACHER = 'ROLE_TEACHER',
}

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const role = readRole() as Role;
    if (role === Role.ROLE_ADMIN) {
      navigate('/iot-edu/list-users');
    } else {
      navigate('/iot-edu/list-courses');
    }
  });
  return <></>;
};
