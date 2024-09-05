'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/solid';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { toast } from 'sonner';

import {
  addHeader,
  updateHeader,
  deleteHeader,
} from '../../slices/headersSlice';
import { setVariables } from '../../slices/variablesSlice';

interface Header {
  key: string;
  value: string;
}

export default function HeadersPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<'headers' | 'variables'>(
    'headers'
  );
  const [isValidJson, setIsValidJson] = useState(true);

  const dispatch = useDispatch();
  const headers = useSelector((state: { headers: Header[] }) => state.headers);
  const variables = useSelector(
    (state: { variables: { value: string } }) => state.variables.value
  );

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
    setPanelHeight(300);
  };

  const openPanel = () => {
    setIsOpen(true);
  };

  const addHTTPHeader = () => {
    dispatch(addHeader());
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    dispatch(updateHeader({ index, field, value }));
  };

  const removeHeader = (index: number) => {
    dispatch(deleteHeader(index));
  };

  const validateJson = (input: string) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = useCallback(
    (value: string) => {
      if (validateJson(value)) {
        dispatch(setVariables(value));
        setIsValidJson(true);
      } else {
        setIsValidJson(false);
        toast('Invalid JSON format in variables.', {
          description:
            'Please make sure your JSON input is correctly formatted.',
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
    [dispatch]
  );

  return (
    <div className="">
      <div
        ref={panelRef}
        data-testid="panel"
        className={`absolute z-10 left-0 bottom-0 w-full bg-[#c8c8c8] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: `${panelHeight}px` }}
      >
        <div className="relative p-4 bg-gray-100 h-full resize-none overflow-y-scroll">
          <div
            className="absolute right-0 top-0 h-2 w-[100%] cursor-ns-resize bg-gray-300"
            data-testid="resize-handle"
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
                    onClick={() => removeHeader(index)}
                    className="flex items-center justify-center w-10 h-10 text-white p-1 m-1 col-span-1"
                    aria-label="delete header"
                  >
                    <TrashIcon className="h-8 w-8 text-[#fe6d12]" />
                  </button>
                </div>
              ))}

              <button
                className="bg-[#fe6d12] text-white p-2 mt-3 rounded border hover:border-[#292929] transition duration-300"
                onClick={addHTTPHeader}
              >
                Add Header
              </button>
            </div>
          )}
          {activeTab === 'variables' && (
            <div className="flex-grow min-h-full overflow-auto">
              <CodeMirror
                height="300px"
                width="100%"
                value={variables}
                theme="dark"
                extensions={[javascript({ jsx: true })]}
                onChange={handleChange}
                placeholder='{"key": "value"}'
                style={{
                  borderColor: isValidJson ? 'lightgray' : 'red',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              />
            </div>
          )}
        </div>
        <div className="absolute flex flex-row gap-2 left-1 top-[-40px] transform -translate-x-1/5">
          <button
            className={`py-1 px-2 bg-[${activeTab === 'headers' ? '#fe6d12' : '#fbc511'}] text-white flex items-center justify-center shadow-md`}
            onClick={() => {
              setActiveTab('headers');
              openPanel();
            }}
          >
            Headers
          </button>
          <button
            className={`py-1 px-2 bg-[${activeTab === 'variables' ? '#fe6d12' : '#fbc511'}] text-white flex items-center justify-center shadow-md`}
            onClick={() => {
              setActiveTab('variables');
              openPanel();
            }}
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
