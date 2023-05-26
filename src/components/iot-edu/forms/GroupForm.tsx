import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Option, Select } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import { Input } from 'antd';
import { Course, createCourse, CreateCourseDto, getAllCourses } from '@app/api/iot-edu/CourseSerivece';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, Student } from '@app/api/iot-edu/StudentsSerivece';
import { createGroup, CreateGroupDto } from '@app/api/iot-edu/GroupSerivece';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const GroupForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (newGroup: CreateGroupDto = {} as CreateGroupDto) => {
    setLoading(true);
    createGroup(newGroup, navigate)
      .then((res) => {
        setFieldsChanged(false);
        notificationController.success({ message: t('common.success') });
        navigate('/iot-edu/list-groups');
      })
      .finally(() => setLoading(false));
  };

  const studentsOptions = () => {
    return students.map((s) => (
      <Option key={s.id} value={s.id}>
        {s.user.lastName} {s.user.firstName} {s.user.username}
      </Option>
    ));
  };

  useEffect(() => {
    getAllStudents(navigate).then((list) => setStudents(list));
  }, []);
  return (
    //todo translate
    <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="validateForm"
      footer={
        <BaseButtonsForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('iot.forms.add-course.submit-btn')}
          </Button>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
      <BaseButtonsForm.Item
        name="studentsIds"
        label={'Студенты'}
        rules={[{ required: true, message: 'Необходимо выбрать студентов', type: 'array' }]}
      >
        <Select mode="multiple" placeholder={'Выберите студентов'}>
          {studentsOptions()}
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name"
        label={'Название группы'}
        rules={[{ required: true, message: 'Введите название', type: 'string' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="description"
        label={t('iot.forms.add-course.description')}
        rules={[{ required: true, message: 'Введите описание', type: 'string' }]}
      >
        <Input.TextArea rows={4} />
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};
