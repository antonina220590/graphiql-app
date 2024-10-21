export const padBase64Str = (str: string) => {
  while (str.length % 4 !== 0) {
    str += '=';
  }
  return str;
};
