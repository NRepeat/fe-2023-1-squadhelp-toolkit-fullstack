import http from '../interceptor';

export const payMent = async (data) => {
  try {
    return await http.post('pay', data.formData);
  } catch (error) {
    throw error;
  }
};
export const cashOut = async (data) => {
  try {
    return await http.post('cashout', data);
  } catch (error) {
    throw error;
  }
};