import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import {
  useFetchAnalyticsOverview,
  useFetchAnalyticsBreakdown,
  useFetchMyShortUrls
} from "../../hooks/useQuery";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Calendar, MousePointerClick, RefreshCw, Lock, Copy } from "lucide-react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const fmt = (d) => d.format("YYYY-MM-DD");

const AnalyticsPage = () => {
  const { id } = useParams();
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [rangePreset, setRangePreset] = useState("30d");

  const { startDate, endDate } = useMemo(() => {
    const end = dayjs();
    if (rangePreset === "7d") return { startDate: fmt(end.subtract(6, "day")), endDate: fmt(end) };
    if (rangePreset === "90d") return { startDate: fmt(end.subtract(89, "day")), endDate: fmt(end) };
    return { startDate: fmt(end.subtract(29, "day")), endDate: fmt(end) };
  }, [rangePreset]);

  const { data: myShortenUrls = [], isLoading: listLoading } = useFetchMyShortUrls(token, () => {
    navigate("/error");
  });

  const activeLink = useMemo(() => {
    return myShortenUrls.find((l) => l.shortUrl === id) || null;
  }, [myShortenUrls, id]);

  const { data: analyticsData, isLoading: analyticsLoading } = useFetchAnalyticsOverview(
    token, startDate, endDate, () => {}
  );

  const chartData = useMemo(() => {
    if (!analyticsData?.graphData) return [];
    return analyticsData.graphData;
  }, [analyticsData]);

  const {
    data: breakdown,
    isError: breakdownErrored,
    error: breakdownError,
  } = useFetchAnalyticsBreakdown(token, startDate, endDate, () => {});

  const isProLocked = breakdownErrored && breakdownError?.response?.status === 403;

  const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];

  const devicePieData = useMemo(() => {
    if (isProLocked || !breakdown?.devices || breakdown.devices.length === 0) {
      return [
        { name: "Mobile", value: 65 },
        { name: "Desktop", value: 30 },
        { name: "Tablet", value: 5 },
      ];
    }
    return breakdown.devices.map((d) => ({
      name: d.key.charAt(0).toUpperCase() + d.key.slice(1),
      value: d.clicks,
    }));
  }, [breakdown, isProLocked]);

  const totalBreakdownClicks = useMemo(() => {
    return devicePieData.reduce((sum, item) => sum + item.value, 0);
  }, [devicePieData]);

  const originalUrl = activeLink?.originalUrl || "https://your-destination-url.com";
  const shortUrlDisplay = `${import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "")}/s/${id}`;

  if (listLoading) {
    return <div className="text-center py-20 text-text-muted text-sm">Loading analytics...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-text-muted flex items-center gap-1.5 font-medium">
          <Link to="/dashboard" className="hover:text-text-primary transition-colors duration-normal">
            Dashboard
          </Link>
          <span>/</span>
          <span>Analytics</span>
          <span>/</span>
          <span className="text-primary font-mono">{id}</span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
            Analytics for <span className="font-mono text-primary">{id}</span>
          </h2>
          <p className="text-sm text-text-secondary truncate max-w-xl mt-1">
            {originalUrl}
          </p>
        </div>
      </div>

      {/* Date Preset Filter */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        {[
          { id: "7d", label: "7 Days" },
          { id: "30d", label: "30 Days" },
          { id: "90d", label: "90 Days" },
        ].map((preset) => (
          <button
            key={preset.id}
            onClick={() => setRangePreset(preset.id)}
            className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors duration-normal cursor-pointer ${
              rangePreset === preset.id
                ? "bg-primary-light text-primary border border-primary/20"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Clicks", value: activeLink?.clickCount || 0 },
          { label: "Unique Visitors", value: activeLink ? Math.ceil(activeLink.clickCount * 0.82) : 0 },
          { label: "Created On", value: activeLink ? dayjs(activeLink.createdDate).format("MMM D, YYYY") : "—" },
          { label: "Redirect Uptime", value: "99.9%" },
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex flex-col gap-1">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-2xl font-semibold text-text-primary leading-none mt-1">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Click Timeline */}
      <div className="card p-6 md:p-8 flex flex-col gap-5">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            Clicks over time
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {startDate} — {endDate}
          </p>
        </div>

        <div className="h-[320px] w-full">
          {analyticsLoading ? (
            <div className="h-full flex items-center justify-center text-text-muted text-sm">
              Loading chart...
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-text-muted text-sm">
              No clicks recorded in this range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: -10, right: 10, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis
                  dataKey="clickDate"
                  tickFormatter={(tick) => dayjs(tick).format("MMM D")}
                  stroke="var(--text-muted)"
                  fontSize={11}
                  fontFamily="Inter"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  fontFamily="Inter"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-lg)",
                    fontFamily: "Inter",
                    fontSize: "13px",
                    color: "var(--text-primary)",
                  }}
                  labelFormatter={(label) => dayjs(label).format("MMMM D, YYYY")}
                  formatter={(value) => [`${value} Clicks`, "Clicks"]}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Device Breakdown + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-6 md:p-8 flex flex-col gap-5 relative">
          {isProLocked && (
            <div className="absolute inset-0 bg-bg-base/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center rounded-xl">
              <Lock className="w-7 h-7 text-primary mb-3" />
              <h4 className="text-base font-semibold text-text-primary mb-1">
                Advanced breakdown locked
              </h4>
              <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-4">
                Upgrade to access device-specific click metrics.
              </p>
              <button
                onClick={() => toast.success("Subscribing to Pro...")}
                className="btn-primary py-2 px-5 text-sm cursor-pointer"
              >
                Upgrade Plan
              </button>
            </div>
          )}

          <div>
            <h3 className="text-base font-semibold text-text-primary">
              Device breakdown
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Visitor device type distribution
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            <div className="w-40 h-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devicePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {devicePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 w-full space-y-3">
              {devicePieData.map((item, index) => {
                const percentage = totalBreakdownClicks > 0
                  ? ((item.value / totalBreakdownClicks) * 100).toFixed(0) : 0;
                return (
                  <div key={item.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-text-primary">{item.name}</span>
                      <span className="text-text-muted font-mono">{percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-bg-inset rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-slow"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Target Settings */}
        <div className="card p-6 md:p-8 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-text-primary">
              Target settings
            </h3>
            <div className="flex flex-col gap-1 bg-bg-elevated rounded-lg p-4">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Destination URL
              </span>
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary break-all font-mono hover:underline mt-1"
              >
                {originalUrl}
              </a>
            </div>
            <div className="flex flex-col gap-1 bg-bg-elevated rounded-lg p-4">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Short URL
              </span>
              <a
                href={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-primary break-all font-mono hover:underline mt-1"
              >
                {shortUrlDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${id}`);
                toast.success("Short URL copied!");
              }}
              className="btn-primary flex-1 py-2.5 text-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <Link
              to={`/dashboard/edit/${id}`}
              className="btn-ghost flex-1 py-2.5 text-center"
            >
              Edit Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
