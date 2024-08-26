'use client';
import { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

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
        <div className="flex flex-row justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border md:min-w-[100%] min-h-[60svh]"
          >
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-0 bg-[#353d42]">
                    <textarea className="font-semibold w-[100%] h-[100%] bg-[#353d42] text-white font-light">
                      Three
                    </textarea>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6  bg-[#353d42]">
                    <span className="font-semibold">Two</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-[100%] items-center justify-center p-6 bg-[#848789]">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}
