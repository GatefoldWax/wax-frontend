import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface UserContext {
  user: { username: string; following: string[] };
  setUser: Dispatch<
    SetStateAction<{
      username: string;
      following: never[];
    }>
  >;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ username: "", following: [] });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
