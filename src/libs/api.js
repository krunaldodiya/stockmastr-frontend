import { httpUrl } from "./vars";

const api = {
  // web
  createOrder: `${httpUrl}/payments/create-order`,
  processOrder: `${httpUrl}/payments/process-order`,
  orderResponse: `${httpUrl}/payments/order-response`,
  // api
  me: `${httpUrl}/api/users/me`,
  createUserProfile: `${httpUrl}/api/users/profile/create`,
  requestOtp: `${httpUrl}/api/auth/request-otp`,
  verifyOtp: `${httpUrl}/api/auth/verify-otp`,
  latestNews: `${httpUrl}/api/news/latest`,
  allNews: `${httpUrl}/api/news/all`,
  wallet: `${httpUrl}/api/wallet/info`
};

export { api };
