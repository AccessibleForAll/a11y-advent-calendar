import Link from 'next/link';
import { Moon, Sun, TriangleAlert } from 'lucide-react';

import Button from '@/components/Buttons/Button/Button';
import styles from './AdminNavigation.module.scss';

const adminLinks = [
  { href: '/admin/manageDays', label: 'Manage Days' },
  { href: '/admin/manageUsers', label: 'Manage Users' },
] as const;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AdminLinksProps = {
  pathname: string;
  className: string;
};

function AdminLinks({ pathname, className }: AdminLinksProps) {
  return (
    <ul className={className}>
      {adminLinks.map(({ href, label }) => {
        const isActive = isActivePath(pathname, href);

        return (
          <li key={href}>
            <Link
              href={href}
              className={
                isActive
                  ? `${styles.navLink} ${styles.activeLink}`
                  : styles.navLink
              }
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type AdminNavigationProps = {
  pathname: string;
  isMobileMenuOpen: boolean;
  isDark: boolean;
  signOutError: string | null;
  onThemeToggle: () => void;
  onSignOut: () => Promise<void>;
};

export default function AdminNavigation({
  pathname,
  isMobileMenuOpen,
  isDark,
  signOutError,
  onThemeToggle,
  onSignOut,
}: AdminNavigationProps) {
  const handleSignOut = () => {
    void onSignOut();
  };

  return (
    <>
      <nav className={styles.desktopNavigation} aria-label="Admin">
        <div className={styles.desktopNavigationInner}>
          <AdminLinks pathname={pathname} className={styles.desktopLinks} />

          <Button variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </nav>

      <nav
        id="admin-mobile-navigation"
        className={`${styles.mobileNavigation} ${isMobileMenuOpen ? styles.isOpen : ''}`}
        aria-label="Admin"
      >
        <AdminLinks pathname={pathname} className={styles.mobileLinks} />

        <div className={styles.mobileActions}>
          <Button
            className={styles.mobileActionButton}
            variant="primary"
            icon={isDark ? Sun : Moon}
            onClick={onThemeToggle}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>

          <Button variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </nav>

      <p role="alert" className={styles.signOutError}>
        {signOutError && (
          <>
            <TriangleAlert aria-hidden="true" />
            {signOutError}
          </>
        )}
      </p>
    </>
  );
}
