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
    const { userId, id } = this.props.chatStore.currentCatalog;
    this.props.removeChatFromCatalog({ chatId, catalogId: id, userId });
    this.props.getCatalogList();
    event.stopPropagation();
  };
  filterUniqueConversations = (conversations) => {
    const uniqueConversations = {};
    const result = [];

    for (const conversation of conversations) {
      if (!uniqueConversations[conversation.id]) {
        uniqueConversations[conversation.id] = true;
        result.push(conversation);
      }
    }

    return result;
  };
  getDialogsPreview = () => {
    const { messagesPreview, currentCatalog, catalogToChats } =
      this.props.chatStore;
    console.log(
      '🚀 ~ file: CatalogListContainer.jsx:37 ~ CatalogListContainer ~ this.props.chatStore:',
      this.props.chatStore
    );
    console.log(
      '🚀 ~ file: CatalogListContainer.jsx:37 ~ CatalogListContainer ~ messagesPreview:',
      messagesPreview
    );
    console.log(
      '🚀 ~ file: CatalogListContainer.jsx:37 ~ CatalogListContainer ~ currentCatalog:',
      currentCatalog
    );
    const chat = catalogToChats
      .map((chat) => chat)
      .filter((data) => data.Catalog.id === currentCatalog.id);
    
    const allConverstions = this.props.chatStore.catalogToChats.map(
      (data) => data.Conversation
    );

    const uniqueConversations = this.filterUniqueConversations(allConverstions);

    const chats =[...chat];
    console.log("🚀 ~ file: CatalogListContainer.jsx:66 ~ CatalogListContainer ~ chats:", chats)
    let dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < chats.length; j++) {
        if (chats[j].Conversation.id					=== messagesPreview[i].id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }

    return dialogsInCatalog;
  };

  render() {
    const { catalogList, isShowChatsInCatalog } = this.props.chatStore;

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
          <CatalogList catalogList={catalogList} />
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
