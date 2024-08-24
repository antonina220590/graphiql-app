'use client';
import { useState } from 'react';

export default function RESTfullClient() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  //const url = `https://dummyjson.com/products/42`;

  const handleSend = async () => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Oh, no! HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponse(`Error: ${error.message}`);
      } else {
        setResponse('Error: An unknown error occurred');
      }
    }
  };

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          REST Client
        </h1>
        <div className="flex space-x-4 mb-4">
          <select>
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
              id="key"
              placeholder="Content-Type"
              className="border border-gray-400 p-2 h-16 resize-none"
            ></textarea>
            <textarea
              id="value"
              placeholder="application/json"
              className="border border-gray-400 p-2 h-16 resize-none"
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
          HTTP Status Code
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
