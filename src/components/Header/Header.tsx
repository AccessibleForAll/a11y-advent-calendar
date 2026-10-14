'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import Button from '@/components/Buttons/Button/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon } from 'lucide-react';

import AdminNavigation from '@/components/AdminNavigation/AdminNavigation';
import { authClient } from '@/lib/auth-client';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme ?? resolvedTheme;
  const isDark = currentTheme === 'dark';
  const isAdminRoute = pathname.startsWith('/admin');

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  async function handleSignOut() {
    setSignOutError(null);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        setSignOutError(error.message || 'Failed to sign out');
        return;
      }

      router.replace('/login');
      router.refresh();
    } catch {
      setSignOutError('Failed to sign out. Please try again');
    }
  }

  return (
    <div className={styles.headerShell}>
      <header
        className={[styles.header, isAdminRoute ? styles.adminHeader : '']
          .filter(Boolean)
          .join(' ')}
      >
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/axesslab-logo.png"
            alt="Axesslab Logo"
            width={178}
            height={36}
          />
        </Link>

        <div className={styles.headerActions}>
          <Button
            className={styles.desktopThemeButton}
            variant="primary"
            onClick={handleThemeToggle}
            icon={isDark ? Sun : Moon}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
          {isAdminRoute && (
            <Button
              className={styles.mobileMenuButton}
              variant="primary"
              icon={Menu}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="admin-mobile-navigation"
            >
              Menu
            </Button>
          )}
        </div>
      </header>
      {isAdminRoute && (
        <AdminNavigation
          pathname={pathname}
          isMobileMenuOpen={isMobileMenuOpen}
          isDark={isDark}
          signOutError={signOutError}
          onThemeToggle={handleThemeToggle}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}
