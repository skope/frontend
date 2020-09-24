import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import UserContext from '../contexts/UserContext'
import ModalContext from '../contexts/ModalContext'

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(
      input: {
        email: $email,
        password: $password
      }
    ) {
      jwtToken
    }
  }
`

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

const LoginModal = () => {
  const { dispatch: modalDispatch, state: { login: modalOpen }} = useContext(ModalContext)
  const { dispatch: userDispatch } = useContext(UserContext)
  const [ login ] = useMutation(LOGIN)
  const apolloClient = useApolloClient()

  const handleLogin = async (email, password) => {
    const { data: { login: { jwtToken: token }} } = await login({
      variables: { email, password }
    })

    if (token === null) {
      return false
    }

    userDispatch({
      type: 'SET_TOKEN',
      payload: token
    })

    const { data: { profile: { nodes: user } } } = await apolloClient.query({
      query: USER
    })

    userDispatch({
      type: 'SET_USERDATA',
      payload: user[0]
    })

    modalDispatch({ type: 'closeLoginModal' })
  }

  return (
    <Modal
      open={modalOpen}
      header='Sign in'
      onClose={() => modalDispatch({ type: 'closeLoginModal'})}
      content={
        <LoginForm
          login={handleLogin}
        />
      }
      size='mini'
    />
  )
}

export default LoginModal
