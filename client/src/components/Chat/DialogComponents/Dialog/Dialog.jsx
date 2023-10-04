import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import {
  getDialogMessages,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = () => {
  const dispatch = useDispatch();
  const interlocutor = useSelector((state) => state.chatStore.interlocutor);
  const messages = useSelector((state) => state.chatStore.messages);
  const userId = useSelector((state) => state.chatStore.userId);
  const chatData = useSelector((state) => state.chatStore.chatData);
  const messagesEnd = useRef(null);

  useEffect(() => {
    dispatch(getDialogMessages({ interlocutorId: interlocutor.id }));
    scrollToBottom();
  }, [interlocutor.id, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();
    
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={classNames(
            userId === message.userId ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      );
    });
    
    return (
      <div className={styles.messageList}>
        {messagesArray}
        <div ref={messagesEnd} />
      </div>
    );
  };

  const blockMessage = () => {
    const userIndex = chatData.participants.indexOf(userId);
    let message;
    if (chatData && chatData.blackList.includes(true)) {
      message = 'You block him';
    } else if (chatData && chatData.blackList[userIndex]) {
      message = 'He blocked you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput />
      )}
    </>
  );
};

export default Dialog;
