import React from 'react';
import style from './TabContainer.module.scss';
import constants from '../../../constants';
export default function TabContainer({ activeTab, handleTabChange }) {
  return (
    <div className={style.tabContainer}>
      <button
        className={`${style.tabButton} ${
          activeTab === constants.ACTIVE_TAB_MODERATOR ? `${style.active}` : ''
        }`}
        onClick={() => handleTabChange(constants.ACTIVE_TAB_MODERATOR)}
      >
        Active
      </button>
      <button
        className={`${style.tabButton} ${
          activeTab === constants.PENDING_TAB_MODERATOR ? `${style.active}` : ''
        }`}
        onClick={() => handleTabChange(constants.PENDING_TAB_MODERATOR)}
      >
        Pending
      </button>
      <button
        className={`${style.tabButton} ${
          activeTab === constants.FINISHED_TAB_MODERATOR
            ? `${style.active}`
            : ''
        }`}
        onClick={() => handleTabChange(constants.FINISHED_TAB_MODERATOR)}
      >
        Finished
      </button>
    </div>
  );
}
