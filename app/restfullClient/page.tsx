'use client';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

import { Header, Param } from './types';
import { MESSAGE, PathPartIndex, statusText } from './constants';
import RestParams from '../components/rest-components/RestParams';
import SelectMethod from '../components/rest-components/SelectMethod';
import RestHeders from '../components/rest-components/RestHeaders';
import generateEncodedUrl from './helpers/urlHelper';
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
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([
    { keyHeader: '', valueHeader: '' },
  ]);
  const [params, setParams] = useState<Param[]>([
    { keyParam: '', valueParam: '' },
  ]);
  const [body, setBody] = useState('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');

    if (pathParts.length > PathPartIndex.BODY) {
      const method = pathParts[PathPartIndex.METHOD];
      const encodedUrl = pathParts[PathPartIndex.URL];
      const encodedParams = pathParts[PathPartIndex.PARAMS] || '';
      const encodedHeaders = pathParts[PathPartIndex.HEADERS] || '';
      const encodedBody = pathParts[PathPartIndex.BODY] || '';

      try {
        const decodedUrl = decodeURIComponent(atob(encodedUrl));
        setUrl(decodedUrl);

        if (encodedBody) {
          const decodedBody = decodeURIComponent(atob(encodedBody));
          setBody(decodedBody);
        }

        if (encodedParams) {
          const decodedParamsStr = decodeURIComponent(atob(encodedParams));
          const paramsArray = decodedParamsStr.split('&').map((paramStr) => {
            const [key, value] = paramStr.split('=');
            return {
              keyParam: decodeURIComponent(key),
              valueParam: decodeURIComponent(value),
            };
          });
          setParams(paramsArray);
        }

        if (encodedHeaders) {
          const decodedHeadersStr = decodeURIComponent(atob(encodedHeaders));
          const headersArray = decodedHeadersStr.split('&').map((headerStr) => {
            const [key, value] = headerStr.split('=');
            return {
              keyHeader: decodeURIComponent(key),
              valueHeader: decodeURIComponent(value),
            };
          });
          setHeaders(headersArray);
        }

        setMethod(method);
      } catch (error) {
        toast('Failed to decode URL parameters', {
          description: error.message,
        });
      }
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();
    params.forEach((param) => {
      if (param.keyParam || param.valueParam) {
        newParams.set(param.keyParam, param.valueParam);
      }
    });

    const paramString = newParams.toString();

    setUrl((prevUrl) => {
      const baseUrl = prevUrl.split('?')[0];
      return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    });
  }, [params]);

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
    const options = {
      method: method,
      headers: Object.fromEntries(
        validHeaders.map((header) => [header.keyHeader, header.valueHeader])
      ),
      body: method !== 'GET' ? JSON.stringify(body) : null,
    };

    if (method !== 'GET' && body) {
      options.body = body;
    }

    try {
      const res = await fetch(url, options);
      const statusMessage = statusText[res.status] || 'Unknown Status';
      setStatusCode(`${res.status} ${statusMessage}`);

      if (!res.ok) {
        let errorMessage = `${res.status} ${statusMessage}`;
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        setResponse(`Error: ${errorMessage}`);
        toast(errorMessage);
      }

      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setResponse(`Error: ${error.message}`);
      } else {
        setResponse(`Error: ${MESSAGE.UNKNOWN}`);
      }
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
    const commonBody = method !== 'GET' ? JSON.stringify(body) : null;

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
  }, [method, url, headers, body, params]);

  useEffect(() => {
    handleFocusOut();
  }, [handleFocusOut]);

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          REST Client
        </h1>
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
            onClick={handleSend}
          >
            Send
          </button>
        </div>

        <RestParams
          params={params}
          removeParam={removeParam}
          addParam={addParam}
          handleParamChange={handleParamChange}
        />
        <RestHeders
          headers={headers}
          removeHeader={removeHeader}
          addHeader={addHeader}
          handleHeaderChange={handleHeaderChange}
        />

        <div className="mb-4">
          <h2 className="font-semibold">Body:</h2>
          <CodeMirror
            value={body}
            options={{
              mode: 'application/json' || 'text/plain',
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
