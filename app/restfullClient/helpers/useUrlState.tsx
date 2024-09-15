import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Header, Param } from '../types';
import generateEncodedUrl from '../helpers/urlHelper';
import { MESSAGE } from '../constants';

const useUrlState = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([
    { keyHeader: '', valueHeader: '' },
  ]);
  const [params, setParams] = useState<Param[]>([
    { keyParam: ' ', valueParam: ' ' },
  ]);
  const [body, setBody] = useState('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');

    const method = pathParts[2] || 'GET';
    const encodedUrl = pathParts[3] || '';
    const encodedParams = pathParts[4] || '';
    const encodedBody = pathParts[5] || '';

    const searchParams = new URLSearchParams(window.location.search);

    try {
      const decodedUrl = decodeURIComponent(atob(encodedUrl));
      setUrl(decodedUrl);

      if (encodedParams) {
        const decodedParamsStr = decodeURIComponent(atob(encodedParams));
        const paramsArray = decodedParamsStr
          .split('&')
          .map((paramStr) => {
            const [key, value] = paramStr.split('=');
            return {
              keyParam: decodeURIComponent(key || ''),
              valueParam: decodeURIComponent(value || ''),
            };
          })
          .filter((param) => param.keyParam && param.valueParam);

        setParams(
          paramsArray.length ? paramsArray : [{ keyParam: '', valueParam: '' }]
        );
      } else {
        setParams([{ keyParam: '', valueParam: '' }]);
      }

      if (encodedBody) {
        const decodedBody = decodeURIComponent(atob(encodedBody));
        try {
          const parsedBody = JSON.parse(decodedBody);
          setBody(parsedBody);
        } catch {
          setBody(decodedBody);
        }
      }

      const headersArray = Array.from(searchParams.entries()).map(
        ([key, value]) => ({
          keyHeader: decodeURIComponent(key),
          valueHeader: decodeURIComponent(value),
        })
      );

      setHeaders(
        headersArray.length
          ? headersArray
          : [{ keyHeader: '', valueHeader: '' }]
      );

      setMethod(method);
    } catch (error) {
      toast(MESSAGE.DECODING, { description: (error as Error).message });
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();
    params.forEach((param) => {
      if (param.keyParam.trim() && param.valueParam.trim()) {
        newParams.set(param.keyParam, param.valueParam);
      }
    });

    const paramString = newParams.toString();
    setUrl((prevUrl) => {
      const baseUrl = prevUrl.split('?')[0];
      return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    });
  }, [params]);

  useEffect(() => {
    if (params.length === 0) {
      setParams([{ keyParam: '', valueParam: '' }]);
    }
  }, [params]);

  useEffect(() => {
    if (headers.length === 0) {
      setHeaders([{ keyHeader: '', valueHeader: '' }]);
    }
  }, [headers]);

  const generateAndSetUrl = useCallback(() => {
    const commonBody = JSON.stringify(body);
    const validHeaders = headers
      .filter((header) => header.keyHeader.trim() && header.valueHeader.trim())
      .map((header) => ({
        key: header.keyHeader,
        value: header.valueHeader,
      }));

    const validParams = params
      .filter((param) => param.keyParam.trim() && param.valueParam.trim())
      .map((param) => ({
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
      window.history.replaceState({}, '', generatedUrl);
    }
  }, [method, url, headers, body, params]);

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
