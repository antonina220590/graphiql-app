import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
  printSchema,
} from 'graphql';
import { toast } from 'sonner';

import { RootState } from '../../slices/store';

export default function SchemaPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panelWidth, setPanelWidth] = useState<number>(300);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [sdlStatus, setSDLStatus] = useState<number>();
  const isResizing = useRef<boolean>(false);
  const [schemaSDL, setSchemaSDL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const GRAPHQL_URL = useSelector((state: RootState) => state.schema.urlSdl);

  useEffect(() => {
    if (!GRAPHQL_URL.length || error) {
      setIsOpen(false);
    }
  }, [GRAPHQL_URL, error, isOpen]);

  useEffect(() => {
    const fetchSchema = async () => {
      const introspectionQuery = getIntrospectionQuery();
      setError('');
      if (GRAPHQL_URL.length) {
        try {
          const response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: introspectionQuery }),
          });
          setSDLStatus(response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          if (result.errors) {
            throw new Error(
              `Errors returned from GraphQL: ${JSON.stringify(result.errors)}`
            );
          }
          const schemaData = result.data;
          if (!schemaData || !schemaData.__schema) {
            throw new Error('Invalid introspection response: missing __schema');
          }

          const schema: GraphQLSchema = buildClientSchema(schemaData);
          setSchemaSDL(printSchema(schema).replace(/"""/g, ''));
        } catch (error: unknown) {
          setError((error as Error).message);
          toast('Oooops! Something went wrong!', {
            description: `${error}`,
            action: {
              label: 'Close',
              onClick: () => {
                toast.dismiss();
              },
            },
          });
        }
      }
    };
    fetchSchema();
  }, [GRAPHQL_URL, sdlStatus]);

  const togglePanel = () => {
    if (sdlStatus === 200 && schemaSDL && GRAPHQL_URL.length && !error) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(false);
    }
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
        data-testid="schema-panel"
        className={`absolute right-0 top-0 min-h-[60svh] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: `${panelWidth}px` }}
      >
        <div
          className="p-4 min-h-[60svh] bg-gray-100 text-xs"
          style={{
            height: 'calc(60svh - 80px)',
            overflowY: 'auto',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-gray-300"
            onMouseDown={startResize}
            data-testid="resize-handle"
          />
          <h1>GraphQL Schema</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <pre className=" h-full">{schemaSDL}</pre>
          )}
        </div>
        <button
          onClick={togglePanel}
          className={`absolute py-1 px-2 z-50 left-[-70px] top-1/4 transform -translate-y-1/2 bg-[${sdlStatus === 200 && schemaSDL && GRAPHQL_URL.length && !error ? '#fe6d12' : '#fbc511'}] text-white flex items-center justify-center shadow-md`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          Schema
        </button>
      </div>
    </div>
  );
}
