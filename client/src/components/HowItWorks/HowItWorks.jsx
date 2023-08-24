import React from 'react';
import Faq from './FAQ/Faq';
import HowDoesSquadhelpWork from './HowDoesSquadhelpWork';
import WaysToUse from './WaysToUse';
import HowDoNamingContestsWork from './HowDoNamingContestsWork';
import ReadyGetStarted from './ReadyGetStarted';
import Questions from './Questions';
import styles from './style.module.scss';
function HowItWorks() {
  return (
    <div className={styles.mainContainer}>
      <HowDoesSquadhelpWork />
      <WaysToUse />
      <HowDoNamingContestsWork />
      <Faq />
      <ReadyGetStarted />
      <Questions />
    </div>
  );
}

export default HowItWorks;
