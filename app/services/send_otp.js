import axios from 'axios';
import { api } from '../libs/api';

const sendOtp = email => axios.post(
  api.sendOtp,
  { email },
  {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
);

export { sendOtp };
