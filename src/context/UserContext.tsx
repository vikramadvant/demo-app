// src/context/UserContext.tsx
"use client";

import { createContext, useContext } from "react";
import { User } from "@prisma/client";

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);
