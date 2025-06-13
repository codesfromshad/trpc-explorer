import React from 'react';
import classNames from 'clsx';

import styles from './wrapper.module.css';

interface Props {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

export function Wrapper({children, center, style}: Props) {
  return (
    <div
      className="flex items-center bg-muted/30 w-full h-8 text-xs"
      // className={classNames(styles.Wrapper, center && styles.center)}
      // style={style}
    >
      {children}
    </div>
  );
}
