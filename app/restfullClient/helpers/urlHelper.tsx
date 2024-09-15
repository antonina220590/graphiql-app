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

  const encodedBody = body
    ? btoa(
        encodeURIComponent(
          typeof body === 'object' ? JSON.stringify(body) : body
        )
      )
    : '';

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
    .map((header) => `${header.key.trim()}=${header.value.trim()}`)
    .join('&');

  let fullUrl = `${window.location.origin}/restfullClient/${method}/${encodedUrl}`;

  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  }

  if (header) {
    fullUrl += `?${header}`;
  }

  if (encodedBody) {
    fullUrl += `/${encodedBody}`;
  }

  return fullUrl;
};

export default generateEncodedUrl;
