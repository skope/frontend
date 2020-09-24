import React, { useState } from 'react'
import {
  Segment,
  Form,
  Input,
  Button,
  Label
} from 'semantic-ui-react'

const RegisterForm = ({ register }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ verifyPassword, setVerifyPassword ] = useState('')
  const [ error, setError ] = useState({
    email: false,
    username: false,
    password: false
  })

  return (
    <Segment basic>
      <Form onSubmit={async e => {
        e.preventDefault()

        if (password !== verifyPassword) {
          setError({
            ...error,
            password: true
          })

          return false
        }

        if (username.length < 3) {
          setError({
            ...error,
            username: true
          })
        }

        setError({
          email: false,
          password: false
        })

        register(email, username, password)
      }}>
        <Form.Field>
          <Input
            placeholder="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            error={error.email}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Username"
            type="text"
            onChange={e => setUsername(e.target.value)}
            error={error.username}
            fluid
          />
          {error.username &&
            <Label pointing prompt color="red">
             Username must be more than three characters long
            </Label>
          }
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            error={error.password}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Verify password"
            type="password"
            onChange={e => setVerifyPassword(e.target.value)}
            error={error.password}
            fluid
          />
          {error.password &&
            <Label pointing prompt color="red">
              Passwords do not match
            </Label>
          }
        </Form.Field>
        <Button
          type="submit"
          primary
        >Register</Button>
      </Form>
    </Segment>
  )
}

export default RegisterForm
