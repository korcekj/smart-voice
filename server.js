const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const find = require('local-devices');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.get('/api/local-devices', async (req, res) => {
  try {
    const devices = await find();
    if (!devices) res.status(200).send({});
    res.status(200).send({ devices });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/api/module', (req, res) => {
  const { ip } = req.body;

  fetch(`http://${ip}`)
    .then(res => res.json())
    .then(json => res.status(json.status).send(json))
    .catch(({ message }) =>
      res.status(404).send({
        status: 404,
        description: {
          rate: 'error',
          message
        }
      })
    );
});

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ', port);
});
