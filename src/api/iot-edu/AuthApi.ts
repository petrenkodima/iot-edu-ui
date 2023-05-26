import { baseUrl } from '@app/api/iot-edu/config';
import { SignUpFormData } from '@app/components/auth/SignUpForm/SignUpForm';
import { getToken } from '@app/api/iot-edu/FetchDataWithToken';
import { Pagination } from '@app/api/table.api';
import { Role } from '@app/api/iot-edu/table.api';

export const url = '/whoiam';

export const whoIam = (key: string) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      Authorization: `Basic ${key}`,
    },
  };
  return fetch(`${baseUrl}${url}`, options);
};

export const registerUrl = '/register/save';

export const register = (model: SignUpFormData) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(model),
  };
  return fetch(`${baseUrl}${registerUrl}`, options);
};

export const getUsers = (pagination: Pagination) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      Authorization: getToken(),
    },
  };
  return fetch(`${baseUrl}/users`, options).then((data) => data.json());
};

export const changeRole = (userId: number, role: Role) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: getToken(),
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      userId,
      role: role.toString(),
    }),
  };
  return fetch(`${baseUrl}/change_role`, options);
};
