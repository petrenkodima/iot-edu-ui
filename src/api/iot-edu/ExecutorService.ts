import { NavigateFunction } from 'react-router-dom';
import fetchDataWithToken from '@app/api/iot-edu/FetchDataWithToken';
import { baseExecutorUrl, baseUrl } from '@app/api/iot-edu/config';

export const pathExecutor = '/executor';

export const executeScript = (studentTaskId: string, navigate: NavigateFunction) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };

  const initialValue = {} as ExecuteTask;
  return fetchDataWithToken<ExecuteTask>(
    `${baseUrl}${pathExecutor}?studentTaskId=${studentTaskId}`,
    options,
    initialValue,
    navigate,
  );
};

export const getQueueStands = (navigate: NavigateFunction) => {
  const options = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  return fetchDataWithToken<StandsQueue>(
    `${baseExecutorUrl}${'/task/queue_stands'}`,
    options,
    { queue: [] } as StandsQueue,
    navigate,
  ).then((data) => data.data);
};

export interface ExecuteTask {
  id: number;
}

export interface TaskQueue {
  initiatorUsername: string;
  status: string;
  labID: number;
  roleUsername: string;
  duration: number;
}

export interface StandsQueue {
  queue: StandQueue[];
}

export interface StandQueue {
  standId: number;
  queue: TaskQueue[];
}
