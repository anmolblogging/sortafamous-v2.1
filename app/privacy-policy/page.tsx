import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { LegalPage, LegalLink, type LegalSection } from "@/components/LegalPage";
import { GRIEVANCE_OFFICER, LEGAL_ADDRESS, LEGAL_EMAIL, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sorta Famous collects, uses, stores, discloses and protects personal data when you use our website or interact with us.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { ...ogDefaults, url: "/privacy-policy", title: "Privacy Policy · Sorta Famous" },
};

const mail = <LegalLink href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</LegalLink>;

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        content:
          "Sorta Famous (“Sorta Famous”, “Firm”, “we”, “us” or “our”) respects your privacy and is committed to protecting your personal data.",
      },
      {
        type: "p",
        content: (
          <>
            This Privacy Policy (“Policy”) explains how we collect, use, process, store, disclose and protect
            personal data when you access or use our website{" "}
            <LegalLink href="https://sortafamous.in/">https://sortafamous.in/</LegalLink> (“Website”), communicate
            with us, submit an enquiry, apply for an opportunity, or otherwise interact with us. For the purposes of
            this Policy, “you” or “your” means any individual who accesses or interacts with the Website or provides
            personal data to us.
          </>
        ),
      },
      {
        type: "p",
        content:
          "By accessing or using the Website or voluntarily providing your personal data to us, you acknowledge that you have read and understood this Policy. Where consent is required under applicable law, we will obtain such consent before processing your personal data. If you do not agree with this Policy, please refrain from using the Website or providing your personal data to us.",
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    blocks: [
      { type: "p", content: "Depending on how you interact with us, we may collect the following categories of personal data:" },
      {
        type: "sub",
        title: "A. Information you provide directly",
        blocks: [
          { type: "p", content: "This may include:" },
          {
            type: "list",
            items: [
              "Name;",
              "Email address;",
              "Mobile/telephone number;",
              "Company or organisation name;",
              "Designation or professional information;",
              "Information relating to your business or communication requirements;",
              "Information submitted through enquiry, contact or other forms on the Website;",
              "Information provided while communicating with us through email, telephone or other channels;",
              "Information provided as part of job applications or professional opportunities; and",
              "Any other information that you voluntarily provide to us.",
            ],
          },
        ],
      },
      {
        type: "sub",
        title: "B. Information collected automatically",
        blocks: [
          {
            type: "p",
            content:
              "When you visit or use our Website, we may automatically collect certain technical and usage information such as:",
          },
          {
            type: "list",
            items: [
              "IP address;",
              "Browser type and version;",
              "Device type and operating system;",
              "Date and time of access;",
              "Pages visited and time spent on the Website;",
              "Referring and exit pages;",
              "Website interaction and clickstream information; and",
              "Other aggregated or technical information relating to your use of the Website.",
            ],
          },
          { type: "p", content: "This information may be collected through cookies or similar technologies." },
        ],
      },
      {
        type: "sub",
        title: "C. Information relating to third parties",
        blocks: [
          {
            type: "p",
            content:
              "If you provide us with personal data relating to another individual, you represent that you have the authority or necessary permission to provide such information to us and permit us to process it in accordance with this Policy and applicable law. We do not intentionally collect sensitive personal data through the Website unless such collection is necessary, lawful and permitted under applicable law.",
          },
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your personal data",
    blocks: [
      { type: "p", content: "We may process your personal data for the following purposes:" },
      {
        type: "list",
        items: [
          "To respond to enquiries, requests and communications;",
          "To understand your requirements and discuss potential business engagements;",
          "To provide our PR, communications, media, branding, marketing or related services;",
          "To process applications for employment, internships or professional opportunities;",
          "To send business, service or marketing communications, where permitted by applicable law;",
          "To improve, maintain and operate our Website;",
          "To understand Website usage, trends and user preferences;",
          "To conduct internal analysis, research and reporting;",
          "To prevent, detect and investigate fraud, misuse or unlawful activity;",
          "To protect our rights, property, systems and business interests;",
          "To comply with applicable legal, regulatory or governmental requirements;",
          "To establish, exercise or defend legal claims; and",
          "For any other purpose disclosed to you at the time of collection or otherwise permitted under applicable law.",
        ],
      },
      {
        type: "p",
        content:
          "We will ensure that personal data is processed only for lawful and relevant purposes and in accordance with applicable data protection laws.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    blocks: [
      {
        type: "p",
        content:
          "We may use cookies or similar technologies to improve the functionality and performance of the Website and understand how visitors interact with it. Cookies may be used for purposes including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Website functionality;",
          "Security;",
          "Analytics and website traffic measurement;",
          "Understanding user preferences;",
          "Improving Website performance; and",
          "Measuring the effectiveness of communications or marketing activities.",
        ],
      },
      {
        type: "p",
        content:
          "Third-party analytics or technology providers may also place cookies or similar technologies on the Website. You may control or disable cookies through the settings in your browser. However, disabling certain cookies may affect the functionality or availability of some features of the Website. Where required by applicable law, we will obtain the necessary consent before placing or using non-essential cookies or similar technologies.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing communications",
    blocks: [
      {
        type: "p",
        content:
          "Where permitted under applicable law and, where required, based on your consent, we may use your contact information to communicate with you about:",
      },
      {
        type: "list",
        items: [
          "Our services;",
          "Company updates;",
          "Events and initiatives;",
          "Industry or agency-related updates;",
          "Business opportunities; and",
          "Other marketing or promotional communications.",
        ],
      },
      {
        type: "p",
        content:
          "You may opt out of receiving marketing communications from us at any time by following the unsubscribe instructions contained in the communication or by contacting us using the details provided below.",
      },
      {
        type: "p",
        content:
          "Please note that even if you opt out of marketing communications, we may continue to send you essential communications relating to an existing business relationship, enquiry, transaction or other interaction with us.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Sharing and disclosure of personal data",
    blocks: [
      { type: "note", content: "We do not sell or commercially trade your personal data." },
      {
        type: "p",
        content:
          "We may, however, share personal data where reasonably necessary for the purposes described in this Policy, including but not limited to with:",
      },
      {
        type: "sub",
        title: "A. Service providers",
        blocks: [
          { type: "p", content: "Third-party service providers who assist us with services such as:" },
          {
            type: "list",
            items: [
              "Website hosting and maintenance;",
              "IT and technology services;",
              "Analytics;",
              "Cloud storage;",
              "Communication services;",
              "Recruitment or applicant management;",
              "Marketing and campaign management; and",
              "Other services required for our business operations.",
            ],
          },
          {
            type: "p",
            content:
              "Such service providers may process personal data on our behalf and will be expected to process such information in accordance with applicable contractual and legal requirements.",
          },
        ],
      },
      {
        type: "sub",
        title: "B. Clients, partners and business associates",
        blocks: [
          {
            type: "p",
            content:
              "Where necessary for providing our services, we may share relevant personal data with our clients, media partners, creators, influencers, production partners, event partners, vendors and other business associates. We will seek to limit such sharing to information reasonably necessary for the relevant business or service purpose.",
          },
        ],
      },
      {
        type: "sub",
        title: "C. Group companies and affiliates",
        blocks: [
          {
            type: "p",
            content:
              "Where applicable, personal data may be shared with our group companies, affiliates or related entities for legitimate business and operational purposes.",
          },
        ],
      },
      {
        type: "sub",
        title: "D. Legal and regulatory authorities",
        blocks: [
          {
            type: "p",
            content:
              "We may disclose personal data where required by law, regulation, court order, governmental direction or other valid legal process, or where such disclosure is reasonably necessary to protect our legal rights or prevent fraud, unlawful activity or misuse.",
          },
        ],
      },
      {
        type: "sub",
        title: "E. Business transfer",
        blocks: [
          {
            type: "p",
            content:
              "If Sorta Famous is involved in a merger, acquisition, restructuring, sale of assets or similar business transaction, personal data may be transferred as part of such transaction, subject to applicable law and appropriate safeguards.",
          },
        ],
      },
    ],
  },
  {
    id: "third-party-websites",
    title: "Third-party websites",
    blocks: [
      {
        type: "p",
        content:
          "The Website may contain links to third-party websites, social media platforms, applications or services. These third parties operate independently and have their own privacy policies and terms. This Policy does not apply to the personal data practices of such third parties. We are not responsible for the privacy practices, security or content of third-party websites or services. We encourage you to review the applicable privacy policies before providing personal data to any third party.",
      },
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    blocks: [
      {
        type: "p",
        content:
          "We retain personal data only for as long as reasonably necessary to fulfil the purposes for which it was collected, including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Providing or facilitating our services;",
          "Responding to enquiries;",
          "Maintaining business and professional records;",
          "Complying with legal, regulatory and contractual obligations;",
          "Resolving disputes;",
          "Establishing or defending legal claims;",
          "Preventing fraud and misuse; and",
          "Maintaining necessary business and financial records.",
        ],
      },
      {
        type: "p",
        content:
          "The period for which personal data is retained may vary depending on the nature of the information and the purpose for which it was collected. Where personal data is no longer required, we will take reasonable steps to securely delete, erase or anonymise it, subject to applicable legal, regulatory, contractual and legitimate business requirements.",
      },
    ],
  },
  {
    id: "security",
    title: "Data security",
    blocks: [
      {
        type: "p",
        content:
          "We take reasonable technical and organisational measures to protect personal data against unauthorised access, use, alteration, disclosure, loss or destruction. Depending on the nature of the information and the risks involved, these measures may include appropriate access controls, organisational safeguards, secure systems and other reasonable security practices.",
      },
      {
        type: "p",
        content:
          "However, no method of transmission or storage over the internet can be guaranteed to be completely secure. While we take reasonable measures to protect personal data, we cannot guarantee absolute security of information transmitted to or through the Website.",
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    blocks: [
      {
        type: "p",
        content:
          "Depending on the service providers and technologies used by us, your personal data may be processed or stored in locations outside India. Where personal data is transferred outside India, we will undertake such transfer in accordance with applicable data protection laws and requirements and implement appropriate safeguards where required.",
      },
    ],
  },
  {
    id: "childrens-data",
    title: "Children’s data",
    blocks: [
      {
        type: "p",
        content:
          "The Website and our services are not intended to knowingly collect personal data from children below the age of 18 years. We do not knowingly solicit personal data from children through the Website. If you believe that personal data relating to a child has been provided to us without the necessary authority or consent, please contact us using the details provided below. Upon receiving a valid request, we will take reasonable steps to review and, where appropriate, delete such information, subject to applicable law.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        type: "p",
        content:
          "Subject to applicable law, you may have rights in relation to your personal data, including the right to:",
      },
      {
        type: "list",
        items: [
          "Request information about the personal data processed by us;",
          "Request correction or updating of inaccurate or incomplete personal data;",
          "Request erasure of personal data where permitted under applicable law;",
          "Withdraw consent where processing is based on consent;",
          "Raise a grievance regarding the processing of your personal data; and",
          "Nominate another individual to exercise applicable rights on your behalf, where permitted under applicable law.",
        ],
      },
      {
        type: "p",
        content: (
          <>
            To exercise any applicable rights, you may contact us using the details provided in the{" "}
            <LegalLink href="#grievance-redressal">Grievance redressal</LegalLink> and{" "}
            <LegalLink href="#contact-us">Contact us</LegalLink> sections below. We may need to verify your
            identity before processing certain requests. Please note that some requests may be subject to applicable
            legal, regulatory, contractual or other lawful restrictions.
          </>
        ),
      },
    ],
  },
  {
    id: "withdrawal-of-consent",
    title: "Withdrawal of consent",
    blocks: [
      {
        type: "p",
        content:
          "Where we process your personal data based on your consent, you may withdraw such consent by contacting us using the details provided below. Withdrawal of consent will not affect the lawfulness of processing carried out before such withdrawal. Further, withdrawal of consent may not affect our ability to retain or process information where such retention or processing is required or permitted under applicable law or is necessary for the establishment, exercise or defence of legal claims.",
      },
    ],
  },
  {
    id: "grievance-redressal",
    title: "Grievance redressal",
    blocks: [
      {
        type: "p",
        content:
          "If you have any questions, concerns, complaints or grievances relating to the collection or processing of your personal data, you may contact our designated grievance contact at the details provided below. We will endeavour to address and resolve grievances within the timelines prescribed under applicable law.",
      },
      {
        type: "contact",
        rows: [
          ...(GRIEVANCE_OFFICER.name ? [{ label: "Name", value: GRIEVANCE_OFFICER.name }] : []),
          ...(GRIEVANCE_OFFICER.designation ? [{ label: "Designation", value: GRIEVANCE_OFFICER.designation }] : []),
          {
            label: "Email",
            value: <LegalLink href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</LegalLink>,
          },
          { label: "Address", value: LEGAL_ADDRESS },
        ],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    blocks: [
      {
        type: "p",
        content:
          "We may update or modify this Privacy Policy from time to time to reflect changes in our business practices, Website functionality, services, technology or applicable legal and regulatory requirements. Any updated version of this Policy will be published on the Website with the revised “Last updated” date. We encourage you to review this Policy periodically to remain informed about how we collect, use and protect your personal data.",
      },
    ],
  },
  {
    id: "contact-us",
    title: "Contact us",
    blocks: [
      {
        type: "p",
        content:
          "If you have any questions regarding this Privacy Policy, our handling of your personal data, or wish to exercise any applicable privacy rights, please contact us at:",
      },
      {
        type: "contact",
        rows: [
          { label: "Company", value: "Sorta Famous" },
          { label: "Email", value: mail },
          { label: "Registered office", value: LEGAL_ADDRESS },
        ],
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your data,"
      italic="handled with care"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="How we collect, use, store and protect personal data when you visit our website, get in touch, or work with us."
      sections={sections}
    />
  );
}
