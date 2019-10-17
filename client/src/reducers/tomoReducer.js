import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  balance: 0,
  pets: null,
  petsAddress: null,
  factory: null,
  bgShop: null,
  bgInShop: [],
  myBg: []
};

const tomoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account,
        balance: action.balance
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        factory: action.factory,
        bgShop: action.bgShop
      };
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: action.pets
      };
    case actions.GET_ALL_PETS_ADDRESS:
      return {
        ...state,
        petsAddress: action.petsAddress
      };
    case actions.GET_BACKGROUND_IN_SHOP:
      return {
        ...state,
        bgInShop: action.bgInShop
      };
    case actions.GET_MY_BACKGROUND:
      return {
        ...state,
        myBg: action.myBg
      };
    default:
      return state;
  }
};

export default tomoReducer;
