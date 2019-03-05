import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PIZZAS = 'GET_PIZZAS'
const REMOVE_PIZZA = 'REMOVE_PIZZA'

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
const deletedPizza = payload => ({type: REMOVE_PIZZA, payload})

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

export const deletePizza = pizzaId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/admin/pizzas/${pizzaId}`)
    dispatch(deletedPizza(pizzaId))
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
    case REMOVE_PIZZA: {
      const filteredState = [...state.allPizzas].filter(
        pizza => pizza.id !== action.payload
      )
      return {
        ...state,
        allPizzas: filteredState
      }
    }
    default:
      return state
  }
}
