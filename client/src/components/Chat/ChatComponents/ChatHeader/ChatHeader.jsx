import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = (props) => {
  const { avatar, firstName, id: userId } = props.interlocutor;
  const { backToDialogList, chatData } = props;

  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const [isFavorite, setIsFavorite] = useState(
    props.chatData.favoriteList[props.chatData.participants.indexOf(userId)]
  );

  const [isBlocked, setIsBlocked] = useState(
    props.chatData?.blockedList?.[
      props.chatData.participants.indexOf(userId)
    ] || false
  );

  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`}
          alt="back"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
              avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicImgURL}${avatar}`
            }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              onClick={(event) => {
                const newFavoriteFlag = !isFavorite;
                setIsFavorite(newFavoriteFlag);
                changeFavorite(
                  {
                    participants: chatData.participants,
                    favoriteFlag: newFavoriteFlag,
                  },
                  event
                );
              }}
              className={classNames({
                'far fa-heart': !isFavorite,
                'fas fa-heart': isFavorite,
              })}
            />
            <i
              onClick={(event) => {
                const newBlockListFlag = !isBlocked;
                setIsBlocked(newBlockListFlag);
                changeBlackList(
                  {
                    participants: chatData.participants,
                    blackListFlag: newBlockListFlag,
                  },
                  event
                );
              }}
              className={classNames({
                'fas fa-user-lock': !isBlocked,
                'fas fa-unlock': isBlocked,
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor, chatData, chatPreview } = state.chatStore;
  return { interlocutor, chatData, chatPreview };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
  getChatPreview: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
