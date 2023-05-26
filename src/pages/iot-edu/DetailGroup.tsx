import { Card, Row, Tag } from 'antd';
import React from 'react';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { useTranslation } from 'react-i18next';

export const DetailGroup: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const iconActionColor = { color: themeObject[theme].primary };
  return (
    <>
      {/*todo constatn*/}
      <Row justify="center">
        {/*todo translate*/}
        <h2 style={{ fontSize: '2.5em' }}>{'Информация о группе'}</h2>
      </Row>
      {/*//todo translate*/}
      <Card style={{ border: 'none' }}>
        <p style={{ fontSize: '2em' }}>Название: ИТ-41</p>
        <p>Описание: </p>
        <p>
          <Card>
            Лорем ипсум долор сит амет, ут нам ферри лаореет трацтатос, ад татион пхаедрум мел, зрил солута детрацто хис
            но. Ид цоммодо вертерем цум, ат идяуе толлит иуварет дуо. Мел ин вирис аетерно бонорум, вим прима граеце
            нумяуам ат, суас дицам волуптатум ид цум. При но солет делецтус адиписцинг. Вим пхаедрум лаборамус но. Ад
            вереар вивендо пертинах.
          </Card>
        </p>
        <p>Cтуденты: </p>
        <p>
          <Card>
            <Tag>
              <a href="#">Иванов А.И.</a>
            </Tag>
            <Tag>
              <a href="#">Петров В. А.</a>
            </Tag>
            <Tag>
              <a href="#">Круглов А.К.</a>
            </Tag>
          </Card>
        </p>
      </Card>
    </>
  );
};
