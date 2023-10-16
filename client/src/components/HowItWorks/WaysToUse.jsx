import React from 'react';
import constants from '../../constants';
import styles from './style.module.scss';
const ContestImg = ({ ...props }) => <img className={styles.Img} alt= 'ContestImg' {...props} />;
ContestImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/Contest.png`,
  alt: 'ContestImg',
};
const NameImg = ({ ...props }) => <img className={styles.Img}  alt= 'NameImg' {...props} />;
NameImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/Name.png`,
  alt: 'NameImg',
};
const AgencyImg = ({ ...props }) => <img className={styles.Img} alt= 'AgencyImg'{...props} />;
AgencyImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/Agency.png`,
  alt: 'AgencyImg',
};
export default function WaysToUse() {
  return (
    <div className={styles.WTUSContainer}>
      <span className={styles.WTUSspan}>Our Services</span>
      <h1 className={styles.WTUSh1}>3 Ways To Use Squadhelp</h1>
      <p className={styles.WTUSp}>
        Squadhelp offers 3 ways to get you a perfect name for your business.
      </p>
      <div className={styles.cardWrapperWTUS}>
        <span className={styles.cardWTUS}>
          <ContestImg />
          <h2 className={styles.h2}>Launch a Contest</h2>
          <p className={styles.p}>
            Work with hundreds of creative experts to get custom name
            suggestions for your business or brand. All names are auto-checked
            for URL availability.
          </p>
          <button className={styles.button}>Launch a Contest</button>
        </span>
        <span className={styles.cardWTUS}>
          <NameImg />
          <h2 className={styles.h2}>Explore Names For Sale</h2>
          <p className={styles.p}>
            Our branding team has curated thousands of pre-made names that you
            can purchase instantly. All names include a matching URL and a
            complimentary Logo Design
          </p>
          <button className={styles.button}>Explore Names For Sale</button>
        </span>
        <span className={styles.cardWTUS}>
          <AgencyImg />
          <h2 className={styles.h2}>Agency-level Managed Contests</h2>
          <p className={styles.p}>
            Our Managed contests combine the power of crowdsourcing with the
            rich experience of our branding consultants. Get a complete
            agency-level experience at a fraction of Agency costs
          </p>
          <button className={styles.button}>Learn More</button>
        </span>
      </div>
    </div>
  );
}
