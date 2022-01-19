import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const cors = require('cors'); //eslint-disable-line

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors()); //eslint-disable-line

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
