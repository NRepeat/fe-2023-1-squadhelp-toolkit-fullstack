import http from '../interceptor';

export const registerRequest = async (data) => {
  try {
    return await http.post('/registration', data);
  } catch (error) {
    throw error;
  }
};

export const loginRequest = async (data) => {
  try {
    return await http.post('/login', data);
  } catch (error) {
    throw error;
  }
};

