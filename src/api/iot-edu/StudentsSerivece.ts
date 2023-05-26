import { baseUrl } from '@app/api/iot-edu/config';
import fetchDataWithToken from '@app/api/iot-edu/FetchDataWithToken';
import { NavigateFunction } from 'react-router-dom';

export const studentsUrlApi = '/students';

export const getAllStudents = (navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Student[]>(`${baseUrl}${studentsUrlApi}`, options, [], navigate).then((data) => data.data);
};

export interface Student {
  id: number;
  user: User;
  roles: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}
