import Axios from 'axios';
import { env } from 'env'

export const axios = Axios.create({
  baseURL: env.API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true
});
