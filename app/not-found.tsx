import Link from "next/link";
import { SearchX, Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
          <SearchX className="h-12 w-12 text-indigo-600" />
        </div>

        <h1 className="mt-8 text-6xl font-black text-gray-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}