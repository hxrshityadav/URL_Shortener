import dayjs from "dayjs";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  BarChart3,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  MousePointerClick,
  Trash2,
} from "lucide-react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import { fetchLinkAnalytics } from "../../hooks/useQuery";

const ShortenItem = ({
  originalUrl,
  shortUrl,
  clickCount,
  createdDate,
  onLinkDeleted,
  analyticsRange,
}) => {
  const { t } = useTranslation();
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );

  const fullShort =
    import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`;

  const analyticsHandler = (key) => {
    if (!analyticToggle) {
      setSelectedUrl(key);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const deleteHandler = async () => {
    if (!window.confirm(t("linkCard.deleteConfirm"))) {
      return;
    }
    setDeleteLoading(true);
    try {
      await api.delete(
        `/api/urls/${encodeURIComponent(shortUrl)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      onLinkDeleted?.();
      setAnalyticToggle(false);
      setAnalyticsData([]);
    } catch {
      navigate("/error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchMyShortUrl = useCallback(async () => {
    setLoader(true);
    try {
      const startDate = analyticsRange?.startDate ?? dayjs().subtract(29, "day").format("YYYY-MM-DD");
      const endDate = analyticsRange?.endDate ?? dayjs().format("YYYY-MM-DD");
      const graphData = await fetchLinkAnalytics(token, selectedUrl, startDate, endDate);
      setAnalyticsData(graphData);
      setSelectedUrl("");
    } catch {
      navigate("/error");
    } finally {
      setLoader(false);
    }
  }, [selectedUrl, token, navigate, analyticsRange]);

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl, fetchMyShortUrl]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              to={fullShort}
            >
              <span className="truncate">{subDomain + "/s/" + shortUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
            </Link>
          </div>

          <p className="break-all text-sm text-text-muted">{originalUrl}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <span className="inline-flex items-center gap-1.5 text-success font-medium">
              <MousePointerClick className="w-4 h-4" aria-hidden />
              {t("linkCard.click", { count: clickCount })}
            </span>
            <span className="inline-flex items-center gap-1.5 text-text-secondary">
              <Calendar className="w-4 h-4" aria-hidden />
              {dayjs(createdDate).format("MMM D, YYYY")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={fullShort}
          >
            <button
              type="button"
              className="btn-primary inline-flex gap-1.5 px-4 py-2 text-sm cursor-pointer"
            >
              {isCopied ? (
                <><Check className="w-4 h-4" aria-hidden /> {t("linkCard.copied")}</>
              ) : (
                <><Copy className="w-4 h-4" aria-hidden /> {t("linkCard.copy")}</>
              )}
            </button>
          </CopyToClipboard>

          <button
            type="button"
            onClick={() => analyticsHandler(shortUrl)}
            className="btn-ghost inline-flex gap-1.5 px-4 py-2 text-sm cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden />
            {t("linkCard.analytics")}
          </button>

          <button
            type="button"
            onClick={deleteHandler}
            disabled={deleteLoading}
            className="btn-danger inline-flex gap-1.5 px-4 py-2 text-sm cursor-pointer"
          >
            <Trash2 className="w-4 h-4 shrink-0" aria-hidden />
            {deleteLoading ? t("linkCard.deleting") : t("linkCard.delete")}
          </button>
        </div>
      </div>

      <Fragment>
        <div
          className={`${
            analyticToggle ? "flex" : "hidden"
          } relative min-h-[22rem] flex-col border-t border-border`}
        >
          {loader ? (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3">
              <Hourglass
                visible
                height="48"
                width="48"
                ariaLabel={t("linkCard.loadingAria")}
                colors={["var(--color-primary)", "var(--color-primary-light)"]}
              />
              <p className="text-sm text-text-muted">{t("linkCard.loadingAnalytics")}</p>
            </div>
          ) : (
            <>
              {analyticsData.length === 0 && (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                  <p className="text-base font-semibold text-text-primary">
                    {t("linkCard.emptyTitle")}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-text-muted">
                    {t("linkCard.emptySub")}
                  </p>
                </div>
              )}
              <div className="p-4 sm:p-6">
                <Graph graphData={analyticsData} />
              </div>
            </>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default ShortenItem;
