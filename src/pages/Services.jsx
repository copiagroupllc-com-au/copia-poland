import { Link } from "react-router-dom";
import ServicePreview from "../components/ServicePreview";
import { useLanguage } from "../context/LanguageContext";

const services = [
  {
    id:"investment", previewUrl:"https://midas.app", accent:"#DC2626",
    tag_pl:"Rynki kapitałowe",   tag_en:"Capital Markets",
    title_pl:"Inwestycje",       title_en:"Investment",
    headline_pl:"Strategiczny kapitał dla świata cyfrowego",
    headline_en:"Strategic capital for a digital-first world",
    desc_pl:"Lokujemy kapitał zarówno w tradycyjnych, jak i nowych klasach aktywów — od akcji i obligacji po venture capital, aktywa tokenizowane i protokoły DeFi. Nasza warstwa badań oparta na AI odkrywa możliwości, które sama analiza ludzka by przeoczyła.",
    desc_en:"We deploy capital across both traditional and emerging asset classes — from equity and fixed income to venture, tokenised assets, and DeFi protocols. Our AI-driven research layer surfaces opportunities that human analysis alone would miss.",
    features_pl:["Budowa portfela i zarządzanie ryzykiem","Venture capital i finansowanie startupów","Inwestycje w aktywa tokenizowane","Strategie zysku DeFi","Transgraniczne struktury funduszowe"],
    features_en:["Portfolio construction & risk management","Venture capital & startup funding","Tokenised asset investment","DeFi yield strategies","Cross-border fund structures"],
    clients:[
      { name:"Midas", url:"https://midas.app", desc:"RWA tokenisation platform — $1.7B+ in onchain investment product issuance, packaging institutional strategies like T-bills and private credit into DeFi-composable mTokens." },
      { name:"Arrow Markets", url:"https://www.arrow.markets", desc:"Hybrid DeFi options protocol on Avalanche — enabling users to buy and trade options on BTC, ETH, and AVAX through an AMM-based liquidity structure, without intermediaries." },
    ],
  },
  {
    id:"fintech", previewUrl:"https://stripe.com", accent:"#DC2626",
    tag_pl:"Infrastruktura płatnicza", tag_en:"Payments Infrastructure",
    title_pl:"Fintech i płatności",    title_en:"Fintech & Payments",
    headline_pl:"Szyny klasy Stripe dla ery Web3",
    headline_en:"Stripe-grade rails for the Web3 era",
    desc_pl:"Nasz stos infrastruktury płatniczej umożliwia natychmiastowe, tanie transfery transgraniczne — zarówno fiat, jak i krypto. Nowoczesne API płatnicze mówiące językiem DeFi, wspierające firmy od MŚP po korporacje.",
    desc_en:"Our payment infrastructure stack enables instant, low-cost, cross-border transfers — both fiat and crypto. Modern payment APIs that speak the language of DeFi, supporting businesses from SMEs to enterprise.",
    features_pl:["Bramka płatnicza API-first","Rozliczenia wielowalutowe i krypto","Narzędzia zgodności KYC/AML","Przepływy płatności Merchant i B2B","Wbudowane rozwiązania finansowe"],
    features_en:["API-first payment gateway","Multi-currency & crypto settlement","KYC/AML compliance tools","Merchant & B2B payment flows","Embedded finance solutions"],
    clients:[
      { name:"BVNK", url:"https://www.bvnk.com", desc:"Enterprise stablecoin payments infrastructure processing $30B+ in annualised volume across 130+ countries, with 40+ global licences covering fiat and digital asset operations." },
      { name:"Conduit", url:"https://conduitpay.com", desc:"Global B2B money network built on stablecoins — one API across USD and stablecoins for instant, low-cost cross-border payments via SWIFT, SEPA, and local rails worldwide." },
    ],
  },
  {
    id:"web3", previewUrl:"https://0g.ai", accent:"#DC2626",
    tag_pl:"Blockchain",          tag_en:"Blockchain",
    title_pl:"Web3 i blockchain", title_en:"Web3 & Blockchain",
    headline_pl:"Zdecentralizowana infrastruktura dla realnych zastosowań",
    headline_en:"Decentralised infrastructure for real-world utility",
    desc_pl:"Od architektury smart kontraktów po pełnostosowy rozwój DApp — tworzymy rozwiązania Web3 gotowe do produkcji, efektywne pod względem gazu i projektowane dla masowej adopcji.",
    desc_en:"From smart contract architecture to full-stack DApp development, we build Web3 solutions that are production-ready, gas-efficient, and designed for mainstream adoption.",
    features_pl:["Rozwój i audyt smart kontraktów","Wsparcie ekosystemów EVM i Solana","Infrastruktura mintowania NFT i marketplace","Frameworki zarządzania DAO","Mosty i rozwiązania cross-chain"],
    features_en:["Smart contract development & auditing","EVM & Solana ecosystem support","NFT minting & marketplace infrastructure","DAO governance frameworks","Bridge & cross-chain solutions"],
    clients:[
      { name:"0G (Zero Gravity)", url:"https://0g.ai", desc:"The first decentralised AI Layer 1 — a modular, infinitely scalable chain integrating storage, data availability, and compute to power onchain AI workloads at scale." },
      { name:"XION", url:"https://xion.burnt.com", desc:"Consumer-focused Layer 1 purpose-built for mainstream Web3 adoption — featuring native account abstraction, gasless transactions, and a Web2-grade UX for developers and users." },
    ],
  },
  {
    id:"ai", previewUrl:"https://akash.network", accent:"#DC2626",
    tag_pl:"Sztuczna inteligencja", tag_en:"Artificial Intelligence",
    title_pl:"Rozwiązania AI",      title_en:"AI Solutions",
    headline_pl:"Inteligencja wpleciona w każdy produkt",
    headline_en:"Intelligence woven into every product",
    desc_pl:"Stosujemy uczenie maszynowe i duże modele językowe do prognozowania finansowego, wykrywania oszustw, spersonalizowanych doświadczeń użytkowników i automatyzacji operacyjnej.",
    desc_en:"We apply machine learning and large language models to financial forecasting, fraud detection, personalised user experiences, and operational automation.",
    features_pl:["Predykcyjna analityka rynkowa","Scoring ryzyka i oszustw oparty na AI","Integracje LLM i pipeline'y RAG","Automatyczne monitorowanie zgodności","Chatboty AI i wirtualni asystenci"],
    features_en:["Predictive market analytics","AI-powered fraud & risk scoring","LLM integrations & RAG pipelines","Automated compliance monitoring","AI chatbots & virtual assistants"],
    clients:[
      { name:"Akash Network", url:"https://akash.network", desc:"Decentralised GPU supercloud offering AI inference and compute at up to 85% lower cost than AWS — serving Llama 3, DeepSeek, and other frontier models on permissionless hardware." },
      { name:"Gaia (GaiaNet)", url:"https://www.gaianet.ai", desc:"Decentralised AI infrastructure spanning 700,000+ active nodes, enabling anyone to deploy, scale, and monetise custom AI agents with their own knowledge and expertise onchain." },
    ],
  },
  {
    id:"real-estate", previewUrl:"https://www.blocksquare.io", accent:"#DC2626",
    tag_pl:"Technologie nieruchomości", tag_en:"Property Tech",
    title_pl:"Nieruchomości",           title_en:"Real Estate",
    headline_pl:"Tokenizowane nieruchomości dla inwestorów nowej generacji",
    headline_en:"Tokenised property for the next generation of investors",
    desc_pl:"Nasza polska platforma nieruchomości wprowadza ułamkową własność do aktywów premium. Dzięki tokenizacji opartej na blockchain inwestorzy mogą uczestniczyć już od 100 € — w pełni regulowanej i transparentnej.",
    desc_en:"Our Polish real estate platform brings fractional ownership to premium property assets. Through blockchain-based tokenisation, investors can participate with as little as €100 — fully regulated and transparent.",
    features_pl:["Platforma tokenizacji nieruchomości","Struktury własności ułamkowej","Zarządzanie tytułami przez smart kontrakty","Automatyzacja dystrybucji zysku z najmu","Kojarzenie deweloperów i inwestorów"],
    features_en:["Property tokenisation platform","Fractional ownership structures","Smart contract-based title management","Rental yield distribution automation","Developer & investor matchmaking"],
    clients:[
      { name:"RealT", url:"https://realt.co", desc:"Pioneer in fractional real estate tokenisation — 200+ tokenised US properties, 20,000+ token holders across 125 countries, and $29M+ distributed in rental yields since 2019." },
      { name:"Polymesh", url:"https://polymesh.network", desc:"Purpose-built permissioned L1 blockchain for regulated RWA tokenisation — designed for compliance-first security token issuance, settlement, and lifecycle management." },
    ],
  },
  {
    id:"gaming", previewUrl:"https://xter.io", accent:"#DC2626",
    tag_pl:"GameFi",       tag_en:"GameFi",
    title_pl:"Gaming Web3",title_en:"Web3 Gaming",
    headline_pl:"Graj, posiadaj i zarabiaj w wciągających światach",
    headline_en:"Play, own, and earn in immersive worlds",
    desc_pl:"Nasza platforma gamingowa Web3 łączy rozgrywkę klasy AAA z prawdziwą cyfrową własnością. Gracze zarabiają, handlują i budują bogactwo w naszych ekonomiach gier — wspieranych przez naszą zastrzeżoną warstwę fintech i płatności.",
    desc_en:"Our Web3 gaming platform merges AAA-quality gameplay with genuine digital ownership. Players earn, trade, and build wealth within our game economies — supported by our proprietary fintech and payments layer.",
    features_pl:["Mechaniki play-to-earn i own-to-earn","Aktywa NFT w grze i marketplace","Ekonomia gildii zintegrowana z DeFi","Przenośność aktywów między grami","Infrastruktura anty-cheat i fair-play"],
    features_en:["Play-to-earn & own-to-earn mechanics","In-game NFT assets & marketplace","DeFi-integrated guild economics","Cross-game asset portability","Anti-cheat & fair-play infrastructure"],
    clients:[
      { name:"Xterio", url:"https://xter.io", desc:"Fully integrated Web3 gaming Layer 2 ecosystem — 2M+ users, 45+ gaming partners, five AAA titles, and an AI-powered publishing platform backed by $80M+ in ecosystem funding." },
      { name:"Elixir Games", url:"https://elixir.games", desc:"Solana-backed Web3 game distribution platform with 150+ titles and 1M+ users — combining a PC launcher, NFT launchpad, and developer SDK to bring blockchain gaming to mainstream players." },
    ],
  },
];

