'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import Button from '@/components/Buttons/Button/Button';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme ?? resolvedTheme;
  const isDark = currentTheme === 'dark';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/axesslab-logo.png"
          alt="Axesslab Logo"
          width={178}
          height={36}
        />
      </Link>

      <Button
        variant="primary"
        onClick={handleThemeToggle}
        icon={isDark ? Sun : Moon}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </header>
  );
}
