import React from 'react';
import Link from 'next/link';
import styles from './Page.module.css'; // CSS module

const Page = () => {


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Song Maker</h1>
      <p className={styles.titleAnimated}>find inspiration through others</p>
      <div className={styles.buttons}>
        <Link href="/Login" legacyBehavior>
          <a className={styles.button}>Log in</a>
        </Link>
        <Link href="/Register" legacyBehavior>
          <a className={styles.button}>Sign in</a>
        </Link>
      </div>
    </div>
  );
};

export default Page;
