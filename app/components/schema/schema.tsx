import React, { useState, useRef, useCallback, useEffect } from 'react';

import SchemaFetcher from './schemaSDL';

export default function SchemaPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panelWidth, setPanelWidth] = useState<number>(300);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isResizing.current && panelRef.current) {
      const newWidth = window.innerWidth - event.clientX;
      setPanelWidth(newWidth > 200 ? newWidth : 200);
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
        className={`absolute right-0 top-0 min-h-[60svh] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: `${panelWidth}px` }}
      >
        <div
          className="p-4 h-full bg-gray-100 text-xs"
          style={{
            height: 'calc(60svh - 80px)',
            overflowY: 'auto',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-gray-300"
            onMouseDown={startResize}
          />
          <SchemaFetcher />
        </div>
        <button
          onClick={togglePanel}
          className="absolute py-1 px-2 z-50 left-[-70px] top-1/4 transform -translate-y-1/2 bg-[#fe6d12] text-white flex items-center justify-center shadow-md"
          style={{ transform: 'rotate(-90deg)' }}
        >
          Schema
        </button>
      </div>
    </div>
  );
}
