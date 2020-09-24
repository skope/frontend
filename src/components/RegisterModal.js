import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import RegisterForm from './RegisterForm'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ModalContext from '../contexts/ModalContext'

const REGISTER = gql`
  mutation RegisterMutation($email: String!, $username: String!, $password: String!) {
    register(
      input: {
        email: $email,
        username: $username,
        password: $password
      }
    ) {
      string
    }
  }
`

const RegisterModal = () => {
  const { dispatch: modalDispatch, state: { register: registerModal }} = useContext(ModalContext)
  const [ register ] = useMutation(REGISTER)

  const handleRegister = async (email, username, password) => {
    const result = await register({
      variables: { email, username, password }
    })

    if (result.data.errors) {
      console.log(result.data.errors)

      return false;
    }

    modalDispatch({ type: 'closeRegisterModal' })
    modalDispatch({ type: 'openLoginModal' })
  }

  return (
    <Modal
      open={registerModal}
      onClose={() => modalDispatch({ type: 'closeRegisterModal' })}
      header='Sign up'
      content={
        <RegisterForm register={handleRegister} />
      }
      size='mini'
    />
  )
}

export default RegisterModal
