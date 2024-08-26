'use client';

import { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import SchemaPanel from '../components/schema/schema';
import HeadersPanel from '../components/headers/headers';

export default function GraphiQLClient() {
  const [url, setUrl] = useState<string>('');
  const [urlSDL, setUrlSDL] = useState<string>('');

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
        <div className="relative flex flex-row justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border md:min-w-[100%] min-h-[60svh]"
          >
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center p-6 bg-[#c8c8c8]">
                <HeadersPanel />
                <textarea className="w-[100%] h-[100%] bg-[#c8c8c8] text-white font-light"></textarea>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center p-6 bg-[#c8c8c8]">
                <SchemaPanel />
                <span className="font-light">One</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}
