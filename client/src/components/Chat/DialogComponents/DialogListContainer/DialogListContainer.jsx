import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = (props) => {
  const { messagesPreview, userId, getChatPreview } = props;

  useEffect(() => {
    getChatPreview();
  }, [getChatPreview]);

  return (
    <DialogList
      preview={messagesPreview}
      userId={userId}
      getChatPreview={props.getChatPreview}
    />
  );
};

const mapStateToProps = (state) => {
  return state.chatStore;
};

const mapDispatchToProps = (dispatch) => ({
  getChatPreview: () => dispatch(getPreviewChat()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogListContainer);
