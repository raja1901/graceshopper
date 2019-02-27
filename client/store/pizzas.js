import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PIZZAS = 'GET_PIZZAS'

/**
 * INITIAL STATE
 */
const initialState = {
  allPizzas: []
}

/**
 * ACTION CREATORS
 */
const gotPizzas = () => ({type: GET_PIZZAS, payload})

/**
 * THUNK CREATORS
 */
export const getPizzas = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/pizzas')
    dispatch(gotPizzas(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PIZZAS:
      return {...state, allPizzas: action.payload}
    default:
      return state
  }
}
