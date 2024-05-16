import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE_CATEGORY, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS } from "../categoryTypes";


export const fetchCategories = () => {

  return async dispatch => {

    dispatch({ type: BEFORE_STATE_CATEGORY }) 

    try {
      const res = await axios.get(`${API_ROUTE}/category`)
      dispatch({ 
        type: GET_CATEGORIES_SUCCESS, 
        payload: res.data
      })
    } catch(err) {
      dispatch({ type: GET_CATEGORIES_ERROR, payload: err.response.data.error })
    }
  }
}