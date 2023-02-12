import React from 'react'

const AuthContext = React.createContext()

export function AuthProvider({children}) {
  return (
    <div>authContext</div>
  )
}

export default authContext