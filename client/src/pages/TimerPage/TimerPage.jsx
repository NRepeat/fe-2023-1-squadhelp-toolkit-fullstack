import React from 'react';
import EventForm from '../../components/Timer/EventForm';
import EventList from '../../components/Timer/EventList';
import styles from './TimerPage.module.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
export default function TimerPage() {
  return (
    <>
      {' '}
      <Header />
      <div className={styles.timerContainer}>
        <div className={styles.timerwrapper}>
          <div className={styles.eventform}>
            <EventForm />
          </div>
          <div className={styles.eventlist}>
            <span>
              <h2>Event List</h2> <p>Remaining time </p>
            </span>
            <EventList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
