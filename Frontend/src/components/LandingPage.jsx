import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";
import { useInView } from "../hooks/useInView";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link2, BarChart3, Shield, QrCode, Pencil, KeyRound, ArrowRight, Copy, Check } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [quickUrl, setQuickUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrlResult, setShortUrlResult] = useState("");
  const [copied, setCopied] = useState(false);

  useInView();

  const handleShorten = async (e) => {
    e.preventDefault();
    const originalUrl = quickUrl.trim();
    if (!originalUrl) {
      toast.error("Please paste a URL first");
      return;
    }

    setLoading(true);
    setShortUrlResult("");
    setCopied(false);

    try {
      const endpoint = token ? "/api/urls/shorten" : "/api/urls/public/shorten-once";
      const config = token
        ? {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        : {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };

      const { data: res } = await api.post(endpoint, { originalUrl }, config);
      const fullShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      setShortUrlResult(fullShortUrl);
      setQuickUrl("");
      toast.success("Short URL created!");
    } catch (err) {
      const status = err?.response?.status;
      if (!token && (status === 401 || status === 403)) {
        toast.error("Limit reached. Please sign in to create more links.");
        navigate("/login");
      } else {
        toast.error("Could not create short URL. Please check your link format.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrlResult) return;
    navigator.clipboard.writeText(shortUrlResult);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: Link2, title: "Custom Short Links", desc: "Create memorable slugs to represent your brand or campaigns." },
    { icon: BarChart3, title: "Real-Time Analytics", desc: "Monitor clicks, referrer sources, and visitor demographics live." },
    { icon: Shield, title: "Secure & Private", desc: "Password-protect sensitive destinations with encryption." },
    { icon: QrCode, title: "QR Code Generator", desc: "Instantly create customizable high-resolution QR codes." },
    { icon: Pencil, title: "Edit Any Link", desc: "Modify redirect destination URLs without changing your short links." },
    { icon: KeyRound, title: "JWT Auth Flow", desc: "Secure multi-device user registration and token-based login." },
  ];

  const steps = [
    { num: "01", step: "Paste Long URL", desc: "Drop your lengthy destination URL into our secure interface. Custom slug options and passwords can be applied instantly." },
    { num: "02", step: "Customize Slug", desc: "Define a clean branding slug to increase click-through rates. Generate matching high-resolution QR codes." },
    { num: "03", step: "Copy & Share", desc: "Instantly copy your clean short link to your clipboard. Distribute across campaigns and watch analytics stream live." },
  ];

  return (
    <div className="bg-bg-base text-text-primary min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-default)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />
        {/* Radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-base)_70%)] pointer-events-none" />

        <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          {/* Announcement */}
          <div
            data-animate
            className="data-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-border text-xs font-medium text-primary"
          >
            <span>New: QR Code generation is live</span>
            <ArrowRight className="w-3 h-3" />
          </div>

          {/* Heading */}
          <h1
            data-animate
            className="data-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary"
          >
            Shorten links.{" "}
            <span className="text-primary">Track clicks.</span>
          </h1>

          {/* Subtitle */}
          <p
            data-animate
            className="data-animate text-base md:text-lg text-text-secondary max-w-[480px] leading-relaxed"
          >
            The fast, reliable URL shortener built for developers and teams. Create, manage, and analyze your links from one dashboard.
          </p>

          {/* Shortener Widget */}
          <div data-animate className="data-animate w-full max-w-[640px] mt-2">
            <form
              onSubmit={handleShorten}
              className="flex flex-col sm:flex-row gap-2 bg-bg-surface border border-border rounded-xl p-2 shadow-md"
            >
              <input
                type="url"
                placeholder="Paste your long URL here..."
                required
                className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-text-primary placeholder-text-muted outline-none"
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded-lg sm:w-auto px-6 py-3 cursor-pointer"
              >
                {loading ? "Creating..." : "Shorten"}
              </button>
            </form>

            <p className="text-xs text-text-muted mt-3">
              No signup required for 3 free links · Full analytics with free account
            </p>

            {/* Result */}
            {shortUrlResult && (
              <div className="mt-5 p-3.5 rounded-xl bg-bg-secondary border border-border flex items-center justify-between gap-4 max-w-[580px] mx-auto shadow-sm">
                <span className="font-mono text-sm text-primary truncate">
                  {shortUrlResult}
                </span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn-ghost py-2 px-3.5 text-xs gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5 text-success" /> Copied</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-bg-secondary border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "2.4B+", label: "Links Shortened" },
            { value: "99.9%", label: "Uptime Guarantee" },
            { value: "<50ms", label: "Redirect Latency" },
          ].map((stat, i) => (
            <div key={i} data-animate className={`data-animate flex flex-col items-center md:items-start gap-1 ${
              i === 1 ? "border-y md:border-y-0 md:border-x border-border py-6 md:py-0 md:px-8" : ""
            }`}>
              <span className="text-4xl md:text-5xl font-semibold text-text-primary leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-medium tracking-wider text-text-muted uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center md:text-left mb-16">
          <p data-animate className="data-animate text-xs font-medium tracking-wider text-primary uppercase mb-2">
            What you get
          </p>
          <h2 data-animate className="data-animate text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.02em] text-text-primary">
            Everything a link needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} data-animate className="data-animate card flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <p data-animate className="data-animate text-xs font-medium tracking-wider text-primary uppercase mb-2">
            Process
          </p>
          <h2 data-animate className="data-animate text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.02em] text-text-primary">
            How it works.
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {steps.map((item, index) => (
            <div
              key={index}
              data-animate
              className={`data-animate flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <span className="text-7xl md:text-8xl font-semibold text-primary/10 leading-none select-none">
                  {item.num}
                </span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <h3 className="text-xl font-semibold text-text-primary">
                  {item.step}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 px-6 text-center bg-bg-secondary border-t border-border">
        <div className="max-w-[560px] mx-auto flex flex-col items-center gap-6">
          <h2 data-animate className="data-animate text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-text-primary">
            Ready to start?
          </h2>
          <p data-animate className="data-animate text-base text-text-secondary leading-relaxed">
            Join developers and teams who move fast. Create your free account and start shortening links in seconds.
          </p>
          <div data-animate className="data-animate flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
            {token ? (
              <Link to="/dashboard" className="btn-primary px-8 py-3">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary px-8 py-3">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-ghost px-8 py-3">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
