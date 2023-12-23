import AxiosInstances from '../config/axiosInstances';

const StoriesApi = {
  async register({ name, email, password }) {
    const data = { name, email, password };
    return AxiosInstances.post('/register', data, { headers: '' });
  },
  async login({ email, password }) {
    const data = { email, password };
    return AxiosInstances.post('/login', data, { headers: '' });
  },
  async addNewStory({ description, photo }) {
    const data = { description, photo };
    return AxiosInstances.post('stories', data, { headers: { ...AxiosInstances.defaults.headers, 'Content-Type': 'multipart/form-data' } });
  },
  async addNewStoryWithGuest({ description, photo }) {
    const data = { description, photo };
    console.log(photo);
    return AxiosInstances.post('/stories/guest', data, { headers: { Authorization: '', 'Content-Type': 'multipart/form-data' } });
  },
  async getAllStories() {
    return AxiosInstances.get('/stories');
  },
  async getDetailStories(id) {
    return AxiosInstances.get(`/stories/${id}`);
  },
};

export default StoriesApi;
