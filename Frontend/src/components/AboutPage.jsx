import { BarChart3, Link2, Share2, SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

const blockConfig = [
  { key: "simple", Icon: Link2 },
  { key: "analytics", Icon: BarChart3 },
  { key: "edit", Icon: SquarePen },
  { key: "share", Icon: Share2 },
];

const AboutPage = () => {
  const { t } = useTranslation();

  const blocks = blockConfig.map((b) => ({
    ...b,
    title: t(`about.blocks.${b.key}.title`),
    body: t(`about.blocks.${b.key}.body`),
  }));

  return (
    <div className="bg-bg-base pt-24 pb-16">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
            {t("about.heroAbout")}{" "}
            <span className="text-primary">Snipr</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
            {t("about.heroSubtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {blocks.map(({ Icon, title, body, key: blockKey }) => (
            <div
              key={blockKey}
              className="card flex gap-5 p-6"
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-primary-light">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.85} aria-hidden />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-text-primary">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