export default function Services() {
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#DC2626]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#DC2626] text-xs font-semibold tracking-widest uppercase mb-4">{t("services_lbl")}</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-display">{t("services_h1")}</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">{t("services_sub")}</p>
        </div>
      </section>

      <section className="py-8 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center pb-12">
            {services.map(({ id, title_pl, title_en }) => (
              <a key={id} href={`#${id}`} className="px-5 py-2 rounded-full border border-white/8 text-gray-500 text-sm hover:border-[#DC2626]/50 hover:text-[#DC2626] transition-colors">
                {lang === "pl" ? title_pl : title_en}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {services.map(({ id, previewUrl, tag_pl, tag_en, title_pl, title_en, headline_pl, headline_en, desc_pl, desc_en, features_pl, features_en, clients, accent }, idx) => {
              const tag      = lang === "pl" ? tag_pl      : tag_en;
              const title    = lang === "pl" ? title_pl    : title_en;
              const headline = lang === "pl" ? headline_pl : headline_en;
              const desc     = lang === "pl" ? desc_pl     : desc_en;
              const features = lang === "pl" ? features_pl : features_en;
              return (
                <div key={id} id={id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 ${idx !== services.length - 1 ? "border-b border-white/8" : ""}`}>
                  <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background:`${accent}15`, color:accent }}>{tag}</span>
                    <ServicePreview siteUrl={previewUrl} accent={accent} title={title} />
                    <h2 className="text-4xl font-bold text-white mb-3 font-display mt-6">{title}</h2>
                    <p className="text-xl mb-4" style={{ color:accent }}>{headline}</p>
                    <p className="text-gray-400 leading-relaxed mb-8">{desc}</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 text-white" style={{ background:accent }}>
                      {t("services_talk")} {title}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                  <div className={`${idx % 2 === 1 ? "lg:order-1" : ""} flex flex-col gap-5`}>
                    <div className="p-8 rounded-2xl border bg-[#111118]" style={{ borderColor:`${accent}20` }}>
                      <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase font-display">{t("services_capabilities")}</h4>
                      <ul className="flex flex-col gap-4">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-gray-400 text-sm">
                            <span className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background:`${accent}20` }}>
                              <svg className="w-3 h-3" fill="none" stroke={accent} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {clients?.length > 0 && (
                      <div className="p-6 rounded-2xl border bg-[#0D0D14]" style={{ borderColor:`${accent}15` }}>
                        <h4 className="text-white font-semibold mb-4 text-xs tracking-widest uppercase font-display">{t("services_partners")}</h4>
                        <div className="flex flex-col gap-4">
                          {clients.map(({ name, url, desc: cd }) => (
                            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                              <span className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background:`${accent}20`, color:accent }}>↗</span>
                              <div>
                                <span className="text-sm font-semibold group-hover:underline" style={{ color:accent }}>{name}</span>
                                <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{cd}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111118] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4 font-display">{t("services_cta_h2")}</h2>
          <p className="text-gray-500 mb-8">{t("services_cta_sub")}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#DC2626] text-white font-bold hover:bg-[#EF4444] transition-colors">
            {t("services_cta_btn")}
          </Link>
        </div>
      </section>
    </>
  );
}
