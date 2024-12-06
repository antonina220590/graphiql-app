import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { TFunction } from 'i18next';

import { clearUrlSdl, setUrlSdl } from '../slices/sdlSlice';
import { clearVariables } from '../slices/variablesSlice';
import { clearHeaders } from '../slices/headersSlice';
import { RootState } from '../slices/store';
import generateEncodedUrl from '../GRAPHQL/helpers/urlHelper';
import { saveRequestToLocalStorage } from '../GRAPHQL/helpers/localStorageUtils';

interface UseGraphiQLProps {
  t: TFunction;
}
export const useGraphiQLState = ({ t }: UseGraphiQLProps) => {
  const [url, setUrl] = useState<string>('');
  const [urlSDL, setUrlSDL] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [decodedURL, setDecodedURL] = useState<string>('');

  const headers = useSelector((state: RootState) => state.headers);
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

  useEffect(() => {
    if (url) {
      setUrlSDL(`${url}?sdl`);
    } else {
      setUrlSDL('');
    }
  }, [url]);

  const handleRequest = async (
    sendRequest: (url: string, query: string) => Promise<void>
  ) => {
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
    if (generatedUrl && generatedUrl !== window.location.href) {
      window.history.pushState({}, '', generatedUrl);
      setDecodedURL(generatedUrl);
    }
  }, [url, query, headers, variables]);

  const saveToLS = () => {
    saveRequestToLocalStorage(decodedURL);
  };

  return {
    url,
    setUrl,
    urlSDL,
    setUrlSDL,
    query,
    setQuery,
    handleRequest,
    handleSDLRequest,
    handleFocusOut,
    decodedURL,
    saveToLS,
  };
};
