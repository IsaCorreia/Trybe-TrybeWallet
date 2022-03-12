// Coloque aqui suas actions
export const login = (email, password) => ({
  type: 'USER_INFO',
  payload: {
    email,
    password,
  },
});

export const wallet = (item) => ({
  type: 'WALLET',
  payload: { id: 0, ...item },
});

export const requestRates = () => ({ type: 'REQUEST_RATES' });
export const receiveRates = (rates) => ({
  type: 'RECEIVE_RATES',
  payload: rates,
});
export const fetchRates = () => async (dispatch) => {
  dispatch(requestRates());

  // tentei assim:
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((rates) => {
      dispatch(receiveRates(rates));
      return rates;
    }).catch((error) => { console.log(error); });

  // E assim:
  // try {
  //   return fetch('https://economia.awesomeapi.com.br/json/all')
  //     .then((response) => response.json())
  //     .then((rates) => {
  //       dispatch(receiveRates(rates));
  //       return rates;
  //     });
  // } catch (err) {
  //   console.log(err);
  // }
};
