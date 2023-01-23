import { createContext } from "react";

export const userRoleContext = createContext();

export default function CheckRole({children}) {
  const role = "admin";
  return (
    <div>
      <userRoleContext.Provider value={role}>
        {children}
      </userRoleContext.Provider>
    </div>
  );
}
