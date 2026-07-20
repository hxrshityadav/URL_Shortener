import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
    }
  }, [url]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg-base px-6 text-center">
      <Loader2
        className="w-7 h-7 animate-spin text-primary"
        aria-hidden
      />
      <p className="text-sm font-medium text-text-primary">{t("redirectPage.title")}</p>
      <p className="max-w-xs text-xs text-text-muted">{t("redirectPage.hint")}</p>
    </div>
  );
};

export default ShortenUrlPage;
