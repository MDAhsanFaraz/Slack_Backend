import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  reconnection: true
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

setTimeout(() => {
  socket.emit(
    'JoinChannel',
    {
      body: 'message 1',
      channelId: '698ce12503e129b1c5e60b79',
      workspaceId: '698ce12503e129b1c5e60b71',
      senderId: '698ce01903e129b1c5e60b69'
    },
    (response) => {
      console.log('Server callback:', response);
    }
  );
}, 2000);
