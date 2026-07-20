const TermsPage = () => {
  const sections = [
    { title: "1) Acceptance", body: "By accessing or using Snipr, you agree to these Terms. If you do not agree, do not use the site or services." },
    { title: "2) Changes", body: "We may update these Terms from time to time. Updates take effect when posted with a new effective date. Continued use means you accept the updated Terms." },
    { title: "3) Eligibility & accounts", body: "You must be at least 18 years old (or the age of majority where you live) to use the services. You're responsible for maintaining accurate account information and for any activity under your account." },
    { title: "4) Acceptable use", body: "You agree not to use Snipr for unlawful, harmful, abusive, or misleading purposes, including spam, malware, or content that infringes others' rights. We may suspend or terminate access if we reasonably believe you violate these Terms." },
    { title: "5) Subscriptions & billing", body: "Paid plans (if offered) are billed using the payment method you provide. Trials or promotional periods may automatically renew unless you cancel. You can cancel at any time." },
    { title: "6) Content & intellectual property", body: "Snipr and its branding, software, and site content are protected by intellectual property laws. You may use the service for your personal or business needs as intended, but you may not copy, resell, or exploit the service without permission." },
    { title: "7) Third‑party links", body: "Snipr may include links to third‑party sites. We don't control those sites and aren't responsible for their content or practices." },
    { title: "8) Disclaimers & limitation of liability", body: 'The service is provided "as is" and "as available" without warranties of any kind. To the maximum extent allowed by law, Snipr is not liable for indirect, incidental, special, consequential, or punitive damages.' },
    { title: "9) Termination", body: "You may stop using Snipr at any time. We may suspend or terminate access if we believe you violate these Terms. Certain sections survive termination." },
    { title: "10) Privacy", body: "Your use of Snipr is also governed by our Privacy Policy." },
    { title: "11) Disputes", body: "If you have a dispute, please contact us first to try to resolve it informally. If we can't resolve it, disputes may be handled through arbitration or a court process." },
    { title: "12) Contact", body: "Questions about these Terms? Contact us via the email listed in the footer." },
  ];

  return (
    <div className="bg-bg-base pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm font-medium text-text-muted">
          Effective May 3, 2026
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-text-primary">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
