// src/context/UserContext.tsx
"use client";

import { createContext, useContext } from "react";
import { User } from "@/types/user";

export const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}
