import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Header, Param } from '../types';
import generateEncodedUrl from '../helpers/urlHelper';
import { MESSAGE, PathPartIndex } from '../constants';

const useUrlState = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([
    { keyHeader: '', valueHeader: '' },
  ]);
  const [params, setParams] = useState<Param[]>([
    { keyParam: '', valueParam: '' },
  ]);
  const [body, setBody] = useState('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');

    if (pathParts.length > PathPartIndex.METHOD) {
      const method = pathParts[PathPartIndex.METHOD];
      const encodedUrl = pathParts[PathPartIndex.URL];
      const encodedParams = pathParts[PathPartIndex.PARAMS] || '';
      const encodedHeaders = pathParts[PathPartIndex.HEADERS] || '';
      const encodedBody = pathParts[PathPartIndex.BODY] || '';

      try {
        const decodedUrl = decodeURIComponent(atob(encodedUrl));
        setUrl(decodedUrl);

        if (encodedBody) {
          const decodedBody = decodeURIComponent(atob(encodedBody));

          try {
            const parsedBody = JSON.parse(decodedBody);
            setBody(parsedBody);
          } catch {
            setBody(decodedBody);
          }
        }

        if (encodedParams) {
          const decodedParamsStr = decodeURIComponent(atob(encodedParams));
          const paramsArray = decodedParamsStr.split('&').map((paramStr) => {
            const [key, value] = paramStr.split('=');
            return {
              keyParam: decodeURIComponent(key),
              valueParam: decodeURIComponent(value),
            };
          });
          setParams(paramsArray);
        }

        if (encodedHeaders) {
          const decodedHeadersStr = decodeURIComponent(atob(encodedHeaders));
          const headersArray = decodedHeadersStr.split('&').map((headerStr) => {
            const [key, value] = headerStr.split('=');
            return {
              keyHeader: decodeURIComponent(key),
              valueHeader: decodeURIComponent(value),
            };
          });
          setHeaders(headersArray);
        }

        setMethod(method);
      } catch (error) {
        toast(MESSAGE.DECODING, { description: error.message });
      }
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();
    params.forEach((param) => {
      if (param.keyParam || param.valueParam) {
        newParams.set(param.keyParam, param.valueParam);
      }
    });

    const paramString = newParams.toString();
    setUrl((prevUrl) => {
      const baseUrl = prevUrl.split('?')[0];
      return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    });
  }, [params]);

  const generateAndSetUrl = useCallback(() => {
    const commonBody = JSON.stringify(body);
    const validHeaders = headers.map((header) => ({
      key: header.keyHeader,
      value: header.valueHeader,
    }));

    const validParams = params.map((param) => ({
      key: param.keyParam,
      value: param.valueParam,
    }));

    const generatedUrl = generateEncodedUrl(
      method,
      url,
      commonBody,
      validHeaders,
      validParams
    );

    const currentUrl = window.location.href;
    if (generatedUrl && generatedUrl !== currentUrl) {
      window.history.pushState({}, '', generatedUrl);
    }
  }, [method, url, headers, body, params]);

  useEffect(() => {
    generateAndSetUrl();
  }, [generateAndSetUrl]);

  return {
    url,
    setUrl,
    method,
    setMethod,
    headers,
    setHeaders,
    params,
    setParams,
    body,
    setBody,
    generateAndSetUrl,
  };
};

export default useUrlState;
