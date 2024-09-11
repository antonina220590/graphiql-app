'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface RequestDetails {
  url: string;
  timestamp: string;
}

function decodeBase64(str: string): string {
  try {
    return decodeURIComponent(atob(str));
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

  history.map((url) => {
    const stringURL = url.url.toString();
    if (stringURL.includes('restfullClient')) {
      // console.log(stringURL);
    }
  });

  function extractGraphQLOperation(queryJsonString: string): string {
    try {
      const parsedQuery = JSON.parse(queryJsonString);
      const queryString = parsedQuery.query;
      const cleanedQuery = queryString
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
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
    <div className="history-section">
      <h2>Request History</h2>
      <ul>
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
          const visibleQueryResult = extractGraphQLOperation(visibleQuery);

          return (
            <div key={index} className="flex gap-4">
              <span>{methodSegment}</span>
              <li
                onClick={() => handleSelectRequestFromGraphiHistory(request)}
                title={request.url}
                style={{ cursor: 'pointer' }}
              >
                {`${decodedUrl}/${visibleQueryResult}`}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default RequestHistory;
