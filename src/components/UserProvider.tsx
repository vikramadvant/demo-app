"use client";

import { ReactNode } from "react";
import { UserContext } from "@/context/UserContext";
import { useCurrentUser } from "@/hooks/users";

export default function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser();
  console.log('user: in UserProvider', user);

  return <UserContext.Provider value={user || null}>{children}</UserContext.Provider>;
}
