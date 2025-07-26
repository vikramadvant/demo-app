import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/components/user-provider";

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
            <UserProvider>{children}</UserProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
