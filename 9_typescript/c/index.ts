import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/', (_req, res) => {
  res.send('nothing here');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
