import axios from 'axios';
import Utils from '../utils/utils';

const AxiosInstances = axios.create({
  baseURL: 'https://story-api.dicoding.dev/v1',
  headers: {
    Authorization: `Bearer ${Utils.getUserToken('token')}`,
  },
});

export default AxiosInstances;
