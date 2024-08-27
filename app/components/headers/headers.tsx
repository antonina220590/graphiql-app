import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

interface Header {
  key: string;
  value: string;
}

export default function HeadersPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);
  const [activeTab, setActiveTab] = useState<'headers' | 'variables'>(
    'headers'
  );
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [variables, setVariables] = useState<string>('');

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
    setPanelHeight(300);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isResizing.current && panelRef.current) {
      const newHeight = window.innerHeight - event.clientY;
      setPanelHeight(newHeight > 150 ? newHeight : 150);
    }
  }, []);

  const startResize = () => {
    isResizing.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
  };

  const stopResize = useCallback(() => {
    isResizing.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopResize);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [handleMouseMove, stopResize]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const deleteHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="z-10">
      <div
        ref={panelRef}
        className={`absolute left-0 bottom-0 w-full bg-[#c8c8c8] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: `${panelHeight}px` }}
      >
        <div className="relative p-4 bg-gray-100 h-full">
          <div
            className="absolute right-0 top-0 h-2 w-[100%] cursor-ns-resize bg-gray-300"
            onMouseDown={startResize}
          />
          {activeTab === 'headers' && (
            <div className="mb-4">
              <h2 className="font-semibold">Headers:</h2>
              <div className="grid grid-cols-3 gap-0 mb-0">
                <label className="font-semibold border border-gray-400 p-2">
                  Key
                </label>
                <label className="font-semibold border border-gray-400 p-2">
                  Value
                </label>
              </div>
              {headers.map((header, index) => (
                <div key={index} className="grid grid-cols-3 gap-0 mb-0">
                  <textarea
                    placeholder="Content-Type"
                    className="border border-gray-400 p-2 h-16 resize-none"
                    value={header.key}
                    onChange={(e) =>
                      handleHeaderChange(index, 'key', e.target.value)
                    }
                  />
                  <textarea
                    placeholder="application/json"
                    className="border border-gray-400 p-2 h-16 resize-none"
                    value={header.value}
                    onChange={(e) =>
                      handleHeaderChange(index, 'value', e.target.value)
                    }
                  />
                  <button
                    onClick={() => deleteHeader(index)}
                    className="flex items-center justify-center w-10 h-10 text-white p-1 m-1 col-span-1"
                  >
                    <TrashIcon className="h-8 w-8 text-[#fe6d12]" />
                  </button>
                </div>
              ))}

              <button
                className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
                onClick={addHeader}
              >
                Add Header
              </button>
            </div>
          )}
          {activeTab === 'variables' && (
            <textarea
              className="w-full h-full bg-white text-black"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder='{"key": "value"}'
            ></textarea>
          )}
        </div>
        <div className="absolute flex flex-row gap-2 left-1 top-[-40px] transform -translate-x-1/5">
          <button
            className={`py-1 px-2 bg-[${activeTab === 'headers' ? '#fe6d12' : '#fbc511'}] text-white flex items-center justify-center shadow-md`}
            onClick={() => setActiveTab('headers')}
          >
            Headers
          </button>
          <button
            className={`py-1 px-2 bg-[${activeTab === 'variables' ? '#fe6d12' : '#fbc511'}] text-white flex items-center justify-center shadow-md`}
            onClick={() => setActiveTab('variables')}
          >
            Variables
          </button>
        </div>
        <button
          onClick={togglePanel}
          className="absolute py-2 px-4  right-1 top-[-40px] transform -translate-x-1/5 b bg-[#fe6d12] text-white flex items-center justify-center shadow-md"
        >
          {isOpen ? (
            <span className="text-xl">&#x25B2;</span>
          ) : (
            <span className="text-xl">&#x25BC;</span>
          )}
        </button>
      </div>
    </div>
  );
}
