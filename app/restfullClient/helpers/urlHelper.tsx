const generateEncodedUrl = (
  method: string,
  url: string,
  body: string | null,
  headers: { key: string; value: string }[],
  params: { key: string; value: string }[]
): string => {
  if (!url.trim()) {
    return window.location.origin;
  }

  const endpointUrl = encodeURIComponent(url.trim());
  const encodedUrl = btoa(endpointUrl);
  const encodedBody = body ? btoa(encodeURIComponent(body.trim())) : '';

  const paramString = params
    .filter((param) => param.key && param.value)
    .map(
      (param) =>
        `${encodeURIComponent(param.key.trim())}=${encodeURIComponent(param.value.trim())}`
    )
    .join('&');
  const encodedParams = paramString ? btoa(paramString) : '';

  const headerParams = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) =>
        `${encodeURIComponent(header.key.trim())}=${encodeURIComponent(header.value.trim())}`
    )
    .join('&');

  let fullUrl = `${window.location.origin}/restfullClient/${method}/${encodedUrl}`;

  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  }

  if (encodedBody) {
    fullUrl += `/${encodedBody}`;
  }

  if (headerParams) {
    fullUrl += `?${headerParams}`;
  }

  return fullUrl;
};

export default generateEncodedUrl;
