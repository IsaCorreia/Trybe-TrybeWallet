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
