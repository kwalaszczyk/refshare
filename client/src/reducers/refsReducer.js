import {
  GET_REFS,
  DELETE_REF,
  ADD_REF,
  EDIT_REF,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
  GET_BREADCRUMBS,
  OPEN_DIALOG,
  CLOSE_DIALOG
} from "../actions/types";

const initialState = {
  refs: { owner: {} },
  refContent: [],
  editingRef: {},
  loading: false,
  snackbarText: "",
  snackbarIsOpen: false,
  breadcrumbs: [],
  dialogData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REFS:
      return {
        ...state,
        refs: action.payload,
        refContent: action.payload.children,
        breadcrumbs: action.payload.breadcrumbs
      };
    case DELETE_REF:
      return {
        ...state,
        refContent: state.refContent.filter(ref => ref._id !== action.payload)
      };
    case ADD_REF:
      return {
        ...state,
        refContent: [action.payload, ...state.refContent],
        dialogData: { ...state.dialogData, open: false }
      };
    case EDIT_REF:
      return {
        ...state,
        refContent: state.refContent.map(
          ref => (ref._id !== action.payload._id ? ref : action.payload)
        ),
        dialogData: { open: false }
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
    case GET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload
      };
    case OPEN_DIALOG:
      return {
        ...state,
        dialogData: action.payload
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialogData: { open: false }
      };
    default:
      return state;
  }
}
