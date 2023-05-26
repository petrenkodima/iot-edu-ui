import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Option, Select } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import { Input } from 'antd';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const AdminCourseForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: t('common.success') });
      console.log(values);
    }, 1000);
  };

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
        name="select-multiple-groups"
        label={t('iot.forms.add-course.group-select-title')}
        rules={[{ required: true, message: t('forms.validationFormLabels.colorError'), type: 'array' }]}
      >
        <Select mode="multiple" placeholder={t('iot.forms.add-course.group-select-placeholder')}>
          <Option value={'ИТ-31'}>{'ИТ-31'}</Option>
          <Option value={'ЗИ-21'}>{'ЗИ-21'}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="select-multiple-teachers"
        label={t('iot.forms.add-course.teacher-select-title')}
        rules={[{ required: true, message: t('forms.validationFormLabels.colorError'), type: 'array' }]}
      >
        <Select mode="multiple" placeholder={t('iot.forms.add-course.teacher-select-placeholder')}>
          <Option value={'Петров А.С.'}>{'Петров А.С.'}</Option>
          <Option value={'Назаров А.В.'}>{'Назаров А.В.'}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name"
        label={t('iot.forms.add-course.name')}
        rules={[{ required: true, message: t('forms.validationFormLabels.colorError'), type: 'array' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="description"
        label={t('iot.forms.add-course.description')}
        rules={[{ required: true, message: t('forms.validationFormLabels.colorError'), type: 'array' }]}
      >
        <Input.TextArea rows={4} />
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};
