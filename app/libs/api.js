import { httpUrl } from "./vars";

const api = {
  me: `${httpUrl}/api/users/me`,
  createUserProfile: `${httpUrl}/api/users/profile/create`,
  requestOtp: `${httpUrl}/api/auth/request-otp`,
  verifyOtp: `${httpUrl}/api/auth/verify-otp`,
  paymentRequest: `${httpUrl}/api/payments/request`,
  paymentResponse: `${httpUrl}/api/payments/response`,
  processOrder: `${httpUrl}/api/payments/process`,
  latestNews: `${httpUrl}/api/news/latest`,
  allNews: `${httpUrl}/api/news/all`,
  wallet: `${httpUrl}/api/wallet/info`
};

export { api };
