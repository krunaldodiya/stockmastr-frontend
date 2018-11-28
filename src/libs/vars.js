const httpUrlDev = "http://192.168.2.200:8000";
const wsUrlDev = "ws://192.168.2.200:8000";

const httpUrlProd = "https://www.stockmastr.com";
const wsUrlProd = "ws://www.stockmastr.com";

const httpUrl = __DEV__ ? httpUrlDev : httpUrlProd;
const wsUrl = __DEV__ ? wsUrlDev : wsUrlProd;

// const httpUrl = httpUrlProd;
// const wsUrl = wsUrlProd;

export { httpUrl, wsUrl };
