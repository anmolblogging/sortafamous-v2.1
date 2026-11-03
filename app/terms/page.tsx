import type { Metadata } from "next";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ogDefaults } from "@/lib/site";
import { LegalPage, LegalLink, type LegalSection } from "@/components/LegalPage";
import { LEGAL_ADDRESS, LEGAL_EMAIL, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your access to and use of the Sorta Famous website, including content, intellectual property, disclaimers and liability.",
  keywords: ["Sorta Famous terms of use", "terms of use"],
  alternates: { canonical: "/terms" },
  openGraph: { ...ogDefaults, url: "/terms", title: "Terms of Use · Sorta Famous" },
};

const privacy = (label = "Privacy Policy") => <LegalLink href="/privacy-policy">{label}</LegalLink>;

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        content: (
          <>
            These Terms of Use (“Terms”) govern your access to and use of the website{" "}
            <LegalLink href="https://sortafamous.in/">https://sortafamous.in/</LegalLink> (“Website”) operated by
            Sorta Famous (“Sorta Famous”, “Firm”, “we”, “us” or “our”).
          </>
        ),
      },
      {
        type: "p",
        content: (
          <>
            By accessing, browsing or using the Website, you acknowledge that you have read, understood and agreed to
            be bound by these Terms, together with our {privacy()} and any other policies or notices made available on
            the Website. If you do not agree with any of these Terms, please discontinue your use of the Website.
          </>
        ),
      },
    ],
  },
  {
    id: "about-the-website",
    title: "About the Website",
    blocks: [
      {
        type: "p",
        content:
          "The Website is owned and operated by Sorta Famous and is intended to provide information about our firm, services, capabilities, campaigns, projects, clients, industry insights and other related information. The Website may contain information relating to our public relations, communications, media, branding, marketing, influencer, digital, events and other services.",
      },
      {
        type: "p",
        content:
          "The information provided on the Website is for general informational and business purposes only and does not constitute a binding offer, proposal, quotation, professional advice or contractual commitment by Sorta Famous. Any engagement for services between Sorta Famous and a client shall be governed by a separate written agreement, statement of work (“SOW”), proposal, purchase order or other mutually agreed contractual document.",
      },
    ],
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    blocks: [
      { type: "p", content: "By accessing or using the Website, you agree:" },
      {
        type: "list",
        items: [
          "To comply with these Terms and all applicable laws and regulations;",
          "Not to use the Website for any unlawful or prohibited purpose;",
          "Not to interfere with the security, functionality or operation of the Website;",
          "Not to infringe the intellectual property or other rights of Sorta Famous or any third party; and",
          "To provide accurate information where you voluntarily submit information through the Website.",
        ],
      },
      {
        type: "p",
        content:
          "If you are accessing or using the Website on behalf of a company, organisation or other legal entity, you represent that you are authorised to do so and that your use of the Website is consistent with these Terms.",
      },
    ],
  },
  {
    id: "website-content",
    title: "Website content",
    blocks: [
      { type: "p", content: "The content available on the Website may include:" },
      {
        type: "list",
        items: [
          "Text and written material;",
          "Photographs and images;",
          "Graphics and illustrations;",
          "Videos and audiovisual material;",
          "Campaign and project information;",
          "Case studies;",
          "Client-related information;",
          "Logos and trademarks;",
          "Articles, insights and other editorial material;",
          "Service descriptions; and",
          "Other information made available by Sorta Famous.",
        ],
      },
      {
        type: "p",
        content:
          "While we endeavour to keep the information on the Website accurate and current, we do not guarantee that all information will always be complete, accurate, current or error-free. Sorta Famous reserves the right to modify, update, remove or add content to the Website at any time without prior notice.",
      },
    ],
  },
  {
    id: "use-of-website",
    title: "Use of Website",
    blocks: [
      {
        type: "p",
        content:
          "You may access and use the Website for lawful purposes and for your personal, informational or legitimate business purposes.",
      },
      { type: "p", content: "You must not:" },
      {
        type: "list",
        items: [
          "Use the Website for any unlawful, fraudulent or unauthorised purpose;",
          "Copy, reproduce, modify, distribute or commercially exploit Website content without our prior written permission;",
          "Attempt to gain unauthorised access to the Website or its underlying systems;",
          "Interfere with or disrupt the operation or security of the Website;",
          "Introduce viruses, malware, malicious code or other harmful material;",
          "Attempt to reverse engineer, decompile or otherwise interfere with any technology or software used to operate the Website;",
          "Scrape, crawl, harvest or systematically extract Website content without our prior written consent;",
          "Use automated systems to access or collect information from the Website in a manner that adversely affects its operation;",
          "Use the Website to infringe the rights of any person or entity; or",
          "Use any content obtained from the Website to misrepresent your association with Sorta Famous.",
        ],
      },
      {
        type: "p",
        content:
          "We reserve the right to restrict or suspend access to the Website where we reasonably believe that these Terms have been violated.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property rights",
    blocks: [
      {
        type: "p",
        content:
          "Unless otherwise expressly stated, all content, materials and intellectual property appearing on the Website, including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Text;",
          "Written content;",
          "Graphics;",
          "Designs;",
          "Photographs;",
          "Videos;",
          "Audio;",
          "Animations;",
          "Layout and visual design;",
          "Logos;",
          "Trademarks;",
          "Service marks;",
          "Trade names;",
          "Campaign concepts and materials;",
          "Case studies;",
          "Website code and software; and",
          "Other materials",
        ],
      },
      {
        type: "p",
        content:
          "are owned by, licensed to, or otherwise lawfully used by Sorta Famous and are protected under applicable intellectual property laws. Nothing contained in these Terms or on the Website shall be construed as granting you any ownership or proprietary rights in such intellectual property. You may view the Website and access its content for personal or legitimate internal business purposes only, subject to these Terms. You must not reproduce, modify, adapt, publish, distribute, transmit, display, sell, license, create derivative works from or otherwise commercially exploit any Website content without our prior written permission.",
      },
    ],
  },
  {
    id: "brand",
    title: "Brand name, logo and intellectual property",
    blocks: [
      {
        type: "p",
        content:
          "The name “Sorta Famous”, together with its logos, visual identity, branding elements, taglines, designs, creative materials and other identifying elements displayed on the Website, are used by and associated with Sorta Famous and/or are owned or lawfully used by Sorta Famous, as applicable. Nothing contained on the Website shall be construed as granting any person or entity any licence, right, title or interest in or to the name “Sorta Famous”, its logos, branding, creative materials or other intellectual property, except where expressly permitted in writing by Sorta Famous.",
      },
      { type: "p", content: "You may not, without our prior written consent:" },
      {
        type: "list",
        items: [
          "Reproduce, copy, modify or adapt the Sorta Famous name, logo or branding;",
          "Use the Sorta Famous name, logo or branding in any website, advertisement, publication, presentation, social media account or other commercial or promotional material;",
          "Represent or imply that you are affiliated with, sponsored by, endorsed by or otherwise associated with Sorta Famous; or",
          "Use any of our branding or creative materials in a manner that may cause confusion regarding the source, sponsorship or affiliation of any product, service or communication.",
        ],
      },
      {
        type: "p",
        content:
          "All original content, designs, photographs, graphics, written material, creative concepts, case studies and other materials made available on the Website are protected by applicable intellectual property laws and are owned by Sorta Famous or used with permission from the respective rights holder. All third-party names, logos, brands and other identifying elements appearing on the Website belong to their respective owners. Their inclusion on the Website does not by itself indicate any ownership, endorsement or affiliation with Sorta Famous.",
      },
    ],
  },
  {
    id: "client-material",
    title: "Client names, logos, case studies and campaign material",
    blocks: [
      {
        type: "p",
        content:
          "The Website may contain references to clients, brands, campaigns, projects, awards, media coverage or other work undertaken by Sorta Famous. Such references may be used for legitimate portfolio, credentials, informational or promotional purposes where Sorta Famous is authorised to do so. All third-party names, trademarks, logos and other intellectual property appearing on the Website remain the property of their respective owners. Nothing on the Website shall be construed as creating an endorsement, sponsorship, partnership or other relationship between Sorta Famous and any third party unless expressly stated. Where any case study or campaign material contains third-party information, the use of such information shall remain subject to applicable rights, permissions and contractual restrictions.",
      },
    ],
  },
  {
    id: "proposals",
    title: "Proposals, pitches and business information",
    blocks: [
      {
        type: "p",
        content:
          "Any information made available through the Website relating to our capabilities, services, campaign ideas, strategies, approaches, case studies or potential solutions is provided for general informational purposes. Submission of an enquiry or request for proposal through the Website does not create a client-agency relationship.",
      },
      {
        type: "p",
        content:
          "Any commercial engagement between Sorta Famous and a prospective or existing client shall be subject to separate written documentation agreed between the relevant parties. Where confidential information is required to be exchanged for a potential engagement, the parties may enter into a separate confidentiality or non-disclosure agreement.",
      },
    ],
  },
  {
    id: "accuracy",
    title: "Accuracy of information and no professional advice",
    blocks: [
      {
        type: "p",
        content: "We make reasonable efforts to ensure that information appearing on the Website is accurate and relevant.",
      },
      { type: "p", content: "However, we do not warrant that:" },
      {
        type: "list",
        items: [
          "The Website will always be accurate, complete or current;",
          "The Website will always be available or uninterrupted;",
          "Any particular result will be achieved through our services;",
          "The Website will be free from errors, bugs or omissions; or",
          "The information available on the Website will be suitable for every particular purpose.",
        ],
      },
      {
        type: "p",
        content:
          "Information available on the Website should not be treated as professional advice. You should obtain appropriate professional advice before relying on information where necessary.",
      },
    ],
  },
  {
    id: "no-guarantee",
    title: "No guarantee of PR, media or campaign results",
    blocks: [
      {
        type: "p",
        content:
          "The Website may contain descriptions of services, campaigns, projects, case studies, media coverage, reach, engagement, audience metrics, outcomes or other examples of work undertaken by Sorta Famous for its clients.",
      },
      {
        type: "p",
        content:
          "Any such information is provided for illustrative and informational purposes only and does not constitute a guarantee, representation or promise that similar or specific results will be achieved for any particular client, campaign or engagement.",
      },
      {
        type: "p",
        content:
          "PR, media, communications, influencer and marketing outcomes may depend on a number of factors beyond our reasonable control, including but not limited to media interest, editorial decisions, platform algorithms, audience behaviour, market conditions, third-party actions, timing, client participation, campaign budgets and the nature of the relevant campaign.",
      },
      { type: "p", content: "Accordingly, Sorta Famous does not guarantee any particular level of:" },
      {
        type: "list",
        items: [
          "Media coverage;",
          "Publication or placement;",
          "Impressions or reach;",
          "Audience engagement;",
          "Website traffic;",
          "Leads or conversions;",
          "Social media performance;",
          "Influencer performance;",
          "Brand awareness;",
          "Sales or revenue;",
          "Return on investment (“ROI”); or",
          "Any other commercial, reputational or communications outcome.",
        ],
      },
      {
        type: "p",
        content:
          "Any targets, estimates, projections, forecasts or anticipated outcomes communicated by Sorta Famous shall be subject to the terms and assumptions expressly agreed with the relevant client and shall not be construed as a guaranteed result unless expressly agreed in writing. Any actual performance or results achieved in a previous campaign do not constitute a representation that the same or similar results will be achieved in any future campaign.",
      },
    ],
  },
  {
    id: "case-studies",
    title: "Case studies, testimonials and performance information",
    blocks: [
      {
        type: "p",
        content:
          "The Website may contain case studies, testimonials, client references, campaign examples, awards, media coverage, performance metrics, quotations, statements and other information relating to Sorta Famous, its clients or its work.",
      },
      { type: "p", content: "Such information is provided for general informational and illustrative purposes only." },
      {
        type: "p",
        content:
          "Past performance, campaign results, client outcomes, testimonials or examples of work should not be interpreted as a representation, warranty or guarantee of future performance or results.",
      },
      {
        type: "p",
        content:
          "The circumstances, objectives, budgets, timelines, media environment, audience, platforms and other factors applicable to each campaign may differ materially. Accordingly, results achieved in one campaign may not be representative of results that may be achieved in another campaign.",
      },
      {
        type: "p",
        content:
          "Where performance figures, statistics, reach, engagement, ROI, media value or other quantitative information are displayed, such information may be based on information provided by clients, third-party platforms, media partners or other external sources, and may be subject to changes, limitations or differences in measurement methodologies.",
      },
      {
        type: "p",
        content:
          "Testimonials and statements attributed to clients, partners or other third parties represent the views of the respective individuals or entities and should not necessarily be construed as representations or guarantees by Sorta Famous.",
      },
      {
        type: "p",
        content:
          "Nothing contained in a case study, testimonial or campaign example shall create or imply a contractual commitment, warranty or guarantee unless expressly incorporated into a written agreement signed by the relevant parties.",
      },
    ],
  },
  {
    id: "ai-disclaimer",
    title: "AI and technology disclaimer",
    blocks: [
      {
        type: "p",
        content:
          "Sorta Famous may use technology tools, software, automation systems, artificial intelligence (“AI”) tools and third-party technology platforms in connection with the development, analysis, management or delivery of certain services.",
      },
      {
        type: "p",
        content:
          "Where applicable, AI or technology-assisted tools may be used for purposes including research, ideation, content development, analysis, media monitoring, data processing, campaign planning, workflow automation or other business purposes.",
      },
      {
        type: "p",
        content:
          "Any output generated or assisted by AI or other automated technology may contain errors, omissions, inaccuracies, biases or information that requires further verification.",
      },
      { type: "p", content: "Accordingly:" },
      {
        type: "list",
        items: [
          "AI-generated or technology-assisted outputs should not be treated as inherently accurate, complete or authoritative;",
          "Such outputs may be subject to human review, modification or validation before being used or communicated;",
          "Sorta Famous does not guarantee that any AI or automated output will be error-free, complete or suitable for a particular purpose;",
          "Users should independently verify material information before relying upon it where accuracy is important; and",
          "The use of AI or technology does not, by itself, create any warranty, representation or guarantee regarding the outcome of any campaign, communication or service.",
        ],
      },
      {
        type: "p",
        content:
          "Where third-party AI or technology providers are used, the processing of information through such providers may also be subject to their respective terms, privacy policies and other applicable conditions.",
      },
      {
        type: "p",
        content:
          "Sorta Famous will seek to use such technologies in accordance with applicable contractual, legal and regulatory requirements.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links and content",
    blocks: [
      {
        type: "p",
        content:
          "The Website may contain links to third-party websites, social media platforms, publications, tools or other resources. Such links are provided for convenience and informational purposes only. Sorta Famous does not control and is not responsible for:",
      },
      {
        type: "list",
        items: [
          "The content of third-party websites;",
          "Their availability;",
          "Their privacy practices;",
          "Their security;",
          "Their terms and conditions; or",
          "Any products or services provided by third parties.",
        ],
      },
      {
        type: "p",
        content:
          "The inclusion of a third-party link does not necessarily constitute an endorsement, recommendation or affiliation with the relevant third party. You access third-party websites at your own risk and should review their applicable terms and privacy policies.",
      },
    ],
  },
  {
    id: "availability",
    title: "Website availability",
    blocks: [
      {
        type: "p",
        content:
          "We endeavour to keep the Website available and functioning properly. However, we do not guarantee that the Website will:",
      },
      {
        type: "list",
        items: [
          "Always be available;",
          "Operate without interruption;",
          "Be free from technical errors;",
          "Be free from viruses or other harmful components; or",
          "Be compatible with every device or browser.",
        ],
      },
      {
        type: "p",
        content:
          "The Website may be temporarily unavailable due to maintenance, upgrades, technical issues, cybersecurity incidents, service-provider failures or circumstances beyond our reasonable control. We shall not be responsible for any loss arising solely from temporary unavailability of the Website, to the extent permitted by applicable law.",
      },
    ],
  },
  {
    id: "user-submissions",
    title: "User submissions and enquiries",
    blocks: [
      {
        type: "p",
        content:
          "Where the Website allows you to submit information, enquiries, applications, feedback or other material, you agree that:",
      },
      {
        type: "list",
        items: [
          "The information provided by you is accurate to the best of your knowledge;",
          "You have the necessary rights and authority to provide such information;",
          "Your submission does not violate any applicable law or third-party rights;",
          "Your submission does not contain malicious code or harmful material; and",
          "You will not use the Website submission mechanisms for spam, unsolicited advertising or other unauthorised communications.",
        ],
      },
      {
        type: "p",
        content: (
          <>
            Personal data submitted through the Website will be handled in accordance with our {privacy()}. Nothing in
            this section transfers ownership of your intellectual property to Sorta Famous.
          </>
        ),
      },
    ],
  },
  {
    id: "confidential-information",
    title: "Confidential information",
    blocks: [
      {
        type: "p",
        content:
          "The Website itself is not intended to be a secure mechanism for submitting highly confidential or commercially sensitive information. Unless a separate confidentiality agreement is in place, you should avoid submitting confidential business information, trade secrets, proprietary strategies, unpublished campaign concepts or other sensitive information through publicly accessible forms or communication channels. If confidential information is required for a proposed engagement, Sorta Famous may require the parties to enter into an appropriate confidentiality or non-disclosure agreement.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "p",
        content: (
          <>
            Your use of the Website is also subject to our {privacy()}, which explains how we collect, use, process,
            store and protect personal data. Our Privacy Policy forms an integral part of these Terms. By using the
            Website, you acknowledge that you have reviewed the Privacy Policy and understand the manner in which your
            personal data may be processed as described therein.
          </>
        ),
      },
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    blocks: [
      {
        type: "p",
        content:
          "To the maximum extent permitted by applicable law, the Website and its content are provided on an “as is” and “as available” basis.",
      },
      { type: "p", content: "Sorta Famous makes no warranties or representations, express or implied, regarding:" },
      {
        type: "list",
        items: [
          "The accuracy, completeness or reliability of Website content;",
          "The availability or uninterrupted operation of the Website;",
          "The suitability of Website content for a particular purpose;",
          "The absence of errors or omissions;",
          "The absence of viruses or other harmful components; or",
          "The results that may be obtained from relying on Website content.",
        ],
      },
      { type: "p", content: "We do not guarantee that use of the Website will meet your particular requirements." },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    blocks: [
      {
        type: "p",
        content:
          "To the maximum extent permitted by applicable law, Sorta Famous and its partners, officers, employees, representatives and service providers shall not be liable for any indirect, incidental, consequential, special or punitive loss or damage arising from or relating to:",
      },
      {
        type: "list",
        items: [
          "Your access to or use of the Website;",
          "Your inability to access or use the Website;",
          "Reliance on information contained on the Website;",
          "Any interruption, suspension or termination of Website availability;",
          "Any errors, omissions or inaccuracies in Website content;",
          "Any third-party website or service accessed through a link on the Website; or",
          "Any unauthorised access to or use of the Website or its systems.",
        ],
      },
      {
        type: "p",
        content:
          "Nothing in these Terms shall exclude or limit liability to the extent such exclusion or limitation is prohibited under applicable law.",
      },
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    blocks: [
      {
        type: "p",
        content:
          "You agree to indemnify, defend and hold harmless Sorta Famous, its partners, officers, employees, representatives, affiliates and service providers from and against claims, losses, liabilities, damages, costs and expenses, including reasonable legal expenses, arising out of or relating to:",
      },
      {
        type: "list",
        items: [
          "Your breach of these Terms;",
          "Your misuse of the Website;",
          "Your violation of applicable law;",
          "Your infringement of any third-party intellectual property, privacy or other rights; or",
          "Any information or material submitted by you through the Website that gives rise to a claim against Sorta Famous.",
        ],
      },
    ],
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    blocks: [
      {
        type: "p",
        content:
          "We reserve the right to suspend, restrict or terminate your access to the Website, with or without notice, where we reasonably believe that:",
      },
      {
        type: "list",
        items: [
          "You have breached these Terms;",
          "Your use of the Website may cause harm to Sorta Famous or any third party;",
          "Your use of the Website violates applicable law; or",
          "Such action is necessary for security, maintenance or operational reasons.",
        ],
      },
      {
        type: "p",
        content: "Termination or suspension of access will not affect any rights or obligations that accrued prior to such termination.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to the Website",
    blocks: [
      {
        type: "p",
        content:
          "We reserve the right to modify, suspend, discontinue or remove any part of the Website, including any content, functionality, service or feature, at any time. We may also update these Terms from time to time to reflect changes in our business, Website functionality or applicable legal requirements. The updated Terms will be published on the Website with a revised “Last updated” date. Your continued use of the Website after the updated Terms are published will constitute your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    blocks: [
      {
        type: "p",
        content:
          "These Terms shall be governed by and construed in accordance with the laws of India. Subject to applicable law, any dispute arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra, India.",
      },
    ],
  },
  {
    id: "severability",
    title: "Severability",
    blocks: [
      {
        type: "p",
        content:
          "If any provision of these Terms is determined to be invalid, unlawful or unenforceable by a competent authority, such provision shall be modified or severed to the extent necessary, without affecting the validity and enforceability of the remaining provisions. The remaining provisions shall continue to remain in full force and effect.",
      },
    ],
  },
  {
    id: "no-waiver",
    title: "No waiver",
    blocks: [
      {
        type: "p",
        content:
          "Any failure or delay by Sorta Famous in exercising any right or remedy under these Terms shall not constitute a waiver of that right or remedy. Any waiver shall be effective only if made expressly and in writing.",
      },
    ],
  },
  {
    id: "assignment",
    title: "Assignment",
    blocks: [
      {
        type: "p",
        content:
          "You may not assign, transfer or otherwise dispose of your rights or obligations under these Terms without our prior written consent. Sorta Famous may assign or transfer its rights and obligations under these Terms in connection with a merger, restructuring, acquisition, sale of business or other corporate transaction, subject to applicable law.",
      },
    ],
  },
  {
    id: "entire-agreement",
    title: "Entire agreement",
    blocks: [
      {
        type: "p",
        content: (
          <>
            These Terms, together with the {privacy()} and any other legal notices or policies expressly incorporated
            into these Terms, constitute the entire agreement between you and Sorta Famous concerning your use of the
            Website. These Terms supersede any prior understandings or communications relating specifically to your use
            of the Website. Any separate agreement entered into between Sorta Famous and a client, employee, vendor,
            partner or other counterparty shall govern the relevant relationship to the extent of any conflict with
            these Website Terms.
          </>
        ),
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
          "If you have any questions, concerns or comments regarding these Terms or the Website, you may contact us at:",
      },
      {
        type: "contact",
        rows: [
          { label: "Company", value: "Sorta Famous" },
          { label: "Email", value: <LegalLink href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</LegalLink> },
          { label: "Registered office", value: LEGAL_ADDRESS },
        ],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/terms", name: "Terms of Use", description: String(metadata.description), crumbs: [{ name: "Terms of Use", path: "/terms" }] })} />
    <LegalPage
      eyebrow="Terms of Use"
      title="The fine print,"
      italic="in plain sight"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="The terms that govern your access to and use of the Sorta Famous website. Please read them carefully."
      sections={sections}
    />
    </>
  );
}
