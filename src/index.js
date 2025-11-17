import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';
import messageHandlers from './controllers/messageSocketController.js';
import { stat } from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pongs' });
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  // socket.on('connection1', (data, cb) => {
  //   console.log('message from client', data);
  //   socket.broadcast.emit('newmessage', data);
  //   cb({
  //     status: 'okk'
  //   });
  // });
  messageHandlers(io, socket);
});
server.listen(PORT, () => {
  console.log('server is runnin on ' + PORT);
  connectDB();
});
