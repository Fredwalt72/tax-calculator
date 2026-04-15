import React, { useState, useMemo } from "react";

// ── Translations ──────────────────────────────────────────────────────────
const T = {
  en: {
    title: "INCOME TAX CALCULATOR",
    subtitle: (c, p, s) => `${c} countries · ${p} Canadian provinces · ${s} US states`,
    salaryLabel: "ANNUAL GROSS SALARY",
    salaryPlaceholder: "Enter your income here...",
    rankingLabel: "RANKED BY NET SALARY",
    searchPlaceholder: "Search...",
    canada: "Canada",
    usa: "United States",
    caSubtitle: "13 provinces",
    usSubtitle: "51 states/DC",
    fedProv: "Federal + Provincial",
    fedState: "Federal + State",
    netYear: "NET / YR",
    seeProvinces: "▼ Show",
    collapse: "▲ Collapse",
    gross: "GROSS",
    federal: "FEDERAL",
    provincial: "PROVINCIAL",
    totalTax: "TOTAL TAX",
    tax: "TAX",
    net: "NET",
    effectiveRate: "TOTAL EFFECTIVE RATE",
    fedLabel: "Federal",
    provLabel: "Provincial/State",
    totalLabel: "Total",
    caDetail: "Canada · Federal + Provincial",
    usDetail: "United States · Federal + State",
    disclaimer: "⚠ Federal + provincial/state income tax only. Social contributions, credits and deductions not included. Exchange rates are approximate. Consult a tax professional.",
    emptyTitle: "ENTER YOUR INCOME TO BEGIN",
    emptySubtitle: (c, p, s) => `${c} countries · ${p} provinces · ${s} states`,
    periodAnnual: "/ Year",
    periodMonthly: "/ Month",
    // Editorial content
    aboutTitle: "About This Calculator",
    aboutText: "Our free income tax calculator lets you instantly compare your net salary across 47+ countries, 13 Canadian provinces, and 51 US states. Whether you are planning an international move, negotiating a job offer abroad, or simply curious about how your country stacks up, this tool gives you a clear picture of how much you actually keep after federal and regional income taxes.",
    howTitle: "How It Works",
    howSteps: [
      { icon:"1️⃣", title:"Enter your salary", text:"Type your annual or monthly gross salary in the currency of your choice: USD, CAD, EUR, GBP or AUD." },
      { icon:"2️⃣", title:"See the ranking", text:"The tool instantly ranks every country and region from the highest to lowest net salary, so you can see at a glance where you keep the most money." },
      { icon:"3️⃣", title:"Click for details", text:"Click any country, province or state to see a breakdown: gross salary, federal tax, regional tax, total tax, net salary and effective rate." },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q:"What taxes are included in the calculation?", a:"This calculator includes federal income tax and provincial or state income tax only. It does not include social security contributions, health insurance premiums, pension contributions, sales taxes (GST/HST/VAT), or any other deductions. The results show your estimated income tax burden only." },
      { q:"Why are the results shown in USD?", a:"All results are normalized to USD for easy international comparison. You can enter your salary in CAD, EUR, GBP or AUD and the calculator will convert it automatically using approximate exchange rates. The detail panel always shows amounts in the currency you entered." },
      { q:"How accurate are these tax rates?", a:"Tax brackets are based on the most recent publicly available rates for each jurisdiction. However, tax laws change frequently, and individual circumstances (deductions, credits, filing status, age) can significantly affect your actual tax bill. Always consult a qualified tax professional before making financial decisions." },
      { q:"Does the calculator account for tax deductions and credits?", a:"No. The calculator applies the standard progressive tax brackets without deductions, credits, or exemptions. In reality, most taxpayers benefit from various deductions (RRSP contributions, mortgage interest, medical expenses) that reduce their taxable income. Your actual net salary may be higher than shown." },
      { q:"What is the effective tax rate?", a:"The effective tax rate is the percentage of your total gross income that goes to income taxes. It is different from the marginal tax rate, which applies only to your last dollar of income. For example, someone earning $80,000 in Ontario might have a marginal rate of 31.48% but an effective rate closer to 22%." },
      { q:"Why does Alberta have a lower tax rate than Québec?", a:"Alberta benefits from a flat 10% provincial income tax with no surtax, and the province collects significant oil and gas revenues that reduce the need for higher personal income taxes. Québec, by contrast, funds an extensive public services network — including subsidized daycare, tuition, and healthcare — which requires higher provincial tax rates, up to 25.75%." },
    ],
    tipsTitle: "International Tax Planning Tips",
    tips: [
      { icon:"🌍", title:"Consider total compensation, not just salary", text:"A $120,000 salary in New York and the same salary in Texas are very different after state taxes. New York adds up to 10.9% state income tax, while Texas has none. Always compare net take-home pay, not gross figures." },
      { icon:"🏠", title:"Remote work and tax residency", text:"Working remotely for a foreign company does not automatically mean you pay taxes where your employer is based. Tax residency is usually determined by where you physically live. Spending more than 183 days in a country typically establishes tax residency there." },
      { icon:"📋", title:"Double taxation treaties", text:"Most developed countries have tax treaties that prevent the same income from being taxed twice. If you work internationally, these treaties can significantly reduce your total tax burden. Check whether your home and host countries have such an agreement." },
      { icon:"💡", title:"Maximize registered accounts", text:"In Canada, RRSP and TFSA contributions can significantly reduce your taxable income or grow wealth tax-free. In the US, 401(k) and IRA accounts serve a similar purpose. These vehicles can lower your effective tax rate by several percentage points." },
    ],
    privacyTitle: "Privacy Policy",
    privacyText: "This website does not collect any personal information. No account registration is required. The salary figures you enter are processed entirely in your browser and are never sent to our servers. We may use anonymous analytics (page views, country of origin) to improve the tool. We do not sell, share, or monetize any user data. This site may display advertisements through Google AdSense; Google's privacy policy governs how ad-related data is handled.",
    aboutPageTitle: "About Us",
    aboutPageText: "TaxComparator.app is an independent tool built to help individuals understand and compare income tax rates around the world. We are not affiliated with any government, tax authority, or financial institution. Our goal is to provide clear, unbiased, and accessible tax information to help people make informed financial decisions.",
    footerDisclaimer: "For informational purposes only. Not financial or tax advice. Consult a qualified professional.",
    footerLinks: ["Privacy Policy", "About", "Contact"],
    contactTitle: "Contact",
    contactText: "For corrections, suggestions, or partnership inquiries, please reach out via the contact form below.",
    currencies: [
      { code:"USD", label:"USD — US Dollar",          symbol:"$", perUSD:1 },
      { code:"CAD", label:"CAD — Canadian Dollar",    symbol:"$", perUSD:1.36 },
      { code:"EUR", label:"EUR — Euro",               symbol:"€", perUSD:0.92 },
      { code:"GBP", label:"GBP — British Pound",      symbol:"£", perUSD:0.79 },
      { code:"AUD", label:"AUD — Australian Dollar",  symbol:"$", perUSD:1.55 },
    ],
  },
  fr: {
    title: "CALCULATEUR D'IMPÔT SUR LE REVENU",
    subtitle: (c, p, s) => `${c} pays · ${p} provinces canadiennes · ${s} états américains`,
    salaryLabel: "SALAIRE BRUT ANNUEL",
    salaryPlaceholder: "Inscrivez votre revenu ici...",
    rankingLabel: "CLASSEMENT PAR SALAIRE NET",
    searchPlaceholder: "Rechercher...",
    canada: "Canada",
    usa: "États-Unis",
    caSubtitle: "13 provinces",
    usSubtitle: "51 états/DC",
    fedProv: "Fédéral + Provincial",
    fedState: "Fédéral + État",
    netYear: "NET / AN",
    seeProvinces: "▼ Voir",
    collapse: "▲ Replier",
    gross: "BRUT",
    federal: "FÉDÉRAL",
    provincial: "PROVINCIAL",
    totalTax: "TOTAL IMPÔT",
    tax: "IMPÔT",
    net: "NET",
    effectiveRate: "TAUX EFFECTIF TOTAL",
    fedLabel: "Fédéral",
    provLabel: "Provincial/État",
    totalLabel: "Total",
    caDetail: "Canada · Fédéral + Provincial",
    usDetail: "États-Unis · Fédéral + État",
    disclaimer: "⚠ Impôt fédéral + provincial/étatique sur le revenu uniquement. Cotisations sociales, crédits et déductions non inclus. Taux de change approximatifs. Consultez un comptable.",
    emptyTitle: "ENTREZ VOTRE REVENU POUR COMMENCER",
    emptySubtitle: (c, p, s) => `${c} pays · ${p} provinces · ${s} états`,
    periodAnnual: "/ An",
    periodMonthly: "/ Mois",
    // Editorial content
    aboutTitle: "À propos de ce calculateur",
    aboutText: "Notre calculateur d'impôt gratuit vous permet de comparer instantanément votre salaire net dans plus de 47 pays, 13 provinces canadiennes et 51 États américains. Que vous planifiez un déménagement à l'international, négociiez une offre d'emploi à l'étranger ou soyez simplement curieux de savoir comment votre pays se compare, cet outil vous donne une image claire de ce que vous conservez réellement après les impôts fédéraux et régionaux.",
    howTitle: "Comment ça fonctionne",
    howSteps: [
      { icon:"1️⃣", title:"Entrez votre salaire", text:"Saisissez votre salaire brut annuel ou mensuel dans la devise de votre choix : USD, CAD, EUR, GBP ou AUD." },
      { icon:"2️⃣", title:"Consultez le classement", text:"L'outil classe instantanément chaque pays et région du salaire net le plus élevé au plus bas, pour voir d'un coup d'œil où vous gardez le plus d'argent." },
      { icon:"3️⃣", title:"Cliquez pour les détails", text:"Cliquez sur n'importe quel pays, province ou État pour voir la décomposition : salaire brut, impôt fédéral, impôt régional, impôt total, salaire net et taux effectif." },
    ],
    faqTitle: "Questions fréquemment posées",
    faqs: [
      { q:"Quelles taxes sont incluses dans le calcul ?", a:"Ce calculateur inclut uniquement l'impôt fédéral sur le revenu et l'impôt provincial ou étatique. Il n'inclut pas les cotisations sociales, les primes d'assurance maladie, les cotisations de retraite, les taxes de vente (TPS/TVH/TVA) ou toute autre déduction. Les résultats montrent uniquement votre charge fiscale estimée sur le revenu." },
      { q:"Pourquoi les résultats sont-ils affichés en USD ?", a:"Tous les résultats sont normalisés en USD pour faciliter la comparaison internationale. Vous pouvez entrer votre salaire en CAD, EUR, GBP ou AUD et le calculateur le convertira automatiquement en utilisant des taux de change approximatifs." },
      { q:"Dans quelle mesure ces taux d'imposition sont-ils exacts ?", a:"Les tranches d'imposition sont basées sur les taux les plus récents disponibles publiquement pour chaque juridiction. Cependant, les lois fiscales changent fréquemment et les circonstances individuelles peuvent affecter considérablement votre facture fiscale réelle. Consultez toujours un professionnel fiscal qualifié avant de prendre des décisions financières." },
      { q:"Le calculateur tient-il compte des déductions et crédits d'impôt ?", a:"Non. Le calculateur applique les tranches d'imposition progressives standard sans déductions, crédits ni exemptions. Dans la réalité, la plupart des contribuables bénéficient de diverses déductions (cotisations REER, frais médicaux) qui réduisent leur revenu imposable. Votre salaire net réel peut être plus élevé que celui affiché." },
      { q:"Qu'est-ce que le taux effectif d'imposition ?", a:"Le taux effectif d'imposition est le pourcentage de votre revenu brut total qui va aux impôts sur le revenu. Il diffère du taux marginal, qui ne s'applique qu'au dernier dollar de revenu. Par exemple, quelqu'un gagnant 80 000 $ en Ontario pourrait avoir un taux marginal de 31,48 % mais un taux effectif d'environ 22 %." },
      { q:"Pourquoi l'Alberta a-t-elle un taux d'imposition plus bas que le Québec ?", a:"L'Alberta bénéficie d'un impôt provincial fixe de 10 % et perçoit d'importantes redevances pétrolières et gazières qui réduisent le besoin de taux d'imposition personnels plus élevés. Le Québec, en revanche, finance un vaste réseau de services publics — incluant les garderies subventionnées, les frais de scolarité et les soins de santé — ce qui nécessite des taux provinciaux plus élevés, jusqu'à 25,75 %." },
    ],
    tipsTitle: "Conseils de planification fiscale internationale",
    tips: [
      { icon:"🌍", title:"Considérez la rémunération totale, pas seulement le salaire", text:"Un salaire de 120 000 $ à New York et le même salaire au Texas sont très différents après les impôts d'État. New York ajoute jusqu'à 10,9 % d'impôt d'État, tandis que le Texas n'en a aucun. Comparez toujours le salaire net, pas les chiffres bruts." },
      { icon:"🏠", title:"Travail à distance et résidence fiscale", text:"Travailler à distance pour une entreprise étrangère ne signifie pas automatiquement que vous payez des impôts là où est basé votre employeur. La résidence fiscale est généralement déterminée par l'endroit où vous vivez physiquement. Passer plus de 183 jours dans un pays établit généralement la résidence fiscale." },
      { icon:"📋", title:"Conventions fiscales contre la double imposition", text:"La plupart des pays développés ont des traités fiscaux qui empêchent le même revenu d'être imposé deux fois. Si vous travaillez à l'international, ces conventions peuvent réduire considérablement votre charge fiscale totale." },
      { icon:"💡", title:"Maximisez vos comptes enregistrés", text:"Au Canada, les cotisations REER et CELI peuvent réduire considérablement votre revenu imposable ou faire fructifier votre patrimoine à l'abri de l'impôt. Ces véhicules peuvent abaisser votre taux effectif d'imposition de plusieurs points de pourcentage." },
    ],
    privacyTitle: "Politique de confidentialité",
    privacyText: "Ce site web ne collecte aucune information personnelle. Aucune inscription n'est requise. Les montants de salaire que vous saisissez sont traités entièrement dans votre navigateur et ne sont jamais envoyés à nos serveurs. Nous pouvons utiliser des analyses anonymes (pages vues, pays d'origine) pour améliorer l'outil. Nous ne vendons, partageons ni monétisons aucune donnée utilisateur. Ce site peut afficher des publicités via Google AdSense ; la politique de confidentialité de Google régit la façon dont les données liées aux annonces sont traitées.",
    aboutPageTitle: "À propos",
    aboutPageText: "TaxComparator.app est un outil indépendant conçu pour aider les particuliers à comprendre et comparer les taux d'imposition sur le revenu dans le monde. Nous ne sommes affiliés à aucun gouvernement, autorité fiscale ou institution financière. Notre objectif est de fournir des informations fiscales claires, impartiales et accessibles.",
    footerDisclaimer: "À titre informatif uniquement. Pas de conseil financier ou fiscal. Consultez un professionnel qualifié.",
    footerLinks: ["Politique de confidentialité", "À propos", "Contact"],
    contactTitle: "Contact",
    contactText: "Pour des corrections, suggestions ou demandes de partenariat, veuillez nous contacter via le formulaire ci-dessous.",
    currencies: [
      { code:"USD", label:"USD — Dollar américain",   symbol:"$", perUSD:1 },
      { code:"CAD", label:"CAD — Dollar canadien",    symbol:"$", perUSD:1.36 },
      { code:"EUR", label:"EUR — Euro",               symbol:"€", perUSD:0.92 },
      { code:"GBP", label:"GBP — Livre sterling",     symbol:"£", perUSD:0.79 },
      { code:"AUD", label:"AUD — Dollar australien",  symbol:"$", perUSD:1.55 },
    ],
  },
  es: {
    title: "CALCULADORA DE IMPUESTO SOBRE LA RENTA",
    subtitle: (c, p, s) => `${c} países · ${p} provincias canadienses · ${s} estados de EE.UU.`,
    salaryLabel: "SALARIO BRUTO ANUAL",
    salaryPlaceholder: "Introduce tu ingreso aquí...",
    rankingLabel: "CLASIFICACIÓN POR SALARIO NETO",
    searchPlaceholder: "Buscar...",
    canada: "Canadá",
    usa: "Estados Unidos",
    caSubtitle: "13 provincias",
    usSubtitle: "51 estados/DC",
    fedProv: "Federal + Provincial",
    fedState: "Federal + Estatal",
    netYear: "NETO / AÑO",
    seeProvinces: "▼ Ver",
    collapse: "▲ Colapsar",
    gross: "BRUTO",
    federal: "FEDERAL",
    provincial: "PROVINCIAL",
    totalTax: "IMPUESTO TOTAL",
    tax: "IMPUESTO",
    net: "NETO",
    effectiveRate: "TASA EFECTIVA TOTAL",
    fedLabel: "Federal",
    provLabel: "Provincial/Estatal",
    totalLabel: "Total",
    caDetail: "Canadá · Federal + Provincial",
    usDetail: "EE.UU. · Federal + Estatal",
    disclaimer: "⚠ Solo impuesto federal + provincial/estatal sobre la renta. Contribuciones sociales, créditos y deducciones no incluidos. Tipos de cambio aproximados. Consulte a un contador.",
    emptyTitle: "INTRODUCE TU INGRESO PARA COMENZAR",
    emptySubtitle: (c, p, s) => `${c} países · ${p} provincias · ${s} estados`,
    periodAnnual: "/ Año",
    periodMonthly: "/ Mes",
    // Editorial content
    aboutTitle: "Acerca de esta calculadora",
    aboutText: "Nuestra calculadora de impuestos gratuita te permite comparar instantáneamente tu salario neto en más de 47 países, 13 provincias canadienses y 51 estados de EE.UU. Ya sea que estés planeando una mudanza internacional, negociando una oferta de trabajo en el extranjero o simplemente tengas curiosidad sobre cómo se compara tu país, esta herramienta te da una imagen clara de cuánto conservas realmente después de los impuestos federales y regionales.",
    howTitle: "Cómo funciona",
    howSteps: [
      { icon:"1️⃣", title:"Introduce tu salario", text:"Escribe tu salario bruto anual o mensual en la moneda de tu elección: USD, CAD, EUR, GBP o AUD." },
      { icon:"2️⃣", title:"Consulta el ranking", text:"La herramienta clasifica instantáneamente cada país y región del salario neto más alto al más bajo, para ver de un vistazo dónde conservas más dinero." },
      { icon:"3️⃣", title:"Haz clic para ver detalles", text:"Haz clic en cualquier país, provincia o estado para ver el desglose: salario bruto, impuesto federal, impuesto regional, impuesto total, salario neto y tasa efectiva." },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q:"¿Qué impuestos se incluyen en el cálculo?", a:"Esta calculadora incluye solo el impuesto federal sobre la renta y el impuesto provincial o estatal. No incluye contribuciones a la seguridad social, primas de seguro médico, cotizaciones de pensión, impuestos sobre ventas (IVA) ni ninguna otra deducción. Los resultados muestran únicamente tu carga fiscal estimada sobre la renta." },
      { q:"¿Por qué los resultados se muestran en USD?", a:"Todos los resultados se normalizan en USD para facilitar la comparación internacional. Puedes introducir tu salario en CAD, EUR, GBP o AUD y la calculadora lo convertirá automáticamente usando tipos de cambio aproximados." },
      { q:"¿Qué tan precisas son estas tasas impositivas?", a:"Los tramos impositivos se basan en las tasas más recientes disponibles públicamente para cada jurisdicción. Sin embargo, las leyes fiscales cambian con frecuencia y las circunstancias individuales pueden afectar significativamente tu factura fiscal real. Consulta siempre a un profesional fiscal calificado antes de tomar decisiones financieras." },
      { q:"¿La calculadora tiene en cuenta deducciones y créditos fiscales?", a:"No. La calculadora aplica los tramos impositivos progresivos estándar sin deducciones, créditos ni exenciones. En realidad, la mayoría de los contribuyentes se benefician de varias deducciones que reducen su renta imponible. Tu salario neto real puede ser más alto que el mostrado." },
      { q:"¿Qué es la tasa efectiva de impuesto?", a:"La tasa efectiva de impuesto es el porcentaje de tu ingreso bruto total que va a impuestos sobre la renta. Es diferente de la tasa marginal, que solo se aplica a tu último dólar de ingreso. Por ejemplo, alguien que gana $80,000 podría tener una tasa marginal del 31% pero una tasa efectiva cercana al 22%." },
      { q:"¿Por qué Alberta tiene una tasa impositiva más baja que Québec?", a:"Alberta se beneficia de un impuesto provincial fijo del 10% y recauda importantes regalías del petróleo y gas que reducen la necesidad de tasas más altas. Québec, en cambio, financia una extensa red de servicios públicos que requiere tasas provinciales más altas, hasta el 25,75%." },
    ],
    tipsTitle: "Consejos de planificación fiscal internacional",
    tips: [
      { icon:"🌍", title:"Considera la compensación total, no solo el salario", text:"Un salario de $120,000 en Nueva York y el mismo salario en Texas son muy diferentes después de los impuestos estatales. Nueva York añade hasta 10.9% de impuesto estatal, mientras que Texas no tiene ninguno. Siempre compara el salario neto, no las cifras brutas." },
      { icon:"🏠", title:"Trabajo remoto y residencia fiscal", text:"Trabajar de forma remota para una empresa extranjera no significa automáticamente que pagas impuestos donde está tu empleador. La residencia fiscal generalmente se determina por dónde vives físicamente. Pasar más de 183 días en un país generalmente establece residencia fiscal allí." },
      { icon:"📋", title:"Convenios para evitar la doble imposición", text:"La mayoría de los países desarrollados tienen tratados fiscales que evitan que el mismo ingreso sea gravado dos veces. Si trabajas internacionalmente, estos convenios pueden reducir significativamente tu carga fiscal total." },
      { icon:"💡", title:"Maximiza tus cuentas de ahorro registradas", text:"En Canadá, las contribuciones al RRSP y TFSA pueden reducir significativamente tu ingreso imponible o hacer crecer tu patrimonio libre de impuestos. En EE.UU., las cuentas 401(k) e IRA sirven un propósito similar." },
    ],
    privacyTitle: "Política de privacidad",
    privacyText: "Este sitio web no recopila ninguna información personal. No se requiere registro de cuenta. Los montos de salario que introduces se procesan completamente en tu navegador y nunca se envían a nuestros servidores. Podemos usar análisis anónimos para mejorar la herramienta. No vendemos, compartimos ni monetizamos ningún dato de usuario. Este sitio puede mostrar anuncios a través de Google AdSense; la política de privacidad de Google rige cómo se manejan los datos relacionados con los anuncios.",
    aboutPageTitle: "Acerca de nosotros",
    aboutPageText: "TaxComparator.app es una herramienta independiente creada para ayudar a las personas a entender y comparar las tasas del impuesto sobre la renta en todo el mundo. No estamos afiliados a ningún gobierno, autoridad fiscal o institución financiera.",
    footerDisclaimer: "Solo con fines informativos. No es asesoramiento financiero ni fiscal. Consulte a un profesional calificado.",
    footerLinks: ["Política de privacidad", "Acerca de", "Contacto"],
    contactTitle: "Contacto",
    contactText: "Para correcciones, sugerencias o consultas de asociación, contáctenos a través del formulario a continuación.",
    currencies: [
      { code:"USD", label:"USD — Dólar estadounidense", symbol:"$", perUSD:1 },
      { code:"CAD", label:"CAD — Dólar canadiense",     symbol:"$", perUSD:1.36 },
      { code:"EUR", label:"EUR — Euro",                 symbol:"€", perUSD:0.92 },
      { code:"GBP", label:"GBP — Libra esterlina",      symbol:"£", perUSD:0.79 },
      { code:"AUD", label:"AUD — Dólar australiano",    symbol:"$", perUSD:1.55 },
    ],
  },
};

