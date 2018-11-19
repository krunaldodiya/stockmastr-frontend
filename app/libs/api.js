import { httpUrl } from "./vars";

const api = {
  me: `${httpUrl}/api/users/me`,
  createUserProfile: `${httpUrl}/api/users/profile/create`,
  requestOtp: `${httpUrl}/api/auth/request-otp`,
  verifyOtp: `${httpUrl}/api/auth/verify-otp`,
  createOrder: `${httpUrl}/api/payments/create-order`,
  processOrder: `${httpUrl}/api/payments/process-order`,
  orderResponse: `${httpUrl}/api/payments/order-response`,
  latestNews: `${httpUrl}/api/news/latest`,
  allNews: `${httpUrl}/api/news/all`,
  wallet: `${httpUrl}/api/wallet/info`
};

export { api };
