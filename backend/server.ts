import express from 'express';
import postInsight from './api/postInsight.js';

const app = express();
app.use(express.json());

app.post('/api/postInsight', postInsight);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
