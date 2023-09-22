import isEqual from 'lodash/isEqual';
import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
	addMessage,
	changeBlockStatusInStore,
} from '../../../store/slices/chatSlice';
import _ from 'lodash';

class ChatSocket extends WebSocket {
	constructor(dispatch, getState, room) {
		super(dispatch, getState, room);
	}

	anotherSubscribes = () => {
		this.onNewMessage();
		this.onChangeBlockStatus();
	};

	onChangeBlockStatus = () => {
		this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, data => {
			this.dispatch(changeBlockStatusInStore(data.message));
		});
	};

	onNewMessage = () => {
		this.socket.on('newMessage', data => {
			console.log("🚀 ~ file: ChatSocket.js:28 ~ ChatSocket ~ data:", data)
			this.dispatch(addMessage(data.message));
		});
	};

	subscribeChat = id => {
		this.socket.emit('subscribeChat', id);
	};

	unsubscribeChat = id => {
		this.socket.emit('unsubscribeChat', id);
	};
}

export default ChatSocket;
