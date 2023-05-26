import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Option, Select } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import { Input } from 'antd';
import { getAllGroups, Group } from '@app/api/iot-edu/GroupSerivece';
import { useNavigate } from 'react-router-dom';
import { createCourse, CreateCourseDto } from '@app/api/iot-edu/CourseSerivece';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const CourseForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    getAllGroups(navigate).then((data) => setGroups(data));
  }, []);
  const onFinish = async (newCourse: CreateCourseDto = {} as CreateCourseDto) => {
    setLoading(true);
    createCourse(newCourse, navigate)
      .then((res) => {
        setFieldsChanged(false);
        notificationController.success({ message: t('common.success') });
        navigate('/iot-edu/list-courses');
      })
      .finally(() => setLoading(false));
  };

  const GroupsOptions = () =>
    groups.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  return (
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
        name="groupsIds"
        label={t('iot.forms.add-course.group-select-title')}
        rules={[{ required: true, message: t('Заполните данное поле'), type: 'array' }]}
      >
        <Select mode="multiple" placeholder={t('iot.forms.add-course.group-select-placeholder')}>
          {GroupsOptions()}
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name"
        label={t('iot.forms.add-course.name')}
        rules={[{ required: true, message: t('Заполните данное поле') }]}
      >
        <Input />
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
