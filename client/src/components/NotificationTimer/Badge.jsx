import React from 'react';
import style from './style.module.scss';
function EventBadge({ count }) {
  return (
    <div className={style.eventBadge}>
      <span>{count}</span>
    </div>
  );
}

export default EventBadge;
