import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../store/slices/timerSlice';
import styles from './Timer.module.scss';
import { v4 as uuidv4 } from 'uuid';

function EventForm() {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventTime) {
      alert('Please fill in all fields.');
      return;
    }

    const selectedDate = new Date(`${eventDate}T${eventTime}`);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('Please select a future date and time.');
      return;
    }

    const newEvent = {
      id: uuidv4(),
      name: eventName,
      date: eventDate,
      time: eventTime,
    };

    dispatch(addEvent(newEvent));
  };

  return (
    <>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h1>Create event timer</h1>
        <div className={styles.inputWrapper}>
          <p>Enter event name</p>
          <input
            type="text"
            placeholder="Event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <p>Enter date</p>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <p>Enter time</p>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </>
  );
}

export default EventForm;
