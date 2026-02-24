export function JsonLd({ siteUrl }: { siteUrl: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Service Path Technologies",
    url: siteUrl,
    description:
      "Empowering businesses with intelligent AI solutions. Custom AI chatbots, automation, and AI development.",
    sameAs: [
      "https://linkedin.com/company/spt-solutions",
      "https://twitter.com/sptsolutions",
      "https://github.com/spt-solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "servicepathtotechnologies@gmail.com",
      telephone: "+91 86391 55832",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
