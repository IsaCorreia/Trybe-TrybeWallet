// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
const wallet = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'WALLET':
    payload.id = state.expenses.length;
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case 'REQUEST_RATES':
    return { ...state };
  case 'RECEIVE_RATES':
    return {
      ...state,
      currencies: payload,
    };
  default: return state;
  }
};

export default wallet;
