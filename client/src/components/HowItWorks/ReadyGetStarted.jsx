import React from 'react';
import styles from './style.module.scss';
import constants from '../../constants';
export default function ReadyGetStarted() {
  const StarsImg = ({ ...props }) => (
    <img className={styles.stars} {...props} />
  );
  StarsImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/stars.svg`,
    alt: 'StarsImg',
  };
  const PeopleImg = ({ ...props }) => (
    <img className={styles.stars} {...props} />
  );
  PeopleImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/people.webp`,
    alt: 'PeopleImg',
  };
  const SharingfilesImg = ({ ...props }) => (
    <img className={styles.stars} {...props} />
  );
  SharingfilesImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/sharing-files.svg`,
    alt: 'SharingfilesImg',
  };
  return (
    <div className={styles.RTGScontainer}>
      <div className={styles.RTGSwrapper}>
        <div className={styles.RTGSbaner}>
          <h1 className={styles.RTGSh1}>Ready to get started?</h1>
          <p className={styles.RTGSbanerP}>
            Fill out your contest brief and begin receiving custom name
            suggestions within minutes.
          </p>
          <button className={styles.RTGSbutton}>Start A Contest</button>
        </div>
        <div className={styles.RTGScards}>
          <span className={styles.RTGScard}>
            <StarsImg />
            <p>
              <span className={styles.RTGScaradboldfont}>
                4.9 out of 5 stars
              </span>{' '}
              from 25,000+ customers.
            </p>
          </span>
          <span className={styles.RTGScard}>
            <PeopleImg />
            <p>
              Our branding community stands{' '}
              <span className={styles.RTGScaradboldfont}>200,000+</span> strong.
            </p>
          </span>
          <span className={styles.RTGScard}>
            <SharingfilesImg />
            <p>
              <span className={styles.RTGScaradboldfont}>140+ Industries</span>{' '}
              supported across more than
              <span className={styles.RTGScaradboldfont}>85 countries</span> –
              and counting.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
