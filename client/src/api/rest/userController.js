import http from '../interceptor';

export const registerRequest = (data) => http.post('/users/registration', data);
export const loginRequest = (data) => http.post('/users/login', data);
export const recoverPasswordRequest = (data) => http.post('/users/recoverPassword', data);
export const getUser = () => http.post('/users/getUser');
export const updateUser = (data) => http.post('/users/updateUser', data);