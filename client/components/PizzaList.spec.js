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
  it('renders an unordered list', () => {
    const wrapper = shallow(
      <PizzaList fetchPizzas={() => {}} pizzas={pizzas} />
    )
    expect(wrapper.find('ul')).to.have.length(1)
  })

  it('renders all pizzas', () => {
    const wrapper = shallow(
      <PizzaList
        fetchPizzas={() => {}}
        pizzas={[{name: 'cheese'}, {name: 'pepperoni'}, {name: 'vegetarian'}]}
      />
    )
    const listItems = wrapper.find('li')
    expect(listItems).to.have.length(3)
  })
})
