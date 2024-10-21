import { toast } from 'sonner';

import formatQuery from './prettifier';

interface HandleFormatCodeProps {
  query: string;
  t: (key: string) => string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function handleFormatCode({
  query,
  t,
  setQuery,
}: HandleFormatCodeProps) {
  if (!query) {
    toast(t('graphql.format'));
    return;
  }

  formatQuery(query, t)
    .then((formattedQuery) => {
      setQuery(formattedQuery);
    })
    .catch((error) => {
      toast(t('graphql.formattingFail'), {
        description: `${error.message}`,
        action: {
          label: t('graphql.close'),
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    });
}
