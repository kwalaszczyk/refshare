import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  SET_POST_TEXT,
  SET_COMMENT_TEXT
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  postText: "",
  commentText: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        postText: ""
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        commentText: "",
        loading: false
      };
    case SET_POST_TEXT:
      return {
        ...state,
        postText: action.payload
      };
    case SET_COMMENT_TEXT:
      return {
        ...state,
        commentText: action.payload
      };
    default:
      return state;
  }
}
