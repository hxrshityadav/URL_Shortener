import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-text-primary font-semibold text-lg tracking-tight focus:outline-none"
            >
              <svg
                className="w-4 h-4 text-primary"
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
            <p className="text-sm leading-relaxed text-text-secondary">
              Shorten, track, and manage your URLs with precision. Built for developers and teams who move fast.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-wider text-text-muted uppercase">
              Product
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal">
                Features
              </a>
              <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal">
                Pricing
              </a>
              <a href="#changelog" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal">
                Changelog
              </a>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-wider text-text-muted uppercase">
              Legal
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/privacy" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-wider text-text-muted uppercase">
              Connect
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a
                href="https://github.com/yadavxprakhar/Snipr---A-URL-Shortner-App"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-normal"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 Snipr. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with Spring Boot + React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
