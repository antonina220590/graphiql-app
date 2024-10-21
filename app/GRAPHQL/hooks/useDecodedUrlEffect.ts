import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { setVariables } from '../../slices/variablesSlice';
import { setHeaders } from '../../slices/headersSlice';
import { padBase64Str } from '../helpers/padBase';
import formatQuery from '../helpers/prettifier';

type DecodedUrlEffectProps = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  t: (key: string) => string;
};

export const useDecodedUrlEffect = ({
  setUrl,
  setQuery,
  t,
}: DecodedUrlEffectProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const encodedUrl = window.location.pathname.split('/');

    if (encodedUrl.length >= 4) {
      const endpointUrlEncoded = encodedUrl[2];
      const bodyEncoded = encodedUrl[3];

      try {
        const decodedEndpointUrl = decodeURIComponent(
          atob(padBase64Str(endpointUrlEncoded) || '')
        );
        const decodedBody = decodeURIComponent(
          atob(padBase64Str(bodyEncoded)) || ''
        );
        const bodyParsed = JSON.parse(decodedBody.replace(/\\n/g, ''));

        if (typeof decodedEndpointUrl === 'string') {
          setUrl(decodedEndpointUrl);
        }

        if (typeof bodyParsed.query === 'string') {
          formatQuery(bodyParsed.query, t).then((formattedQuery) => {
            setQuery(formattedQuery);
          });
        }

        if (Object.keys(bodyParsed.variables).length > 0) {
          dispatch(setVariables(JSON.stringify(bodyParsed.variables)));
        }

        const queryParams = new URLSearchParams(window.location.search);
        const headerEntries = Array.from(queryParams.entries());

        const headersToDispatch = headerEntries.map(([key, value]) => ({
          key: key.trim(),
          value: value.trim(),
        }));

        if (headersToDispatch.length > 0) {
          dispatch(setHeaders(headersToDispatch));
        }
      } catch (error) {
        toast(t('graphql.decodeFail'), {
          description: `${error}`,
          action: {
            label: t('graphql.close'),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
      }
    }
  }, [dispatch, setUrl, setQuery, t]);
};
