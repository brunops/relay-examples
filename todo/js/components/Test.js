import React from 'react'
import {graphql, QueryRenderer} from 'react-relay'
import {Environment, Network, RecordSource, Store} from 'relay-runtime'

function fetchQuery(operation, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const Query = graphql`
  query TestQuery {
    viewer {
      id
      todos {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            text
            complete
          }
        }
      }
    }  
  }
`

const Test = () => {
  return (
    <div>
      <div>hai</div>
      <QueryRenderer
        environment={modernEnvironment}
        variables={{}}
        query={Query}
        render={({error, props}) => {
          console.log(props)
          if (props) {
            return (
              <div>
                Got data!
                {props.viewer.todos.edges.map((t, i) => {
                  return (
                    <div key={i}>{t.node.text}</div>
                  )
                })}
              </div>
            )
          } else {
            return <div>No data :(</div>
            }
          }}
      />
    </div>
  )
}

export default Test