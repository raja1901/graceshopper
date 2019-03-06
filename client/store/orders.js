import axios from 'axios'

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'

// ACTION CREATORS
const gotOrders = payload => ({
  type: GET_ORDERS,
  payload
})

const addOrder = payload => ({
  type: ADD_ORDER,
  payload
})

// THUNK CREATORS
export const getOrders = cartId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${cartId}`)
    dispatch(gotOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const createOrder = (cartId, pizzaId) => async dispatch => {
  try {
    console.log('thunk props', cartId, pizzaId)
    const {data} = await axios.post(`/api/orders/${cartId}`, {pizzaId})
    dispatch(addOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteOrder = (cartId, pizzaId) => async dispatch => {
  try {
    await axios.delete(`/api/orders/${cartId}`, {data: {pizzaId}})
    dispatch(getOrders(cartId))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = []

// SUB REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload
    case ADD_ORDER:
      return [...state, action.payload]
    default:
      return state
  }
}
