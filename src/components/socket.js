import * as io from 'socket.io-client';
import {chatMessages, chatMessage} from './actions';

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on('chatMessages', messages => {
            store.dispatch(chatMessages(messages));
        });
        socket.on('chatMessage', message => {
            store.dispatch(chatMessage(message));
        });
    }
    return socket;
}
