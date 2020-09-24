import React, { useContext } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ModalContext from '../contexts/ModalContext'
import UserContext from '../contexts/UserContext'

const Header = ({ logout }) => {
  const { dispatch: modalDispatch } = useContext(ModalContext)
  const { dispatch: userDispatch, state: { token, data: user }} = useContext(UserContext)

  return (
    <Menu>
      <Menu.Item
        name='title'
        content='Psykedelia'
        as={Link}
        to='/'
        header
      />
      {token !== null ? (
        <Menu.Menu position='right'>
          <Menu.Item
            name='upload'
            content='Upload'
            as={Link}
            to='/upload'
            link
          />
          <Dropdown item text={user.username}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
              <Dropdown.Item
                onClick={() => userDispatch({ type: 'REMOVE_TOKEN' })}
              >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      ) : (
        <Menu.Menu position='right'>
          <Menu.Item
            name='sign-in'
            content='Sign in'
            onClick={() => modalDispatch({ type: 'openLoginModal' })}
            link
          />
          <Menu.Item
            name='sign-up'
            active={false}
            content='Sign up'
            onClick={() => modalDispatch({ type: 'openRegisterModal' })}
            link
          />
        </Menu.Menu>
      )}
    </Menu>
  )
}

export default Header
