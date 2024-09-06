const generateEncodedUrl = (
  url: string,
  commonBody: string,
  headers: { key: string; value: string }[]
) => {
  const endpointUrl = encodeURIComponent(url.trim());
  const body = encodeURIComponent(commonBody.trim());

  if (!endpointUrl || !body) return '';

  const endpointUrlEncoded = btoa(endpointUrl);
  const bodyEncoded = btoa(body);

  const headerParams = headers
    .filter((header) => header.key && header.value)
    .map((header) => `${header.key.trim()}=${header.value.trim()}`)
    .join('&');

  return `${window.location.origin}/graphiQL/${endpointUrlEncoded}/${bodyEncoded}${headerParams ? `?${headerParams}` : ''}`;
};

export default generateEncodedUrl;
