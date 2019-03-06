/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {PizzaList} from './PizzaList'

const adapter = new Adapter()
enzyme.configure({adapter})

const pizzas = [{name: '1', imageUrl: ''}]

describe('PizzaList', () => {
  it('renders a list of pizzas', () => {
    const wrapper = shallow(
      <PizzaList fetchPizzas={() => {}} pizzas={pizzas} />
    )
    expect(wrapper.find('button')).to.have.length(1)
  })

  it('renders an Add to Cart button for each pizza', () => {
    const wrapper = shallow(
      <PizzaList
        fetchPizzas={() => {}}
        pizzas={[{name: 'cheese'}, {name: 'pepperoni'}, {name: 'vegetarian'}]}
      />
    )
    const listItems = wrapper.find('button')
    expect(listItems).to.have.length(3)
    expect(listItems.at(2).text()).to.contain('Add to Cart')
  })
})
