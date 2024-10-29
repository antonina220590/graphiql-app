import { Dispatch, SetStateAction } from 'react';

import generateEncodedUrl from './urlHelper';
type Header = { key: string; value: string };
type Headers = Header[];
export default function handleFocusOut({
  url,
  query,
  headers,
  variables,
  setDecodedURL,
}: {
  url: string;
  query: string;
  headers: Headers;
  variables: string;
  setDecodedURL: Dispatch<SetStateAction<string>>;
}) {
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
}
