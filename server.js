// Importovanie potrebnych packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const find = require('local-devices');
const fetch = require('node-fetch');

// Vytvorenie Express aplikacie
const app = express();
// Nastavenie portu, na ktorom bude server pocuvat
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Definovanie path v pripade vyuzitia service-worker v nasej webovej aplikacii
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

// Ziskanie vsetkych zariadeni pripojenych k lokalnej sieti pomocou package: `local-devices`
app.get('/api/local-devices', async (req, res) => {
  try {
    // Najdejenie zaradeni pripojenych na lokalnej sieti
    const devices = await find();
    // Odoslanie prazdnej uspesnej spravy 200 na front-end
    // Reprezentuje nenajdenie ziadneho zariadenia
    if (!devices) res.status(200).send([]);
    // Odoslanie najdenych a spracovanych zariadeni na fron-end webovej aplikacie
    res.status(200).send(
      devices.map(({ mac, ip }) => ({
        ip,
        mac: mac.split(':').join('-').toUpperCase(),
      }))
    );
  } catch (error) {
    // Odoslanie prazdnej chybovej spravy 500 na front-end
    // Reprezentuje nenajdenie ziadneho zariadenia
    res.status(500).send([]);
  }
});

// Overenie pripojenia modulu k sieti na zaklade poskytnutej IP v tele HTTP requestu
app.post('/api/module', async (req, res) => {
  try {
    // Vytiahnutie dat z tela HTTP poziadavky
    const { ip } = req.body;

    // Vytvorenie HTTP poziadavky metody POST
    const response = await fetch(`http://${ip}`, {
      timeout: 5000,
    });
    // Odoslanie poziadavky na ESP8266 Web Server
    const json = await response.json();
    // Odoslanie navratovej spravy z ESP8266 Web Servera na front-end
    res.status(json.status).send(json);
  } catch ({ message }) {
    // Odoslanie chybovej spravy 404 na front-end
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message,
      },
    });
  }
});

// Vytvorenie hardveroveho modulu
app.post('/api/hardware/:type', async (req, res) => {
  try {
    // Vytiahnutie dat z tela HTTP poziadavky
    const { userId, moduleId, hardware, ip } = req.body;
    // Vytiahnutie parametrov z URL
    const { type } = req.params;

    // Vytvorenie HTTP poziadavky metody POST
    const response = await fetch(
      `http://${ip}/${type}/create?userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'POST',
        body: JSON.stringify(hardware),
        timeout: 5000,
      }
    );
    // Odoslanie poziadavky na ESP8266 Web Server
    const json = await response.json();
    // Odoslanie navratovej spravy z ESP8266 Web Servera na front-end
    res.status(json.status).send(json);
  } catch ({ message }) {
    // Odoslanie chybovej spravy 404 na front-end
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message,
      },
    });
  }
});

// Aktualizacia hardveroveho modulu poskytnutim jeho typu a id
app.put('/api/hardware/:type/:moduleId', async (req, res) => {
  try {
    // Vytiahnutie dat z tela HTTP poziadavky
    const { userId, hardware, id, ip } = req.body;
    // Vytiahnutie parametrov z URL
    const { type, moduleId } = req.params;

    // Vytvorenie HTTP poziadavky metody POST
    const response = await fetch(
      `http://${ip}/${type}/update?id=${id}&userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'POST',
        body: JSON.stringify(hardware),
        timeout: 5000,
      }
    );
    // Odoslanie poziadavky na ESP8266 Web Server
    const json = await response.json();
    // Odoslanie navratovej spravy z ESP8266 Web Servera na front-end
    res.status(json.status).send(json);
  } catch ({ message }) {
    // Odoslanie chybovej spravy 404 na front-end
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message,
      },
    });
  }
});

// Zmazanie hardveroveho modulu poskytnutim jeho typu a id
app.delete('/api/hardware/:type/:moduleId', async (req, res) => {
  try {
    // Vytiahnutie dat z tela HTTP poziadavky
    const { userId, id, ip } = req.body;
    // Vytiahnutie parametrov z URL
    const { type, moduleId } = req.params;

    // Vytvorenie HTTP poziadavky metody POST
    const response = await fetch(
      `http://${ip}/${type}/delete?id=${id}&userId=${userId}&moduleId=${moduleId}`,
      {
        method: 'POST',
        timeout: 5000,
      }
    );
    // Odoslanie poziadavky na ESP8266 Web Server
    const json = await response.json();
    // Odoslanie navratovej spravy z ESP8266 Web Servera na front-end
    res.status(json.status).send(json);
  } catch ({ message }) {
    // Odoslanie chybovej spravy 404 na front-end
    res.status(404).send({
      status: 404,
      description: {
        rate: 'error',
        message,
      },
    });
  }
});

// V pripade ze sa jedna o production, tak sa nastavuju jednotlive sluzby, kvoli optimalizacii a bezpecnosti servera
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Presmerovanie vsetkych requestov na index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Pocuvanie servera na porte: `port`
app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ', port);
});
