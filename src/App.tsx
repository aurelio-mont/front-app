import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import ProtectedRout from './routes/ProtectedRout'
import { useEffect, useState } from 'react'
import { accessTokenFetch, profileFetch } from './api'
import { useAuthContext } from './context'
import Loading from './components/Looading'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/",
        element: <ProtectedRout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            }
        ]
    },
])
export default function App() {
    const { setAccessToken, setIsAuthenticated, setProfile } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    const getProfile = async (accessToken: string) => {
        try {
            const response = await profileFetch(accessToken);
            const data = await response.json();
            if (response.ok) {
                setProfile(data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const reactiveSession = async (refreshToken: string) => {
        try {
            const response = await accessTokenFetch(refreshToken);
            const data = await response.json();
            if (response.ok) {
                setAccessToken(data.access);
                getProfile(data.access);
            }
            if (response.status === 401) {
                localStorage.removeItem("refreshToken");
                setIsAuthenticated(false);
                setProfile({ email: '', full_name: '', id: '', date_of_birth: '' });
                setAccessToken('');
            }
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                reactiveSession(refreshToken);
            }
            setIsLoading(false);
        }, 2000)
    }, [])

    return (
        <>
            {isLoading && <Loading />}

            {isLoading === false && <RouterProvider router={router} />}
        </>
    );
}