// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const wallet = (state = {}, action) => {
  switch (action.type) {
  case 'WALLET':
    return {
      ...state,
      wallet: action.payload,
    };
  default: return state;
  }
};

export default wallet;
