import {
  GET_REFS,
  DELETE_REF,
  ADD_REF,
  START_EDITING,
  EDIT_REF,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR
} from "../actions/types";

const initialState = {
  refs: null,
  refContent: [],
  editingRef: {},
  loading: false,
  snackbarText: "",
  snackbarIsOpen: false
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
    case EDIT_REF:
      return {
        ...state,
        refContent: state.refContent.map(
          ref => (ref._id !== action.payload._id ? ref : action.payload)
        )
      };
    case START_EDITING:
      return {
        ...state,
        editingRef: action.payload
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarText: action.payload,
        snackbarIsOpen: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarText: "",
        snackbarIsOpen: false
      };
    default:
      return state;
  }
}
