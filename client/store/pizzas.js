import axios from 'axios'

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
const gotPizzas = payload => ({type: GET_PIZZAS, payload})

/**
 * THUNK CREATORS
 */
export const getPizzas = () => async dispatch => {
  console.log('Step 1: get all pizzas')
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
