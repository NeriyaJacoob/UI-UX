import { useLocation, Link, Outlet } from "react-router-dom";
import { Home, BookOpen, PlayCircle, ShieldCheck, BarChart3 } from "lucide-react";

const navItems = [
  { name: "ראשי", path: "/", icon: <Home /> },
  { name: "תיאוריה", path: "/theory/page/1", icon: <BookOpen /> },
  { name: "סימולציה", path: "/simulation", icon: <PlayCircle /> },
  { name: "תרגול", path: "/practice", icon: <ShieldCheck /> },
  { name: "סיכום", path: "/summary", icon: <BarChart3 /> },
];

export default function Layout() {
  const { pathname } = useLocation();
  const currentPath = pathname;

  // קביעת קלאס עיצוב לפי סוג העמוד
  let themeClass = "";
  if (pathname.startsWith("/theory")) themeClass = "theory-page";
  else if (pathname.startsWith("/simulation")) themeClass = "simulation-page";
  else if (pathname.startsWith("/practice")) themeClass = "practice-page";
  else if (pathname.startsWith("/summary")) themeClass = "summary-page";
  else themeClass = "home-page";

  return (
    <div className={`min-h-screen flex font-sans ${themeClass}`}>
      <aside className="w-64 p-5 space-y-4 shadow-xl border-l-4 text-white sidebar">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">ByteMe</h1>
        <nav className="space-y-2">
          {navItems.map(({ name, path, icon }) => {
            const isActive = currentPath === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-lg transition-all duration-150 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "hover:bg-white/20 text-white/80"
                }`}
              >
                {icon}
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 px-10 py-8 overflow-y-auto transition-colors duration-300 content-area">
        <Outlet />
      </main>
    </div>
  );
}
