import React from 'react'

const SinglePizza = props => {
  if (props.pizza === undefined) {
    return <div>Please Wait</div>
  } else {
    return (
      <div className="single-pizza-div">
        <img className="pizza-img" src={props.pizza.imageUrl} />
        <h3 className="pizza-name">{props.pizza.name}</h3>
      </div>
    )
  }
}

export default SinglePizza
