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
  onNavigate: () => void;
};

function AdminLinks({ pathname, className, onNavigate }: AdminLinksProps) {
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
              onClick={onNavigate}
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
  onNavigate: () => void;
  onThemeToggle: () => void;
  onSignOut: () => Promise<void>;
};

export default function AdminNavigation({
  pathname,
  isMobileMenuOpen,
  isDark,
  signOutError,
  onNavigate,
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
          <AdminLinks
            pathname={pathname}
            className={styles.desktopLinks}
            onNavigate={onNavigate}
          />

          <Button variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </nav>

      <nav
        id="admin-mobile-navigation"
        className={styles.mobileNavigation}
        aria-label="Admin"
        hidden={!isMobileMenuOpen}
      >
        <AdminLinks
          pathname={pathname}
          className={styles.mobileLinks}
          onNavigate={onNavigate}
        />

        <div className={styles.mobileActions}>
          <Button
            className={styles.mobileActionButton}
            variant="primary"
            icon={isDark ? Sun : Moon}
            onClick={onThemeToggle}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>

          <Button
            variant="secondary"
            onClick={handleSignOut}
            className={styles.mobileActionButton}
          >
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
