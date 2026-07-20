import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { LayoutDashboard, PlusCircle, LogOut, Menu, X, ArrowLeft, Sun, Moon } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, theme, toggleTheme } = useStoreContext();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const onLogOut = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: "Create Link", path: "/dashboard/create", icon: PlusCircle, exact: false },
  ];

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden h-14 border-b border-border bg-bg-surface px-4 flex items-center justify-between z-30">
        <Link to="/" className="flex items-center gap-2 font-semibold text-base text-text-primary">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>Snipr</span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="p-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-bg-surface z-40 flex flex-col p-6 gap-4 border-b border-border">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`nav-item ${isActive(item) ? "active" : ""}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="h-px bg-border" />
          <button
            onClick={onLogOut}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive-light rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-bg-surface border-r border-border min-h-screen shrink-0 p-5 justify-between">
        <div className="flex flex-col gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-text-primary font-semibold text-base tracking-tight group"
          >
            <svg
              className="w-4 h-4 text-primary transition-transform duration-normal group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>Snipr</span>
          </Link>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item) ? "active" : ""}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-px bg-border" />
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <button
            onClick={onLogOut}
            className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-destructive rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-bg-base p-6 lg:p-10 overflow-y-auto">
        {location.pathname !== "/dashboard" && (
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
