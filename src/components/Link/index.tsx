import React, { DOMAttributes, ReactNode } from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends NextLinkProps, DOMAttributes<any> {
  className?: string;
  children?: ReactNode | ReactNode[];
  isExternal?: boolean;
  role?: string;
  tabIndex?: number;
}

function Link({ className, children, href = '', isExternal = false }: LinkProps) {
  return isExternal ? (
    <a className={className} href={href as string} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <NextLink
      {...{
        href
      }}
    >
      <a className={className}>{children}</a>
    </NextLink>
  );
}

Link.defaultProps = {};

export default Link;
