const PrivacyPage = () => {
  const sections = [
    {
      title: "Information we collect",
      body: (
        <>
          <p>We collect the minimum information needed to operate Snipr:</p>
          <ul className="list-disc space-y-2 pl-5 mt-2">
            <li><span className="font-medium text-text-primary">Account data</span>: username and email (if you create an account).</li>
            <li><span className="font-medium text-text-primary">Link data</span>: the original URL you submit and the short link we generate.</li>
            <li><span className="font-medium text-text-primary">Usage/analytics</span>: clicks, timestamps, and basic device/browser info used to measure performance and prevent abuse.</li>
            <li><span className="font-medium text-text-primary">Cookies</span>: small files used for session, preferences (like theme), and service protection.</li>
          </ul>
        </>
      ),
    },
    {
      title: "What we don't collect",
      body: "We do not intentionally collect sensitive personal data (e.g., government IDs, health data). If payments are offered, payment details are handled by a payment provider — we don't store full card data on our servers.",
    },
    {
      title: "How we use information",
      body: "We use information to provide the service, generate analytics, communicate with you (support and service updates), and detect/prevent fraud and abuse.",
    },
    {
      title: "Sharing & disclosures",
      body: "We do not sell your personal information. We may share data with service providers who help us run Snipr (hosting, analytics, email) under confidentiality obligations. We may also disclose information if required by law or to protect our rights and users.",
    },
    {
      title: "Retention",
      body: "We keep personal data only as long as needed to provide the service, comply with legal obligations, and resolve disputes.",
    },
    {
      title: "Your choices & rights",
      body: "Depending on where you live, you may request access, correction, or deletion of your data, or object to certain processing. Contact us to make a request.",
    },
    {
      title: "Security",
      body: "We use reasonable technical and organizational measures to protect your data, but no system is 100% secure. If you believe your account is compromised, contact us.",
    },
    {
      title: "Not directed to children",
      body: "Snipr is not intended for people under 18, and we do not knowingly collect personal data from minors.",
    },
    {
      title: "Changes to this policy",
      body: "We may update this policy from time to time. When we do, we'll update the effective date above.",
    },
  ];

  return (
    <div className="bg-bg-base pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm font-medium text-text-muted">
          Effective May 3, 2026
        </p>
        <p className="mt-6 text-sm leading-relaxed text-text-secondary">
          This Privacy Policy explains how Snipr ("we", "us", "our") collects, uses, shares,
          and protects information when you use our URL shortening and analytics service.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-text-primary">
                {section.title}
              </h2>
              {typeof section.body === "string" ? (
                <p className="text-sm leading-relaxed text-text-secondary">{section.body}</p>
              ) : (
                <div className="text-sm leading-relaxed text-text-secondary">{section.body}</div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
