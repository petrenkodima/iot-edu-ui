import { useTranslation } from 'react-i18next';
import { InboxOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { UploadDragger } from '@app/components/common/Upload/Upload';
import { notificationController } from '@app/controllers/notificationController';
import TextArea from 'antd/lib/input/TextArea';
import { Row } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '@app/api/iot-edu/FetchDataWithToken';
import { baseUrl } from '@app/api/iot-edu/config';
import { getTaskById, Task } from '@app/api/iot-edu/TaskService';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const AddTaskForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<UploadFile>();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Task>();

  const onFinish = async (values = {}) => {
    setLoading(true);

    setFieldsChanged(false);
    console.log(file);
    const formData = new FormData();
    formData.append('file', file as RcFile);
    formData.append('taskId', String(id));
    fetch(`${baseUrl}/student_task`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: getToken(),
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/iot-edu/detail-task/${id}`);
        } else {
          notificationController.error({ message: 'Ошибка при загрузке файла' });
        }
      })
      .catch((err) => notificationController.error({ message: 'Ошибка при загрузке файла' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTaskById(id ?? '', navigate).then((r) => {
      setData(r);
    });
  });
  return (
    <>
      <Row justify="center">
        {/*todo translate*/}
        <h2 style={{ fontSize: '2.5em' }}>{'Добавить ответ на задание'}</h2>
      </Row>
      <Row>
        <p style={{ fontSize: '1.5em' }}>Название лабораторной: {data?.name}</p>
      </Row>
      <BaseButtonsForm
        {...formItemLayout}
        isFieldsChanged={isFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        name="validateForm"
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
        footer={
          <BaseButtonsForm.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {'Отправить'}
            </Button>
          </BaseButtonsForm.Item>
        }
        onFinish={onFinish}
      >
        {/*//todo uncomment comment field*/}
        {/*<BaseButtonsForm.Item name="comment" label={'Комментарий'}>*/}
        {/*  <TextArea rows={4} />*/}
        {/*</BaseButtonsForm.Item>*/}
        <BaseButtonsForm.Item label={'Файл'}>
          <BaseButtonsForm.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <UploadDragger
              maxCount={1}
              multiple={false}
              name="file"
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
            >
              <p>
                <InboxOutlined />
              </p>
              <p>{'Прикрепите файл с заданием'}</p>
            </UploadDragger>
          </BaseButtonsForm.Item>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
