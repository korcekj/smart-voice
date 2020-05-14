// Importovanie potrebnych packages
import axios from 'axios';

// Funkcia na ziskanie stavu pripojenia daneho modulu na zaklade jeho IP
export const getModuleStatus = (ip) =>
  // Vytvorenie HTTP poziadavky na nas back-end
  axios({
    url: '/api/module',
    method: 'post',
    data: {
      ip,
    },
  });

// Funkcia na ziskanie vsetkych zariadeni pripojenych k lokalnej sieti
export const getLocalDevices = () =>
  // Vytvorenie HTTP poziadavky na nas back-end
  axios({
    url: '/api/local-devices',
    method: 'get',
  });
