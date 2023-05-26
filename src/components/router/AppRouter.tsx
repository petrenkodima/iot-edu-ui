import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import { withLoading } from '@app/hocs/withLoading.hoc';
import { ListCourses } from '@app/pages/iot-edu/ListCourses';
import { ListGroups } from '@app/pages/iot-edu/ListGroups';
import { ListUsers } from '@app/pages/iot-edu/ListUsers';
import { AddCoursePage } from '@app/pages/iot-edu/AddCoursePage';
import { DetailCourse } from '@app/pages/iot-edu/DetailCourse';
import { AddGroupPage } from '@app/pages/iot-edu/AddGroupPage';
import { DetailGroup } from '@app/pages/iot-edu/DetailGroup';
import { ListTeachers } from '@app/pages/iot-edu/ListTeachers';
import { CalendarTasks } from '@app/pages/iot-edu/CalendarTasks';
import { AddTaskForm } from '@app/pages/iot-edu/AddTaskForm';
import { DetailTeacherTask } from '@app/pages/iot-edu/DetailTeacherTask';
import { ListTasks } from '@app/pages/iot-edu/ListTasks';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import { DetailStudentTask } from '@app/pages/iot-edu/DetailStudentTask';
import { StandsQueueList } from '@app/pages/iot-edu/StandsQueueList';
import { AddTeacherTaskPage } from '@app/pages/iot-edu/AddTeacherTaskPage';
import { MainPage } from '@app/pages/iot-edu/MainPage';
import { AdminPage } from '@app/pages/iot-edu/AdminPage';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));

const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

const AuthLayoutFallback = withLoading(AuthLayout);

export const AppRouter: React.FC = () => {
  const Logout = () => {
    localStorage.clear();
    return <Navigate to={'/auth/login'} replace />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path={'/iot-edu'} element={<MainLayout />}>
          <Route path={'list-courses'} element={<ListCourses />} />
          <Route path={'admin-page'} element={<AdminPage />} />
          <Route path={'list-courses/add'} element={<AddCoursePage />} />
          <Route path={'list-courses/:id'} element={<ListTasks />} />
          <Route path={'detail-task/:id'} element={<DetailStudentTask />} />
          <Route path={'list-groups'} element={<ListGroups />} />
          <Route path={'list-users'} element={<ListUsers />} />
          <Route path={'detail-course'} element={<DetailCourse />} />
          <Route path={'add-group'} element={<AddGroupPage />} />
          <Route path={'detail-group'} element={<DetailGroup />} />
          <Route path={'list-teachers'} element={<ListTeachers />} />
          <Route path={'calendar-tasks'} element={<CalendarTasks />} />
          <Route path={'task-form/:id'} element={<AddTaskForm />} />
          <Route path={'detail-teacher-task/:id'} element={<DetailTeacherTask />} />
          <Route path={'add-teacher-task/:course_id'} element={<AddTeacherTaskPage />} />
          <Route path={'stands-queue'} element={<StandsQueueList />} />
        </Route>
        <Route path="server-error" element={<ServerError />} />
        <Route path="404" element={<Error404 />} />
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};
