
import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import {QueryRenderer} from 'react-relay'

const util = require('util')

const Root = require('../js/components/' + process.argv[2]).default



const renderTree = ReactTestRenderer.create(<Root />)

const queries = renderTree.root.findAll(n => {
  
  return n._fiber.elementType.name === 'ReactRelayQueryRenderer'
  
  
})


queries.forEach(q => {
  // console.log(util.inspect(q._fiber, {showHidden: true, depth: 3}))

  const {query, variables} = q._fiber.pendingProps

  console.log(Object.keys(q._fiber))
  console.log(Object.keys(q._fiber.pendingProps))
  console.log(`..:: ${query().name}`)
  console.log('-- query')
  console.log(query().text)
  console.log('-- variables')
  console.log(variables)
  console.log('-- full')
  console.log(query(variables).text)
})




