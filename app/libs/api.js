import { httpUrl, wsUrl } from './vars';

const api = {
  httpGraphQL: `${httpUrl}/graphql`,
  wsGraphQL: `${wsUrl}/graphql`,
  login: `${httpUrl}/auth/login`,
  sendOtp: `${httpUrl}/auth/otp`,
  paymentRequest: `${httpUrl}/api/payments/request`,
  paymentResponse: `${httpUrl}/api/payments/response`,
};

export { api };
