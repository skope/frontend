export const initialModalState = {
  login: false,
  register: false
}

export default (state, { type }) => {
  switch(type) {
    case 'openLoginModal':
      return { ...state, login: true }
    case 'closeLoginModal':
      return { ...state, login: false }
    case 'openRegisterModal':
      return { ...state, register: true }
    case 'closeRegisterModal':
      return { ...state, register: false }
    default:
      throw new Error()
  }
}
