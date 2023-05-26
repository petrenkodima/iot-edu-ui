import { notificationController } from '@app/controllers/notificationController';
import { NavigateFunction } from 'react-router-dom';

export interface FetchResponse<TResponse> {
  data: TResponse;
  status: number;
  error: boolean;
}

export const fetchDataWithToken = <TResponse>(
  url: string,
  config: RequestInit,
  initialResponse: TResponse,
  navigate: NavigateFunction,
): Promise<FetchResponse<TResponse>> => {
  config.headers = { ...config.headers, Authorization: getToken() };
  return fetch(url, config)
    .then(async (res) => {
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        return {
          data: data as TResponse,
          error: false,
          status: res.status,
        } as FetchResponse<TResponse>;
      } else if (res.status === 401) {
        notificationController.error({ message: 'Не авторизован' });
        navigate('/auth/login');
      } else if (res.status === 403) {
        navigate('/auth/login');
        notificationController.error({ message: 'Нет прав' });
      } else if (res.status === 404) {
        navigate('../');
        notificationController.error({ message: 'Ресурс не найден' });
      } else {
        notificationController.error({ message: ` Произошла ошибка: ${res.status}` });
      }
      return {
        data: initialResponse,
        error: true,
        status: res.status,
      } as FetchResponse<TResponse>;
    })
    .catch((res) => {
      return {
        data: initialResponse,
        error: false,
        status: res.status,
      } as FetchResponse<TResponse>;
    });
};

export default fetchDataWithToken;

export function getToken() {
  return `Basic ${localStorage.getItem('key')}`;
}

export function getRole() {
  return localStorage.getItem('role');
}

export const TEACHER = 'ROLE_TEACHER';
export const STUDENT = 'ROLE_STUDENT';
export const ADMIN = 'ROLE_ADMIN';
