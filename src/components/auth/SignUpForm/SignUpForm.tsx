import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import { register } from '@app/api/iot-edu/AuthApi';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const initValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  termOfUse: true,
};

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (values: SignUpFormData) => {
    setLoading(true);

    register(values)
      .then((res) => {
        notificationController.success({
          message: 'Пользователь успешно зарегистрирован',
          description: 'Ожидайте выдачу прав для пользователя',
        });
        if (res.status === 200) {
          navigate('/auth/login');
        } else {
          notificationController.error({ message: `Ошибка при регистрации` });
        }
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Title>{'Регистрация'}</S.Title>
        </div>
        <Auth.FormItem name="firstName" label={'Имя'} rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInput placeholder={'Имя'} />
        </Auth.FormItem>

        <Auth.FormItem name="lastName" label={'Фамилия'} rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInput placeholder={'Фамилия'} />
        </Auth.FormItem>
        <Auth.FormItem name="username" label={'Логин'} rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInput placeholder={'Логин'} />
        </Auth.FormItem>
        <Auth.FormItem label={'Пароль'} name="password" rules={[{ required: true, message: 'Поле обязательно' }]}>
          <Auth.FormInputPassword placeholder={'Пароль'} />
        </Auth.FormItem>
        <Auth.FormItem
          label={'Повторение пароля'}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Поле обязательно' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={'Повторение пароля'} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {'Зарегистрироваться'}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {'Есть аккаунт нажмите'}{' '}
            <Link to="/auth/login">
              <Auth.LinkText>{'здесь чтобы войти'}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
