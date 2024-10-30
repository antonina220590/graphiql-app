import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { SparklesIcon } from '@heroicons/react/24/solid';

import HeadersPanel from '../headers/headers';

interface CodeEditorProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onFormat: () => void;
  onBlur: () => void;
  onUpdate: () => void;
}

export default function CodeEditor({
  query,
  setQuery,
  onFormat,
  onBlur,
  onUpdate,
}: CodeEditorProps) {
  return (
    <div className="relative flex h-[100%] items-center justify-center bg-[#c8c8c8]">
      <div className="absolute right-2 top-2 z-10">
        <button
          className="flex items-center justify-center w-10 h-10 text-white p-1 m-1 col-span-1"
          onClick={onFormat}
        >
          <SparklesIcon className="h-15 w-15 text-[#fe6d12]" />
        </button>
      </div>
      <div className="flex-grow p-2 min-h-full overflow-auto">
        <HeadersPanel onUpdate={onUpdate} />
        <CodeMirror
          data-testid="queryPanel"
          height="700px"
          width="100%"
          value={query}
          theme="dark"
          placeholder="Write your GraphQL query here"
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setQuery(value)}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
