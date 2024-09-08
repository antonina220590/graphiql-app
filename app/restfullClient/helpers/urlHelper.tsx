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

  const param = params
    .filter((param) => param.key && param.value)
    .map(
      (param) =>
        `${encodeURIComponent(param.key.trim())}=${encodeURIComponent(param.value.trim())}`
    )
    .join('&');
  const encodedParams = param ? btoa(param) : '';

  const header = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) =>
        `${encodeURIComponent(header.key.trim())}=${encodeURIComponent(header.value.trim())}`
    )
    .join('&');
  const encodedHeaders = header ? btoa(header) : '';

  let fullUrl = `${window.location.origin}/restfullClient/${method}/${encodedUrl}`;

  if (encodedBody) {
    fullUrl += `/${encodedBody}`;
  }

  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  }

  if (encodedHeaders) {
    fullUrl += `/${encodedHeaders}`;
  }

  return fullUrl;
};
export default generateEncodedUrl;
