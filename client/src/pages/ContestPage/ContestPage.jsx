import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import Error from '../../components/Error/Error';
import { goToExpandedDialog } from '../../store/slices/chatSlice';

function ContestPage(props) {
  const dispatch = useDispatch();
  const contestByIdStore = useSelector((state) => state.contestByIdStore);
  console.log("🚀 ~ file: ContestPage.jsx:30 ~ ContestPage ~ contestByIdStore:", contestByIdStore)
  const userStore = useSelector((state) => state.userStore);
  const chatStore = useSelector((state) => state.chatStore);

  const { role } = userStore.data;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;

  useEffect(() => {
    dispatch(changeEditContest(false));
    getData();
  }, []);

  const getData = () => {
    const { params } = props.match;
    dispatch(getContestById({ contestId: params.id }));
  };

const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_VERIFIED
    );
  };

  const setOfferStatus = (creatorId, offerId, command) => {
    dispatch(clearSetOfferStatusError());
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    dispatch(setOfferStatus(obj));
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
    participants.sort((participant1, participant2) => participant1 - participant2);
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = contestData;
    dispatch(goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    }));
  };

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < contestByIdStore.offers.length; i++) {
      array.push(
        <OfferBox
          data={contestByIdStore.offers[i]}
          key={contestByIdStore.offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicImgURL}${imagePath}`}
          onCloseRequest={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={getData} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => dispatch(changeContestViewMode(true))}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => dispatch(changeContestViewMode(false))}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar contestData={contestData} totalEntries={offers.length} />
        </div>
      )}
    </div>
  );
}

export default ContestPage;
