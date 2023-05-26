import { baseUrl } from '@app/api/iot-edu/config';
import fetchDataWithToken from '@app/api/iot-edu/FetchDataWithToken';
import { NavigateFunction } from 'react-router-dom';

export const groupUrl = '/groups';

export const getAllGroups = (navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Group[]>(`${baseUrl}${groupUrl}`, options, [], navigate).then((data) => data.data);
};

export interface Group {
  id: number;
  name: string;
}

export interface CreateGroupDto {
  id: number;
  name: string;
  description: string;
  studentsIds: number[];
  coursesIds: number[];
}

export const createGroup = (createGroup: CreateGroupDto, navigate: NavigateFunction) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(createGroup),
  };
  const initialValue = {} as Group;
  return fetchDataWithToken<Group>(`${baseUrl}${groupUrl}`, options, initialValue, navigate).then((data) => data.data);
};
