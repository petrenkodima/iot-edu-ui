import { Button, Card, Col, Modal, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { notificationController } from '@app/controllers/notificationController';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTaskModel, existTask, getDetailTaskForStudent } from '@app/api/iot-edu/TaskService';
import { getDateFromString } from '@app/utils/iot-edu/util';
import { executeScript } from '@app/api/iot-edu/ExecutorService';
import { GradeComponent } from '@app/components/iot-edu/GradeComponent';
import { CodeHighLiter } from '@app/components/iot-edu/CodeHighLiter';

//todo add model
export interface Group {
  id: number;
  name: string;
  countStudents: number;
}

export const DetailStudentTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkExistTask, setCheckExistTask] = useState<boolean>(false);
  const [data, setData] = useState<DetailTaskModel>({
    grade: 0,
    task: { name: '', description: '' },
  } as DetailTaskModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  const showModal = (studentTaskId: number) => {
    setCurrentTaskId(studentTaskId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    existTask(id ?? '', navigate).then((data) => {
      if (!data.error) {
        if (data.data) {
          setCheckExistTask(data.data);
        } else {
          navigate(`/iot-edu/task-form/${id}`);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (checkExistTask) {
      getDetailTaskForStudent(id ?? '', navigate).then((res) => setData(res));
    }
  }, [checkExistTask]);

  const onFinish = async (values = {}) => {
    if (id !== undefined) {
      executeScript(`${data.id}`, navigate).then((task) => {
        if (!task.error) {
          navigate('/iot-edu/stands-queue');
          setTimeout(() => {
            console.log(task);
            notificationController.success({ message: `Задание помещено в очередь ID: ${task.data.id}` });
          }, 1000);
        }
      });
    }
  };

  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  return (
    <>
      {/*todo constatn*/}
      <Modal title="Файл студента" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CodeHighLiter studentTaskId={currentTaskId} />
      </Modal>
      <Row justify="center">
        <h2 style={{ fontSize: '2.5em' }}>{data.task.name}</h2>
      </Row>
      <p>Описание: </p>
      <p>
        <Card>{data.task.description}</Card>
      </p>
      <p>
        <span style={{ paddingRight: '0.5em' }}>Срок сдачи:</span>
        <Tag color="#2db7f5">20:00 10.03.2023</Tag>
      </p>
      <p>
        <span style={{ paddingRight: '0.5em' }}> Оценка:</span>
        <GradeComponent grade={data.grade} />
      </p>
      <p style={{ fontSize: '1.5em' }}>Ответ cтудента: </p>
      <Card>
        <Row gutter={[50, 50]} style={{ paddingTop: '20px' }}>
          <Col>
            <p style={{ margin: '0px', marginBottom: '10px' }}>
              Прикрепленный файл: <Tag color="#f50">{data.filePath}</Tag>
            </p>
            <p style={{ margin: '0px' }}>
              Дата прикрепления:{' '}
              <Tag color="#87d068">
                {getDateFromString(data.createdAt).toLocaleTimeString()}{' '}
                {getDateFromString(data.createdAt).toLocaleDateString()}
              </Tag>
            </p>
          </Col>
          <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              onClick={onFinish}
              type="primary"
              style={{ background: 'rgba(255,102,102,0.75)', marginBottom: '15px' }}
            >
              Запустить на стенде
            </Button>
            <Button onClick={() => showModal(data.id)} type="primary" style={{ background: '#2980b9' }}>
              Просмотреть файл
            </Button>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => navigate(`/iot-edu/task-form/${id}`)}
              type="primary"
              style={{ background: 'rgba(255,153,102,0.75)' }}
            >
              Изменить файл
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
