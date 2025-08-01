import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface Props {
    children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return <>{token ? children : null}</>;
};

export default RequireAuth;