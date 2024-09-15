'use client';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { MESSAGE, statusText } from './constants';
import RestParams from '../components/rest-components/RestParams';
import SelectMethod from '../components/rest-components/SelectMethod';
import RestHeders from '../components/rest-components/RestHeaders';
import generateEncodedUrl from './helpers/urlHelper';
import useUrlState from './helpers/useUrlState';
import HistoryBtn from '../components/historyButton/historyButton';
import ToggleButton from '../components/rest-components/ToggleButton';
const CodeMirror = dynamic(
  async () => {
    const { Controlled } = await import('react-codemirror2');
    await import('codemirror/lib/codemirror.css');
    await import('codemirror/theme/material.css');
    await import('codemirror/mode/javascript/javascript');
    return { default: Controlled };
  },
  {
    ssr: false,
  }
);

export default function RESTfullClient() {
  const { t } = useTranslation();
  const {
    url,
    setUrl,
    method,
    setMethod,
    headers,
    setHeaders,
    params,
    setParams,
    body,
    setBody,
  } = useUrlState();

  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [editorMode, setEditorMode] = useState('application/json');
  const [decodedURL, setDecodedURL] = useState<string>('');
  const [showVariables, setShowVariables] = useState(true);

  useEffect(() => {
    try {
      JSON.parse(body);
      setEditorMode('application/json');
    } catch (e) {
      setEditorMode('text/plain');
    }
  }, [body]);

  const handleSend = async () => {
    if (!url) {
      toast(MESSAGE.EMPTY);
      setResponse(MESSAGE.EMPTY);
      setStatusCode(`💁`);
      return;
    }

    const validHeaders = headers.filter(
      (header) => header.keyHeader && header.valueHeader
    );

    let requestBody;
    if (typeof body === 'object') {
      requestBody = JSON.stringify(body);
    } else {
      requestBody = body;
    }

    const options = {
      method: method,
      headers: Object.fromEntries(
        validHeaders.map((header) => [header.keyHeader, header.valueHeader])
      ),
      body: requestBody ? requestBody : undefined,
    };

    try {
      const res = await fetch(url, options);
      const statusMessage = statusText[res.status] || 'Unknown Status';
      setStatusCode(`${res.status} ${statusMessage}`);

      if (!res.ok) {
        let errorMessage = `${res.status} ${statusMessage}`;
        try {
          const errorData = await res.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (error) {
          toast('Failed to parse JSON error response');
        }
        toast.error(`Error: ${errorMessage}`);
      } else {
        const json = await res.json();
        setResponse(JSON.stringify(json, null, 2));
      }
    } catch (error) {
      setResponse(
        `Network Error: ${(error as Error).message || MESSAGE.UNKNOWN}`
      );
      toast.error(
        `Network Error: ${(error as Error).message || MESSAGE.UNKNOWN}`
      );
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { keyHeader: '', valueHeader: '' }]);
  };

  const addParam = () => {
    setParams([...params, { keyParam: '', valueParam: '' }]);
  };

  const handleHeaderChange = (
    index: number,
    field: 'keyHeader' | 'valueHeader',
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleParamChange = (
    index: number,
    field: 'keyParam' | 'valueParam',
    value: string
  ) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const removeParam = (index: number) => {
    const newParams = params.filter((_, i) => i !== index);
    setParams(newParams);
  };

  const handleFocusOut = useCallback(() => {
    const commonBody = JSON.stringify(body);

    const validHeaders = headers.map((header) => ({
      key: header.keyHeader,
      value: header.valueHeader,
    }));

    const validParams = params.map((param) => ({
      key: param.keyParam,
      value: param.valueParam,
    }));

    const generatedUrl = generateEncodedUrl(
      method,
      url,
      commonBody,
      validHeaders,
      validParams
    );

    const currentUrl = window.location.href;
    if (generatedUrl && generatedUrl !== currentUrl) {
      window.history.pushState({}, '', generatedUrl);
    }
    setDecodedURL(generatedUrl);
  }, [method, url, headers, body, params]);

  const saveToLS = () => {
    const savedRequests = JSON.parse(
      localStorage.getItem('savedRequests') || '[]'
    );

    const requestDetails = {
      url: decodedURL,
      timestamp: new Date().toISOString(),
    };

    savedRequests.push(requestDetails);
    localStorage.setItem('savedRequests', JSON.stringify(savedRequests));
  };

  useEffect(() => {
    handleFocusOut();
  }, [handleFocusOut]);

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-row mb-[20px]">
          <HistoryBtn />
          <h1 className="text-xxl font-bold mb-4 text-center w-full">
            {t('restfull.restClient')}
          </h1>
        </div>
        <div className="flex space-x-4 mb-4">
          <SelectMethod method={method} setMethod={setMethod} />
          <input
            type="text"
            placeholder="Endpoint URL"
            className="border-2 p-2 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
            type="submit"
            onClick={() => {
              handleSend();
              saveToLS();
              handleFocusOut();
            }}
          >
            Send
          </button>
        </div>

        <ToggleButton
          isOpen={showVariables}
          onClick={() => setShowVariables(!showVariables)}
          openText="Hide Variables"
          closedText="Show Variables"
        />
        {showVariables && (
          <RestParams
            params={params}
            removeParam={removeParam}
            addParam={addParam}
            handleParamChange={handleParamChange}
          />
        )}
        <RestHeders
          headers={headers}
          removeHeader={removeHeader}
          addHeader={addHeader}
          handleHeaderChange={handleHeaderChange}
        />

        <div className="mb-4">
          <h2 className="font-semibold">Body:</h2>
          <CodeMirror
            value={
              typeof body === 'object' ? JSON.stringify(body, null, 2) : body
            }
            options={{
              mode: editorMode,
              theme: 'material',
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setBody(value);
            }}
            className="border p-2 rounded bg-dark flex-1 text-white min-h-10"
          />
        </div>
      </div>

      <h2 className="font-semibold mb-3">Response:</h2>
      <div className="flex items-center mb-2">
        <h2 className="mr-2">Status:</h2>
        <div className="border p-2 rounded bg-dark flex-1 text-white min-h-10">
          {statusCode}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <h2 className="mr-5">Body:</h2>
        <CodeMirror
          value={response}
          options={{
            mode: 'application/json',
            theme: 'material',
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={() => {}}
          className="border p-2 rounded bg-dark flex-1 text-white min-h-10"
        />
      </div>
    </main>
  );
}
