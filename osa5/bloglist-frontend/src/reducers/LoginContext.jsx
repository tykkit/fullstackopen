import { createContext, useContext, useReducer } from 'react'

const loginReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return action.payload
    case "LOGOUT":
      return null
    default:
      return state
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginValue = () => {
  const loginDispatchandValue = useContext(LoginContext)
  return loginDispatchandValue[0]
}

export const useLoginDispatch = () => {
  const loginDispatchandValue = useContext(LoginContext)
  return loginDispatchandValue[1]
}

export default LoginContext