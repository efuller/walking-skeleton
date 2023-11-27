import express from 'express';

const app = express();

app.get('/health', (req, res) => {
  res.send({ ok: true }).status(200);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});