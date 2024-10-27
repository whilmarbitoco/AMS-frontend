import { createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext(undefined);
export const apiUrl = createContext("localhost:3000");

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [api] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser, api }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const user = useContext(userContext);

  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return [user.user, user.setUser];
};

export const useApiUrl = () => {
  const api = useContext(apiUrl);

  if (api === undefined) {
    throw new Error("useApiUrl must be used within a UserProvider");
  }
  return api;
};
