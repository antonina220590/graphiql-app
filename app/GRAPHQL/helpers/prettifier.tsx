import * as prettier from 'prettier/standalone';
import * as parserGraphQL from 'prettier/parser-graphql';
import { toast } from 'sonner';

const formatQuery = async (query: string): Promise<string> => {
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
    toast('Formatting failed, please try again!', {
      description: `${error}`,
      action: {
        label: 'Close',
        onClick: () => {
          toast.dismiss();
        },
      },
    });
    return query;
  }
};
export default formatQuery;
