import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  GET_FOLDERS,
  GET_FAVORITES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  folders: [],
  favorites: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_FOLDERS:
      return {
        ...state,
        folders: action.payload
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
}
