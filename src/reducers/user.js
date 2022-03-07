// Esse reducer será responsável por tratar as informações da pessoa usuária
const user = (state = { key: 'value' }, action) => {
  switch (action.type) {
  case 'USER_INFO':
    return {
      ...state,
      user: action.payload,
    };
  default: return state;
  }
};

export default user;
