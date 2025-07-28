import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import UserProvider from "@/components/UserProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { RoleGuard } from "@/components/RoleGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management System",
  description: "Modern task management system built with Next.js and Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
          <body className={`${inter.className} min-h-full`}>
            <QueryProvider>
              <UserProvider>
                <RoleGuard>{children}</RoleGuard>
              </UserProvider>
            </QueryProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
