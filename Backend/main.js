import express from 'express';
import { createServer } from 'node:http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import socketUserAuthentication from './socketUserAuthentication.js';
import saveMessage from './controllers/userController/saveMessage.js';
//mongodb connect
import dotenv from 'dotenv';
dotenv.config();
//middlewares
import userRoutes from './routes/userRoutes.js';
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

//mongodb Connection

console.log('connecting to mongodb......');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.use((packet, next) => {
    // Extract the token from the packet
    const token = packet[1].token;
    // Authenticate the user
    socketUserAuthentication(token, (err, userId) => {
      if (err) {
        console.log('Authentication failed');
        socket.disconnect();
      } else {
        socket.userId = userId;
        next();
      }
    });
  });
  socket.on('sendMessage', async (packet) => {
    const messageData = await saveMessage(socket.userId, packet);
    io.emit('message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/user', userRoutes);
app.get('*', (req, res) => {
  res.sendStatus(404);
});
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
