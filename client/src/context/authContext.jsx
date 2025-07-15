import React from 'react'
import { createContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me')
            setUser(res.data);
        } catch (error) {
            setUser(null);
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const logout = async () => {
        await api.post('/auth/logout')        
        setUser(null);
    }
    

  return (
    <AuthContext.Provider value={{user, setUser, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider