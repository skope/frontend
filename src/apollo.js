import ApolloClient from 'apollo-boost'

export default new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    let headers = {}

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    operation.setContext({ headers })
  }
})
