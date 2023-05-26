import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import { Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createTask, CreateTaskDto } from '@app/api/iot-edu/TaskService';
import { getAllStands, Stand } from '@app/api/iot-edu/StandService';
import { Option, Select } from '@app/components/common/selects/Select/Select';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const AddTeacherTaskForm: React.FC<{ course_id: string }> = ({ course_id }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stands, setStands] = useState<Stand[]>([]);

  useEffect(() => {
    getAllStands(navigate).then((data) => setStands(data));
  }, []);

  const StandsOptions = () =>
    stands.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  const onFinish = async (newTask: CreateTaskDto = {} as CreateTaskDto) => {
    setLoading(true);
    createTask(newTask, navigate)
      .then((res) => {
        setFieldsChanged(false);
        notificationController.success({ message: t('common.success') });
        navigate(`/iot-edu/list-courses/${course_id}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="validateForm"
      initialValues={{
        courseId: course_id,
      }}
      footer={
        <BaseButtonsForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('iot.forms.add-course.submit-btn')}
          </Button>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
      <BaseButtonsForm.Item name="courseId" style={{ display: 'none' }}>
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name"
        label={t('Название задания')}
        rules={[{ required: true, message: t('Заполните данное поле') }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="standId"
        label={t('Стенд')}
        rules={[{ required: true, message: t('Заполните данное поле') }]}
      >
        <Select placeholder={t('Выберите стенд')}>{StandsOptions()}</Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item name="duration" label={t('Время на выполнение')}>
        <InputNumber style={{ width: '100%' }} />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="description"
        label={t('iot.forms.add-course.description')}
        rules={[{ required: true, message: t('Заполните данное поле') }]}
      >
        <Input.TextArea rows={4} />
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};
