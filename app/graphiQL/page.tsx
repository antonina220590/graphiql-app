'use client';
import { useEffect, useState } from 'react';

export default function GraphiQLClient() {
  const [url, setUrl] = useState('');
  const [urlSDL, setUrlSDL] = useState('');

  useEffect(() => {
    if (url) {
      setUrlSDL(`${url}?sdl`);
    } else {
      setUrlSDL('');
    }
  }, [url]);

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          GraphiQL Client
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Endpoint URL"
            className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endpoint URL SDL"
            className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
            value={urlSDL}
            onChange={(e) => setUrlSDL(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}
