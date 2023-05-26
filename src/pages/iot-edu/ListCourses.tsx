import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Course, getAllCourses } from '@app/api/iot-edu/CourseSerivece';
import { getRole, TEACHER } from '@app/api/iot-edu/FetchDataWithToken';

export function splitIntoSubArrays<T>(array: T[], size = 3): Array<Array<T>> {
  const subarray: Array<Array<T>> = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    subarray[i] = array.slice(i * size, i * size + size);
  }
  return subarray;
}

export const ListCourses: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cardClick = (id: number) => navigate(`${id}`);
  const iconActionColor = { color: themeObject[theme].primary };
  const addCourseCard = () => {
    if (getRole() === TEACHER) {
      return (
        <Card
          style={{ cursor: 'pointer' }}
          title={<div style={{ textAlign: 'center' }}>Добавить курс</div>}
          onClick={() => navigate('/iot-edu/list-courses/add')}
        >
          <div
            style={{
              //todo change to not px value
              width: '290px',
              //todo change to not px value
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusOutlined
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                fontSize: '600%',
              }}
            />
          </div>
        </Card>
      );
    }
    return <></>;
  };

  const [data, setData] = useState<Course[]>([]);
  useEffect(() => {
    getAllCourses(navigate).then((res) => setData(res));
  }, []);

  return (
    <>
      <Row justify="center">
        <h2 style={{ fontSize: '2.5em' }}>{t('iot.list-courses-nav-title')}</h2>
      </Row>
      <Row gutter={[25, 25]}>
        {data.map((course) => (
          <Col span={6} key={course.id}>
            <Card
              title={
                <div style={{ cursor: 'pointer' }} onClick={() => cardClick(course.id)}>
                  {course.name}
                </div>
              }
              key={course.id}
              actions={[
                <SettingOutlined key="setting" style={iconActionColor} />,
                <EditOutlined key="edit" style={iconActionColor} />,
                <EllipsisOutlined key="ellipsis" style={iconActionColor} />,
              ]}
            >
              <div
                style={{
                  width: '100%',
                  height: '100px',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {course.description}
              </div>
            </Card>
          </Col>
        ))}
        <Col>{addCourseCard()}</Col>
      </Row>
    </>
  );
};
