"use client";
import { useUser } from "@/context/UserContext";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashboard() {
  const user = useUser();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="absolute top-6 right-8 z-10">
        <UserButton afterSignOutUrl="/" />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
            <h1 className="text-4xl sm:text-6xl font-bold text-center mb-6 drop-shadow-lg">
              Admin Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-center mb-10 max-w-2xl drop-shadow opacity-90">
              Welcome, <span className="font-semibold">{user?.firstName || user?.email}</span>!<br />
              As an admin, you have full control over projects and users.
            </p>

            <div className="w-full max-w-5xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <FeatureCard
                  title="Project Management"
                  description="Create, view, update, and delete projects. Keep your organization on track."
                />
                <FeatureCard
                  title="Assign Projects"
                  description="Assign projects to users and manage team responsibilities with ease."
                />
                <FeatureCard
                  title="Admin Tools"
                  description="Access special admin-only features and oversee all project activity."
                />
              </div>
            </div>

            <div className="mt-12 flex gap-6">
              <Link href="/admin">
                <button className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-purple-600 shadow-md transition-all hover:bg-opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Dashboard
                </button>
              </Link>
              <Link href="/admin/projects">
                <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Projects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white bg-opacity-10 p-6 backdrop-blur-sm ring-1 ring-white/20">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
} 