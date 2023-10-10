import React from 'react';
import style from './style.module.scss';
export default function Button({ main, head }) {
  return (
    <div className={style.buttonWrapper}>
      <p className={style.head}>{head}</p>
      <p className={style.main}>{main}</p>
    </div>
  );
}
