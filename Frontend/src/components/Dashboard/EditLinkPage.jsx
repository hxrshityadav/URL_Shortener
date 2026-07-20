import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMyShortUrls } from "../../hooks/useQuery";
import { useStoreContext } from "../../contextApi/ContextApi";
import toast from "react-hot-toast";
import api from "../../api/api";

const EditLinkPage = () => {
  const { id } = useParams();
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const { data: myShortenUrls = [], isLoading } = useFetchMyShortUrls(token, () => {
    navigate("/error");
  });

  useEffect(() => {
    if (!isLoading && myShortenUrls.length > 0) {
      const link = myShortenUrls.find((l) => l.shortUrl === id);
      if (link) {
        setOriginalUrl(link.originalUrl);
        setCustomAlias(link.shortUrl);
      } else {
        toast.error("Link not found");
        navigate("/dashboard");
      }
    }
  }, [id, myShortenUrls, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      toast.error("Long URL is required");
      return;
    }

    setLoader(true);
    try {
      const payload = {
        originalUrl: originalUrl.trim(),
        customAlias: customAlias.trim() || null,
        password: password.trim() || null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString().split(".")[0] : null,
      };

      await api.put(`/api/urls/${encodeURIComponent(id)}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      toast.success("Link updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update link");
    } finally {
      setLoader(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-text-muted text-sm">Loading link settings...</div>;
  }

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
          Edit link settings
        </h2>
        <p className="text-sm text-text-secondary">
          Modify the destination URL, custom slug, or security parameters
        </p>
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Destination URL
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

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Custom Slug
            </label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-border">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                New Password <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                type="password"
                placeholder="Set new password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Expiration Date <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                type="datetime-local"
                className="input text-text-secondary"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-ghost flex-1 py-2.5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loader}
              className="btn-primary flex-1 py-2.5 cursor-pointer"
            >
              {loader ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinkPage;
