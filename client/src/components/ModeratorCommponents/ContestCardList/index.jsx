import React from 'react'

export default function index() {
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
							onVerify={handleVerify}
							onReject={handleReject}
						/>
					)}
				</div>
				<div>
					{activeTab === constants.PENDING_TAB_MODERATOR && (
						<ContestCard
							contestData={currentContestData}
							onVerify={handleVerify}
							onReject={handleReject}
						/>
					)}
				</div>
				<div>
					{activeTab === constants.FINISHED_TAB_MODERATOR  && (
						<ContestCard
							contestData={currentContestData}
							onVerify={handleVerify}
							onReject={handleReject}
						/>
					)}
				</div>
			</div>
		)}
	</div>
	)
}
