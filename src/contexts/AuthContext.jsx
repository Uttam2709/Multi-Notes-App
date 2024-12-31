import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor authentication state and load user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setCurrentUser({
              ...user, // Firebase user object
              ...userDoc.data(), // Firestore user data
            });
          } else {
            setCurrentUser(user); // Default to Firebase user if no Firestore data exists
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  // Sign-up function with Firestore integration
  const signUp = async (email, password, userDetails) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        ...userDetails, // Custom user data
      });

      console.log('User registered and details saved to Firestore');
      return user;
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear user state after logout
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error.message);
      throw error;
    }
  };

  // Refresh current user data from Firestore
  const refreshCurrentUser = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setCurrentUser({
            ...auth.currentUser,
            ...userDoc.data(),
          });
        } else {
          setCurrentUser(auth.currentUser);
        }
      } catch (error) {
        console.error('Error refreshing user details:', error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        login,
        logout,
        loading,
        refreshCurrentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