// ── Tax Data ──────────────────────────────────────────────────────────────

const CA_USD = 1.36;
const CA_FEDERAL = [[0,57375,.15],[57375,114750,.205],[114750,158519,.26],[158519,220000,.29],[220000,Infinity,.33]];

const PROVINCES_CA = [
  { name:"Ontario",                   abbr:"ON", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Ontario.svg/320px-Flag_of_Ontario.svg.png",           brackets:[[0,51446,.0505],[51446,102894,.0915],[102894,150000,.1116],[150000,220000,.1216],[220000,Infinity,.1316]] },
  { name:"Québec",                    abbr:"QC", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/320px-Flag_of_Quebec.svg.png",            brackets:[[0,51780,.14],[51780,103545,.19],[103545,126000,.24],[126000,Infinity,.2575]] },
  { name:"Colombie-Britannique",      abbr:"BC", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/320px-Flag_of_British_Columbia.svg.png", brackets:[[0,45654,.0506],[45654,91310,.077],[91310,104835,.105],[104835,127299,.1229],[127299,172602,.147],[172602,240716,.168],[240716,Infinity,.205]] },
  { name:"Alberta",                   abbr:"AB", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/320px-Flag_of_Alberta.svg.png",          brackets:[[0,148269,.10],[148269,177922,.12],[177922,237230,.13],[237230,355845,.14],[355845,Infinity,.15]] },
  { name:"Saskatchewan",              abbr:"SK", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/320px-Flag_of_Saskatchewan.svg.png", brackets:[[0,49720,.105],[49720,142058,.125],[142058,Infinity,.145]] },
  { name:"Manitoba",                  abbr:"MB", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Manitoba.svg/320px-Flag_of_Manitoba.svg.png",         brackets:[[0,36842,.108],[36842,79625,.1275],[79625,Infinity,.174]] },
  { name:"Nouvelle-Écosse",           abbr:"NS", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Nova_Scotia.svg/320px-Flag_of_Nova_Scotia.svg.png",   brackets:[[0,29590,.0879],[29590,59180,.1495],[59180,93000,.1667],[93000,150000,.175],[150000,Infinity,.21]] },
  { name:"Nouveau-Brunswick",         abbr:"NB", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_New_Brunswick.svg/320px-Flag_of_New_Brunswick.svg.png",brackets:[[0,47715,.094],[47715,95431,.1482],[95431,176756,.1652],[176756,Infinity,.195]] },
  { name:"Île-du-Prince-Édouard",     abbr:"PE", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flag_of_Prince_Edward_Island.svg/320px-Flag_of_Prince_Edward_Island.svg.png", brackets:[[0,32656,.0965],[32656,64313,.1363],[64313,105000,.1665],[105000,140000,.18],[140000,Infinity,.1875]] },
  { name:"Terre-Neuve-et-Labrador",   abbr:"NL", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Newfoundland_and_Labrador.svg/320px-Flag_of_Newfoundland_and_Labrador.svg.png", brackets:[[0,43198,.087],[43198,86395,.145],[86395,154244,.158],[154244,215943,.178],[215943,275870,.198],[275870,551739,.208],[551739,Infinity,.213]] },
  { name:"Territoires du Nord-Ouest", abbr:"NT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_the_Northwest_Territories.svg/320px-Flag_of_the_Northwest_Territories.svg.png", brackets:[[0,50597,.059],[50597,101198,.086],[101198,164525,.122],[164525,Infinity,.1405]] },
  { name:"Yukon",                     abbr:"YT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_Yukon.svg/320px-Flag_of_Yukon.svg.png",              brackets:[[0,57375,.064],[57375,114750,.09],[114750,158519,.109],[158519,500000,.128],[500000,Infinity,.15]] },
  { name:"Nunavut",                   abbr:"NU", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Flag_of_Nunavut.svg/320px-Flag_of_Nunavut.svg.png",           brackets:[[0,53268,.04],[53268,106537,.07],[106537,173205,.09],[173205,Infinity,.115]] },
];

const US_FEDERAL = [[0,11600,.10],[11600,47150,.12],[47150,100525,.22],[100525,191950,.24],[191950,243725,.32],[243725,609350,.35],[609350,Infinity,.37]];

const STATES_US = [
  { name:"Alabama",        abbr:"AL", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/320px-Flag_of_Alabama.svg.png",        brackets:[[0,500,.02],[500,3000,.04],[3000,Infinity,.05]] },
  { name:"Alaska",         abbr:"AK", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/320px-Flag_of_Alaska.svg.png",         brackets:[[0,Infinity,0]] },
  { name:"Arizona",        abbr:"AZ", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/320px-Flag_of_Arizona.svg.png",        brackets:[[0,Infinity,.025]] },
  { name:"Arkansas",       abbr:"AR", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/320px-Flag_of_Arkansas.svg.png",       brackets:[[0,4300,.02],[4300,8500,.04],[8500,Infinity,.044]] },
  { name:"California",     abbr:"CA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/320px-Flag_of_California.svg.png",     brackets:[[0,10099,.01],[10099,23942,.02],[23942,37788,.04],[37788,52455,.06],[52455,66295,.08],[66295,338639,.093],[338639,406364,.103],[406364,677275,.113],[677275,Infinity,.123]] },
  { name:"Colorado",       abbr:"CO", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/320px-Flag_of_Colorado.svg.png",       brackets:[[0,Infinity,.044]] },
  { name:"Connecticut",    abbr:"CT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Connecticut.svg/320px-Flag_of_Connecticut.svg.png",    brackets:[[0,10000,.03],[10000,50000,.05],[50000,100000,.055],[100000,200000,.06],[200000,250000,.065],[250000,500000,.069],[500000,Infinity,.0699]] },
  { name:"Delaware",       abbr:"DE", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/320px-Flag_of_Delaware.svg.png",       brackets:[[0,2000,0],[2000,5000,.022],[5000,10000,.039],[10000,20000,.048],[20000,25000,.052],[25000,60000,.0555],[60000,Infinity,.066]] },
  { name:"Florida",        abbr:"FL", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/320px-Flag_of_Florida.svg.png",        brackets:[[0,Infinity,0]] },
  { name:"Georgia",        abbr:"GA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_the_State_of_Georgia.svg/320px-Flag_of_the_State_of_Georgia.svg.png", brackets:[[0,Infinity,.0549]] },
  { name:"Hawaii",         abbr:"HI", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/320px-Flag_of_Hawaii.svg.png",         brackets:[[0,2400,.014],[2400,4800,.032],[4800,9600,.055],[9600,14400,.064],[14400,19200,.068],[19200,24000,.072],[24000,36000,.076],[36000,48000,.079],[48000,Infinity,.0825]] },
  { name:"Idaho",          abbr:"ID", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/320px-Flag_of_Idaho.svg.png",          brackets:[[0,Infinity,.058]] },
  { name:"Illinois",       abbr:"IL", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/320px-Flag_of_Illinois.svg.png",       brackets:[[0,Infinity,.0495]] },
  { name:"Indiana",        abbr:"IN", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/320px-Flag_of_Indiana.svg.png",        brackets:[[0,Infinity,.0305]] },
  { name:"Iowa",           abbr:"IA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/320px-Flag_of_Iowa.svg.png",           brackets:[[0,6000,.044],[6000,30000,.0482],[30000,Infinity,.057]] },
  { name:"Kansas",         abbr:"KS", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/320px-Flag_of_Kansas.svg.png",         brackets:[[0,15000,.031],[15000,30000,.0525],[30000,Infinity,.057]] },
  { name:"Kentucky",       abbr:"KY", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/320px-Flag_of_Kentucky.svg.png",       brackets:[[0,Infinity,.04]] },
  { name:"Louisiana",      abbr:"LA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Flag_of_Louisiana.svg/320px-Flag_of_Louisiana.svg.png",      brackets:[[0,12500,.0185],[12500,50000,.035],[50000,Infinity,.0425]] },
  { name:"Maine",          abbr:"ME", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/320px-Flag_of_Maine.svg.png",          brackets:[[0,24500,.058],[24500,58050,.0675],[58050,Infinity,.0715]] },
  { name:"Maryland",       abbr:"MD", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/320px-Flag_of_Maryland.svg.png",       brackets:[[0,1000,.02],[1000,2000,.03],[2000,3000,.04],[3000,100000,.0475],[100000,125000,.05],[125000,150000,.0525],[150000,250000,.055],[250000,Infinity,.0575]] },
  { name:"Massachusetts",  abbr:"MA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/320px-Flag_of_Massachusetts.svg.png",  brackets:[[0,Infinity,.05]] },
  { name:"Michigan",       abbr:"MI", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/320px-Flag_of_Michigan.svg.png",       brackets:[[0,Infinity,.0405]] },
  { name:"Minnesota",      abbr:"MN", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/320px-Flag_of_Minnesota.svg.png",      brackets:[[0,30070,.0535],[30070,98760,.068],[98760,183340,.0785],[183340,Infinity,.0985]] },
  { name:"Mississippi",    abbr:"MS", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/320px-Flag_of_Mississippi.svg.png",    brackets:[[0,10000,0],[10000,Infinity,.047]] },
  { name:"Missouri",       abbr:"MO", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/320px-Flag_of_Missouri.svg.png",       brackets:[[0,1207,0],[1207,Infinity,.048]] },
  { name:"Montana",        abbr:"MT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/320px-Flag_of_Montana.svg.png",        brackets:[[0,20500,.047],[20500,Infinity,.059]] },
  { name:"Nebraska",       abbr:"NE", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/320px-Flag_of_Nebraska.svg.png",       brackets:[[0,3700,.0246],[3700,22170,.0351],[22170,35730,.0501],[35730,Infinity,.0584]] },
  { name:"Nevada",         abbr:"NV", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/320px-Flag_of_Nevada.svg.png",         brackets:[[0,Infinity,0]] },
  { name:"New Hampshire",  abbr:"NH", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/320px-Flag_of_New_Hampshire.svg.png",  brackets:[[0,Infinity,0]] },
  { name:"New Jersey",     abbr:"NJ", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/320px-Flag_of_New_Jersey.svg.png",     brackets:[[0,20000,.014],[20000,35000,.0175],[35000,40000,.035],[40000,75000,.05525],[75000,500000,.0637],[500000,1000000,.0897],[1000000,Infinity,.1075]] },
  { name:"New Mexico",     abbr:"NM", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/320px-Flag_of_New_Mexico.svg.png",     brackets:[[0,5500,.017],[5500,11000,.032],[11000,16000,.047],[16000,210000,.049],[210000,Infinity,.059]] },
  { name:"New York",       abbr:"NY", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/320px-Flag_of_New_York.svg.png",       brackets:[[0,8500,.04],[8500,11700,.045],[11700,13900,.0525],[13900,21400,.0585],[21400,80650,.0625],[80650,215400,.0685],[215400,1077550,.0965],[1077550,5000000,.103],[5000000,Infinity,.109]] },
  { name:"North Carolina", abbr:"NC", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/320px-Flag_of_North_Carolina.svg.png", brackets:[[0,Infinity,.045]] },
  { name:"North Dakota",   abbr:"ND", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_North_Dakota.svg/320px-Flag_of_North_Dakota.svg.png",   brackets:[[0,44725,.011],[44725,Infinity,.0204]] },
  { name:"Ohio",           abbr:"OH", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/320px-Flag_of_Ohio.svg.png",           brackets:[[0,26050,0],[26050,46100,.02765],[46100,92150,.03226],[92150,115300,.03688],[115300,Infinity,.0399]] },
  { name:"Oklahoma",       abbr:"OK", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/320px-Flag_of_Oklahoma.svg.png",       brackets:[[0,1000,.0025],[1000,2500,.0075],[2500,3750,.0175],[3750,4900,.0275],[4900,7200,.0375],[7200,Infinity,.0475]] },
  { name:"Oregon",         abbr:"OR", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/320px-Flag_of_Oregon.svg.png",         brackets:[[0,18400,.0475],[18400,46200,.0675],[46200,250000,.0875],[250000,Infinity,.099]] },
  { name:"Pennsylvania",   abbr:"PA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/320px-Flag_of_Pennsylvania.svg.png",   brackets:[[0,Infinity,.0307]] },
  { name:"Rhode Island",   abbr:"RI", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/320px-Flag_of_Rhode_Island.svg.png",   brackets:[[0,77450,.0375],[77450,176050,.0475],[176050,Infinity,.0599]] },
  { name:"South Carolina", abbr:"SC", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/320px-Flag_of_South_Carolina.svg.png", brackets:[[0,3460,0],[3460,17330,.03],[17330,Infinity,.064]] },
  { name:"South Dakota",   abbr:"SD", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/320px-Flag_of_South_Dakota.svg.png",   brackets:[[0,Infinity,0]] },
  { name:"Tennessee",      abbr:"TN", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/320px-Flag_of_Tennessee.svg.png",      brackets:[[0,Infinity,0]] },
  { name:"Texas",          abbr:"TX", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/320px-Flag_of_Texas.svg.png",          brackets:[[0,Infinity,0]] },
  { name:"Utah",           abbr:"UT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Utah.svg/320px-Flag_of_Utah.svg.png",           brackets:[[0,Infinity,.0455]] },
  { name:"Vermont",        abbr:"VT", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/320px-Flag_of_Vermont.svg.png",        brackets:[[0,45400,.0335],[45400,110050,.066],[110050,229550,.076],[229550,Infinity,.0875]] },
  { name:"Virginia",       abbr:"VA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/320px-Flag_of_Virginia.svg.png",       brackets:[[0,3000,.02],[3000,5000,.03],[5000,17000,.05],[17000,Infinity,.0575]] },
  { name:"Washington",     abbr:"WA", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/320px-Flag_of_Washington.svg.png",     brackets:[[0,Infinity,0]] },
  { name:"West Virginia",  abbr:"WV", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/320px-Flag_of_West_Virginia.svg.png",  brackets:[[0,10000,.03],[10000,25000,.04],[25000,40000,.045],[40000,60000,.06],[60000,Infinity,.065]] },
  { name:"Wisconsin",      abbr:"WI", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Wisconsin.svg/320px-Flag_of_Wisconsin.svg.png",      brackets:[[0,13810,.0354],[13810,27630,.0465],[27630,304170,.053],[304170,Infinity,.0765]] },
  { name:"Wyoming",        abbr:"WY", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/320px-Flag_of_Wyoming.svg.png",        brackets:[[0,Infinity,0]] },
  { name:"Washington D.C.",abbr:"DC", flagImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_the_District_of_Columbia.svg/320px-Flag_of_the_District_of_Columbia.svg.png", brackets:[[0,10000,.04],[10000,40000,.06],[40000,60000,.065],[60000,250000,.085],[250000,500000,.0925],[500000,Infinity,.0975]] },
];

const OTHER_COUNTRIES = [
  { name:"England & Wales",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", localPerUSD:0.79,  brackets:[[0,12570,0],[12570,50270,.20],[50270,125140,.40],[125140,Infinity,.45]] },
  { name:"Scotland",          flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", localPerUSD:0.79,  brackets:[[0,12570,0],[12570,14876,.19],[14876,26561,.20],[26561,43662,.21],[43662,75000,.42],[75000,125140,.45],[125140,Infinity,.48]] },
  { name:"France",         flag:"🇫🇷", localPerUSD:0.92,  brackets:[[0,10777,0],[10777,27478,.11],[27478,78570,.30],[78570,168994,.41],[168994,Infinity,.45]] },
  { name:"Germany",        flag:"🇩🇪", localPerUSD:0.92,  brackets:[[0,11784,0],[11784,17005,.14],[17005,66760,.24],[66760,277826,.42],[277826,Infinity,.45]] },
  { name:"Australia",      flag:"🇦🇺", localPerUSD:1.55,  brackets:[[0,18200,0],[18200,45000,.19],[45000,120000,.325],[120000,180000,.37],[180000,Infinity,.45]] },
  { name:"Japan",          flag:"🇯🇵", localPerUSD:149,   brackets:[[0,1950000,.05],[1950000,3300000,.10],[3300000,6950000,.20],[6950000,9000000,.23],[9000000,18000000,.33],[18000000,40000000,.40],[40000000,Infinity,.45]] },
  { name:"Switzerland",    flag:"🇨🇭", localPerUSD:0.90,  brackets:[[0,17800,0],[17800,31600,.0077],[31600,41400,.0088],[41400,55200,.026],[55200,72500,.033],[72500,78100,.0586],[78100,103600,.0686],[103600,134600,.0786],[134600,176000,.0886],[176000,Infinity,.115]] },
  { name:"Singapore",      flag:"🇸🇬", localPerUSD:1.34,  brackets:[[0,20000,0],[20000,30000,.02],[30000,40000,.035],[40000,80000,.07],[80000,120000,.115],[120000,160000,.15],[160000,200000,.18],[200000,240000,.19],[240000,280000,.195],[280000,320000,.20],[320000,Infinity,.22]] },
  { name:"Sweden",         flag:"🇸🇪", localPerUSD:10.42, brackets:[[0,120000,0],[120000,509300,.32],[509300,Infinity,.52]] },
  { name:"Norway",         flag:"🇳🇴", localPerUSD:10.55, brackets:[[0,190350,.22],[190350,267900,.238],[267900,643800,.262],[643800,969200,.358],[969200,Infinity,.388]] },
  { name:"Denmark",        flag:"🇩🇰", localPerUSD:6.89,  brackets:[[0,568900,.37],[568900,Infinity,.52]] },
  { name:"Netherlands",    flag:"🇳🇱", localPerUSD:0.92,  brackets:[[0,73031,.3697],[73031,Infinity,.495]] },
  { name:"Spain",          flag:"🇪🇸", localPerUSD:0.92,  brackets:[[0,12450,.19],[12450,20200,.24],[20200,35200,.30],[35200,60000,.37],[60000,300000,.45],[300000,Infinity,.47]] },
  { name:"Italy",          flag:"🇮🇹", localPerUSD:0.92,  brackets:[[0,28000,.23],[28000,50000,.35],[50000,Infinity,.43]] },
  { name:"Portugal",       flag:"🇵🇹", localPerUSD:0.92,  brackets:[[0,7703,.1325],[7703,11623,.18],[11623,16472,.23],[16472,21321,.26],[21321,27146,.3275],[27146,39791,.37],[39791,51997,.435],[51997,81199,.45],[81199,Infinity,.48]] },
  { name:"Ireland",        flag:"🇮🇪", localPerUSD:0.92,  brackets:[[0,42000,.20],[42000,Infinity,.40]] },
  { name:"New Zealand",    flag:"🇳🇿", localPerUSD:1.63,  brackets:[[0,14000,.105],[14000,48000,.175],[48000,70000,.30],[70000,180000,.33],[180000,Infinity,.39]] },
  { name:"South Korea",    flag:"🇰🇷", localPerUSD:1330,  brackets:[[0,14000000,.06],[14000000,50000000,.15],[50000000,88000000,.24],[88000000,150000000,.35],[150000000,300000000,.38],[300000000,500000000,.40],[500000000,1000000000,.42],[1000000000,Infinity,.45]] },
  { name:"India",          flag:"🇮🇳", localPerUSD:83.5,  brackets:[[0,300000,0],[300000,600000,.05],[600000,900000,.10],[900000,1200000,.15],[1200000,1500000,.20],[1500000,Infinity,.30]] },
  { name:"China",          flag:"🇨🇳", localPerUSD:7.24,  brackets:[[0,36000,.03],[36000,144000,.10],[144000,300000,.20],[300000,420000,.25],[420000,660000,.30],[660000,960000,.35],[960000,Infinity,.45]] },
  { name:"Brazil",         flag:"🇧🇷", localPerUSD:4.97,  brackets:[[0,27110,0],[27110,33919,.075],[33919,45012,.15],[45012,55976,.225],[55976,Infinity,.275]] },
  { name:"Mexico",         flag:"🇲🇽", localPerUSD:17.15, brackets:[[0,8952,.0192],[8952,75984,.064],[75984,133536,.1088],[133536,155232,.16],[155232,185852,.1792],[185852,374837,.2136],[374837,590796,.2352],[590796,1127926,.30],[1127926,1503902,.32],[1503902,Infinity,.35]] },
  { name:"South Africa",   flag:"🇿🇦", localPerUSD:18.6,  brackets:[[0,237100,.18],[237100,370500,.26],[370500,512800,.31],[512800,673000,.36],[673000,857900,.39],[857900,1817000,.41],[1817000,Infinity,.45]] },
  { name:"Russia",         flag:"🇷🇺", localPerUSD:92,    brackets:[[0,5000000,.13],[5000000,Infinity,.15]] },
  { name:"Thailand",       flag:"🇹🇭", localPerUSD:35.2,  brackets:[[0,150000,0],[150000,300000,.05],[300000,500000,.10],[500000,750000,.15],[750000,1000000,.20],[1000000,2000000,.25],[2000000,5000000,.30],[5000000,Infinity,.35]] },
  { name:"Poland",         flag:"🇵🇱", localPerUSD:4.05,  brackets:[[0,120000,.12],[120000,Infinity,.32]] },
  { name:"UAE",            flag:"🇦🇪", localPerUSD:3.67,  brackets:[[0,Infinity,0]] },
  { name:"Saudi Arabia",   flag:"🇸🇦", localPerUSD:3.75,  brackets:[[0,Infinity,0]] },
  { name:"Hong Kong",      flag:"🇭🇰", localPerUSD:7.82,  brackets:[[0,50000,.02],[50000,100000,.06],[100000,150000,.10],[150000,200000,.14],[200000,Infinity,.17]] },
  { name:"Greece",          flag:"🇬🇷", localPerUSD:0.92,  brackets:[[0,10000,0],[10000,20000,.09],[20000,30000,.28],[30000,40000,.36],[40000,Infinity,.44]] },
  { name:"Finland",         flag:"🇫🇮", localPerUSD:5.42,  brackets:[[0,19900,0],[19900,29700,.0641],[29700,49000,.1745],[49000,85800,.2180],[85800,Infinity,.3160]] },
  { name:"Austria",         flag:"🇦🇹", localPerUSD:0.92,  brackets:[[0,11693,0],[11693,19134,.20],[19134,32075,.30],[32075,62080,.41],[62080,93120,.48],[93120,1000000,.50],[1000000,Infinity,.55]] },
  { name:"Belgium",         flag:"🇧🇪", localPerUSD:0.92,  brackets:[[0,15820,0],[15820,27920,.25],[27920,48320,.40],[48320,Infinity,.50]] },
  { name:"Czech Republic",  flag:"🇨🇿", localPerUSD:23.2,  brackets:[[0,1582812,.15],[1582812,Infinity,.23]] },
  { name:"Hungary",         flag:"🇭🇺", localPerUSD:356,   brackets:[[0,Infinity,.15]] },
  { name:"Romania",         flag:"🇷🇴", localPerUSD:4.68,  brackets:[[0,Infinity,.10]] },
  { name:"Israel",          flag:"🇮🇱", localPerUSD:3.70,  brackets:[[0,81480,.10],[81480,116760,.14],[116760,187440,.20],[187440,260520,.31],[260520,542160,.35],[542160,698280,.47],[698280,Infinity,.50]] },
  { name:"Turkey",          flag:"🇹🇷", localPerUSD:32.5,  brackets:[[0,110000,.15],[110000,230000,.20],[230000,580000,.27],[580000,3000000,.35],[3000000,Infinity,.40]] },
  { name:"Chile",           flag:"🇨🇱", localPerUSD:950,   brackets:[[0,8380560,0],[8380560,18657240,.04],[18657240,31095400,.08],[31095400,43533560,.135],[43533560,56221480,.23],[56221480,74962040,.304],[74962040,Infinity,.35]] },
  { name:"Argentina",       flag:"🇦🇷", localPerUSD:900,   brackets:[[0,1030700,0],[1030700,2061400,.05],[2061400,3092100,.09],[3092100,4122800,.12],[4122800,5153500,.15],[5153500,6184200,.19],[6184200,7729250,.23],[7729250,11593875,.27],[11593875,15458500,.31],[15458500,Infinity,.35]] },
  { name:"Colombia",        flag:"🇨🇴", localPerUSD:3900,  brackets:[[0,52000000,0],[52000000,80000000,.19],[80000000,120000000,.28],[120000000,Infinity,.33]] },
  { name:"Malaysia",        flag:"🇲🇾", localPerUSD:4.72,  brackets:[[0,5000,0],[5000,20000,.01],[20000,35000,.03],[35000,50000,.08],[50000,70000,.13],[70000,100000,.21],[100000,250000,.24],[250000,400000,.245],[400000,600000,.25],[600000,1000000,.26],[1000000,2000000,.28],[2000000,Infinity,.30]] },
  { name:"Philippines",     flag:"🇵🇭", localPerUSD:56.5,  brackets:[[0,250000,0],[250000,400000,.15],[400000,800000,.20],[800000,2000000,.25],[2000000,8000000,.30],[8000000,Infinity,.35]] },
  { name:"Indonesia",       flag:"🇮🇩", localPerUSD:15700, brackets:[[0,60000000,.05],[60000000,250000000,.15],[250000000,500000000,.25],[500000000,5000000000,.30],[5000000000,Infinity,.35]] },
  { name:"Vietnam",         flag:"🇻🇳", localPerUSD:25000, brackets:[[0,60000000,.05],[60000000,120000000,.10],[120000000,216000000,.15],[216000000,384000000,.20],[384000000,624000000,.25],[624000000,960000000,.30],[960000000,Infinity,.35]] },
  { name:"Egypt",           flag:"🇪🇬", localPerUSD:48.5,  brackets:[[0,30000,0],[30000,45000,.10],[45000,60000,.15],[60000,200000,.20],[200000,400000,.225],[400000,Infinity,.25]] },
  { name:"Nigeria",         flag:"🇳🇬", localPerUSD:1580,  brackets:[[0,300000,.07],[300000,600000,.11],[600000,1100000,.15],[1100000,1600000,.19],[1600000,3200000,.21],[3200000,Infinity,.24]] },
  { name:"Kenya",           flag:"🇰🇪", localPerUSD:130,   brackets:[[0,288000,.10],[288000,388000,.25],[388000,6000000,.30],[6000000,Infinity,.35]] },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function applyBrackets(income, brackets) {
  let tax = 0;
  for (const [min, max, rate] of brackets) {
    if (income <= min) break;
    tax += (Math.min(income, max) - min) * rate;
  }
  return tax;
}

function calcEntry(salaryUSD, localPerUSD, fedBrackets, provBrackets) {
  const local     = salaryUSD * localPerUSD;
  const fedLocal  = applyBrackets(local, fedBrackets);
  const provLocal = provBrackets ? applyBrackets(local, provBrackets) : 0;
  const taxUSD      = fedLocal  / localPerUSD;
  const provTaxUSD  = provLocal / localPerUSD;
  const totalTaxUSD = taxUSD + provTaxUSD;
  const netUSD      = salaryUSD - totalTaxUSD;
  const eff  = salaryUSD > 0 ? (totalTaxUSD / salaryUSD) * 100 : 0;
  const fed  = salaryUSD > 0 ? (taxUSD      / salaryUSD) * 100 : 0;
  const prov = salaryUSD > 0 ? (provTaxUSD  / salaryUSD) * 100 : 0;
  return { taxUSD, provTaxUSD, totalTaxUSD, netUSD, effectiveRate:eff, fedRate:fed, provRate:prov };
}

function makeFmt(currCode, perUSD) {
  return (usdVal) =>
    new Intl.NumberFormat("fr-CA", { style:"currency", currency:currCode, maximumFractionDigits:0 })
      .format(usdVal * perUSD);
}

function rateColor(rate) {
  if (rate === 0) return "#4fffb0";
  if (rate < 15)  return "#77eeaa";
  if (rate < 25)  return "#eecc44";
  if (rate < 35)  return "#ee9933";
  return "#ee5555";
}

// ── Flag image ────────────────────────────────────────────────────────────
function FlagImg({ src, abbr, size = 22 }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{ width:size+8, height:size*0.65, borderRadius:2, background:"#1a2a3a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontFamily:"'DM Mono',monospace", color:"#80a8c0", fontWeight:700, letterSpacing:"0.04em", flexShrink:0 }}>
        {abbr}
      </div>
    );
  }
  return (
    <img src={src} alt={abbr} onError={() => setErr(true)}
      style={{ width:size+8, height:size*0.65, objectFit:"cover", borderRadius:2, flexShrink:0, display:"block" }} />
  );
}

// ── Language switcher ─────────────────────────────────────────────────────
const LANGS = [
  { code:"en", tooltip:"English",  flag:"🇬🇧" },
  { code:"fr", tooltip:"Français", flag:"🇫🇷" },
  { code:"es", tooltip:"Español",  flag:"🇪🇸" },
];

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
      {LANGS.map(l => (
        <div key={l.code} onClick={() => setLang(l.code)} title={l.tooltip}
          style={{
            background: lang===l.code ? "rgba(79,255,176,0.12)" : "rgba(255,255,255,0.04)",
            border: `2px solid ${lang===l.code ? "#4fffb0" : "rgba(255,255,255,0.12)"}`,
            borderRadius:8, padding:"5px 8px", cursor:"pointer",
            transition:"all 0.18s",
            opacity: lang===l.code ? 1 : 0.6,
            transform: lang===l.code ? "scale(1.12)" : "scale(1)",
            boxShadow: lang===l.code ? "0 0 10px rgba(79,255,176,0.3)" : "none",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
          <span style={{ fontSize:26, lineHeight:1, display:"block" }}>{l.flag}</span>
        </div>
      ))}
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────
function DetailPanel({ label, flagEl, subtitle, calc, hasProv, fmt, currCode, onClose, t }) {
  return (
    <div style={{ background:"linear-gradient(135deg,#08131e,#0b1a28)", border:"1px solid #4fffb0", borderRadius:13, padding:"20px 22px", marginBottom:18, animation:"fi 0.3s ease", boxShadow:"0 0 30px rgba(79,255,176,0.04)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {flagEl}
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>{label}</div>
            {subtitle && <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#4fffb0" }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", background:"#0d1e32", color:"#4fffb0", border:"1px solid #1a3040", borderRadius:4, padding:"3px 7px", letterSpacing:"0.1em" }}>{currCode}</span>
          <button onClick={onClose} style={{ background:"none", border:"1px solid #1a2c3a", borderRadius:6, color:"#7898b8", padding:"4px 10px", cursor:"pointer", fontSize:10 }}>✕</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(95px,1fr))", gap:8, marginBottom:16 }}>
        {[
          { label:t.gross,     value:fmt(calc.netUSD + calc.totalTaxUSD), color:"#7799cc" },
          ...(hasProv ? [
            { label:t.federal,   value:fmt(calc.taxUSD),      color:"#dd7733" },
            { label:t.provincial,value:fmt(calc.provTaxUSD),  color:"#ddaa33" },
            { label:t.totalTax,  value:fmt(calc.totalTaxUSD), color:"#dd4444" },
          ] : [
            { label:t.tax,       value:fmt(calc.totalTaxUSD), color:"#dd4444" },
          ]),
          { label:t.net,       value:fmt(calc.netUSD),        color:"#4fffb0" },
        ].map(({ label:lbl, value, color }) => (
          <div key={lbl} style={{ background:"#040709", borderRadius:7, padding:"11px 12px" }}>
            <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.1em", marginBottom:4 }}>{lbl}</div>
            <div style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:500, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.1em" }}>{t.effectiveRate}</span>
          <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"#ff9955" }}>{calc.effectiveRate.toFixed(1)}%</span>
        </div>
        <div style={{ background:"#040709", borderRadius:3, height:6, overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:3, width:`${Math.min(calc.effectiveRate,65)/65*100}%`, background:"linear-gradient(90deg,#4fffb0,#ff9955)", transition:"width 0.6s" }} />
        </div>
        {hasProv && (
          <div style={{ display:"flex", gap:14, marginTop:7, flexWrap:"wrap" }}>
            <span style={{ fontSize:10, color:"#7a4422", fontFamily:"'DM Mono',monospace" }}>{t.fedLabel} : {calc.fedRate.toFixed(1)}%</span>
            <span style={{ fontSize:10, color:"#886622", fontFamily:"'DM Mono',monospace" }}>{t.provLabel} : {calc.provRate.toFixed(1)}%</span>
            <span style={{ fontSize:10, color:"#994433", fontFamily:"'DM Mono',monospace", fontWeight:600 }}>{t.totalLabel} : {calc.effectiveRate.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-row (province / state) ────────────────────────────────────────────
function SubRow({ name, abbr, flagImg, subtitle, isSelected, calc, maxNetUSD, fmt, onClick, t }) {
  const rc = rateColor(calc?.effectiveRate ?? 0);
  const barPct = maxNetUSD > 0 && calc ? (calc.netUSD / maxNetUSD) * 100 : 0;
  return (
    <div onClick={onClick}
      style={{ background:isSelected?"#0b1e2e":"#0c1525", border:`1px solid ${isSelected?"#4fffb0":"#1a2e48"}`, borderRadius:7, padding:"8px 12px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.15s" }}>
      <FlagImg src={flagImg} abbr={abbr} size={18} />
      <div style={{ minWidth:140, flex:"0 0 140px" }}>
        <div style={{ fontSize:11, fontWeight:500, color:isSelected?"#4fffb0":"#a0a8bc" }}>{name}</div>
        <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"#7090b0" }}>{subtitle}</div>
      </div>
      <div style={{ flex:1, minWidth:30 }}>
        <div style={{ background:"#050809", borderRadius:3, height:3, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${barPct}%`, background:isSelected?"#4fffb0":"#162535", borderRadius:3, transition:"width 0.5s" }} />
        </div>
      </div>
      <div style={{ textAlign:"right", minWidth:88 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:500, color:isSelected?"#4fffb0":"#b8bcc8" }}>{fmt(calc.netUSD)}</div>
        <div style={{ fontSize:7, color:"#8aaac8", fontFamily:"'DM Mono',monospace" }}>{t.netYear}</div>
      </div>
      <div style={{ padding:"2px 6px", borderRadius:4, fontSize:8, fontFamily:"'DM Mono',monospace", fontWeight:600, background:"rgba(0,0,0,0.5)", color:rc, border:`1px solid ${rc}22`, minWidth:44, textAlign:"center" }}>
        {calc.effectiveRate===0 ? "0%" : `${calc.effectiveRate.toFixed(1)}%`}
      </div>
    </div>
  );
}

// ── Country row ───────────────────────────────────────────────────────────
function CountryRow({ rank, flag, name, isSelected, netUSD, effectiveRate, maxNetUSD, fmt, onClick, t }) {
  const rc = rateColor(effectiveRate);
  const barPct = maxNetUSD > 0 ? (netUSD / maxNetUSD) * 100 : 0;
  return (
    <div onClick={onClick}
      style={{ background:isSelected?"#0b1e2e":"#0c1525", border:`1px solid ${isSelected?"#4fffb0":"#1a2e48"}`, borderRadius:8, padding:"9px 13px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.15s" }}>
      <div style={{ width:19,height:19,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,fontFamily:"'DM Mono',monospace",
        background:rank===1?"rgba(79,255,176,0.1)":rank<4?"rgba(100,150,255,0.07)":"#0c1525",
        color:rank===1?"#4fffb0":rank===2?"#5588ff":rank===3?"#ffaa30":"#8aaac8",
        border:`1px solid ${rank===1?"rgba(79,255,176,0.2)":"#1a2e48"}`
      }}>{rank}</div>
      <span style={{ fontSize:17, minWidth:22 }}>{flag}</span>
      <div style={{ minWidth:140, flex:"0 0 140px" }}>
        <div style={{ fontSize:12, fontWeight:500, color:isSelected?"#4fffb0":"#b0b8cc" }}>{name}</div>
      </div>
      <div style={{ flex:1, minWidth:30 }}>
        <div style={{ background:"#050809", borderRadius:3, height:4, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${barPct}%`, background:isSelected?"#4fffb0":"#162535", borderRadius:3, transition:"width 0.5s" }} />
        </div>
      </div>
      <div style={{ textAlign:"right", minWidth:92 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:500, color:isSelected?"#4fffb0":"#c8ccd8" }}>{fmt(netUSD)}</div>
        <div style={{ fontSize:8, color:"#8aaac8", fontFamily:"'DM Mono',monospace" }}>{t.netYear}</div>
      </div>
      <div style={{ padding:"2px 7px", borderRadius:4, fontSize:9, fontFamily:"'DM Mono',monospace", fontWeight:600, background:"rgba(0,0,0,0.5)", color:rc, border:`1px solid ${rc}22`, minWidth:48, textAlign:"center" }}>
        {effectiveRate===0 ? "0%" : `${effectiveRate.toFixed(1)}%`}
      </div>
    </div>
  );
}

// ── Group header ──────────────────────────────────────────────────────────
function GroupHeader({ rank, flag, name, subtitle, isOpen, onToggle, t }) {
  return (
    <div onClick={onToggle}
      style={{ background:"#0d1e32", border:"1px solid #1a2e40", borderRadius:8, padding:"9px 13px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.15s" }}>
      <div style={{ width:19,height:19,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,fontFamily:"'DM Mono',monospace",
        background:rank===1?"rgba(79,255,176,0.1)":rank<4?"rgba(100,150,255,0.07)":"#0c1525",
        color:rank===1?"#4fffb0":rank===2?"#5588ff":rank===3?"#ffaa30":"#8aaac8",
        border:`1px solid ${rank===1?"rgba(79,255,176,0.2)":"#1a2e48"}`
      }}>{rank}</div>
      <span style={{ fontSize:17 }}>{flag}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:600, color:"#aabbd8" }}>{name}</div>
        <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"#7aa0c0" }}>{subtitle}</div>
      </div>
      <div style={{ fontSize:10, color:"#7898b8", fontFamily:"'DM Mono',monospace" }}>
        {isOpen ? t.collapse : t.seeProvinces}
      </div>
    </div>
  );
}


// ── Section: About + How It Works ────────────────────────────────────────
function AboutSection({ t }) {
  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0" }}>
      {/* About */}
      <div style={{ marginBottom:36 }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:10 }}>{t.aboutTitle}</h2>
        <p style={{ fontSize:14, color:"#9ab8d0", lineHeight:1.8, maxWidth:760 }}>{t.aboutText}</p>
      </div>
      {/* How it works */}
      <div style={{ marginBottom:36 }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:16 }}>{t.howTitle}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
          {t.howSteps.map((step,i) => (
            <div key={i} style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"16px 18px" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{step.icon}</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#c0d8f0", marginBottom:6 }}>{step.title}</div>
              <div style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.7 }}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section: FAQ ─────────────────────────────────────────────────────────
function FAQSection({ t }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0" }}>
      <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:16 }}>{t.faqTitle}</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {t.faqs.map((faq, i) => (
          <div key={i} style={{ background:"#0d1a2e", border:`1px solid ${open===i?"#4fffb0":"#1e3050"}`, borderRadius:10, overflow:"hidden", transition:"border 0.2s" }}>
            <div onClick={() => setOpen(open===i ? null : i)}
              style={{ padding:"14px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:13, fontWeight:500, color:"#c0d0e8", lineHeight:1.5 }}>{faq.q}</span>
              <span style={{ fontSize:16, color:"#4fffb0", flexShrink:0 }}>{open===i ? "▲" : "▼"}</span>
            </div>
            {open===i && (
              <div style={{ padding:"0 18px 16px", fontSize:13, color:"#7a9ab8", lineHeight:1.8, borderTop:"1px solid #1e3050" }}>
                <div style={{ paddingTop:12 }}>{faq.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section: Tips ─────────────────────────────────────────────────────────
function TipsSection({ t }) {
  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0" }}>
      <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:16 }}>{t.tipsTitle}</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
        {t.tips.map((tip, i) => (
          <div key={i} style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"18px" }}>
            <div style={{ fontSize:26, marginBottom:10 }}>{tip.icon}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#c0d8f0", marginBottom:8 }}>{tip.title}</div>
            <div style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.7 }}>{tip.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section: Privacy & About ─────────────────────────────────────────────
function PrivacySection({ t }) {
  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
        <div style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"20px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:10 }}>{t.privacyTitle}</h2>
          <p style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.8 }}>{t.privacyText}</p>
        </div>
        <div style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"20px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:"0.08em", color:"#c8dff0", marginBottom:10 }}>{t.aboutPageTitle}</h2>
          <p style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.8 }}>{t.aboutPageText}</p>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{ maxWidth:980, margin:"40px auto 0", padding:"24px 18px 32px", borderTop:"1px solid #1e3050" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, letterSpacing:"0.1em", color:"#4fffb0", marginBottom:4 }}>TaxComparator.app</div>
          <p style={{ fontSize:11, color:"#5a7a98", maxWidth:500 }}>{t.footerDisclaimer}</p>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {t.footerLinks.map((link, i) => (
            <span key={i} style={{ fontSize:12, color:"#6a9ab8", cursor:"pointer", textDecoration:"underline" }}
              onClick={() => alert(i===0 ? t.privacyText : i===1 ? t.aboutPageText : t.contactText)}>
              {link}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop:16, fontSize:10, color:"#3a5570", textAlign:"center" }}>
        © {new Date().getFullYear()} TaxComparator.app — {t.footerDisclaimer}
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(() => {
    const bl = (navigator.language || navigator.userLanguage || "en").slice(0,2).toLowerCase();
    if (bl === "fr") return "fr";
    if (bl === "es") return "es";
    return "en";
  });
  const [salary, setSalary]    = useState("");
  const [inputCurrency, setIC] = useState("CAD");
  const [search, setSearch]    = useState("");
  const [selected, setSelected]= useState(null);
  const [caOpen, setCaOpen]    = useState(false);
  const [usOpen, setUsOpen]    = useState(false);
  const [period, setPeriod]    = useState("annual");

  const t               = T[lang];
  const CURRENCY_OPTIONS = t.currencies;
  const currInfo        = CURRENCY_OPTIONS.find(c => c.code === inputCurrency) || CURRENCY_OPTIONS[0];
  const rawNum          = parseFloat(salary.replace(/[\s,\u00a0]/g,"")) || 0;
  const salaryUSD       = (period === "monthly" ? rawNum * 12 : rawNum) / currInfo.perUSD;
  const displayDivisor  = period === "monthly" ? 12 : 1;
  const fmt             = (usdVal) => makeFmt(inputCurrency, currInfo.perUSD)(usdVal / displayDivisor);

  const provCalcs = useMemo(() => {
    if (!salaryUSD) return {};
    return Object.fromEntries(PROVINCES_CA.map(p => [p.name, calcEntry(salaryUSD, CA_USD, CA_FEDERAL, p.brackets)]));
  }, [salaryUSD]);

  const stateCalcs = useMemo(() => {
    if (!salaryUSD) return {};
    return Object.fromEntries(STATES_US.map(s => [s.name, calcEntry(salaryUSD, 1, US_FEDERAL, s.brackets)]));
  }, [salaryUSD]);

  const countryCalcs = useMemo(() => {
    if (!salaryUSD) return {};
    return Object.fromEntries(OTHER_COUNTRIES.map(c => [c.name, calcEntry(salaryUSD, c.localPerUSD, c.brackets, null)]));
  }, [salaryUSD]);

  const sortedList = useMemo(() => {
    if (!salaryUSD) return [];
    const caNet = Math.max(...PROVINCES_CA.map(p => provCalcs[p.name]?.netUSD || 0));
    const usNet = Math.max(...STATES_US.map(s => stateCalcs[s.name]?.netUSD || 0));
    return [
      { id:"__CA__", isGroup:true, group:"CA", flag:"🇨🇦", name:t.canada, netUSD:caNet, effectiveRate:0 },
      { id:"__US__", isGroup:true, group:"US", flag:"🇺🇸", name:t.usa,    netUSD:usNet, effectiveRate:0 },
      ...OTHER_COUNTRIES.map(c => ({ id:c.name, isGroup:false, flag:c.flag, name:c.name, ...countryCalcs[c.name] })),
    ].sort((a,b) => b.netUSD - a.netUSD);
  }, [salaryUSD, provCalcs, stateCalcs, countryCalcs, lang]);

  const maxNet       = sortedList[0]?.netUSD || 1;
  const sortedProvs  = useMemo(() => [...PROVINCES_CA].sort((a,b) => (provCalcs[b.name]?.netUSD||0)-(provCalcs[a.name]?.netUSD||0)), [provCalcs]);
  const sortedStates = useMemo(() => [...STATES_US].sort((a,b)    => (stateCalcs[b.name]?.netUSD||0)-(stateCalcs[a.name]?.netUSD||0)), [stateCalcs]);

  // Resolve detail panel
  let detail = null;
  if (selected && salaryUSD) {
    const prov    = PROVINCES_CA.find(p => p.name === selected);
    const state   = STATES_US.find(s => s.name === selected);
    const country = OTHER_COUNTRIES.find(c => c.name === selected);
    if (prov)     detail = { label:prov.name,    flagEl:<FlagImg src={prov.flagImg}   abbr={prov.abbr}   size={24}/>, subtitle:t.caDetail, calc:provCalcs[prov.name],       hasProv:true  };
    else if (state)   detail = { label:state.name,   flagEl:<FlagImg src={state.flagImg}  abbr={state.abbr}  size={24}/>, subtitle:t.usDetail, calc:stateCalcs[state.name],     hasProv:true  };
    else if (country) detail = { label:country.name, flagEl:<span style={{fontSize:26}}>{country.flag}</span>,           subtitle:null,        calc:countryCalcs[country.name], hasProv:false };
  }

  const match = (name) => !search || name.toLowerCase().includes(search.toLowerCase());

  return (
    <div style={{ minHeight:"100vh", background:"#0a0f1a", fontFamily:"'DM Sans',sans-serif", color:"#e8eaf0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0d1117}
        ::-webkit-scrollbar-thumb{background:#2a3045;border-radius:2px}
        .inp:focus{outline:none;border-color:#4fffb0 !important;box-shadow:0 0 0 3px rgba(79,255,176,0.07)}
        .row:hover{background:#0e1520 !important}
        .grow:hover{background:#0c1d2c !important}
        @keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
        select{appearance:none;-webkit-appearance:none}
        select option{background:#0d1520}
      `}</style>

      {/* ── Header ── */}
      <div style={{ background:"linear-gradient(180deg,#0d1520,#080b12)", borderBottom:"1px solid #131d2c", padding:"18px 22px 16px" }}>
        <div style={{ maxWidth:980, margin:"0 auto", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
              <div style={{ width:5, height:28, background:"#4fffb0", borderRadius:3 }} />
              <h1 style={{ fontFamily:"'Bebas Neue'", fontSize:28, letterSpacing:"0.08em", color:"#fff", lineHeight:1 }}>{t.title}</h1>
            </div>
            <p style={{ color:"#8aaac8", fontSize:10, marginLeft:15, fontFamily:"'DM Mono',monospace" }}>
              {t.subtitle(OTHER_COUNTRIES.length, PROVINCES_CA.length, STATES_US.length)}
            </p>
          </div>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>

      <AboutSection t={t} />

      <div style={{ maxWidth:980, margin:"0 auto", padding:"20px 18px" }}>

        {/* ── Salary input ── */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:"block", fontSize:9, fontFamily:"'DM Mono',monospace", color:"#4fffb0", letterSpacing:"0.16em", marginBottom:7 }}>{t.salaryLabel}</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <div style={{ position:"relative", flex:"1 1 180px", maxWidth:340 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#4fffb0", fontSize:15, fontFamily:"'DM Mono',monospace" }}>{currInfo.symbol}</span>
              <input className="inp" type="text" value={salary}
                onChange={e => { const r=e.target.value.replace(/[^0-9]/g,""); setSalary(r?Number(r).toLocaleString("fr-CA"):""); }}
                placeholder={t.salaryPlaceholder}
                style={{ width:"100%", padding:"12px 12px 12px 30px", background:"#0d1a28", border:"1.5px solid #192838", borderRadius:9, color:"#fff", fontSize:15, fontFamily:"'DM Mono',monospace", fontWeight:500, transition:"all 0.2s" }}
              />
            </div>
            <select className="inp" value={inputCurrency} onChange={e => setIC(e.target.value)}
              style={{ background:"#0d1a28", border:"1.5px solid #192838", borderRadius:9, color:"#c0c8d8", padding:"12px 14px", fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"pointer" }}>
              {CURRENCY_OPTIONS.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
            <div style={{ display:"flex", borderRadius:9, overflow:"hidden", border:"1.5px solid #192838", flexShrink:0 }}>
              {["annual","monthly"].map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  style={{ background: period===p ? "rgba(79,255,176,0.12)" : "#0d1a28", border:"none", borderRight: p==="annual" ? "1px solid #192838" : "none", color: period===p ? "#4fffb0" : "#8898b8", padding:"12px 14px", fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"pointer", fontWeight: period===p ? 600 : 400, transition:"all 0.18s", whiteSpace:"nowrap" }}>
                  {p === "annual" ? t.periodAnnual : t.periodMonthly}
                </button>
              ))}
            </div>
          </div>
        </div>

        {salaryUSD > 0 ? (
          <div style={{ animation:"fi 0.3s ease" }}>

            {/* Detail panel */}
            {detail && <DetailPanel {...detail} fmt={fmt} currCode={inputCurrency} onClose={() => setSelected(null)} t={t} />}

            {/* List header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:8 }}>
              <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.14em" }}>{t.rankingLabel}</span>
              <input className="inp" type="text" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
                style={{ background:"#0d1a2e", border:"1px solid #152030", borderRadius:7, color:"#c0c8d8", padding:"6px 11px", fontSize:11, width:190, transition:"all 0.2s" }}
              />
            </div>

            {/* List */}
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {sortedList
                .filter(r => match(r.name) || (r.group==="CA" && sortedProvs.some(p=>match(p.name))) || (r.group==="US" && sortedStates.some(s=>match(s.name))))
                .map((r, i) => {
                  const rank = i + 1;

                  if (r.id === "__CA__") return (
                    <div key="__CA__">
                      <GroupHeader rank={rank} flag="🇨🇦" name={t.canada} subtitle={t.caSubtitle} isOpen={caOpen} onToggle={() => setCaOpen(o=>!o)} t={t} />
                      {caOpen && (
                        <div style={{ marginLeft:14, marginTop:3, display:"flex", flexDirection:"column", gap:3 }}>
                          {sortedProvs.filter(p=>match(p.name)).map(p => (
                            <SubRow key={p.name} name={p.name} abbr={p.abbr} flagImg={p.flagImg}
                              subtitle={t.fedProv} isSelected={selected===p.name}
                              calc={provCalcs[p.name]} maxNetUSD={maxNet} fmt={fmt} t={t}
                              onClick={() => setSelected(prev => prev===p.name ? null : p.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  if (r.id === "__US__") return (
                    <div key="__US__">
                      <GroupHeader rank={rank} flag="🇺🇸" name={t.usa} subtitle={t.usSubtitle} isOpen={usOpen} onToggle={() => setUsOpen(o=>!o)} t={t} />
                      {usOpen && (
                        <div style={{ marginLeft:14, marginTop:3, display:"flex", flexDirection:"column", gap:3 }}>
                          {sortedStates.filter(s=>match(s.name)).map(s => (
                            <SubRow key={s.name} name={s.name} abbr={s.abbr} flagImg={s.flagImg}
                              subtitle={t.fedState} isSelected={selected===s.name}
                              calc={stateCalcs[s.name]} maxNetUSD={maxNet} fmt={fmt} t={t}
                              onClick={() => setSelected(prev => prev===s.name ? null : s.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <CountryRow key={r.id} rank={rank} flag={r.flag} name={r.name}
                      isSelected={selected===r.id}
                      netUSD={r.netUSD} effectiveRate={r.effectiveRate} maxNetUSD={maxNet} fmt={fmt} t={t}
                      onClick={() => setSelected(prev => prev===r.id ? null : r.id)}
                    />
                  );
                })}
            </div>

            <div style={{ marginTop:16, padding:"10px 14px", background:"#0c1525", borderRadius:8, border:"1px solid #101820" }}>
              <p style={{ fontSize:9, color:"#8ab0cc", lineHeight:1.9, fontFamily:"'DM Mono',monospace" }}>{t.disclaimer}</p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"50px 20px" }}>
            <div style={{ fontSize:52, marginBottom:12 }}>💰</div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, letterSpacing:"0.1em", marginBottom:5, color:"#88b0cc" }}>{t.emptyTitle}</div>
            <div style={{ fontSize:11, color:"#7ab0d0", fontFamily:"'DM Mono',monospace" }}>
              {t.emptySubtitle(OTHER_COUNTRIES.length, PROVINCES_CA.length, STATES_US.length)}
            </div>
          </div>
        )}
      </div>
      <FAQSection t={t} />
      <TipsSection t={t} />
      <PrivacySection t={t} />
      <Footer t={t} />
    </div>
  );
}
