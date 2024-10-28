import * as React from 'react';
import {SVGProps} from 'react';

type Props = SVGProps<SVGSVGElement>;

export const OrderTabSvg: React.FC<Props> = ({color = '#F5C102'}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none'>
      <path
        fill={color}
        d='M20.774 20.729 19.497 6.683A.752.752 0 0 0 18.75 6h-2.25V4.5a4.475 4.475 0 0 0-1.314-3.186A4.475 4.475 0 0 0 11.999 0a4.505 4.505 0 0 0-4.5 4.5V6h-2.25a.749.749 0 0 0-.747.683L3.225 20.729a3.007 3.007 0 0 0 .773 2.294A3.005 3.005 0 0 0 6.213 24h11.573c.841 0 1.648-.355 2.215-.977a3.013 3.013 0 0 0 .773-2.294ZM8.999 4.5c0-1.655 1.345-3 3-3a2.988 2.988 0 0 1 3 3V6h-6V4.5Zm9.894 17.512a1.489 1.489 0 0 1-1.109.488H6.214c-.427 0-.821-.174-1.108-.489a1.48 1.48 0 0 1-.385-1.148L5.934 7.5H7.5v2.25a.75.75 0 0 0 1.5 0V7.5h6v2.25a.75.75 0 0 0 1.5 0V7.5h1.564l1.215 13.365c.04.425-.097.833-.385 1.148Z'
      />
    </svg>
  );
};
