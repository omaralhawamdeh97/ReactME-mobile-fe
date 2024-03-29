import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  posts: [],
  publicPosts: [],
  loading: true,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_PUBLIC_POSTS:
      return {
        ...state,
        publicPosts: [...state.publicPosts, ...action.payload],
        loading: false,
      };
    case actionTypes.ADD_POST:
      const { newPost } = action.payload;
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    default:
      return state;
  }
};

export default postsReducer;
