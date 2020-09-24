import React, { useState } from 'react'
import { Segment, Form, Input, Button } from 'semantic-ui-react'

const LoginForm = ({ login }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  return (
    <Segment basic>
    <Form onSubmit={async e => {
      e.preventDefault()

      login(email, password)
    }}>
      <Form.Field>
      <Input
        placeholder="Email"
        type="email"
        onChange={e => setEmail(e.target.value)}
        fluid
      />
      </Form.Field>
      <Form.Field>
      <Input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        fluid
      />
      </Form.Field>
      <Button
        type="submit"
        primary
      >Login</Button>
    </Form>
    </Segment>
  )
}

export default LoginForm
