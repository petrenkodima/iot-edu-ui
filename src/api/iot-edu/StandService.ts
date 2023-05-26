import { NavigateFunction } from 'react-router-dom';
import fetchDataWithToken from '@app/api/iot-edu/FetchDataWithToken';
import { baseUrl } from '@app/api/iot-edu/config';

export const addStandUrlApi = '/stands';

export interface Stand {
  id: number;
  name: string;
  description: string;
  portName: string;
}

export const getAllStands = (navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Stand[]>(`${baseUrl}${addStandUrlApi}`, options, [], navigate).then((data) => data.data);
};
