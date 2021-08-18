import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  reactions: [],
  loading: true,
};

const reactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REACTION:
      const { newReaction } = action.payload;
      return {
        ...state,
        reactions: [...state.reactions, newReaction],
      };
    default:
      return state;
  }
};

export default reactionsReducer;
