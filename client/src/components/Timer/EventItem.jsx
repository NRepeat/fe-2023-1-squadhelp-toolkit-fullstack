import React, { useState, useEffect } from 'react';
import styles from './Timer.module.scss';
function EventItem({ event }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event));

  useEffect(() => {
    const eventDate = new Date(`${event.date} ${event.time}`);
    const currentTime = new Date();

    if (eventDate <= currentTime) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [event]);

  function calculateTimeLeft(event) {
    const eventDate = new Date(`${event.date} ${event.time}`);
    const currentTime = new Date();
    const timeDifference = eventDate - currentTime;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const isEventSoon =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 10;
		const progressPercentage =
		((timeLeft.days * 24 * 60 * 60 +
			timeLeft.hours * 60 * 60 +
			timeLeft.minutes * 60 +
			timeLeft.seconds) *
		(24 * 60 * 60)/1000000) ;

  const progressStyle = {
    width: `${100-progressPercentage}%`,
  };
  return (
    <>
      {' '}
      <div
        className={`${styles.eventItem} ${
          isEventSoon ? 'event-item-soon' : ''
        }`}
      >
        <h3>{event.name}</h3>
        <p className="time-left">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          {timeLeft.seconds}s
        </p>
      </div>
      <div className={styles.eventProgress} style={progressStyle}></div>
    </>
  );
}

export default EventItem;
