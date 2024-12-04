// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { apiService } from "../App/apiwrapper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const user = (await apiService.get("user")).data;
                setUser(user);
            }
            setLoading(false);
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredential.user);
            toast.success("Login successful");
            return userCredential.user;
        } catch (error) {
            toast.error(error.message);
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email, 
                password
            );
            setUser(userCredential.user);
            toast.success("Registration successful");
            return userCredential.user;
        } catch (error) {
            toast.error(error.message);
            console.error("Registration error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // await signOut(auth);
            setUser(null);
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.message);
            console.error("Logout error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, authChecked, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
