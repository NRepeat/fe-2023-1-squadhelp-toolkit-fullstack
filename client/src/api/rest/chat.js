import http from '../interceptor';
export const getPreviewChat = async () => {
  try {
    return await http.get('chat/getPreview');
  } catch (error) {
    throw error;
  }
};

export const getDialog = async (data) => {
  try {
    return await http.post('chat/getChat', data);
  } catch (error) {
    throw error;
  }
};

export const newMessage = async (data) => {
  try {
    return await http.post('chat/newMessage', data);
  } catch (error) {
    throw error;
  }
};

export const changeChatFavorite = async (data) => {
  try {
    return await http.post('chat/favorite', data);
  } catch (error) {
    throw error;
  }
};

export const changeChatBlock = async (data) => {
  try {
    return await http.post('chat/blackList', data);
  } catch (error) {
    throw error;
  }
};

export const getCatalogList = async (data) => {
  try {
    return await http.post('chat/getCatalogs', data);
  } catch (error) {
    throw error;
  }
};

export const addChatToCatalog = async (data) => {
  try {
    return await http.post('chat/addNewChatToCatalog', data);
  } catch (error) {
    throw error;
  }
};

export const createCatalog = async (data) => {
  try {
    return await http.post('chat/createCatalog', data);
  } catch (error) {
    throw error;
  }
};

export const deleteCatalog = async (data) => {
  try {
    return await http.post('chat/deleteCatalog', data);
  } catch (error) {
    throw error;
  }
};

export const removeChatFromCatalog = async (data) => {
  try {
    return await http.post('chat/removeChatFromCatalog', data);
  } catch (error) {
    throw error;
  }
};

export const changeCatalogName = async (data) => {
  try {
    return await http.post('chat/updateNameCatalog', data);
  } catch (error) {
    throw error;
  }
};