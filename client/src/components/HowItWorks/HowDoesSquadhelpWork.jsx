import React from 'react';
import constants from '../../constants';
import styles from './style.module.scss';
const PhoneImg = ({ ...props }) => (
  <img className={styles.phoneImhHDSW} alt='phoneImg' {...props} />
);
PhoneImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/phone.png`,
  alt: 'phoneImg',
};
export default function HowDoesSquadhelpWork() {
  return (
    <div>
      <div>
        <div className={styles.HDSWContainer}>
          <div className={styles.HDSWBanerWrapper}>
            <div className={styles.BanerHDSW}>
              {' '}
              <span className={styles.spanHDSW}>
                World's #1 Naming Platform
              </span>  
              <h1 className={styles.h1HDSW}>How Does Squadhelp Work?</h1>
              <p className={styles.pHDSW}>
                Squadhelp helps you come up with a great name for your business
                by combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
              <button className={styles.buttonHDSW}>
              
                Play Video
              </button>
            </div>

            <div className={styles.imgWrapperHDSW}>
              <PhoneImg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
