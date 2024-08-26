//test url = `https://dummyjson.com/products/42`;
'use client';
import { useEffect, useState } from 'react';

import { getStatusText } from '../helpers/restfullHelpers/getStatusText';

export default function RESTfullClient() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState({});
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [params] = useState(new URLSearchParams());
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  //https://dummyjson.com/products/search?key1=value1&key2=value2
  useEffect(() => {
    const newParams = new URLSearchParams(params);
    if (paramKey && paramValue) {
      newParams.set(paramKey, paramValue);
    }
    const paramString = newParams.toString();
    setUrl((prevUrl) => {
      const baseUrl = prevUrl.split('?')[0];
      return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    });
  }, [paramKey, paramValue, params]);

  const handleSend = async () => {
    if (headerKey && headerValue) {
      setHeaders((prevHeaders) => ({
        ...prevHeaders,
        [headerKey]: headerValue,
      }));
    }

    const options = {
      method: method,
      headers: headers,
    };
    try {
      const res = await fetch(url, options);
      const statusText = getStatusText(res.status);
      setStatusCode(`${res.status} ${statusText}`);
      if (!res.ok) {
        throw new Error(
          `Oh, no! HTTP error! Status: ${res.status} ${statusText}`
        );
      }

      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`
      );
    }
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
          <div className="grid grid-cols-2 gap-0 mb-0">
            <textarea
              placeholder="Param key"
              className="border border-gray-400 p-2 h-16 resize-none"
              value={paramKey}
              onChange={(e) => setParamKey(e.target.value)}
            ></textarea>
            <textarea
              placeholder="Param value"
              className="border border-gray-400 p-2 h-16 resize-none"
              value={paramValue}
              onChange={(e) => setParamValue(e.target.value)}
            ></textarea>
          </div>
          <button className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300">
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
          <div className="grid grid-cols-2 gap-0 mb-0">
            <textarea
              placeholder="Content-Type"
              className="border border-gray-400 p-2 h-16 resize-none"
              value={headerKey}
              onChange={(e) => setHeaderKey(e.target.value)}
            ></textarea>
            <textarea
              placeholder="application/json"
              className="border border-gray-400 p-2 h-16 resize-none"
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
            ></textarea>
          </div>
          <button className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300">
            Add Header
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Body:</h2>
          <textarea
            placeholder="JSON/Text Editor"
            className="border-2 p-2 rounded w-full h-32 bg-dark text-white focus:border-yellow-500 focus:outline-none"
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
