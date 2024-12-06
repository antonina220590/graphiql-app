import React from 'react';

import URLInput from './URLInput';

interface UrlInputProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  urlSDL: string;
  setUrlSDL: React.Dispatch<React.SetStateAction<string>>;
  handleRequest: () => Promise<void>;
  handleSDLRequest: () => void;
  saveToLS: () => void;
}

const UrlInputGroup: React.FC<UrlInputProps> = ({
  url,
  setUrl,
  urlSDL,
  setUrlSDL,
  handleRequest,
  handleSDLRequest,
  saveToLS,
}) => {
  return (
    <div>
      <URLInput
        url={url}
        setUrl={setUrl}
        onSubmit={() => {
          handleRequest();
          saveToLS();
        }}
        placeholder="GraphQL Endpoint URL"
        buttonLabel="Send"
      />
      <URLInput
        url={urlSDL}
        setUrl={setUrlSDL}
        onSubmit={handleSDLRequest}
        placeholder="GraphQL SDL Endpoint URL"
        buttonLabel="Send"
      />
    </div>
  );
};

export default UrlInputGroup;
