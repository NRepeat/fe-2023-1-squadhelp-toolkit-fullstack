import React from 'react';
import ContestCard from '../ContestCard';
import style from './ContestCardList.module.scss';
import constants from '../../../constants';
export default function ContestCardList({
  activeTab,
  currentContestData,
  onVerify,
  onReject,
	loadingError
}) {
  return (
    <div className={style.cardWrapper}>
      {loadingError ? (
        <div>{loadingError}</div>
      ) : (
        <div>
          <div>
            {activeTab === constants.ACTIVE_TAB_MODERATOR && (
              <ContestCard
                contestData={currentContestData}
                onVerify={onVerify}
                onReject={onReject}
              />
            )}
          </div>
          <div>
            {activeTab === constants.PENDING_TAB_MODERATOR && (
              <ContestCard
                contestData={currentContestData}
                onVerify={onVerify}
                onReject={onReject}
              />
            )}
          </div>
          <div>
            {activeTab === constants.FINISHED_TAB_MODERATOR && (
              <ContestCard
                contestData={currentContestData}
								onVerify={onVerify}
                onReject={onReject}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
