'use strict';

const initialState = {
  email: '',
  password: '',
  token: '',
  group: ''
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {...state, email: action.payload};
    case 'SET_PASSWORD':
      return {...state, password: action.payload};
    case 'SET_TOKEN':
      return {...state, token: action.payload};
    case 'SET_GROUP':
        return {...state, group: action.payload};
    default:
      return state;
  }
}

export default loginReducer;
