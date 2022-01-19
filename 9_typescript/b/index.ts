import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
const PORT = 3001;
app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line
  const { height, weight } = req.body;
  if (!height || !weight)
    res.status(400).json({ error: 'malformatted parameters' });
  // eslint-disable-next-line
  const bmi: string = calculateBmi(height, weight);
  // eslint-disable-next-line
  res.status(200).json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  //eslint-disable-next-line
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises);
  //eslint-disable-next-line
  const result = calculateExercises(daily_exercises, target);
  if (!result.average || !result.goal || !result.rating)
    res.status(400).json({ error: 'parameters missing' });

  //eslint-disable-next-line
  res.json(result);
});

app.listen(PORT, () => {
  console.log('SERVER listening at port 3001');
});
