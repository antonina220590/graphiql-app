import { TrashIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { RestHeadersProps } from '../../restfullClient/types';

const RestHeders: React.FC<RestHeadersProps> = ({
  headers,
  handleHeaderChange,
  removeHeader,
  addHeader,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
      <h2 className="font-semibold">{t('restfull.headers')}</h2>
      <div className="grid grid-cols-[1fr_1fr_4rem] gap-0 mb-0">
        <label className="font-semibold border border-gray-400 p-2">
          {t('restfull.key')}
        </label>
        <label className="font-semibold border border-gray-400 p-2">
          {t('restfull.value')}
        </label>
      </div>
      {headers.map((header, index) => (
        <div key={index} className="grid grid-cols-[1fr_1fr_4rem] gap-0">
          <textarea
            placeholder="Content-Type"
            className="border border-gray-400 p-2 h-16 resize-none"
            value={header.keyHeader}
            onChange={(e) =>
              handleHeaderChange(index, 'keyHeader', e.target.value)
            }
          />
          <textarea
            placeholder="application/json"
            className="border border-gray-400 p-2 h-16 resize-none"
            value={header.valueHeader}
            onChange={(e) =>
              handleHeaderChange(index, 'valueHeader', e.target.value)
            }
          />
          <button
            onClick={() => removeHeader(index)}
            className="flex items-center justify-center w-full h-10 text-white p-1 m-1"
            data-testid="trash-button"
          >
            <TrashIcon className="h-6 w-6 text-[#fe6d12]" />
          </button>
        </div>
      ))}
      <button
        className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
        onClick={addHeader}
      >
        {t('restfull.addHeader')}
      </button>
    </div>
  );
};
export default RestHeders;
