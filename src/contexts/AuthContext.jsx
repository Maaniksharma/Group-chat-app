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
  const [groupData, setGroupData] = useState({});

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
    localStorage.removeItem('groups');
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

  const addGroup = async (groupName) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVERURL}/user/creategroup`,
      {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName }),
      }
    );
    const data = await res.json();
    const group = data.group;
    const newGroups = [...groups, group];
    setGroups(newGroups);
    localStorage.setItem('groups', JSON.stringify(newGroups));
    return data.message;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        groups,
        groupData,
        login,
        logout,
        updateUser,
        fetchGroups,
        addGroup,
        setGroupData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
