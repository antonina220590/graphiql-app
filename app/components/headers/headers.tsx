import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function HeadersPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [panelHeight, setPanelHeight] = useState<number>(300);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
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
        className={`absolute left-0 bottom-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: `${panelHeight}px` }}
      >
        <div className="relative p-4 bg-gray-100 h-full">
          <div
            className="absolute right-0 top-0 h-2 w-[100%] cursor-ns-resize bg-gray-300"
            onMouseDown={startResize}
          />
        </div>
        <div className="absolute flex flex-row gap-2 left-1 top-[-40px] transform -translate-x-1/5">
          <button className="py-1 px-2 left-1 top-[-40px] bg-orange-400 text-white flex items-center justify-center shadow-md">
            Headers
          </button>
          <button className="py-1 px-2 left-2/3 top-[-40px] bg-orange-400 text-white flex items-center justify-center shadow-md">
            Variables
          </button>
        </div>
        <button
          onClick={togglePanel}
          className="absolute py-2 px-4 right-1 top-[-40px] transform -translate-x-1/5 bg-orange-400 text-white flex items-center justify-center shadow-md"
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
