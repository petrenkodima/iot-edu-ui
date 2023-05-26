import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { setGradeTask } from '@app/api/iot-edu/TaskService';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface GradeFormValue {
  grade: number;
}

export const GradeForm: React.FC<{ studentTaskId: number; updateLists: () => void }> = ({
  studentTaskId,
  updateLists,
}) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [grade, setGrade] = useState<{
    value: number;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: 1 });

  const onGradeChange = (value: number | null) => {
    setGrade({
      ...validateGradeNumber(value),
    });
  };

  const validateGradeNumber = (
    number: number | null,
  ): {
    value: number;
    validateStatus: ValidateStatus;
    errorMsg: string | null;
  } => {
    if (number !== null && number >= 1 && number <= 100) {
      return {
        validateStatus: 'success',
        errorMsg: null,
        value: number,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Значение от 1 до 100',
      value: 1,
    };
  };
  const onFinish = async ({ grade }: GradeFormValue) => {
    setLoading(true);
    console.log(grade);
    updateLists();
    setGradeTask(grade, studentTaskId, navigate)
      .then(() => {
        setFieldsChanged(false);
        updateLists();
      })
      .finally(() => setLoading(false));
  };

  return (
    <BaseButtonsForm
      style={{ height: '170px', width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="validateForm"
      footer={
        <BaseButtonsForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} hidden={!!grade.errorMsg}>
            {t('iot.forms.add-course.submit-btn')}
          </Button>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
      <BaseButtonsForm.Item
        name="grade"
        label={t('Оценка')}
        rules={[]}
        validateTrigger="onBlur"
        validateStatus={grade.validateStatus}
        help={grade.errorMsg}
      >
        <InputNumber value={grade.value} onChange={onGradeChange} style={{ width: '180px' }} />
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};
