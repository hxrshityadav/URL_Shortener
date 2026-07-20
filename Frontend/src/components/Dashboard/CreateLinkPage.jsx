import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Copy, Check, QrCode } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

const CreateLinkPage = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [generateQr, setGenerateQr] = useState(true);

  const [slugStatus, setSlugStatus] = useState(null);
  const [slugLoading, setSlugLoading] = useState(false);

  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!customAlias || customAlias.trim().length < 3) {
      setSlugStatus(null);
      return;
    }
    setSlugLoading(true);
    const handler = setTimeout(async () => {
      try {
        const { data } = await api.get(`/api/urls/check-slug?slug=${customAlias.trim()}`, {
          headers: { Authorization: "Bearer " + token },
        });
        setSlugStatus(data.exists ? "taken" : "available");
      } catch (err) {
        setSlugStatus(null);
      } finally {
        setSlugLoading(false);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [customAlias, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      toast.error("Long URL is required");
      return;
    }
    if (slugStatus === "taken") {
      toast.error("Custom slug is already taken");
      return;
    }

    setLoader(true);
    setSuccessData(null);
    setCopied(false);

    try {
      const payload = {
        originalUrl: originalUrl.trim(),
        customAlias: customAlias.trim() || null,
        password: password.trim() || null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString().split(".")[0] : null,
        generateQrCode: generateQr,
      };

      const { data } = await api.post("/api/urls/shorten/advanced", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const urlMapping = data.url || data;
      const qrCode = data.qrCodePngBase64 || null;
      const fullShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${urlMapping.shortUrl}`;

      setSuccessData({ shortUrl: urlMapping.shortUrl, fullShortUrl, qrCode });
      toast.success("Short URL created!");

      setOriginalUrl("");
      setCustomAlias("");
      setTitle("");
      setPassword("");
      setExpiresAt("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create link");
    } finally {
      setLoader(false);
    }
  };

  const copyResult = () => {
    if (!successData) return;
    navigator.clipboard.writeText(successData.fullShortUrl);
    setCopied(true);
    toast.success("Short URL copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
          Create a new link
        </h2>
        <p className="text-sm text-text-secondary">
          Configure your redirect destination and custom slug details below
        </p>
      </div>

      <div className="card p-6 md:p-8 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Destination URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Long URL
            </label>
            <input
              type="url"
              required
              placeholder="https://your-long-url.com/some/deep/path"
              className="input"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>

          {/* Custom Slug */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Custom Slug <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-1.5 text-xs">
                {slugLoading && <span className="text-text-muted">Checking...</span>}
                {!slugLoading && slugStatus === "available" && (
                  <span className="text-success font-medium">✓ Available</span>
                )}
                {!slugLoading && slugStatus === "taken" && (
                  <span className="text-destructive font-medium">✗ Taken</span>
                )}
              </div>
            </div>
            <div className="flex rounded-lg overflow-hidden border border-border bg-bg-surface focus-within:border-border-focus focus-within:shadow-[0_0_0_3px_var(--ring-focus)] transition-all duration-normal">
              <span className="px-3.5 py-2.5 bg-bg-elevated border-r border-border font-mono text-xs text-text-muted flex items-center select-none">
                snpr.io/
              </span>
              <input
                type="text"
                placeholder="my-custom-slug"
                className="flex-1 bg-transparent px-3.5 py-2.5 text-sm font-mono text-primary outline-none"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value.replace(/\s+/g, ""))}
              />
            </div>
          </div>

          {/* Link Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Link Title <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Summer Marketing Campaign"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Advanced options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-border">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Password <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                type="password"
                placeholder="Optional password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Expiration <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                type="datetime-local"
                className="input text-text-secondary"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>

          {/* QR Option */}
          <div className="flex items-center gap-2.5 pt-3">
            <input
              id="generateQr"
              type="checkbox"
              className="accent-primary w-4 h-4 cursor-pointer"
              checked={generateQr}
              onChange={(e) => setGenerateQr(e.target.checked)}
            />
            <label htmlFor="generateQr" className="text-sm text-text-secondary cursor-pointer select-none">
              Generate QR code for this link
            </label>
          </div>

          <button
            type="submit"
            disabled={loader}
            className="btn-primary w-full py-3 mt-4 cursor-pointer"
          >
            {loader ? "Creating..." : "Create Link"}
          </button>
        </form>

        {/* Success Card */}
        {successData && (
          <div className="mt-2 p-5 bg-success-light border border-success/20 rounded-xl flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-success uppercase tracking-wider">
                Link created
              </span>
              <div className="flex items-center justify-between gap-3 bg-bg-surface border border-border rounded-lg p-3 mt-2">
                <span className="font-mono text-sm text-primary truncate">
                  {successData.fullShortUrl}
                </span>
                <button
                  type="button"
                  onClick={copyResult}
                  className="btn-primary py-1.5 px-3.5 text-xs shrink-0 gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5" /> Copied</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
              </div>
            </div>

            {successData.qrCode && (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-border">
                <div className="p-3 bg-white rounded-lg shrink-0">
                  <img
                    src={`data:image/png;base64,${successData.qrCode}`}
                    alt="QR Code"
                    className="w-24 h-24"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <span className="text-sm font-medium text-text-primary">Dynamic QR Code</span>
                  <p className="text-xs text-text-secondary">
                    Scan to redirect to your destination. High-res copy generated.
                  </p>
                  <a
                    href={`data:image/png;base64,${successData.qrCode}`}
                    download={`Snipr-${successData.shortUrl}-qr.png`}
                    className="text-xs text-primary hover:underline self-center sm:self-start mt-1.5 flex items-center gap-1 font-medium"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    Download QR Code
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLinkPage;
