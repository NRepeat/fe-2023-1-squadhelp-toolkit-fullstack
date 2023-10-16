import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCatalogList, removeChatFromCatalogAction,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

function CatalogListContainer (){
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.userStore);
  const chatStore = useSelector((state) => state.chatStore);
	const { messagesPreview, currentCatalog, catalogToChats } = chatStore;

  useEffect(() => {
    const id = userStore.data.id;
    dispatch(getCatalogList(id));
  }, [dispatch, userStore.data.id]);

  const removeChatFromCatalog = (event, chatId) => {
    const { id: catalogId } = chatStore.currentCatalog;
    const { id: userId } = userStore.data;
    dispatch(removeChatFromCatalogAction({ chatId, catalogId, userId }));
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
  

    const chats = [...catalogToChats].filter(
      (data) => data.Catalog.id === currentCatalog.id
    );

    const dialogsInCatalog = messagesPreview.filter((preview) =>
      chats.some((chat) => chat.Conversation.id === preview.id)
    );

    return dialogsInCatalog;
  };

  const { catalogList, isShowChatsInCatalog } = chatStore;
  const { id } = userStore.data;

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={{ catalogList, catalogToChats }} />
      )}
    </>
  );
};

export default CatalogListContainer;
