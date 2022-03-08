// Esse reducer será responsável por tratar as informações da pessoa usuária
const user = (state = {}, action) => {
  switch (action.type) {
  case 'USER_INFO':
    return {
      ...state,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default user;
