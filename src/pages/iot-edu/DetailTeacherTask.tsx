import { Button, Card, Col, Modal, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { notificationController } from '@app/controllers/notificationController';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DetailTeacherTaskModel,
  getDetailTeacherTaskForStudent,
  Task,
  TeacherLabTaskDto,
} from '@app/api/iot-edu/TaskService';
import { getDateFromString } from '@app/utils/iot-edu/util';
import { executeScript } from '@app/api/iot-edu/ExecutorService';
import { GradeForm } from '@app/components/iot-edu/forms/GradeForm';
import { CodeHighLiter } from '@app/components/iot-edu/CodeHighLiter';

export const DetailTeacherTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<DetailTeacherTaskModel>({
    task: {
      name: '',
      id: 0,
      description: '',
      duration: 0,
      stand: { name: '', id: 0, description: '', portName: '' },
    } as Task,
    tasks: [],
  } as DetailTeacherTaskModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
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
  const updateData = () => {
    getDetailTeacherTaskForStudent(id ?? '', navigate).then((res) => setData(res));
  };

  const onFinish = async (id: number) => {
    if (id !== undefined) {
      executeScript(`${id}`, navigate).then((task) => {
        if (!task.error) {
          navigate('/iot-edu/stands-queue');
          setTimeout(() => {
            notificationController.success({ message: `Задание помещено в очередь ID: ${task.data.id}` });
          }, 1000);
        }
      });
    }
  };

  const allTasks = () => data.tasks.map((task) => <div key={task.id}>{studentCard(task)}</div>);

  const studentCard = (task: TeacherLabTaskDto) => (
    <Card style={{ marginBottom: '20px' }}>
      <Row gutter={[50, 50]} style={{ paddingTop: '20px' }}>
        <Col>
          <p>Ответ cтудента: {task.studentName}</p>
          {/*<p>Оценка: <GradeComponent grade={task.grade}/></p>*/}
          <p style={{ margin: '0px', marginBottom: '10px' }}>
            Прикрепленный файл: <Tag color="#f50">{task.filePath}</Tag>
          </p>
          <p style={{ margin: '0px' }}>
            Дата прикрепления:{' '}
            <Tag color="#87d068">
              {getDateFromString(task.createdAt).toLocaleTimeString()}{' '}
              {getDateFromString(task.createdAt).toLocaleDateString()}
            </Tag>
          </p>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <GradeForm updateLists={updateData} studentTaskId={task.id} />
        </Col>
        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '33px' }}>
          <Button
            onClick={() => onFinish(task.id)}
            type="primary"
            style={{ background: 'rgba(255,102,102,0.75)', marginBottom: '15px' }}
          >
            Запустить на стенде
          </Button>
          <Button onClick={() => showModal(task.id)} type="primary" style={{ background: '#2980b9' }}>
            Просмотреть файл
          </Button>
        </Col>
      </Row>
    </Card>
  );

  useEffect(() => {
    updateData();
  }, []);

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
      {data.tasks.length > 0 ? (
        <>
          <p style={{ fontSize: '1.5em' }}>Задания на проверку:</p>
          {allTasks()}
        </>
      ) : (
        <>
          {' '}
          <p style={{ fontSize: '1.5em' }}>Нет заданий на проверку</p>
        </>
      )}
    </>
  );
};
