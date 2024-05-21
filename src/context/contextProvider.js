import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfos, setUserInfos] = useState({
    id: null,
    name: null,
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAdmin, setIsAdmin, userInfos, setUserInfos }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;

export const Sair = () => {
  const { setUser } = useContext(AuthContext);
  return setUser({ id: null, name: null });
};
