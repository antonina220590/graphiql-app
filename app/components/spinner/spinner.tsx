import { CogIcon } from '@heroicons/react/24/solid';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <CogIcon
        data-testid="CogIcon"
        className="w-8 h-8 text-orange-500 animate-spin"
      />
    </div>
  );
};

export default Spinner;
