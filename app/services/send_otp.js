import axios from 'axios';
import { httpUrl } from '../libs/vars';

const sendOtp = email => axios.post(
  `${httpUrl}/auth/otp`,
  { email },
  {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
);

export { sendOtp };
