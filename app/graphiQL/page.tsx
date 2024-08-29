'use client';

import { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../slices/store';
import SchemaPanel from '../components/schema/schema';
import HeadersPanel from '../components/headers/headers';
import { setUrlSdl } from '../slices/sdlSlice';

export default function GraphiQLClient() {
  const [url, setUrl] = useState<string>('');
  const [urlSDL, setUrlSDL] = useState<string>('');
  const [responseData, setResponseData] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const headers = useSelector((state: RootState) => state.headers);
  const variables = useSelector(
    (state: { variables: { value: string } }) => state.variables.value
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      setUrlSDL(`${url}?sdl`);
    } else {
      setUrlSDL('');
    }
  }, [url]);

  const handleRequest = async () => {
    if (!url || !query) {
      toast('Oooops! Something went wrong!', {
        description: 'Please provide URL and query',
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    const validHeaders = headers.filter((header) => header.key && header.value);
    const headersObject = Object.fromEntries(
      validHeaders.map((header) => [header.key.trim(), header.value.trim()])
    );

    let validVariables = {};
    if (variables.trim()) {
      try {
        validVariables = JSON.parse(variables);
      } catch (e) {
        toast('Invalid variables format. Please check your input.', {
          description: 'Failed to fetch data',
          action: {
            label: 'Close',
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        return;
      }
    }

    const requestBody = {
      query,
      ...(validVariables && Object.keys(validVariables).length > 0
        ? { variables: validVariables }
        : {}),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setResponseData(JSON.stringify(data, null, 2));
    } catch (error) {
      toast('Oooops! Something went wrong!', {
        description: 'Failed to fetch data',
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  const handleSDLRequest = () => {
    dispatch(setUrlSdl(urlSDL));
  };

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          GraphiQL Client
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Endpoint URL"
              className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <button
              className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
              type="submit"
              onClick={handleRequest}
            >
              Send
            </button>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Endpoint URL SDL"
              className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
              value={urlSDL}
              onChange={(e) => {
                setUrlSDL(e.target.value);
              }}
            />
            <button
              className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
              type="submit"
              onClick={handleSDLRequest}
            >
              Send
            </button>
          </div>
        </div>
        <div className="relative flex flex-row justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border md:min-w-[100%] min-h-[60svh]"
          >
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center p-6 bg-[#c8c8c8]">
                <HeadersPanel />
                <textarea
                  className="w-[100%] h-[100%] bg-[#c8c8c8] text-[#292929] font-light"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center p-6 bg-[#c8c8c8] z-20">
                <SchemaPanel />
                <span className="font-light">{responseData}</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}
