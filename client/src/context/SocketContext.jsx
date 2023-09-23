import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => { 
    const socket = useContext(SocketContext);
    return socket; 
};

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io('http://localhost:4000'), []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}; 