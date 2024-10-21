'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { SparklesIcon } from '@heroicons/react/24/solid';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useTranslation } from 'react-i18next';

import handleFormatCode from './helpers/handleFormatCode';
import { useDecodedUrlEffect } from './hooks/useDecodedUrlEffect';
import { RootState } from '../slices/store';
import SchemaPanel from '../components/schema/schema';
import HeadersPanel from '../components/headers/headers';
import { clearUrlSdl, setUrlSdl } from '../slices/sdlSlice';
import { clearVariables } from '../slices/variablesSlice';
import generateEncodedUrl from './helpers/urlHelper';
import { clearHeaders } from '../slices/headersSlice';
import HistoryBtn from '../components/historyButton/historyButton';

export default function GraphiQLClient() {
  const { t } = useTranslation();
  const [url, setUrl] = useState<string>('');
  const [urlSDL, setUrlSDL] = useState<string>('');
  const [responseData, setResponseData] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [statusCode, setStatusCode] = useState('');
  const headers = useSelector((state: RootState) => state.headers);
  const [decodedURL, setDecodedURL] = useState<string>('');
  const variables = useSelector(
    (state: { variables: { value: string } }) => state.variables.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearUrlSdl());
      dispatch(clearHeaders());
      dispatch(clearVariables());
    };
  }, [dispatch]);

  useDecodedUrlEffect({ setUrl, setQuery, t });

  useEffect(() => {
    if (url) {
      setUrlSDL(`${url}?sdl`);
    } else {
      setUrlSDL('');
    }
  }, [url]);

  const handleRequest = async () => {
    if (!url || !query) {
      setStatusCode(`💁`);
      setResponseData(t('graphql.correctUrl'));
      toast(t('graphql.oops'), {
        description: t('graphql.correctURL'),
        action: {
          label: t('graphql.close'),
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
      } catch (error) {
        toast(t('graphql.invalidFormat'), {
          description: `${error}`,
          action: {
            label: t('graphql.close'),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        return;
      }
    }

    const requestBody = {
      url,
      query,
      ...(validVariables && Object.keys(validVariables).length > 0
        ? { variables: validVariables }
        : {}),
    };

    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify(requestBody),
      });
      const statusText = t(`statusText.${res.status}`, {
        defaultValue: t('statusText.unknownStatus'),
      });
      setStatusCode(`${res.status} ${statusText}`);

      const data = await res.json();
      setResponseData(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseData(String(error));
      toast(t('graphql.oops'), {
        description: t('graphql.fetchFail'),
        action: {
          label: t('graphql.close'),
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

  const handleFocusOut = useCallback(() => {
    const commonBody = JSON.stringify({
      query,
      variables: JSON.parse(variables || '{}'),
    });

    const generatedUrl = generateEncodedUrl(url, commonBody, headers);
    const currentUrl = window.location.href;

    if (generatedUrl && generatedUrl !== currentUrl) {
      window.history.pushState({}, '', generatedUrl);
      setDecodedURL(generatedUrl);
    }
  }, [url, query, headers, variables]);

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
            {t('graphql.client')}
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder={t('graphql.endpointUrl')}
              className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value.trim());
              }}
              onBlur={handleFocusOut}
            />
            <button
              data-testid="sendUrl"
              className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
              type="submit"
              onClick={() => {
                handleRequest();
                saveToLS();
              }}
            >
              {t('graphql.send')}
            </button>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder={t('graphql.endpointUrlSdl')}
              className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
              value={urlSDL}
              onChange={(e) => {
                setUrlSDL(e.target.value.trim());
              }}
            />
            <button
              data-testid="sendSdl"
              className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
              type="submit"
              onClick={handleSDLRequest}
            >
              {t('graphql.send')}
            </button>
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-2 font-semibold">{t('graphql.status')}</div>
            <div className="border p-2 rounded bg-dark flex-1 text-white min-h-10">
              {statusCode}
            </div>
          </div>
        </div>
        <div className="relative flex flex-row justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="relative max-w-md rounded-lg border md:min-w-[100%] min-h-[60svh]"
          >
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center bg-[#c8c8c8]">
                <div className="absolute right-2 top-2 z-10">
                  <button
                    className="flex items-center justify-center w-10 h-10 text-white p-1 m-1 col-span-1"
                    onClick={() => handleFormatCode({ query, t, setQuery })}
                  >
                    <SparklesIcon className="h-15 w-15 text-[#fe6d12]" />
                  </button>
                </div>
                <div className="flex-grow p-2 min-h-full overflow-auto">
                  <HeadersPanel onUpdate={handleFocusOut} />
                  <CodeMirror
                    data-testid="queryPanel"
                    height="700px"
                    width="100%"
                    value={query}
                    theme="dark"
                    placeholder={t('graphql.writeHere')}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value) => {
                      setQuery(value);
                    }}
                    onBlur={handleFocusOut}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="relative flex h-[100%] items-center justify-center bg-[#c8c8c8] z-20">
                <SchemaPanel />
                <div className="flex-grow p-2 min-h-full overflow-auto">
                  <CodeMirror
                    height="700px"
                    placeholder={t('graphql.response')}
                    width="100%"
                    value={responseData}
                    theme="dark"
                    extensions={[javascript({ jsx: true })]}
                    readOnly
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </main>
  );
}
