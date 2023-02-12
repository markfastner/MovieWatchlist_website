import React, { useContext, useState, useEffect } from 'react'
import auth from 'firebase'
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils'

// Initialize Authentication Context
const AuthContext = React.createContext() 

// Function to use Authentication
export function useAuth() { 
  return useContext(AuthContext)
}

// Function to encapsulate components in Authentication context
export function AuthProvider({ children }) { 
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // Function creates a user account
  function signup(email, password) { 
    return auth.createUserWithEmailAndPassword(email, password)
  }

  // Function logs a user into authentication context
  function signin(email, password) { 
    return auth.signInWithEmailAndPassword(email, password)
  }

  // Function logs a user out of authentication context
  function signout() { 
    return auth.signOut()
  }

  // Function sends an email to a user to reset their password
  function resetPassword(email) {  
    return auth.sendPasswordResetEmail(email)
  }

  // Function sends an email to a user to update their email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  // Function updates a user's password to the password passed
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  // Effect renders the signup button useless once clicked
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signin,
    signup,
    signout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  // returns the components encapsulated in the authentication context
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}