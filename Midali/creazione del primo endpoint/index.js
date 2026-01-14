const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req,res) => {
  console.log('Chiamat get homepage ricevuta');
  res.send('benvenuto nella homepage');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});