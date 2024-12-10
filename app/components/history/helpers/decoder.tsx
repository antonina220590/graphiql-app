import { toast } from 'sonner';

import extractAndSanitize from './urlSanitizer';

function decodeBase64(str: string): string {
  try {
    const sanitized = extractAndSanitize(str);
    return decodeURIComponent(atob(sanitized));
  } catch (error) {
    toast('Failed to decode base64 string.', {
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

export default decodeBase64;
