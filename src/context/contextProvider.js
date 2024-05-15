import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;

export const Sair = () => {
  const { setUser } = useContext(AuthContext);
  return setUser(null);
};
