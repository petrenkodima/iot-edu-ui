import { baseUrl } from '@app/api/iot-edu/config';
import fetchDataWithToken, { getToken } from './FetchDataWithToken';
import { NavigateFunction } from 'react-router-dom';
import { Course } from '@app/api/iot-edu/CourseSerivece';
import { Stand } from '@app/api/iot-edu/StandService';
import { url } from '@app/api/iot-edu/AuthApi';

export const pathTasks = '/tasks';
export const pathStudentTasks = '/student_task';

export const getTaskById = (taskId: string, navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Task>(`${baseUrl}${pathTasks}/${taskId}`, options, {} as Task, navigate).then(
    (data) => data.data,
  );
};

export const getAllTasksForCourse = (courseId: string, navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<Task[]>(`${baseUrl}${pathTasks}?courseId=${courseId}`, options, [], navigate).then(
    (data) => data.data,
  );
};

export const getDetailTaskForStudent = (labId: string, navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<DetailTaskModel>(
    `${baseUrl}${pathStudentTasks}/last_my_task?labId=${labId}`,
    options,
    {} as DetailTaskModel,
    navigate,
  ).then((data) => data.data);
};

export const getDetailTeacherTaskForStudent = (labId: string, navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<DetailTeacherTaskModel>(
    `${baseUrl}${pathStudentTasks}/teacher/${labId}`,
    options,
    {} as DetailTeacherTaskModel,
    navigate,
  ).then((data) => data.data);
};

export const existTask = (labId: string, navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<boolean>(
    `${baseUrl}${pathStudentTasks}/exist_my_task?labId=${labId}`,
    options,
    false,
    navigate,
  );
};

export interface Task {
  id: number;
  name: string;
  description: string;
  duration: number;
  stand: Stand;
}

export interface DetailTaskModel {
  id: number;
  grade: number;
  task: Task;
  //todo any
  teacher: any;
  student: any;
  filePath: string;
  //todo date
  createdAt: string;
}

export interface DetailTeacherTaskModel {
  task: Task;
  tasks: TeacherLabTaskDto[];
}

export interface TeacherLabTaskDto {
  id: number;
  studentName: string;
  grade: number;
  filePath: string;
  createdAt: string;
  teacherComment: string;
}

export interface CreateTaskDto {
  name: string;
  description: string;
  duration: number;
  standId: string;
  courseId: string;
}

export const createTask = (createTask: CreateTaskDto, navigate: NavigateFunction) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(createTask),
  };
  const initialValue = {} as Course;
  return fetchDataWithToken<Course>(`${baseUrl}${pathTasks}`, options, initialValue, navigate).then(
    (data) => data.data,
  );
};

export const setGradeTask = (grade: number, studentTaskId: number, navigate: NavigateFunction) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      grade,
      studentTaskId,
    }),
  };
  //todo
  const initialValue = 0;
  return fetchDataWithToken<number>(`${baseUrl}${pathStudentTasks}/grade`, options, initialValue, navigate).then(
    (data) => data.data,
  );
};

//todo fetchDataWithToken not work with string
export const getFileContent = (studentTaskId: number) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      Authorization: getToken(),
    },
  };
  return fetch(`${baseUrl}${pathStudentTasks}/file_content/${studentTaskId}`, options).then((data) => data.text());
};
