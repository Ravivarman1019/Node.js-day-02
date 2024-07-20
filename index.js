import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import roomRouter from './Router/room.router.js';

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send("app is running");
});

app.use('/api', roomRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
