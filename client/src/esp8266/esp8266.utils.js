import axios from 'axios';

export const getModuleStatus = ip =>
  axios({
    url: '/api/module',
    method: 'post',
    data: {
      ip
    }
  });

export const getLocalDevices = () =>
  axios({
    url: '/api/local-devices',
    method: 'get'
  });
