const httpUrlDev = 'http://192.168.2.200:4000';
const wsUrlDev = 'ws://192.168.2.200:4000';

const httpUrlProd = 'https://socialstock-yoga-server.herokuapp.com';
const wsUrlProd = 'ws://socialstock-yoga-server.herokuapp.com';

const httpUrl = __DEV__ ? httpUrlDev : httpUrlProd;
const wsUrl = __DEV__ ? wsUrlDev : wsUrlProd;

export { httpUrl, wsUrl };
