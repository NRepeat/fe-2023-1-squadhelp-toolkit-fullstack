import React from 'react';
import styles from './style.module.scss';
import constants from '../../constants';
export default function Questions() {
  const ForbesImg = ({ ...props }) => (
    <img className={styles.stars} alt='ForbesImg' {...props} />
  );
  ForbesImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/forbes.svg`,
    alt: 'ForbesImg',
  };
  const ChicagoImg = ({ ...props }) => (
    <img className={styles.stars}alt='ChicagoImg' {...props} />
  );
  ChicagoImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/chicago.svg`,
    alt: 'ChicagoImg',
  };
  const MashableImg = ({ ...props }) => (
    <img className={styles.stars}alt='MashableImg' {...props} />
  );
  MashableImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/Mashable.svg`,
    alt: 'MashableImg',
  };
  const TNWImg = ({ ...props }) => <img className={styles.stars} alt='TNWImg'{...props} />;
  TNWImg.defaultProps = {
    src: `${constants.STATIC_IMAGES_PATH}/howItwork/TNW.svg`,
    alt: 'TNWImg',
  };
  return (
    <>
      {' '}
      <div className={styles.Qcontainer}>
        <div className={styles.Qwrapper}>
          <div className={styles.QblockWrapper}>
            <span className={styles.Qblock}>
              <h2>Pay a Fraction of cost vs hiring an agency</h2>
              <p>
                For as low as $199, our naming contests and marketplace allow
                you to get an amazing brand quickly and affordably.
              </p>
            </span>
            <span className={styles.Qblock}>
              <h3>Satisfaction Guarantee</h3>
              <p>
                Of course! We have policies in place to ensure that you are
                satisfied with your experience. <a href="#">Learn more</a>
              </p>
            </span>
          </div>
          <div className={styles.Qq}>
            <h1>Questions?</h1>
            <p>
              Speak with a Squadhelp platform expert to learn more and get your
              questions answered.
            </p>
            <button>Schedule Consultation</button>
            <p> (877) 355-3585</p>
            <p>Call us for assistance</p>
          </div>
        </div>
      </div>
      <div className={styles.Logocontainer}>
        Featured In
        <div className={styles.Logowrapper}>
          <ForbesImg />
          <TNWImg />
          <ChicagoImg />
          <MashableImg />
        </div>
      </div>
    </>
  );
}
