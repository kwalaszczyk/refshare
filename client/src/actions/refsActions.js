import axios from "axios";

import {
  GET_REFS,
  DELETE_REF,
  GET_ERRORS,
  ADD_REF,
  EDIT_REF,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR
} from "./types";

export const getRefs = id => dispatch => {
  axios
    .get(`/api/refs/${id}`)
    .then(res => dispatch({ type: GET_REFS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editRef = refData => dispatch => {
  axios
    .post(`/api/refs/editRef/${refData.id}`, refData)
    .then(res => dispatch({ type: EDIT_REF, payload: res.data }))
    .then(dispatch({ type: SHOW_SNACKBAR, payload: "Ref edited!" }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addRef = (id, refData) => dispatch => {
  axios
    .post(`/api/refs/addRef/${id}`, refData)
    .then(res => {
      const newRef = {
        _id: res.data._id,
        name: res.data.name,
        isFolder: res.data.isFolder,
        children: res.data.children
      };
      dispatch({ type: ADD_REF, payload: newRef });
    })
    .then(dispatch({ type: SHOW_SNACKBAR, payload: "Ref added!" }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteRef = id => dispatch => {
  axios
    .delete(`/api/refs/${id}`)
    .then(res => dispatch({ type: DELETE_REF, payload: id }))
    .then(dispatch({ type: SHOW_SNACKBAR, payload: "Ref deleted!" }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const showSnackbar = text => dispatch => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: text
  });
};

export const closeSnackbar = () => dispatch => {
  dispatch({
    type: CLOSE_SNACKBAR
  });
};
