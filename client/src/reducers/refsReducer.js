import { GET_REFS, DELETE_REF, ADD_REF } from "../actions/types";

const initialState = {
  refs: null,
  refContent: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REFS:
      return {
        ...state,
        refs: action.payload,
        refContent: action.payload.children
      };
    case DELETE_REF:
      return {
        ...state,
        refContent: state.refContent.filter(ref => ref._id !== action.payload)
      };
    case ADD_REF:
      return {
        ...state,
        refContent: [action.payload, ...state.refContent]
      };
    default:
      return state;
  }
}
