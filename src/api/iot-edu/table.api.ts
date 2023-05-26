import { Pagination } from '@app/api/table.api';
import { Group } from '@app/api/iot-edu/GroupSerivece';

export interface BasicGroupData {
  data: Group[];
  pagination: Pagination;
}

export enum Role {
  Admin = 'ADMIN',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Default = 'DEFAULT',
}

export interface BasicUserData {
  data: User[];
  pagination: Pagination;
}

export interface BasicTeacherData {
  data: Teacher[];
  pagination: Pagination;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  roles: Role[];
}

export interface Teacher {
  id: number;
  user: User;
  nameCourses: string[];
}

export const getBasicGroupList = (pagination: Pagination): Promise<BasicGroupData> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: [
          {
            id: 1,
            //todo need or remove countStudents
            // countStudents: 20,
            name: 'ИТ-21',
          },
          {
            id: 2,
            // countStudents: 30,
            name: 'ЗИ-41',
          },
          {
            id: 3,
            // countStudents: 30,
            name: 'ЗИ-41',
          },
          {
            id: 4,
            // countStudents: 30,
            name: 'ЗИ-41',
          },
          {
            id: 5,
            // countStudents: 30,
            name: 'ЗИ-41',
          },
        ],
        pagination: { ...pagination, total: 20 },
      });
    }, 1000);
  });
};

export const getBasicTeacherList = (pagination: Pagination): Promise<BasicTeacherData> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: [
          {
            id: 1,
            user: {
              id: 1,
              firstName: 'Артур',
              lastName: 'Назаров',
              username: 'Solomon',
              roles: [Role.Admin],
            },
            nameCourses: [
              'Интелектуальные системы и технологии',
              'Информационные сети',
              'Информатика',
              'Теория вероятностей и математическая статистика',
              'Технологии баз данных',
            ],
          },
        ],
        pagination: { ...pagination, total: 20 },
      });
    }, 1000);
  });
};
