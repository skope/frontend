import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import userReducer, { initialUserState } from '../reducers/userReducer'

const UserContext = React.createContext()

const USER = gql`
  query Profile {
    profile {
      nodes {
        uuid
        email
        username
      }
    }
  }
`

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)
  const { data: user } = useQuery(USER, {
    skip: Boolean(state.data.uuid)
  })

  if (state.data.uuid === null && localStorage.getItem('token') && user) {
    dispatch({
      type: 'SET_USERDATA',
      payload: user.profile.nodes[0]
    })
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
