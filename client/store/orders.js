import axios from 'axios'

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'

// ACTION CREATORS
const gotOrders = payload => ({
  type: GET_ORDERS,
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

// INITIAL STATE
const initialState = []

// SUB REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload
    default:
      return state
  }
}
