import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
//mongodb connect
import dotenv from 'dotenv';
dotenv.config();
//middlewares
import userRoutes from './routes/userRoutes.js';
const app = express();

//mongodb Connection

console.log('connecting to mongodb');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session(Session));
app.use(cors());
app.use('/user', userRoutes);
app.get('*', (req, res) => {
  res.sendStatus(404);
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
