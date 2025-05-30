import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, PlayCircle, ShieldCheck, BarChart3 } from "lucide-react";

const navItems = [
  { name: "ראשי", path: "/", icon: <Home /> },
  { name: "תיאוריה", path: "/theory", icon: <BookOpen /> },
  { name: "סימולציה", path: "/simulation", icon: <PlayCircle /> },
  { name: "תרגול", path: "/practice", icon: <ShieldCheck /> },
  { name: "סיכום", path: "/summary", icon: <BarChart3 /> },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex font-sans">
      <aside className="w-64 bg-zinc-900 border-l-4 border-red-600 p-5 space-y-4 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6 tracking-wide">ByteMe</h1>
        <nav className="space-y-2">
          {navItems.map(({ name, path, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-lg transition-all duration-150 ${
                location.pathname === path
                  ? "bg-red-600 text-white shadow-md"
                  : "hover:bg-red-700 hover:text-white text-zinc-300"
              }`}
            >
              {icon}
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
