const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/api', api);

app.use(express.static('../public'));

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
