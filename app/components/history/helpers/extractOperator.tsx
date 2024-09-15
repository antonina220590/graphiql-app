import { toast } from 'sonner';

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

export default extractGraphQLOperation;
