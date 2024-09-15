import { TrashIcon } from '@heroicons/react/24/solid';

import { RestParamsProps } from '../../restfullClient/types';

const RestParams: React.FC<RestParamsProps> = ({
  params,
  handleParamChange,
  removeParam,
  addParam,
}) => (
  <div className="mb-4">
    <h2 className="font-semibold">Variables:</h2>
    <div className="grid grid-cols-[1fr_1fr_4rem] gap-0 mb-0">
      <label className="font-semibold border border-gray-400 p-2">Key</label>
      <label className="font-semibold border border-gray-400 p-2">Value</label>
    </div>
    {params.map((param, index) => (
      <div key={index} className="grid grid-cols-[1fr_1fr_4rem] gap-0 mb-0">
        <textarea
          placeholder="Variable key"
          className="border border-gray-400 p-2 h-16 resize-none"
          value={param.keyParam}
          onChange={(e) => handleParamChange(index, 'keyParam', e.target.value)}
        ></textarea>
        <textarea
          placeholder="Variable value"
          className="border border-gray-400 p-2 h-16 resize-none"
          value={param.valueParam}
          onChange={(e) =>
            handleParamChange(index, 'valueParam', e.target.value)
          }
        ></textarea>
        <button
          onClick={() => removeParam(index)}
          className="flex items-center justify-center w-full h-10 text-white p-1 m-1"
        >
          <TrashIcon className="h-6 w-6 text-[#fe6d12]" />
        </button>
      </div>
    ))}
    <button
      className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
      onClick={addParam}
    >
      Add Params
    </button>
  </div>
);
export default RestParams;
