import React from 'react'

const SinglePizza = props => {
  if (props.pizza === undefined) {
    return <div>Please Wait</div>
  } else {
    return (
      <div>
        <h1>{props.pizza.name}</h1>
        <img src={props.pizza.imageUrl} />
      </div>
    )
  }
}

export default SinglePizza
