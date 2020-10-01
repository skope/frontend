import ApolloClient from 'apollo-boost'

export default new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  request: (operation) => {
    const token = localStorage.getItem('token')
    let headers = {}

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    operation.setContext({ headers })
  }
})
