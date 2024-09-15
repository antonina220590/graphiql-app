import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  openText: string;
  closedText: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onClick,
  openText,
  closedText,
}) => {
  return (
    <button
      className="flex items-center bg-[#fe6d12] text-white p-1 rounded mb-4"
      onClick={onClick}
    >
      {isOpen ? (
        <ChevronUpIcon className="w-6 h-6 transform transition-transform" />
      ) : (
        <ChevronDownIcon className="w-6 h-6 transform transition-transform" />
      )}
      <span className="ml-2">{isOpen ? openText : closedText}</span>
    </button>
  );
};

export default ToggleButton;
