import * as prettier from 'prettier/standalone';
import * as parserGraphQL from 'prettier/parser-graphql';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const formatQuery = async (query: string): Promise<string> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  try {
    return await prettier.format(query, {
      parser: 'graphql',
      plugins: [parserGraphQL],
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      endOfLine: 'lf',
    });
  } catch (error) {
    toast(t('graphql.formattingFail'), {
      description: `${error}`,
      action: {
        label: t('graphql.close'),
        onClick: () => {
          toast.dismiss();
        },
      },
    });
    return query;
  }
};
export default formatQuery;
