import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const loggedUser = localStorage.getItem('user')
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }else{
      dispatch({type: 'LOGOUT', payload: null })
    }
    // console.log(user)
    setLoggedIn(Boolean(loggedUser))
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}