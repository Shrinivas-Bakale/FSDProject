import { useContext, createContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
    const [user, setUser] = useState(second)
    const login = (user) => { setUser(user) }
    const logout = (user) => { setUser(user) }

    return (
        <AuthContext.Provider value={{ user, login, logout }} >
            {props.children}
        </AuthContext.Provider >
    )
}