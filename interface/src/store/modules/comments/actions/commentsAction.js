import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  COMMENT_CREATE_SUCCESS, COMMENT_CREATE_ERROR, GET_COMMENTS_SUCCESS, GET_COMMENTS_ERROR, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_ERROR, COMMENT_UPDATE_SUCCESS, COMMENT_UPDATE_ERROR, BEFORE_STATE_COMMENT } from '../commentTypes'


export const fetchComments = id => {

  return async dispatch => {

    dispatch({ type: BEFORE_STATE_COMMENT }) 

    try {
      const res = await axios.get(`${API_ROUTE}/comment/${id}`)
      dispatch({ 
        type: GET_COMMENTS_SUCCESS, 
        payload: {
          postID: id,
          comments: res.data,
        }
      })
    } catch(err) {
      dispatch({ type: GET_COMMENTS_ERROR, payload: err.response.data.error })
    }
  }
}


export const createComment = (details, commentSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_COMMENT }) 
    try {
      const res  = await axios.post(`${API_ROUTE}/comment`, details)
      dispatch({ 
        type: COMMENT_CREATE_SUCCESS, 
        payload: {
          postID: details.forumId,
          comment: res.data,
        }
      })
      commentSuccess()
    } catch(err){
      dispatch({ type: COMMENT_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}

export const updateComment = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_COMMENT }) 

    try {
      const res = await axios.put(`${API_ROUTE}/comment/${updateDetails.id}`, updateDetails)
      console.log(res.data)
      dispatch({ 
        type: COMMENT_UPDATE_SUCCESS,
        payload: {
          comment: res.data
        } 
      })
      updateSuccess()
    } catch(err) {
      dispatch({ type: COMMENT_UPDATE_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteComment = (details, deleteSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_COMMENT }) 

    try {
      await axios.delete(`${API_ROUTE}/comment/${details.id}`)
      dispatch({ 
        type: COMMENT_DELETE_SUCCESS,
        payload: {
          id: details.id,
          postID: details.postID,
        } 
      })
      deleteSuccess()
    } catch(err) {
      dispatch({ type: COMMENT_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
