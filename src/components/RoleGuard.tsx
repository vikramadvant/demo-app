"use client";
import { useUser } from "@/context/UserContext";
import { isAdmin } from "@/hooks/users";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && !isAdmin(user)) {
      router.replace("/dashboard");
    }
    if (user && isAdmin(user)) {
      router.replace("/admin");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
} 