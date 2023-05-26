import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { whoIam } from '@app/api/iot-edu/AuthApi';
import { notificationController } from '@app/controllers/notificationController';
import { saveRole } from '@app/services/localStorage.service';

interface LoginFormData {
  email: string;
  password: string;
}

export const initValues: LoginFormData = {
  email: '',
  password: '',
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    const key = Buffer.from(`${values.email}:${values.password}`).toString('base64');
    console.log(key);
    whoIam(key)
      .then(async (res) => {
        if (res.status == 200) {
          const role = await res.json();
          //todo move  to servise
          localStorage.setItem('key', key);
          localStorage.setItem('login', values.email);
          saveRole(role);
          navigate('/');
        } else {
          notificationController.error({ message: 'Ошибка при авторизации' });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <Auth.FormTitle>{'Войдите или зарегистрируйтесь'}</Auth.FormTitle>
        <S.LoginDescription>{'Введите логин и пароль'}</S.LoginDescription>
        <Auth.FormItem name="email" label={'Логин'} rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInput placeholder={'Логин'} />
        </Auth.FormItem>
        <Auth.FormItem label={'Пароль'} name="password" rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInputPassword placeholder={'Пароль'} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {'Войти'}
          </Auth.SubmitButton>
        </BaseForm.Item>

        <Auth.FooterWrapper>
          <Auth.Text>
            {'Нет аккаунта? Нажмите здесь '}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{'регистрация'}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
