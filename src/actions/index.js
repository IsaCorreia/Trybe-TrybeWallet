// Coloque aqui suas actions
export const login = (email, password) => ({
  type: 'USER_INFO',
  payload: {
    email,
    password,
  },
});

export const wallet = (item, currencies) => ({
  type: 'WALLET',
  payload: { id: 0, ...item, exchangeRates: currencies },
});

export const requestRates = () => ({ type: 'REQUEST_RATES' });
export const receiveRates = (rates) => ({
  type: 'RECEIVE_RATES',
  payload: rates,
});
export const fetchRates = () => (dispatch) => {
  dispatch(requestRates());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((rates) => dispatch(receiveRates(rates)));
};
