import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE_POST, FETCH_POSTS, FETCH_POSTS_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, CREATE_POST_SUCCESS, CREATE_POST_ERROR, UPDATE_POST_SUCCESS, UPDATE_POST_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR, FETCH_AUTH_POSTS, FETCH_AUTH_POSTS_ERROR, FETCH_POSTS_BY_CATEGORY, FETCH_POSTS_BY_CATEGORY_ERROR  } from '../postsTypes'
import { history } from "../../../../history";
 
export const fetchPosts = (searchTerm = '') => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      let url = `${API_ROUTE}/forum`;

      if (searchTerm !== '') {
        url += `?search=${searchTerm}`;
      }
      
      const res  = await axios.get(url)
      dispatch({ type: FETCH_POSTS, payload: res.data })
    } catch(err){
      dispatch({ type: FETCH_POSTS_ERROR, payload: err.response ? err.respons.data.error : "" })
    }
  }
}

export const fetchPostsByCategory = categoryId => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res  = await axios.get(`${API_ROUTE}/forum/category/${categoryId}`)
      dispatch({ type: FETCH_POSTS_BY_CATEGORY, payload: res.data })
    } catch(err){
      dispatch({ type: FETCH_POSTS_BY_CATEGORY_ERROR, payload: err.response ? err.respons.data.error : "" })
    }
  }
}

export const fetchPost = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res  = await axios.get(`${API_ROUTE}/forum/${id}`)
      dispatch({ type: GET_POST_SUCCESS, payload: res.data })
    } catch(err){
      dispatch({ type: GET_POST_ERROR, payload: err.response.data.error })
      history.push('/'); //incase the user manually enter the param that dont exist
    }
  }
}

export const fetchAuthPosts = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res  = await axios.get(`${API_ROUTE}/forum/auth/${id}`)
      dispatch({ type: FETCH_AUTH_POSTS, payload: res.data })
    } catch(err){
      dispatch({ type: FETCH_AUTH_POSTS_ERROR, payload: err.response.data.error })
    }
  }
}

export const createPost = (createPost) => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res = await axios.post(`${API_ROUTE}/forum`, createPost)
      dispatch({ 
        type: CREATE_POST_SUCCESS,  
        payload: res.data
      })
      window.location.href = "/"
    } catch(err) {
      const errors = err.response.data.errors;

      const payload = {
        titleRequired: false,
        descriptionRequired: false,
      };

      errors.forEach(element => {
        if (element.field === 'title') payload.titleRequired = true;
        if (element.field === 'description') payload.descriptionRequired = true;
      });

      dispatch({ type: CREATE_POST_ERROR, payload: payload })
    }
  }
}

export const updatePost = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res = await axios.put(`${API_ROUTE}/forum/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: UPDATE_POST_SUCCESS,
        payload: res.data
      })
      updateSuccess()
    } catch(err) {
      dispatch({ type: UPDATE_POST_ERROR, payload: err.response.data.error })
    }
  }
}

export const deletePost = (id) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST })

    try {
      const res = await axios.delete(`${API_ROUTE}/forum/${id}`)
      dispatch({ 
        type: DELETE_POST_SUCCESS,
        payload: {
          deletedID: id,
          message: res.data.response
        } 
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.response.data.error })
    }
  }
}
