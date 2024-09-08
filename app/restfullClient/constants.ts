export enum MESSAGE {
  EMPTY = 'The URL field is empty. Please enter a URL.',
  UNKNOWN = 'An unknown error occurred',
}

export const statusText: { [key: string]: string } = {
  '200': 'OK',
  '201': 'Created',
  '204': 'No Content',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '500': 'Internal Server Error',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
};

export enum PathPartIndex {
  METHOD = 2,
  URL = 3,
  PARAMS = 4,
  HEADERS = 5,
  BODY = 6,
}
