export default async function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
            <h1 className="text-4xl sm:text-6xl font-bold text-center mb-6 drop-shadow-lg">
              Task Management System
            </h1>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </main>
    </div>
  );
}
