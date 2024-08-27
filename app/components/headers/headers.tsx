import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function HeadersPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);
  const [activeTab, setActiveTab] = useState<'headers' | 'variables'>(
    'headers'
  );
  const [headers, setHeaders] = useState<string>('');
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
            <textarea
              className="w-full h-full bg-white text-black"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder='{"Content-Type": "application/json"}'
            ></textarea>
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
          className="absolute py-2 px-4 right-1 top-[-40px] transform -translate-x-1/5 b bg-[#fe6d12] text-white flex items-center justify-center shadow-md"
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
