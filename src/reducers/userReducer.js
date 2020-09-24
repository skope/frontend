export const initialUserState = {
  token: localStorage.getItem('token'),
  data: {
    uuid: null,
    email: null,
    username: null
  }
}

export default (state, { type, payload }) => {
  switch(type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', payload)

      return { ...state, token: payload }
    case 'REMOVE_TOKEN':
      localStorage.removeItem('token')

      return { ...state, token: null }
    case 'SET_USERDATA':
      return { ...state, data: payload }
    default:
      throw new Error()
  }
}
