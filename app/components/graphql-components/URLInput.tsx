import React from 'react';

interface UrlInputProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  placeholder: string;
  buttonLabel: string;
}

const UrlInput: React.FC<UrlInputProps> = ({
  url,
  setUrl,
  onSubmit,
  placeholder,
  buttonLabel,
}) => (
  <div className="flex flex-row">
    <input
      type="text"
      placeholder={placeholder}
      className="border-2 p-2 ml-0 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
      value={url}
      onChange={(e) => setUrl(e.target.value.trim())}
    />
    <button
      className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300"
      type="submit"
      onClick={onSubmit}
    >
      {buttonLabel}
    </button>
  </div>
);

export default React.memo(UrlInput);
