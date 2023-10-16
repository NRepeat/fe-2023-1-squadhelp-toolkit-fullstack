import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore, getUser } from '../../store/slices/userSlice';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userStore.data);
  const isFetching = useSelector((state) => state.userStore.isFetching);

  useEffect(() => {
    if (!userData) {
      dispatch(getUser());
    }
  }, [dispatch, userData]);

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    history.replace('/login');
  };

  const startContests = () => {
    history.push('/startContest');
  };

  const renderLoginButtons = () => {
    if (userData) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                userData.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicImgURL}${userData.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${userData.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/timerPage"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <span style={{ color: 'none' }}>Timer</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <span onClick={logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>Login</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>Sign Up</span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>

        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>Name Ideas</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="http://www.google.com">Beauty</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Consulting</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">E-Commerce</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Fashion & Clothing</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Finance</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Real Estate</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Tech</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Contests</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="http://www.google.com">How It Works</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Pricing</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Agency Service</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Active Contests</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Winners</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Leaderboard</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">Become a Creative</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="http://www.google.com">Names</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Taglines</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Logos</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">Testimonials</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="http://www.google.com">Popular Names</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Short Names</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Intriguing Names</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Names by Category</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Visual Name Search</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">Sell Your Domains</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="http://www.google.com">Ultimate Naming Guide</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">
                      Poetic Devices in Business Naming
                    </a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Crowded Bar Theory</a>
                  </li>
                  <li className={styles.last}>
                    <Link
                      to="/howItWorksPage"
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <p style={{ color: 'none' }}>How It Works</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {userData && userData.role === CONSTANTS.MODERATOR && (
            <div className={styles.startContestBtn} onClick={startContests}>
              Moderator Dashboard
            </div>
          )}
          {userData && userData.role === CONSTANTS.CUSTOMER && (
            <div className={styles.startContestBtn} onClick={startContests}>
              Start Contest
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
