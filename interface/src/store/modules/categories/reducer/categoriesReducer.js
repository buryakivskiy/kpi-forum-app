import { BEFORE_STATE_CATEGORY, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS } from '../categoryTypes'

export const initState = {
  categoryItems : [],
  isLoading: false,
  categorySuccess: false
}


export const categoryState = (state = initState, action) => {
  
  const { payload, type }  = action;
  switch(type) {

    case BEFORE_STATE_CATEGORY:
      return {
        ...state,
        isLoading: true,
        categorySuccess: false
      }

    case GET_CATEGORIES_SUCCESS:
      return { 
        ...state, 
        categoryItems: payload,
        isLoading: false,
    }
    case GET_CATEGORIES_ERROR:
      return { 
        ...state, 
        categoryError: payload, 
        isLoading: false,
    }
    default:
      return state
  }
}
