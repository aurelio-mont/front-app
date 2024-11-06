/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { AuthPoviderProps, User } from "../types";
import { accessTokenFetch, logoutFetch, profileFetch } from "../api";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => { },
    accessToken: '',
    setAccessToken: (value: string) => { },
    profile: {} as User,
    setProfile: (value: User) => { },
})

function AuthProvider({ children }: AuthPoviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState<string>('')
    const [profile, setProfile] = useState<User>({ email: '', full_name: '', id: '', date_of_birth: '' });


    return (
        <AuthContext.Provider value={{ isAuthenticated, profile, accessToken, setIsAuthenticated, setAccessToken, setProfile }}>
            {children}
        </AuthContext.Provider>
    )
}



export { AuthContext, AuthProvider }