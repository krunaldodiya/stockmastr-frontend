import { httpUrl, wsUrl } from "./vars";

const api = {
  httpGraphQL: `${httpUrl}/graphql`,
  wsGraphQL: `${wsUrl}/graphql`,
  test: `${httpUrl}/api/test`,
  me: `${httpUrl}/api/users/me`,
  createUserProfile: `${httpUrl}/api/users/profile/create`,
  requestOtp: `${httpUrl}/api/auth/request-otp`,
  verifyOtp: `${httpUrl}/api/auth/verify-otp`,
  paymentRequest: `${httpUrl}/api/payments/request`,
  paymentResponse: `${httpUrl}/api/payments/response`
};

export { api };
