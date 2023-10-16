import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import EventBadge from './Badge';

function TimerNotification() {
  const events = useSelector((state) => state.timer.events);
  const [expiredEvents, setExpiredEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const expired = events.filter((event) => {
        const notificationTime = event.notificationTime;

        return formattedDate >= notificationTime;
      });

      setExpiredEvents(expired);
    }, 600); 

    return () => {
      clearInterval(interval);
    };
  }, [events]);

  return (
    <div className={style.notificationContainer}>
      {expiredEvents.length > 0 && <EventBadge count={expiredEvents.length} />}
    </div>
  );
}

export default TimerNotification;
