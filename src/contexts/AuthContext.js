import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import firebase from "firebase/app"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      return result.user.updateProfile({
        displayName: 'ゲストさん',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/plusma-1927f.appspot.com/o/images%2Fuser-icon.png?alt=media&token=4e41d5e7-1b96-47b7-9e2e-ebc7586a1c5a'
      })
    }).catch(function(error) {
      console.log(error);
    })
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  
  function logout() {
    return auth.signOut()
  }
  
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      setLoading(false)
      if (user) {
        // ログイン済みのユーザー情報がfirestoreにあるかをチェック
        const userId = user.uid;
        var userDoc = await db.collection('users').doc(userId).get();
        if (user.email && !userDoc.exists) {
          // Firestore にユーザー用のドキュメントが作られていなければ作る
          await userDoc.ref.set({
            email: user.email,
            userId: userId,
            profileDesc: '',
            linkForMercari: '',
            iconImage: {
              id: 'defaultImage',
              path: user.photoURL
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}