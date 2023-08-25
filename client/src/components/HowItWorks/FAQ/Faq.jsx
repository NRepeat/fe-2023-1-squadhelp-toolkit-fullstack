import React from 'react';
import LaunchingAContest from './LaunchingAContest';
import MiniMaap from './MiniMaap';
import styles from '../style.module.scss';
function Faq() {
  return (
    <div className={styles.FaQcontainer}>
      <MiniMaap />
      <LaunchingAContest />
    </div>
  );
}

export default Faq;
