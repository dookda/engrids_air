const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('www'));

app.listen(port, () => console.log(`http://localhost:${port}`));

app.use(require('./service/api'));