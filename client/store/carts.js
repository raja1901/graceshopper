import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

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

const gotOrderHistory = payload => ({type: GET_ORDER_HISTORY, payload})

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

export const getOrderHistory = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotOrderHistory(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = cartId => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/${cartId}/checkout`)
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
    case GET_ORDER_HISTORY:
      return {...state, orderHistory: action.payload}
    default:
      return state
  }
}
