import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  friends: [],
  loading: true,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIENDS:
      return {
        ...state,
        friends: action.payload,
        loading: false,
      };
    case actionTypes.REFRESH_FRIENDS:
      return {
        ...state,
        friends: action.payload,
        loading: false,
      };
    case actionTypes.ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };

    default:
      return state;
  }
};

export default friendsReducer;
