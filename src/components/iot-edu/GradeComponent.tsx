import React from 'react';
import { Tag } from 'antd';

export const GradeComponent: React.FC<{ grade: number }> = ({ grade }) => {
  const getColor = (grade: number) => {
    if (grade > 0 && grade < 60) {
      return '#e74c3c';
    } else if (grade >= 60 && grade < 74) {
      return '#f39c12';
    } else if (grade >= 74 && grade < 90) {
      return '#2980b9';
    } else if (grade >= 90) {
      return '#2ecc71';
    }
    return 'orange';
  };

  return (
    <Tag color={getColor(grade)}>
      <span style={{ color: 'black' }}> {grade == 0 ? 'Не проверено' : grade}</span>
    </Tag>
  );
};
