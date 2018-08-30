import axios from "axios";

import {
  GET_REFS,
  DELETE_REF,
  GET_ERRORS,
  ADD_REF,
  EDIT_REF,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
  CLEAR_ERRORS,
  GET_BREADCRUMBS,
  OPEN_DIALOG,
  CLOSE_DIALOG
} from "./types";

export const getRefs = id => async dispatch => {
  try {
    let res = await axios.get(`/api/refs/${id}`);
    dispatch({ type: GET_REFS, payload: res.data });
    if (id !== "home") {
      let breadcrumbs = await axios.get(`/api/refs/breadcrumbs/${id}`);
      dispatch({ type: GET_BREADCRUMBS, payload: breadcrumbs.data });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const openDialog = dialogData => dispatch => {
  dispatch({
    type: OPEN_DIALOG,
    payload: dialogData
  });
};

export const closeDialog = () => dispatch => {
  dispatch({
    type: CLOSE_DIALOG
  });
  dispatch({ type: CLEAR_ERRORS });
};

export const addFavorite = (id, userId) => dispatch => {
  axios
    .get(`/api/refs/addFavorite/${id}`)
    .then(res => {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: `${res.data ? "Added to " : "Removed from "} favorites!`
      });
    })
    .catch(console.log);
};

export const addRef = (id, refData) => dispatch => {
  axios
    .post(`/api/refs/addRef/${id}`, refData)
    .then(res => {
      const newRef = {
        _id: res.data._id,
        name: res.data.name,
        isFolder: res.data.isFolder,
        children: res.data.children,
        description: res.data.description,
        favorites: res.data.favorites
      };
      dispatch({ type: ADD_REF, payload: newRef });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SHOW_SNACKBAR,
        payload: `${refData.isFolder === true ? "Folder " : "Link "} added!`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editRef = refData => dispatch => {
  axios
    .post(`/api/refs/editRef/${refData.id}`, refData)
    .then(res => {
      dispatch({ type: EDIT_REF, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SHOW_SNACKBAR,
        payload: `${refData.isFolder === true ? "Folder " : "Link "} edited!`
      });
    })
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
