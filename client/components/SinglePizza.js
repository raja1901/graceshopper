import React from 'react'

const SinglePizza = props => {
  return (
    <div>
      <h1>{props.pizza.name}</h1>
      <img src={props.pizza.imageUrl} />
    </div>
  )
}

export default SinglePizza
