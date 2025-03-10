import React, { useState, useEffect } from 'react';
import styles from './Timer.module.scss';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/slices/timerSlice';

function EventItem({ event }) {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(event));
  const [initialTimeLeft, setinitialTimeLeft] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const eventDate = new Date(`${event.date} ${event.time}`);
    const currentTime = new Date();

    if (eventDate <= currentTime) {
      setIsCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [event,timeLeft]);

  useEffect(() => {
    setinitialTimeLeft(calculateTimeLeft(event));
  }, [event]);

  const handleDelete = (e) => {
    dispatch(deleteEvent(event.id));
  };

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

  const totalSeconds =
    initialTimeLeft.days * 24 * 60 * 60 +
    initialTimeLeft.hours * 60 * 60 +
    initialTimeLeft.minutes * 60 +
    initialTimeLeft.seconds;

  const remainingSeconds =
    timeLeft.days * 24 * 60 * 60 +
    timeLeft.hours * 60 * 60 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;

  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  const progressStyle = {
    width: `${progress}%`,
  };

  return (
    <>
      <div
        onClick={handleDelete}
        className={`${styles.eventItem}  ${
          isCompleted ? styles.eventItemCompleted : ''
        }`}
      >
        <h3>{event.name}</h3>
        <p >
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          {timeLeft.seconds}s
        </p>
        <div className={styles.eventProgress} style={progressStyle}></div>
      </div>
    </>
  );
}

export default EventItem;
