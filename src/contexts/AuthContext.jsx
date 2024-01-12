/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {}
  );
  const [groups, setGroups] = useState([] || localStorage.getItem('groups'));

  const login = (res) => {
    setIsAuthenticated(true);
    setUser(res.user);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
  const fetchGroups = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVERURL}/user/groups`,
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      console.log(data.err);
    } else {
      setGroups(data.groups);
      localStorage.setItem('groups', JSON.stringify(data.groups));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        groups,
        login,
        logout,
        updateUser,
        fetchGroups,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
