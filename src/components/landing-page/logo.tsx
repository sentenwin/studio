import type { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className={`text-2xl font-bold text-primary ${className}`}>
      Open MaduraAI
    </Link>
  );
};

export default Logo;
