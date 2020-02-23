const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// Packages for ESP communication
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

// Get local devices and their info
app.get('/api/local-devices', async (req, res) => {
  try {
    const devices = await find();
    if (!devices) res.status(200).send([]);
    res.status(200).send(
      devices.map(({ mac, ip }) => ({
        ip,
        mac: mac
          .split(':')
          .join('-')
          .toUpperCase()
      }))
    );
  } catch (error) {
    res.status(500).send([]);
  }
});

// Ping module and send proper response
app.post('/api/module', async (req, res) => {
  try {
    const { ip } = req.body;
    const response = await fetch(`http://${ip}`, {
      timeout: 5000
    });
    const json = await response.json();
    res.status(json.status).send(json);
  } catch ({ message }) {
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message
      }
    });
  }
});

// Create hardware type
app.post('/api/hardware/:type', async (req, res) => {
  try {
    const { userId, moduleId, hardware, ip } = req.body;
    const { type } = req.params;

    const response = await fetch(
      `http://${ip}/${type}/create?userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'post',
        body: JSON.stringify(hardware),
        timeout: 5000
      }
    );
    const json = await response.json();
    res.status(json.status).send(json);
  } catch ({ message }) {
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message
      }
    });
  }
});

// Delete hardware type
app.delete('/api/hardware/:type', async (req, res) => {
  try {
    const { userId, moduleId, id, ip } = req.body;
    const { type } = req.params;

    const response = await fetch(
      `http://${ip}/${type}/delete?id=${id}&userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'post',
        timeout: 5000
      }
    );
    const json = await response.json();
    res.status(json.status).send(json);
  } catch ({ message }) {
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message
      }
    });
  }
});

// Update hardware type
app.put('/api/hardware/:type', async (req, res) => {
  try {
    const { userId, moduleId, hardware, id, ip } = req.body;
    const { type } = req.params;

    const response = await fetch(
      `http://${ip}/${type}/update?id=${id}&userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'post',
        body: JSON.stringify(hardware),
        timeout: 5000
      }
    );
    const json = await response.json();
    res.status(json.status).send(json);
  } catch ({ message }) {
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message
      }
    });
  }
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
