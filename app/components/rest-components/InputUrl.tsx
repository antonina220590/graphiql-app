import { useTranslation } from 'react-i18next';

import { InputUrlProps } from '../../restfullClient/types';

const InputUrl: React.FC<InputUrlProps> = ({ url, setUrl }) => {
  const { t } = useTranslation();
  return (
    <input
      type="text"
      placeholder={t('restfull.endpointURL')}
      className="border-2 p-2 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />
  );
};

export default InputUrl;
