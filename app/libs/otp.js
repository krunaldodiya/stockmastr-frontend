import axios from 'axios';

export default (mobile, dev) => {
  const otp = dev ? '0000' : Math.floor(1000 + Math.random() * 9000);

  if (dev) {
    return new Promise((resolve) => {
      resolve({ otp });
    });
  }

  const message = `Welcome to SocialStock, Inc. your OTP is ${otp}`;
  const requestGateway = 'https://control.msg91.com/api';
  const authKey = '152885AFVVkzCa591d6b98';
  const sender = 'SOCIAL';
  const route = 4; // 1 = promotional, 4 = transactional
  const url = `${requestGateway}/sendhttp.php?authkey=${authKey}&mobiles=${mobile}&message=${message}&sender=${sender}&route=${route}&response=json`;

  return axios.get(url).then(
    () => new Promise((resolve) => {
      resolve({ otp });
    }),
  );
};
