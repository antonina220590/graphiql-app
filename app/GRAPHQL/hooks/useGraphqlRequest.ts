import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface Headers {
  key: string;
  value: string;
}

interface UseGraphQLRequestProps {
  headers: Headers[];
  variables: string;
}

export const useGraphQLRequest = ({
  headers,
  variables,
}: UseGraphQLRequestProps) => {
  const { t } = useTranslation();
  const [statusCode, setStatusCode] = useState<string>('');
  const [responseData, setResponseData] = useState<string>('');

  const sendRequest = async (url: string, query: string) => {
    const validHeaders = headers.filter((header) => header.key && header.value);
    const headersObject = Object.fromEntries(
      validHeaders.map((header) => [header.key.trim(), header.value.trim()])
    );

    let validVariables = {};
    if (variables.trim()) {
      try {
        validVariables = JSON.parse(variables);
      } catch (error) {
        toast(t('graphql.invalidFormat'), {
          description: `${error}`,
          action: {
            label: t('graphql.close'),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        return;
      }
    }

    const requestBody = {
      url,
      query,
      ...(validVariables && Object.keys(validVariables).length > 0
        ? { variables: validVariables }
        : {}),
    };

    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify(requestBody),
      });
      const statusText = t(`statusText.${res.status}`, {
        defaultValue: t('statusText.unknownStatus'),
      });
      setStatusCode(`${res.status} ${statusText}`);

      const data = await res.json();
      setResponseData(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseData(String(error));
      toast(t('graphql.oops'), {
        description: t('graphql.fetchFail'),
        action: {
          label: t('graphql.close'),
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return {
    sendRequest,
    statusCode,
    responseData,
  };
};
