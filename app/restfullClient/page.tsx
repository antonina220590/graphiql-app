//test url = `https://dummyjson.com/products/42`;
'use client';
import { useEffect, useState } from 'react';

import { Header, Param } from './types';
import { MESSAGE } from './constants';

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

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          REST Client
        </h1>
        <div className="flex space-x-4 mb-4">
          <select onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
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

        <div className="mb-4">
          <h2 className="font-semibold">Params:</h2>
          <div className="grid grid-cols-2 gap-0 mb-0">
            <label className="font-semibold border border-gray-400 p-2">
              Key
            </label>
            <label className="font-semibold border border-gray-400 p-2">
              Value
            </label>
          </div>
          {params.map((param, index) => (
            <div key={index} className="grid grid-cols-2 gap-0 mb-0">
              <textarea
                placeholder="Param key"
                className="border border-gray-400 p-2 h-16 resize-none"
                value={param.keyParam}
                onChange={(e) =>
                  handleParamChange(index, 'key', e.target.value)
                }
              ></textarea>
              <textarea
                placeholder="Param value"
                className="border border-gray-400 p-2 h-16 resize-none"
                value={param.valueParam}
                onChange={(e) =>
                  handleParamChange(index, 'value', e.target.value)
                }
              ></textarea>
            </div>
          ))}
          <button
            className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
            onClick={addParam}
          >
            Add Params
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Headers:</h2>
          <div className="grid grid-cols-2 gap-0 mb-0">
            <label className="font-semibold border border-gray-400 p-2">
              Key
            </label>
            <label className="font-semibold border border-gray-400 p-2">
              Value
            </label>
          </div>
          {headers.map((header, index) => (
            <div key={index} className="grid grid-cols-2 gap-0 mb-0">
              <textarea
                placeholder="Content-Type"
                className="border border-gray-400 p-2 h-16 resize-none"
                value={header.keyHeader}
                onChange={(e) =>
                  handleHeaderChange(index, 'keyHeader', e.target.value)
                }
              />
              <textarea
                placeholder="application/json"
                className="border border-gray-400 p-2 h-16 resize-none"
                value={header.valueHeader}
                onChange={(e) =>
                  handleHeaderChange(index, 'valueHeader', e.target.value)
                }
              />
            </div>
          ))}
          <button
            className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
            onClick={addHeader}
          >
            Add Header
          </button>
        </div>

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
        <div className="border p-2 rounded bg-dark flex-1 text-white">
          {statusCode}
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">Body:</div>
        <div className="border p-2 rounded bg-dark flex-1 text-white">
          {response}
        </div>
      </div>
    </main>
  );
}
