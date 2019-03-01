import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  orderHistory: [],
  activeCart: {}
}

/**
 * ACTION CREATORS
 */
const gotActiveCart = payload => ({type: GET_CART, payload})

/**
 * THUNK CREATORS
 */
export const getActiveCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotActiveCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = cartId => dispatch => {
  try {
    axios.put(`/api/cart/${cartId}/checkout`)
    axios.post(`/api/cart`)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, activeCart: action.payload}
    default:
      return state
  }
}
