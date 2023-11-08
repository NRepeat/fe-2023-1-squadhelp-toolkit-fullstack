import http from '../interceptor';

export const updateUser = async (data) => {
  try {
    return await http.post('updateUser', data);
  } catch (error) {
    throw error;
  }
};
export const getUser = async () => {
  try {
    return await http.get('/getUser');
  } catch (error) {
    throw error;
  }
};