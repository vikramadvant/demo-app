import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-semibold text-purple-600">Projects</h1>
              <div className="space-x-4">
                <Link 
                  href="/dashboard"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/projects"
                  className="text-purple-600"
                >
                  Projects
                </Link>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Your Projects</h2>
            <p className="text-gray-500">Manage and organize your projects</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Create New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            name="Example Project"
            description="This is an example project description."
            taskCount={5}
          />
          {/* More project cards will be mapped here */}
        </div>
      </main>
    </div>
  );
}

function ProjectCard({
  name,
  description,
  taskCount,
}: {
  name: string;
  description: string;
  taskCount: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-purple-600">{taskCount} tasks</span>
        <button className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
} 