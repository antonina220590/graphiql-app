import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { t } from 'i18next';

import CodeEditor from './CodeEditor';
import UrlInputGroup from './URLInputGroup';
import handleFormatCode from '../../GRAPHQL/helpers/handleFormatCode';
import ResponsePanel from './ResponsePanel';

interface ContentProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  urlSDL: string;
  setUrlSDL: React.Dispatch<React.SetStateAction<string>>;
  handleRequest: () => Promise<void>;
  handleSDLRequest: () => void;
  saveToLS: () => void;
  statusCode: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  responseData: string;
  handleFocusOutCallback: () => void;
}

const Content: React.FC<ContentProps> = ({
  url,
  setUrl,
  urlSDL,
  setUrlSDL,
  handleRequest,
  handleSDLRequest,
  saveToLS,
  statusCode,
  query,
  setQuery,
  responseData,
  handleFocusOutCallback,
}) => (
  <div className="flex flex-col gap-4">
    <UrlInputGroup
      url={url}
      setUrl={setUrl}
      urlSDL={urlSDL}
      setUrlSDL={setUrlSDL}
      handleRequest={handleRequest}
      handleSDLRequest={handleSDLRequest}
      saveToLS={saveToLS}
    />
    <div className="flex items-center mb-2">
      <div className="mr-2 font-semibold">{t('graphql.status')}</div>
      <div className="border p-2 rounded bg-dark flex-1 text-white min-h-10">
        {statusCode}
      </div>
    </div>
    <div className="relative flex flex-row justify-center">
      <ResizablePanelGroup
        direction="horizontal"
        className="relative max-w-md rounded-lg border md:min-w-[100%] min-h-[60svh]"
      >
        <ResizablePanel defaultSize={50}>
          <CodeEditor
            query={query}
            setQuery={setQuery}
            onFormat={() => handleFormatCode({ query, t, setQuery })}
            onBlur={handleFocusOutCallback}
            onUpdate={handleFocusOutCallback}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResponsePanel responseData={responseData} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </div>
);

export default Content;
