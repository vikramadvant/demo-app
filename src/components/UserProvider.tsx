"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { UserApi } from "@/services/apis/userApi";
import { User, UserProviderProps } from "@/types";

const userApi = new UserApi();

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userApi.getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
