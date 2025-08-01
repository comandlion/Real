import React, {createContext, useContext, useEffect, useState, type ReactNode, useCallback} from 'react';
import { AuthContext } from './AuthContext';
import { getUser } from '../api.ts';
import { type User, type UserContextType  } from '../types/types.ts';

const UserContext = createContext<UserContextType>({
    user: null,
    loading: false,
    fetchUser: async () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { token, logout } = useContext(AuthContext);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = useCallback(async () => {
        if (!token) {
            setUser(null);
            return;
        }

        setLoading(true);
        try {
            const response = await getUser(token);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
            logout(); // Possibly invalid token
        } finally {
            setLoading(false);
        }
    }, [token, logout]);

    useEffect(() => {
        if (token) {
            void  fetchUser();
        } else {
            setUser(null);
        }
    }, [token, fetchUser]);

    return (
        <UserContext.Provider value={{ user, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };