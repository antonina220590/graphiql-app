'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { Header, Param } from './types';
import { MESSAGE } from './constants';
import RestParams from '../components/rest-components/RestParams';
import SelectMethod from '../components/rest-components/SelectMethod';
import RestHeders from '../components/rest-components/RestHeaders';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
const CodeMirror = dynamic(
  () =>
    import('react-codemirror2').then((mod) => ({ default: mod.Controlled })),
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
  const [body, setBody] = useState({});

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

    try {
      const res = await fetch(url, options);
      setStatusCode(`${res.status} ${res.statusText}`);

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          setResponse(`Client Error: ${res.statusText}`);
        } else if (res.status >= 500) {
          setResponse(`Server Error: ${res.statusText}`);
        }
        throw new Error(`${res.statusText}`);
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

  const handleParamChange = (index: number, key: string, value: string) => {
    const newParams = [...params];
    if (key === 'key') {
      newParams[index].keyParam = value;
    } else {
      newParams[index].valueParam = value;
    }
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
          <textarea
            placeholder="JSON/Text Editor"
            className="border-2 p-2 rounded w-full h-32 bg-dark text-white focus:border-yellow-500 focus:outline-none"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      <div className="font-semibold">Response:</div>
      <div className="flex items-center mb-2">
        <div className="mr-2">Status:</div>
        <div className="border p-2 rounded bg-dark flex-1 text-white min-h-10">
          {statusCode}
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">Body:</div>
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
