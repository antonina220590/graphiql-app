const generateEncodedUrl = (
  method: string,
  url: string,
  commonBody: string | null,
  headers: { key: string; value: string }[],
  params: { key: string; value: string }[]
): string => {
  const endpointUrl = encodeURIComponent(url.trim());
  const encodedUrl = btoa(endpointUrl);

  const body =
    commonBody && method !== 'GET'
      ? btoa(JSON.stringify(commonBody.trim()))
      : '';

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

  let fullUrl = `${window.location.origin}/${method}/${encodedUrl}`;

  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  }

  if (body) {
    fullUrl += `/${body}`;
  }

  if (headerParams) {
    fullUrl += `?${headerParams}`;
  }

  return fullUrl;
};

export default generateEncodedUrl;
