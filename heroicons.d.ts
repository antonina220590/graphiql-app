declare module '@heroicons/react/solid' {
  import { FC, SVGProps } from 'react';

  export const PlayIcon: FC<SVGProps<SVGSVGElement>>;
  export const TrashIcon: FC<SVGProps<SVGSVGElement>>;
  // Add other icons you are going to use here

  // You can also declare a generic type like this if you are using many icons
  // export const [iconName]: FC<SVGProps<SVGSVGElement>>;
}

declare module '@heroicons/react/outline' {
  import { FC, SVGProps } from 'react';

  export const PlayIcon: FC<SVGProps<SVGSVGElement>>;
  export const TrashIcon: FC<SVGProps<SVGSVGElement>>;
  // Add other icons you are going to use here
}
