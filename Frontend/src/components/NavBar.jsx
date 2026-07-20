import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useStoreContext } from "../contextApi/ContextApi";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken, theme, toggleTheme } = useStoreContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLogOut = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-all duration-normal ${
        isScrolled
          ? "bg-bg-base/95 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] h-full px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-text-primary font-semibold text-lg tracking-tight group focus:outline-none"
        >
          <svg
            className="w-5 h-5 text-primary transition-transform duration-normal group-hover:scale-110"
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollToSection("features")}
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-elevated transition-colors duration-normal cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-elevated transition-colors duration-normal cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-elevated transition-colors duration-normal cursor-pointer"
          >
            Docs
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-normal cursor-pointer"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {token ? (
            <>
              <Link to="/dashboard" className="btn-ghost py-2 px-4 text-sm">
                Dashboard
              </Link>
              <button onClick={onLogOut} className="btn-primary py-2 px-4 text-sm">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2 px-4 text-sm">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary py-2 px-4 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary transition-colors duration-normal cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-normal cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-bg-base/98 backdrop-blur-lg z-40 flex flex-col px-6 py-8 gap-2 border-t border-border">
          <button
            onClick={() => scrollToSection("features")}
            className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors duration-normal text-left py-3 px-2 rounded-md hover:bg-bg-elevated cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors duration-normal text-left py-3 px-2 rounded-md hover:bg-bg-elevated cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors duration-normal text-left py-3 px-2 rounded-md hover:bg-bg-elevated cursor-pointer"
          >
            Docs
          </button>
          
          <div className="h-px bg-border my-4" />

          {token ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ghost w-full text-center"
              >
                Dashboard
              </Link>
              <button onClick={onLogOut} className="btn-primary w-full cursor-pointer">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ghost w-full text-center"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
