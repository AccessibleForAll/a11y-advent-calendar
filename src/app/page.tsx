import Image from 'next/image';
import styles from './page.module.scss';


export default function Home() {

  return (

    <main className={styles.main}>
      <h1 className={styles.title}>Accessibility Advent Calendar</h1>

      <div className={styles.intro}>
        <p>24 bite-sized web accessibility tips, one per door.
        <br />Click any unlocked door to discover an accessibility tip.
        <br />Locked days are still to come.</p>
      </div>
    </main>
  );
}
