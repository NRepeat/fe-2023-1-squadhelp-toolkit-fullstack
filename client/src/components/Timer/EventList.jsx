import React from 'react';
import { useSelector } from 'react-redux';
import EventItem from './EventItem';
import styles from './Timer.module.scss';
function EventList() {
  const events = useSelector((state) => {
    return state.timer.events;
  });

  const sortedEvents = events.slice().sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  return (
    <>
     
      <div className={styles.listWrapper}>
        {sortedEvents.map((event,id) => (
          <EventItem key={id} id={id}event={event} />
        ))}
      </div>
    </>
  );
}

export default EventList;
