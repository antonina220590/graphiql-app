'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useDecodedUrlEffect } from './hooks/useDecodedUrlEffect';
import { saveRequestToLocalStorage } from './helpers/localStorageUtils';
import { useGraphQLRequest } from './hooks/useGraphqlRequest';
import { RootState } from '../slices/store';
import { clearUrlSdl, setUrlSdl } from '../slices/sdlSlice';
import { clearVariables } from '../slices/variablesSlice';
import { clearHeaders } from '../slices/headersSlice';
import HistoryBtn from '../components/historyButton/historyButton';
import handleFocusOut from './helpers/handleFocusOut';
import Content from '../components/graphql-components/content';

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

  const handleFocusOutCallback = useCallback(() => {
    handleFocusOut({
      url,
      query,
      headers,
      variables,
      setDecodedURL,
    });
  }, [url, query, headers, variables, setDecodedURL]);

  useEffect(() => {
    handleFocusOutCallback();
  }, [handleFocusOutCallback]);

  const saveToLS = () => {
    saveRequestToLocalStorage(decodedURL);
  };

  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-row mb-[20px]">
          <HistoryBtn />
          <h1 className="text-xxl font-bold mb-4 text-center w-full">
            {t('graphql.client')}
          </h1>
        </div>
        <Content
          url={url}
          setUrl={setUrl}
          urlSDL={urlSDL}
          setUrlSDL={setUrlSDL}
          handleRequest={handleRequest}
          handleSDLRequest={handleSDLRequest}
          saveToLS={saveToLS}
          statusCode={statusCode}
          query={query}
          setQuery={setQuery}
          responseData={responseData}
          handleFocusOutCallback={handleFocusOutCallback}
        />
      </div>
    </main>
  );
}
