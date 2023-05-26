import { baseUrl } from '@app/api/iot-edu/config';
import fetchDataWithToken from '@app/api/iot-edu/FetchDataWithToken';
import { NavigateFunction } from 'react-router-dom';

export const addCourseUrlApi = '/courses';

export const getAllCourses = (navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Course[]>(`${baseUrl}${addCourseUrlApi}`, options, [], navigate).then((data) => data.data);
};

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface CreateCourseDto {
  id: number;
  name: string;
  groupsIds: number[];
}

export const createCourse = (createCourse: CreateCourseDto, navigate: NavigateFunction) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(createCourse),
  };
  const initialValue = {} as Course;
  return fetchDataWithToken<Course>(`${baseUrl}${addCourseUrlApi}`, options, initialValue, navigate).then(
    (data) => data.data,
  );
};
