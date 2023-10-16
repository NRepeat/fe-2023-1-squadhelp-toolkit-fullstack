import React from 'react';
import styles from './style.module.scss';
import constants from '../../constants';

const NotebookImg = ({ ...props }) => (
  <img className={styles.NotebookImgHDNCW} alt="NotebookImg" {...props} />
);
NotebookImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/notebook.png`,
  alt: 'NotebookImg',
};

const CubockImg = ({ ...props }) => (
  <img className={styles.CubockImgHDNCW} alt="CubockImg" {...props} />
);
CubockImg.defaultProps = {
  src: `${constants.STATIC_IMAGES_PATH}/howItwork/cubock.png`,
  alt: 'CubockImg',
};
export default function HowDoNamingContestsWork() {
  return (
    <>
      <div className={styles.HDNCWcontainer}>
        <CubockImg />
        <h1 className={styles.HDNCWh1}>How Do Naming Contests Work?</h1>
        <div className={styles.HDNCWwrapper}>
          <div className={styles.HDNCWimg}>
            <NotebookImg />
          </div>
          <div className={styles.HDNCWenum}>
            <span className={styles.HDNCWspan}>
              <p className={styles.HDNCWnumber}>1.</p>
              <p>
                Fill out your Naming Brief and begin receiving name ideas in
                minutes
              </p>
            </span>
            <span className={styles.HDNCWspan}>
              <p>2.</p>
              <p>
                Rate the submissions and provide feedback to creatives.
                Creatives submit even more names based on your feedback.
              </p>
            </span>
            <span className={styles.HDNCWspan}>
              <p>3.</p>
              <p>
                Our team helps you test your favorite names with your target
                audience. We also assist with Trademark screening.
              </p>
            </span>
            <span className={styles.HDNCWspan}>
              <p>4.</p>
              <p>Pick a Winner. The winner gets paid for their submission.</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
