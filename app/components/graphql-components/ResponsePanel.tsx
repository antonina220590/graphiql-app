import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface ResponsePanelProps {
  responseData: string;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ responseData }) => {
  return (
    <div className="flex-grow p-2 min-h-full overflow-auto bg-[#c8c8c8]">
      <CodeMirror
        value={responseData}
        height="700px"
        width="100%"
        theme="dark"
        extensions={[javascript()]}
        readOnly
        placeholder="Response will be displayed here"
      />
    </div>
  );
};

export default ResponsePanel;
