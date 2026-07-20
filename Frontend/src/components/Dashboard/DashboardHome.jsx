import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchMyShortUrls } from "../../hooks/useQuery";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Copy, Check, BarChart2, Edit2, Trash2, Link as LinkIcon, Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

const DashboardHome = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedSlug, setCopiedSlug] = useState("");
  const [deleteModalSlug, setDeleteModalSlug] = useState("");

  const { isLoading, data: myShortenUrls = [], refetch } = useFetchMyShortUrls(token, () => {
    navigate("/error");
  });

  // KPI Calculations
  const totalLinks = myShortenUrls.length;
  const totalClicks = myShortenUrls.reduce((sum, link) => sum + (link.clickCount || 0), 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const linksThisMonth = myShortenUrls.filter((link) => {
    const d = new Date(link.createdDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0.0";

  // Filter
  const filteredUrls = myShortenUrls.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.shortUrl.toLowerCase().includes(query) ||
      (link.originalUrl && link.originalUrl.toLowerCase().includes(query))
    );
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);
  const paginatedUrls = filteredUrls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (shortUrl) => {
    const fullUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(shortUrl);
    toast.success("Short URL copied!");
    setTimeout(() => setCopiedSlug(""), 2000);
  };

  const handleDelete = async () => {
    if (!deleteModalSlug) return;
    const loadingToast = toast.loading("Deleting link...");
    try {
      await api.delete(`/api/urls/${encodeURIComponent(deleteModalSlug)}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Link deleted successfully", { id: loadingToast });
      setDeleteModalSlug("");
      refetch();
    } catch (err) {
      toast.error("Failed to delete link", { id: loadingToast });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Track link performance and manage aliases
          </p>
        </div>
        <Link
          to="/dashboard/create"
          className="btn-primary px-5 py-2.5 gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Link
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Links", value: totalLinks },
          { label: "Total Clicks", value: totalClicks },
          { label: "This Month", value: linksThisMonth },
          { label: "Avg Clicks / Link", value: avgClicks },
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-3xl font-semibold text-text-primary leading-none mt-1">
              {isLoading ? "..." : stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Table section */}
      <div className="flex flex-col gap-5">
        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="input pl-10"
          />
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-text-muted text-sm">Loading your links...</div>
        ) : filteredUrls.length === 0 ? (
          <div className="card p-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              No links found
            </h3>
            <p className="text-sm text-text-muted max-w-xs">
              {searchQuery ? "No links match your search." : "Create your first short link to get started."}
            </p>
            {!searchQuery && (
              <Link to="/dashboard/create" className="btn-primary mt-2 gap-2">
                <Plus className="w-4 h-4" />
                Create First Link
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Table */}
            <div className="overflow-x-auto w-full card p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3.5 text-xs font-medium tracking-wider text-text-muted uppercase">
                      Original URL
                    </th>
                    <th className="px-5 py-3.5 text-xs font-medium tracking-wider text-text-muted uppercase">
                      Short Link
                    </th>
                    <th className="px-5 py-3.5 text-xs font-medium tracking-wider text-text-muted uppercase text-center">
                      Clicks
                    </th>
                    <th className="px-5 py-3.5 text-xs font-medium tracking-wider text-text-muted uppercase">
                      Created
                    </th>
                    <th className="px-5 py-3.5 text-xs font-medium tracking-wider text-text-muted uppercase text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUrls.map((link) => {
                    const formattedDate = new Date(link.createdDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const shortUrlDisplay = `${import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "")}/s/${link.shortUrl}`;

                    return (
                      <tr
                        key={link.id}
                        className="border-b border-border last:border-b-0 hover:bg-bg-elevated/50 transition-colors duration-normal"
                      >
                        <td className="px-5 py-4 pr-4 max-w-[240px] truncate text-sm text-text-primary">
                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {link.originalUrl}
                          </a>
                        </td>
                        <td className="px-5 py-4 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-primary">
                              {shortUrlDisplay}
                            </span>
                            <button
                              onClick={() => handleCopy(link.shortUrl)}
                              className="p-1 text-text-muted hover:text-primary transition-colors duration-normal cursor-pointer"
                              title="Copy URL"
                            >
                              {copiedSlug === link.shortUrl ? (
                                <Check className="w-3.5 h-3.5 text-success" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center font-medium text-sm text-text-primary">
                          {link.clickCount || 0}
                        </td>
                        <td className="px-5 py-4 text-sm text-text-secondary">
                          {formattedDate}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-0.5">
                            <Link
                              to={`/dashboard/analytics/${link.shortUrl}`}
                              className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors duration-normal"
                              title="Analytics"
                            >
                              <BarChart2 className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/dashboard/edit/${link.shortUrl}`}
                              className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors duration-normal"
                              title="Edit Link"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteModalSlug(link.shortUrl)}
                              className="p-2 text-text-muted hover:text-destructive hover:bg-destructive-light rounded-md transition-colors duration-normal cursor-pointer"
                              title="Delete Link"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} –{" "}
                  {Math.min(currentPage * itemsPerPage, filteredUrls.length)} of{" "}
                  {filteredUrls.length} links
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 border border-border rounded-md text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-normal cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-text-primary px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 border border-border rounded-md text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-normal cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModalSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[400px] bg-bg-surface border border-border rounded-2xl p-7 flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Delete this link?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                This will permanently remove the short URL and all its associated click analytics. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalSlug("")}
                className="btn-ghost flex-1 py-2.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger flex-1 py-2.5 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
