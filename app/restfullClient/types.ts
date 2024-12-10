export interface Header {
  keyHeader: string;
  valueHeader: string;
}

export interface Param {
  keyParam: string;
  valueParam: string;
}

export interface RestParamsProps {
  params: Param[];
  handleParamChange: (
    index: number,
    key: 'keyParam' | 'valueParam',
    value: string
  ) => void;
  removeParam: (index: number) => void;
  addParam: () => void;
}

export interface RestHeadersProps {
  headers: Header[];
  handleHeaderChange: (
    index: number,
    key: 'keyHeader' | 'valueHeader',
    value: string
  ) => void;
  removeHeader: (index: number) => void;
  addHeader: () => void;
}

export interface SelectMethodProps {
  method: string;
  setMethod: (method: string) => void;
}

export interface InputUrlProps {
  url: string;
  setUrl: (url: string) => void;
}
