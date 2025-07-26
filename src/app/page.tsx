import { SignInButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
            <h1 className="text-4xl sm:text-6xl font-bold text-center mb-6 drop-shadow-lg">
              Task Management System
            </h1>
            <p className="text-lg sm:text-xl text-center mb-12 max-w-2xl drop-shadow opacity-90">
              Streamline your workflow with our powerful task management solution.
              Create, organize, and track tasks effortlessly.
            </p>

            <div className="w-full max-w-5xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <FeatureCard
                  title="Task Management"
                  description="Create, update, and delete tasks with ease. Stay organized and never miss a deadline."
                />
                <FeatureCard
                  title="Project Organization"
                  description="Group tasks by projects and collaborate with team members efficiently."
                />
                <FeatureCard
                  title="Status Tracking"
                  description="Track task progress with customizable status workflows - from Todo to Done."
                />
              </div>
            </div>

            <div className="mt-12">
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-purple-600 shadow-md transition-all hover:bg-opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Sign In to Continue
                </button>
              </SignInButton>
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
