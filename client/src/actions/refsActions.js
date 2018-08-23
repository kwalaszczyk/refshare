import axios from "axios";

import { GET_REFS, DELETE_REF, GET_ERRORS, ADD_REF } from "./types";

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

export const addRef = (id, refData) => dispatch => {
  axios
    .post(`/api/refs/addRef/${id}`, refData)
    .then(res => dispatch({ type: ADD_REF, payload: refData }))
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
