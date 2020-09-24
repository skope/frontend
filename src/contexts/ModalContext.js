import React, { useReducer } from 'react'
import modalReducer, { initialModalState } from '../reducers/modalReducer'

const ModalContext = React.createContext()

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState)

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
