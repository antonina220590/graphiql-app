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

  const param = params
    .filter((param) => param.key && param.value)
    .map(
      (param) =>
        `${encodeURIComponent(param.key.trim())}=${encodeURIComponent(
          param.value.trim()
        )}`
    )
    .join('&');
  const encodedParams = param ? btoa(param) : '';

  const encodedBody = body
    ? btoa(
        encodeURIComponent(
          typeof body === 'object' ? JSON.stringify(body) : body
        )
      )
    : '';

  const headersString = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) =>
        `${encodeURIComponent(header.key.trim())}=${encodeURIComponent(
          header.value.trim()
        )}`
    )
    .join('&');

  let fullUrl = `${window.location.origin}/restfullClient/${method}/${encodedUrl}`;

  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  } else {
    fullUrl += `/`;
  }

  if (encodedBody) {
    fullUrl += `/${encodedBody}`;
  }

  if (headersString) {
    fullUrl += `/?${headersString}`;
  }

  if (fullUrl.endsWith('/')) {
    fullUrl = fullUrl.slice(0, -1);
  }

  return fullUrl;
};

export default generateEncodedUrl;
