const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(3000, () => {
  console.log('listening on 3000 my dude');
})