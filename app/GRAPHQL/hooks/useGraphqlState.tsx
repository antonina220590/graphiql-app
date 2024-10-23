import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearUrlSdl } from '../../slices/sdlSlice';
import { clearVariables } from '../../slices/variablesSlice';
import { clearHeaders } from '../../slices/headersSlice';
import { RootState } from '../../slices/store';

interface GraphQLClientState {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  urlSDL: string;
  setUrlSDL: React.Dispatch<React.SetStateAction<string>>;
  responseData: string;
  setResponseData: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  statusCode: string;
  setStatusCode: React.Dispatch<React.SetStateAction<string>>;
  headers: Header[];
  variables: string;
  dispatch: ReturnType<typeof useDispatch>;
}

interface Header {
  key: string;
  value: string;
}

function useGraphQLClientState(): GraphQLClientState {
  const [url, setUrl] = useState<string>('');
  const [urlSDL, setUrlSDL] = useState<string>('');
  const [responseData, setResponseData] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [statusCode, setStatusCode] = useState<string>('');

  const headers: Header[] = useSelector((state: RootState) => state.headers);
  const variables: string = useSelector(
    (state: RootState) => state.variables.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearUrlSdl());
      dispatch(clearHeaders());
      dispatch(clearVariables());
    };
  }, [dispatch]);

  return {
    url,
    setUrl,
    urlSDL,
    setUrlSDL,
    responseData,
    setResponseData,
    query,
    setQuery,
    statusCode,
    setStatusCode,
    headers,
    variables,
    dispatch,
  };
}

export default useGraphQLClientState;
