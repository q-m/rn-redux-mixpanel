import {Buffer} from 'buffer';

// Configuration Constants
const DEBUG = typeof process === 'object' && process.env && process.env['NODE_ENV'] === 'development';

// Mixpanel Service Constants
const MIXPANEL_REQUEST_PROTOCOL = 'https';
const MIXPANEL_HOST = 'api.mixpanel.com';

export default sendMixpanelRequest = ({endpoint, data}) => {
  const requestDataString = JSON.stringify(data);
  const requestDataBase64String = new Buffer(requestDataString).toString('base64');

  const requestUrl = `${MIXPANEL_REQUEST_PROTOCOL}://${MIXPANEL_HOST}${endpoint}?ip=1&data=${requestDataBase64String}`;

  const req = fetch(requestUrl)
    .then((response) => response.text())
    .then((responseText) => {
      if (DEBUG) {
        console.log('mixpanel request:', requestUrl);
      }
    })
    .catch((error) => {
      if (DEBUG) {
        console.warn('mixpanel error:', error);
      }
    });

  return req;
};
