import { JOIN_CHANNEL } from '../utils/common/eventConstants.js';

export default function messageHandlers(io, socket) {
  socket.on(JOIN_CHANNEL, async function createChannelHandler(data, cb) {
    const roomId = data.channelId;
    socket.join(roomId);
    console.log(data);
    console.log(`User ${socket.id} joined channel ${roomId}`);
    cb({
      success: true,
      message: 'Successfully joined channel',
      data: roomId
    });
  });
}
