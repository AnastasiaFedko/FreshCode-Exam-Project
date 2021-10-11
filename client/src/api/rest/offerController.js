import http from '../interceptor';

export const getOffers = () => http.get('/offers/getOffers');
export const changeMark = (data) => http.post('/offers/changeMark', data);
export const setNewOffer = (data) => http.post('/offers/setNewOffer', data);
export const setOfferStatus = (data) => http.post('/offers/setOfferStatus', data);