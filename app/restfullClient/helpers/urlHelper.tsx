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
  const encodedParams = param ? btoa(param) : null;

  const headersString = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) =>
        `${encodeURIComponent(header.key.trim())}=${encodeURIComponent(
          header.value.trim()
        )}`
    )
    .join('&');

  const encodedBody = body
    ? btoa(
        encodeURIComponent(
          typeof body === 'object' ? JSON.stringify(body) : body
        )
      )
    : null;

  let fullUrl = `${window.location.origin}/restfullClient/${method}/${encodedUrl}`;

  // Добавляем параметры после URL, если они есть
  if (encodedParams) {
    fullUrl += `/${encodedParams}`;
  }

  // Заголовки в query string
  if (headersString) {
    fullUrl += `/?${headersString}`;
  }

  // Тело запроса в hash
  if (encodedBody) {
    fullUrl += `#${encodedBody}`;
  }

  return fullUrl;
};

export default generateEncodedUrl;
