import http from '../interceptor';

export const getPreviewChat = () => http.post('/chats/getPreview');
export const getDialog = (data) => http.post('/chats/getChat', data);
export const newMessage = (data) => http.post('/chats/newMessage', data);
export const changeChatFavorite = (data) => http.post('/chats/favorite', data);
export const changeChatBlock = (data) => http.post('/chats/blackList', data);
export const getCatalogList = (data) => http.post('/chats/getCatalogs', data);
export const addChatToCatalog = (data) => http.post('/chats/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('/chats/createCatalog', data);
export const deleteCatalog = (data) => http.post('/chats/deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.post('/chats/removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('/chats/updateNameCatalog', data);
