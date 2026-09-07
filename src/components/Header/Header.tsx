 import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
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

      <button type="button" className={styles.themeButton}>
        Theme
      </button>
    </header>
  );
}
