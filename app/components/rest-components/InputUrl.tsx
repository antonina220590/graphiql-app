import { InputUrlProps } from '../../restfullClient/types';

const InputUrl: React.FC<InputUrlProps> = ({ url, setUrl }) => {
  return (
    <input
      type="text"
      placeholder="Endpoint URL"
      className="border-2 p-2 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />
  );
};

export default InputUrl;
