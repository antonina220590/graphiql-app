'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import GraphQLIcon from './methodIcon/graphQL-icon';
import GETIcon from './methodIcon/get-icon';
import DelIcon from './methodIcon/delete-icon';
import PutIcon from './methodIcon/put-icon';
import PostIcon from './methodIcon/post-icon';
import PatchIcon from './methodIcon/patch-icon';
import OptionIcon from './methodIcon/option-icon';
import HeadIcon from './methodIcon/head-icon';

interface RequestDetails {
  url: string;
  timestamp: string;
}

function extractAndSanitize(base64Input: string): string {
  const splitIndex = base64Input.indexOf('=');
  const onlyBase64Part =
    splitIndex !== -1 ? base64Input.slice(0, splitIndex + 1) : base64Input;
  let sanitized = onlyBase64Part.replace(/-/g, '+').replace(/_/g, '/');
  const padding = sanitized.length % 4;
  if (padding > 0) {
    sanitized += '='.repeat(4 - padding);
  }

  return sanitized;
}

function decodeBase64(str: string): string {
  try {
    const sanitized = extractAndSanitize(str);
    return decodeURIComponent(atob(sanitized));
  } catch (error) {
    toast('Failed to decode base64 string', {
      description: `${error}`,
      action: {
        label: 'Close',
        onClick: () => {
          toast.dismiss();
        },
      },
    });
    return '';
  }
}

function RequestHistory() {
  const [history, setHistory] = useState<RequestDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedRequests = JSON.parse(
      localStorage.getItem('savedRequests') || '[]'
    ) as RequestDetails[];
    setHistory(
      storedRequests.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    );
  }, []);

  function handleSelectRequestFromGraphiHistory(request: RequestDetails) {
    router.push(`${request.url}`);
  }

  function extractGraphQLOperation(queryJsonString: string): string {
    try {
      const parsedQuery = JSON.parse(queryJsonString);
      const queryString = parsedQuery.query;
      const cleanedQuery = queryString
        .replace(/\\n/g, '')
        .replace(/\s+/g, '')
        .trim();
      const match = cleanedQuery.match(/\{([^}]+)/);
      if (match && match[1]) {
        const firstMatch = match[1].match(/(\w+)/);
        if (firstMatch) {
          return firstMatch[1];
        }
      }
    } catch (error) {
      toast('Error parsing GraphQL operation', {
        description: `${error}`,
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
    return 'query';
  }

  return (
    <main className="bg-light flex flex-col items-center justify-center">
      <div className="bg-light min-h-[80vh] flex items-center align-middle">
        {history.length > 0 ? (
          <ul
            className="bg-dark p-10 m-50"
            style={{
              height: 'calc(70svh - 80px)',
              overflowY: 'auto',
            }}
          >
            <h3 className="flex justify-center m-10 text-zinc-50 text-4xl">
              Your Requests
            </h3>
            {history.map((request, index) => {
              const urlSegment = request.url.split('/');
              const methodSegment = urlSegment.includes('restfullClient')
                ? urlSegment[4]
                : urlSegment[3];

              const decodedUrl = decodeBase64(
                urlSegment.includes('restfullClient')
                  ? urlSegment[5]
                  : urlSegment[4]
              );

              const decodedQuery = decodeBase64(urlSegment[5]);
              const visibleQuery = decodeURIComponent(decodedQuery)
                .replace(/\\n/g, ' ')
                .trim();
              const visibleQueryResult = decodedQuery.includes('{')
                ? extractGraphQLOperation(visibleQuery)
                : ' ';
              const displayMethod = () => {
                switch (methodSegment) {
                  case 'GRAPHQL':
                    return <GraphQLIcon />;
                  case 'GET':
                    return <GETIcon />;
                  case 'DELETE':
                    return <DelIcon />;
                  case 'PUT':
                    return <PutIcon />;
                  case 'POST':
                    return <PostIcon />;
                  case 'PATCH':
                    return <PatchIcon />;
                  case 'OPTION':
                    return <OptionIcon />;
                  case 'HEAD':
                    return <HeadIcon />;
                  default:
                    return '';
                }
              };
              return (
                <div
                  key={index}
                  className="flex gap-2 rounded-md border-sky-600 border-[1px] p-2 bg-white mx-10 mb-5"
                >
                  <span className="w-[120px]">{displayMethod()}</span>
                  <li
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      handleSelectRequestFromGraphiHistory(request)
                    }
                    title={request.url}
                    style={{ cursor: 'pointer' }}
                  >
                    {`${decodedUrl}/${visibleQueryResult}`}
                  </li>
                </div>
              );
            })}
          </ul>
        ) : (
          <>
            <div className="min-h-[100%] flex flex-col items-center">
              <h3>You haven`t executed any requests yet</h3>
              <span>It`s empty here. Try those options:</span>
              <div className="flex gap-4 mt-4 justify-center">
                <Link href="/restfullClient">
                  <button className="bg-orange-400 data-testid='restBtn' text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 ease">
                    Rest Client
                  </button>
                </Link>
                <Link href="/GRAPHQL">
                  <button className="bg-green-900 data-testid='graphBtn' text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
                    GraphiQL Client
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default RequestHistory;
