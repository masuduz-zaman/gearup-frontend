"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  Menu, 
  X 
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function Navbar({ categories = [] }: { categories?: Category[] }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setToken(Cookies.get("token") || null)
    setUserRole(Cookies.get("role") || null);

    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setDarkMode(false);
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setDarkMode(true);
  }
};

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setToken(null);
    setUserRole(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center gap-2 text-2xl font-black text-black dark:text-white">
            Gear<span className="text-red-400">Up</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Home
            </Link>

            <div className="relative group py-5">
              <Link href="/gear" className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
                All Gear <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-0 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/gear?category=${cat.name}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-xs text-gray-400"><p>Can't find any category.</p></div>
                )}
              </div>
            </div>

            <Link href="/services" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Services
            </Link>
            <Link href="/about" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {token ? (
              <div className="relative group py-3">
                <button className="flex items-center gap-2 p-1.5 rounded-full bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 text-blue-600 dark:text-blue-400">
                  <UserIcon className="w-6 h-6" />
                </button>

                <div className="absolute right-0 top-full w-52 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-100 dark:border-gray-700 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href={`/dashboard/${userRole || "customer"}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-200">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 space-y-3">
          <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 font-medium">Home</Link>
          <Link href="/gear" className="block py-2 text-gray-700 dark:text-gray-200 font-medium">All Gear</Link>
          <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-200 font-medium">Services</Link>
          <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-200 font-medium">About</Link>
          {token ? (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <Link href={`/dashboard/${userRole || "customer"}`} className="block py-2 text-blue-600 dark:text-blue-400 font-medium">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600 dark:text-red-400 font-medium">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="block text-center py-2 bg-blue-600 text-white rounded-lg font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}