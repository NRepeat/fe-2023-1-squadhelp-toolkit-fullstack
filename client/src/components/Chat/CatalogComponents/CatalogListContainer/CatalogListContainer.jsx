import React from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

class CatalogListContainer extends React.Component {
  componentDidMount() {
    const id = this.props.userStore.data.id;
    this.props.getCatalogList(id);
  }

  removeChatFromCatalog = (event, chatId) => {
    const { id: catalogId } = this.props.chatStore.currentCatalog;
    const { id: userId } = this.props.userStore.data;
    this.props.removeChatFromCatalog({ chatId, catalogId, userId });

    event.stopPropagation();
  };

  getDialogsPreview = () => {
    const { messagesPreview, currentCatalog, catalogToChats } =
      this.props.chatStore;

    const chats = [...catalogToChats].filter(
      (data) => data.Catalog.id === currentCatalog.id
    );

    const dialogsInCatalog = messagesPreview.filter((preview) =>
      chats.some((chat) => chat.Conversation.id === preview.id)
    );

    return dialogsInCatalog;
  };

  render() {
    const { catalogList, isShowChatsInCatalog, catalogToChats } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;

    return (
      <>
        {isShowChatsInCatalog ? (
          <DialogList
            userId={id}
            preview={this.getDialogsPreview()}
            removeChat={this.removeChatFromCatalog}
          />
        ) : (
          <CatalogList catalogList={{ catalogList, catalogToChats }} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
