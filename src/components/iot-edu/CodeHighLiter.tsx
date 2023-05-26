import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import arduino from 'react-syntax-highlighter/dist/cjs/languages/hljs/arduino';
import { arduinoLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { getFileContent } from '@app/api/iot-edu/TaskService';
import { useNavigate } from 'react-router-dom';
import { log } from 'echarts/types/src/util/log';

SyntaxHighlighter.registerLanguage('arduino', arduino);
export const CodeHighLiter: React.FC<{ studentTaskId: number }> = ({ studentTaskId }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { color } = { color: themeObject[theme].background };
  const [code, setCode] = useState(``);
  const navigate = useNavigate();
  useEffect(() => {
    getFileContent(studentTaskId).then((r) => setCode(r));
  });
  return (
    <div>
      <SyntaxHighlighter
        language="arduino"
        style={arduinoLight}
        showLineNumbers={true}
        customStyle={{ backgroundColor: color }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
