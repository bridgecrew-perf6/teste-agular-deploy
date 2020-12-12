const express = require('express');

const app = express();

app.use(express.static('./dist/clinic-front'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/clinic-front/' })
);

app.listen(process.env.PORT || 8080);
//teste
