const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
