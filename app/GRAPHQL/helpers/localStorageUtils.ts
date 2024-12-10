export const saveRequestToLocalStorage = (decodedURL: string) => {
  const savedRequests = JSON.parse(
    localStorage.getItem('savedRequests') || '[]'
  );

  const requestDetails = {
    url: decodedURL,
    timestamp: new Date().toISOString(),
  };

  savedRequests.push(requestDetails);

  localStorage.setItem('savedRequests', JSON.stringify(savedRequests));
};
