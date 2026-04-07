const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brendan Ciccone",
  url: "https://brendanciccone.com",
  jobTitle: "Staff Product Designer",
  description:
    "0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and fintech.",
  sameAs: [
    "https://www.linkedin.com/in/brendanciccone/",
    "https://github.com/brendanciccone",
  ],
  knowsAbout: [
    "Product Design",
    "UX Design",
    "Cybersecurity",
    "Healthcare Technology",
    "B2B SaaS",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Brendan Ciccone",
  url: "https://brendanciccone.com",
  description:
    "Portfolio of Brendan Ciccone, a 0 → 1 Staff Product Designer with 8 years of experience shipping B2B products across healthcare, cybersecurity, and fintech.",
  publisher: {
    "@type": "Person",
    name: "Brendan Ciccone",
    url: "https://brendanciccone.com",
  },
}

const JsonLd = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  </>
)

export default JsonLd
