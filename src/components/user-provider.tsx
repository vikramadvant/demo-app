"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "@/context/user-context";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
