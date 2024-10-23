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
import { saveRequestToLocalStorage } from './helpers/localStorageUtils';
import { useGraphQLRequest } from './hooks/useGraphqlRequest';
import UrlInput from '../components/graphql-components/URLInput';
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
  const [query, setQuery] = useState<string>('');
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

  const { sendRequest, statusCode, responseData } = useGraphQLRequest({
    headers,
    variables,
  });

  useEffect(() => {
    if (url) {
      setUrlSDL(`${url}?sdl`);
    } else {
      setUrlSDL('');
    }
  }, [url]);

  const handleRequest = async () => {
    if (!url || !query) {
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
    await sendRequest(url, query);
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
    saveRequestToLocalStorage(decodedURL);
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
          <UrlInput
            url={url}
            setUrl={setUrl}
            onSubmit={() => {
              handleRequest();
              saveToLS();
            }}
            placeholder={t('graphql.endpointUrl')}
            buttonLabel={t('graphql.send')}
          />
          <UrlInput
            url={urlSDL}
            setUrl={setUrlSDL}
            onSubmit={handleSDLRequest}
            placeholder={t('graphql.endpointUrlSdl')}
            buttonLabel={t('graphql.send')}
          />
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
