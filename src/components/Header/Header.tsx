'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import Button from '@/components/Buttons/Button/Button';
import { useTheme } from 'next-themes';

export default function Header() {
  const { setTheme } = useTheme();

  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.dataset.theme;

    setTheme(currentTheme === 'light' ? 'dark' : 'light');
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

      <Button variant="primary" onClick={handleThemeToggle}>
        Theme
      </Button>
    </header>
  );
}
