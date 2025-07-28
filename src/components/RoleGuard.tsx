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
    if (user && isAdmin(user) && !pathname.startsWith("/admin")) {
      router.replace("/admin");
    }
    if (user && !isAdmin(user) && pathname.startsWith("/admin")) {
      router.replace("/admin");
    }
  }, [user, pathname, router]);

  // Optionally, show nothing or a loading spinner while redirecting
  if (user && isAdmin(user) && !pathname.startsWith("/admin")) {
    return null;
  }
  if (user && !isAdmin(user) && pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
} 