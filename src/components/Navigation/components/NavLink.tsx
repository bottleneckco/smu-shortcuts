import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// This creates a custom component that wraps an <a> tag
const Anchor = styled.a``;

interface Props {
  className?: string;
  href: string;
}

const NavLink: React.FC<Props> = function (props) {
  const { href, children, className } = props;

  return (
    <Link href={href} passHref>
      <Anchor className={className}>{children}</Anchor>
    </Link>
  );
};

export default NavLink;
