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
    caSubtitle: "13 prov. & territories",
    usSubtitle: "51 regions",
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
    bigMacLabel: "🍔 Big Mac Index",
    bigMacExplainTitle: "What is the Big Mac Index?",
    bigMacExplain: "Created by The Economist in 1986, the Big Mac Index uses the price of a McDonald's Big Mac to compare the purchasing power of currencies worldwide. Since a Big Mac is made to the same recipe in ~100 countries, its price difference reveals whether a currency is over or under-valued against the USD.",
    netBigMacLabel: "🍔 NetBigMac Index",
    netBigMacExplainTitle: "What is the NetBigMac Index?",
    netBigMacExplain: "The NetBigMac Index is an original NetPay.tax indicator. It measures how many Big Macs you can buy with $100 of gross salary once income tax is removed. It combines the tax burden and local cost of living into one intuitive number — the higher, the better your real purchasing power.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "per $100 gross",
    bigMacPrice: "Local price",
    shareLabel: "Share",
    shareMsg: (country, net, curr, score) => `In ${country}, I keep ${net} ${curr} after tax — NetBigMac score: ${score} 🍔\nCalculate yours: https://netpay.tax`,
    shareMsgSite: "Free income tax calculator — compare your net salary in 96+ countries, all Canadian provinces and US states 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Starbucks Index",
    starbucksExplainTitle: "What is the Starbucks Index?",
    starbucksExplain: "The price of a Starbucks Tall Latte in USD, used to compare the cost of everyday goods across countries. Like the Big Mac Index, it reveals differences in purchasing power and local price levels.",
    rentLabel: "🏠 Rent Index",
    rentExplainTitle: "What is the Rent Index?",
    rentExplain: "The estimated monthly cost of a 1-bedroom apartment in the city center, in USD. Compared to your net monthly salary, it shows what percentage of your income goes to housing — a key indicator of quality of life.",
    rentOfNet: (pct) => `${pct}% of net monthly salary`,
    groceryLabel: "🛒 Grocery Index",
    groceryExplainTitle: "What is the Grocery Index?",
    groceryExplain: "The estimated monthly cost of a standard grocery basket for one person (including food staples, fresh produce, and basic household items), in USD. Based on Numbeo cost-of-living data.",
    groceryOfNet: (pct) => `${pct}% of net monthly salary`,
    perMonth: "/ month",
    workHoursLabel: "⏰ Work Hours Index",
    workHoursExplainTitle: "What is the Work Hours Index?",
    workHoursExplain: "The average number of hours worked per week in this country, based on OECD and ILO data. Combined with your net salary, it reveals your effective hourly pay — a better measure of work-life balance than salary alone.",
    workHoursPerWeek: "hrs / week avg",
    workHoursPerHour: (val) => `≈ $${val} net / hour`,
    indicesBtn: "📊 Indices — incl. NetBigMac",
    indicesTitle: "Indices",
    indicesClose: "✕ Close",
    recentLabel: "Recently viewed",
    compareBtn: (n) => `Compare (${n}/3)`,
    compareTitle: "Comparison",
    compareClose: "✕ Close",
    compareReset: "🔄 Compare other countries",
    compareNewTitle: "Add countries with + in the list",
    compareMinMsg: "⚠️ Please select at least 2 countries to compare.",
    compareShareTitle: "SHARE MESSAGE",
    compareCustomMsg: "OR WRITE YOUR OWN",
    compareCustomPlaceholder: "Add your own punchy message...",
    comparePrivacyNote: "✓ No amounts shared — rates and rankings only",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Click + on a country to add it",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: net ${i.net} (${i.rate}% tax)`).join(' | ') + ' — netpay.tax',
    gross: "GROSS",
    compareSalaryLabel: "GROSS SALARY",
    compareTaxLabel: "TAX",
    compareNetLabel: "NET",
    compareRateLabel: "RATE",
    funFactBtn: "🎲 Amusing Facts",
    funFactTitle: "Amusing Facts",
    funFactClose: "✕ Close",
    funFactNext: "Next fact →",
    funFactNone: "No fun fact available yet for this region.",
    // Editorial content
    aboutTitle: "About This Calculator",
    aboutText: "Our free income tax calculator lets you instantly compare your net salary across 96+ countries, 13 Canadian provinces & territories, and 51 American regions. Whether you are planning an international move, negotiating a job offer abroad, or simply curious about how your country stacks up, this tool gives you a clear picture of how much you actually keep after federal and regional income taxes.",
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
    aboutPageText: "NetPay.tax is an independent tool built to help individuals understand and compare income tax rates around the world. We are not affiliated with any government, tax authority, or financial institution. Our goal is to provide clear, unbiased, and accessible tax information to help people make informed financial decisions.",
    footerDisclaimer: "For informational purposes only. Not financial or tax advice. Consult a qualified professional.",
    bigMacLabel: "🍔 Big Mac Index",
    bigMacExplainTitle: "What is the Big Mac Index?",
    bigMacExplain: "Created by The Economist in 1986, the Big Mac Index uses the price of a McDonald's Big Mac to compare the purchasing power of currencies worldwide. Since a Big Mac is made to the same recipe in ~100 countries, its price difference reveals whether a currency is over or under-valued against the USD.",
    netBigMacLabel: "🍔 NetBigMac Index",
    netBigMacExplainTitle: "What is the NetBigMac Index?",
    netBigMacExplain: "The NetBigMac Index is an original NetPay.tax indicator. It measures how many Big Macs you can buy with $100 of gross salary once income tax is removed. It combines the tax burden and local cost of living into one intuitive number — the higher, the better your real purchasing power.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "per $100 gross",
    bigMacPrice: "Local price",
    shareLabel: "Share",
    shareMsg: (country, net, curr, score) => `In ${country}, I keep ${net} ${curr} after tax — NetBigMac score: ${score} 🍔\nCalculate yours: https://netpay.tax`,
    shareMsgSite: "Free income tax calculator — compare your net salary in 96+ countries, all Canadian provinces and US states 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Starbucks Index",
    starbucksExplainTitle: "What is the Starbucks Index?",
    starbucksExplain: "The price of a Starbucks Tall Latte in USD, used to compare the cost of everyday goods across countries. Like the Big Mac Index, it reveals differences in purchasing power and local price levels.",
    rentLabel: "🏠 Rent Index",
    rentExplainTitle: "What is the Rent Index?",
    rentExplain: "The estimated monthly cost of a 1-bedroom apartment in the city center, in USD. Compared to your net monthly salary, it shows what percentage of your income goes to housing — a key indicator of quality of life.",
    rentOfNet: (pct) => `${pct}% of net monthly salary`,
    groceryLabel: "🛒 Grocery Index",
    groceryExplainTitle: "What is the Grocery Index?",
    groceryExplain: "The estimated monthly cost of a standard grocery basket for one person (including food staples, fresh produce, and basic household items), in USD. Based on Numbeo cost-of-living data.",
    groceryOfNet: (pct) => `${pct}% of net monthly salary`,
    perMonth: "/ month",
    workHoursLabel: "⏰ Work Hours Index",
    workHoursExplainTitle: "What is the Work Hours Index?",
    workHoursExplain: "The average number of hours worked per week in this country, based on OECD and ILO data. Combined with your net salary, it reveals your effective hourly pay — a better measure of work-life balance than salary alone.",
    workHoursPerWeek: "hrs / week avg",
    workHoursPerHour: (val) => `≈ $${val} net / hour`,
    indicesBtn: "📊 Indices — incl. NetBigMac",
    indicesTitle: "Indices",
    indicesClose: "✕ Close",
    recentLabel: "Recently viewed",
    compareBtn: (n) => `Compare (${n}/3)`,
    compareTitle: "Comparison",
    compareClose: "✕ Close",
    compareReset: "🔄 Compare other countries",
    compareNewTitle: "Add countries with + in the list",
    compareMinMsg: "⚠️ Please select at least 2 countries to compare.",
    compareShareTitle: "SHARE MESSAGE",
    compareCustomMsg: "OR WRITE YOUR OWN",
    compareCustomPlaceholder: "Add your own punchy message...",
    comparePrivacyNote: "✓ No amounts shared — rates and rankings only",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Click + on a country to add it",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: net ${i.net} (${i.rate}% tax)`).join(' | ') + ' — netpay.tax',
    gross: "GROSS",
    compareSalaryLabel: "GROSS SALARY",
    compareTaxLabel: "TAX",
    compareNetLabel: "NET",
    compareRateLabel: "RATE",
    funFactBtn: "🎲 Amusing Facts",
    funFactTitle: "Amusing Facts",
    funFactClose: "✕ Close",
    funFactNext: "Next fact →",
    funFactNone: "No fun fact available yet for this region.",
    contactSend: "Send Message",
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "Your message",
    contactSuccess: "✅ Message sent! We'll get back to you shortly.",
    contactError: "❌ Error sending message. Please try again.",
    contactSending: "Sending...",
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
    subtitle: (c, p, s) => `${c} pays · ${p} provinces et territoires canadiens · ${s} régions américaines`,
    salaryLabel: "SALAIRE BRUT ANNUEL",
    salaryPlaceholder: "Inscrivez votre revenu ici...",
    rankingLabel: "CLASSEMENT PAR SALAIRE NET",
    searchPlaceholder: "Rechercher...",
    canada: "Canada",
    usa: "États-Unis",
    caSubtitle: "13 prov. et territoires",
    usSubtitle: "51 régions",
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
    emptySubtitle: (c, p, s) => `${c} pays · ${p} provinces · ${s} régions`,
    periodAnnual: "/ An",
    periodMonthly: "/ Mois",
    bigMacLabel: "🍔 Indice Big Mac",
    bigMacExplainTitle: "Qu'est-ce que l'indice Big Mac ?",
    bigMacExplain: "Créé par The Economist en 1986, l'indice Big Mac utilise le prix d'un Big Mac McDonald's pour comparer le pouvoir d'achat des monnaies dans le monde. Puisqu'un Big Mac est préparé selon la même recette dans ~100 pays, la différence de prix révèle si une monnaie est surévaluée ou sous-évaluée par rapport au dollar américain.",
    netBigMacLabel: "🍔 Indice NetBigMac",
    netBigMacExplainTitle: "Qu'est-ce que l'indice NetBigMac ?",
    netBigMacExplain: "L'indice NetBigMac est un indicateur original de NetPay.tax. Il mesure combien de Big Macs vous pouvez acheter avec 100 $ de salaire brut une fois l'impôt sur le revenu retiré. Il combine la charge fiscale et le coût de la vie local en un seul chiffre intuitif — plus c'est élevé, meilleur est votre pouvoir d'achat réel.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "par 100 $ brut",
    bigMacPrice: "Prix local",
    shareLabel: "Partager",
    shareMsg: (country, net, curr, score) => `Au/En ${country}, je garde ${net} ${curr} apres impot — Score NetBigMac : ${score} 🍔\nCalcule le tien : https://netpay.tax`,
    shareMsgSite: "Calculateur d'impot gratuit — comparez votre salaire net dans 47+ pays, toutes les provinces canadiennes et etats americains 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Indice Starbucks",
    starbucksExplainTitle: "Qu'est-ce que l'Indice Starbucks ?",
    starbucksExplain: "Le prix d'un Starbucks Tall Latte en USD, utilisé pour comparer le coût des biens courants entre pays. Comme l'Indice Big Mac, il révèle les différences de pouvoir d'achat et de niveaux de prix locaux.",
    rentLabel: "🏠 Indice Loyer",
    rentExplainTitle: "Qu'est-ce que l'Indice Loyer ?",
    rentExplain: "Le coût mensuel estimé d'un appartement d'une chambre en centre-ville, en USD. Comparé à votre salaire net mensuel, il montre quel pourcentage de vos revenus va au logement — un indicateur clé de qualité de vie.",
    rentOfNet: (pct) => `${pct}% du salaire net mensuel`,
    groceryLabel: "🛒 Indice Épicerie",
    groceryExplainTitle: "Qu'est-ce que l'Indice Épicerie ?",
    groceryExplain: "Le coût mensuel estimé d'un panier d'épicerie standard pour une personne (incluant les aliments de base, les produits frais et les articles ménagers de base), en USD. Basé sur les données de coût de la vie de Numbeo.",
    groceryOfNet: (pct) => `${pct}% du salaire net mensuel`,
    perMonth: "/ mois",
    workHoursLabel: "⏰ Indice Heures de Travail",
    workHoursExplainTitle: "Qu'est-ce que l'Indice Heures de Travail ?",
    workHoursExplain: "Le nombre moyen d'heures travaillées par semaine dans ce pays, selon les données de l'OCDE et de l'OIT. Combiné à votre salaire net, il révèle votre salaire horaire effectif — une meilleure mesure de l'équilibre travail-vie que le salaire seul.",
    workHoursPerWeek: "h / semaine moy.",
    workHoursPerHour: (val) => `≈ ${val} $ net / heure`,
    indicesBtn: "📊 Indices — dont le NetBigMac",
    indicesTitle: "Indices",
    indicesClose: "✕ Fermer",
    recentLabel: "Récemment consultés",
    compareBtn: (n) => `Comparer (${n}/3)`,
    compareTitle: "Comparaison",
    compareClose: "✕ Fermer",
    compareReset: "🔄 Comparer d'autres pays",
    compareNewTitle: "Ajoutez des pays avec + dans la liste",
    compareMinMsg: "⚠️ Veuillez sélectionner au moins 2 pays pour comparer.",
    compareShareTitle: "MESSAGE DE PARTAGE",
    compareCustomMsg: "OU ÉCRIVEZ LE VÔTRE",
    compareCustomPlaceholder: "Ajoutez votre propre message percutant...",
    comparePrivacyNote: "✓ Aucun montant partagé — taux et classement uniquement",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Cliquez + sur un pays pour l'ajouter",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name} : net ${i.net} (${i.rate}% impôt)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "SALAIRE BRUT",
    compareTaxLabel: "IMPÔT",
    compareNetLabel: "NET",
    compareRateLabel: "TAUX",
    funFactBtn: "🎲 Faits amusants",
    funFactTitle: "Faits amusants",
    funFactClose: "✕ Fermer",
    funFactNext: "Fait suivant →",
    funFactNone: "Aucun fait disponible pour cette région pour l'instant.",
    // Editorial content
    aboutTitle: "À propos de ce calculateur",
    aboutText: "Notre calculateur d'impôt gratuit vous permet de comparer instantanément votre salaire net dans plus de 96 pays, 13 provinces et territoires canadiens et 51 régions américaines. Que vous planifiez un déménagement à l'international, négociiez une offre d'emploi à l'étranger ou soyez simplement curieux de savoir comment votre pays se compare, cet outil vous donne une image claire de ce que vous conservez réellement après les impôts fédéraux et régionaux.",
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
    aboutPageText: "NetPay.tax est un outil indépendant conçu pour aider les particuliers à comprendre et comparer les taux d'imposition sur le revenu dans le monde. Nous ne sommes affiliés à aucun gouvernement, autorité fiscale ou institution financière. Notre objectif est de fournir des informations fiscales claires, impartiales et accessibles.",
    footerDisclaimer: "À titre informatif uniquement. Pas de conseil financier ou fiscal. Consultez un professionnel qualifié.",
    bigMacLabel: "🍔 Indice Big Mac",
    bigMacExplainTitle: "Qu'est-ce que l'indice Big Mac ?",
    bigMacExplain: "Créé par The Economist en 1986, l'indice Big Mac utilise le prix d'un Big Mac McDonald's pour comparer le pouvoir d'achat des monnaies dans le monde. Puisqu'un Big Mac est préparé selon la même recette dans ~100 pays, la différence de prix révèle si une monnaie est surévaluée ou sous-évaluée par rapport au dollar américain.",
    netBigMacLabel: "🍔 Indice NetBigMac",
    netBigMacExplainTitle: "Qu'est-ce que l'indice NetBigMac ?",
    netBigMacExplain: "L'indice NetBigMac est un indicateur original de NetPay.tax. Il mesure combien de Big Macs vous pouvez acheter avec 100 $ de salaire brut une fois l'impôt sur le revenu retiré. Il combine la charge fiscale et le coût de la vie local en un seul chiffre intuitif — plus c'est élevé, meilleur est votre pouvoir d'achat réel.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "par 100 $ brut",
    bigMacPrice: "Prix local",
    shareLabel: "Partager",
    shareMsg: (country, net, curr, score) => `Au/En ${country}, je garde ${net} ${curr} apres impot — Score NetBigMac : ${score} 🍔\nCalcule le tien : https://netpay.tax`,
    shareMsgSite: "Calculateur d'impot gratuit — comparez votre salaire net dans 47+ pays, toutes les provinces canadiennes et etats americains 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Indice Starbucks",
    starbucksExplainTitle: "Qu'est-ce que l'Indice Starbucks ?",
    starbucksExplain: "Le prix d'un Starbucks Tall Latte en USD, utilisé pour comparer le coût des biens courants entre pays. Comme l'Indice Big Mac, il révèle les différences de pouvoir d'achat et de niveaux de prix locaux.",
    rentLabel: "🏠 Indice Loyer",
    rentExplainTitle: "Qu'est-ce que l'Indice Loyer ?",
    rentExplain: "Le coût mensuel estimé d'un appartement d'une chambre en centre-ville, en USD. Comparé à votre salaire net mensuel, il montre quel pourcentage de vos revenus va au logement — un indicateur clé de qualité de vie.",
    rentOfNet: (pct) => `${pct}% du salaire net mensuel`,
    groceryLabel: "🛒 Indice Épicerie",
    groceryExplainTitle: "Qu'est-ce que l'Indice Épicerie ?",
    groceryExplain: "Le coût mensuel estimé d'un panier d'épicerie standard pour une personne (incluant les aliments de base, les produits frais et les articles ménagers de base), en USD. Basé sur les données de coût de la vie de Numbeo.",
    groceryOfNet: (pct) => `${pct}% du salaire net mensuel`,
    perMonth: "/ mois",
    workHoursLabel: "⏰ Indice Heures de Travail",
    workHoursExplainTitle: "Qu'est-ce que l'Indice Heures de Travail ?",
    workHoursExplain: "Le nombre moyen d'heures travaillées par semaine dans ce pays, selon les données de l'OCDE et de l'OIT. Combiné à votre salaire net, il révèle votre salaire horaire effectif — une meilleure mesure de l'équilibre travail-vie que le salaire seul.",
    workHoursPerWeek: "h / semaine moy.",
    workHoursPerHour: (val) => `≈ ${val} $ net / heure`,
    indicesBtn: "📊 Indices — dont le NetBigMac",
    indicesTitle: "Indices",
    indicesClose: "✕ Fermer",
    recentLabel: "Récemment consultés",
    compareBtn: (n) => `Comparer (${n}/3)`,
    compareTitle: "Comparaison",
    compareClose: "✕ Fermer",
    compareReset: "🔄 Comparer d'autres pays",
    compareNewTitle: "Ajoutez des pays avec + dans la liste",
    compareMinMsg: "⚠️ Veuillez sélectionner au moins 2 pays pour comparer.",
    compareShareTitle: "MESSAGE DE PARTAGE",
    compareCustomMsg: "OU ÉCRIVEZ LE VÔTRE",
    compareCustomPlaceholder: "Ajoutez votre propre message percutant...",
    comparePrivacyNote: "✓ Aucun montant partagé — taux et classement uniquement",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Cliquez + sur un pays pour l'ajouter",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name} : net ${i.net} (${i.rate}% impôt)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "SALAIRE BRUT",
    compareTaxLabel: "IMPÔT",
    compareNetLabel: "NET",
    compareRateLabel: "TAUX",
    funFactBtn: "🎲 Faits amusants",
    funFactTitle: "Faits amusants",
    funFactClose: "✕ Fermer",
    funFactNext: "Fait suivant →",
    funFactNone: "Aucun fait disponible pour cette région pour l'instant.",
    contactSend: "Envoyer le message",
    contactName: "Votre nom",
    contactEmail: "Votre courriel",
    contactMessage: "Votre message",
    contactSuccess: "✅ Message envoyé ! Nous vous répondrons bientôt.",
    contactError: "❌ Erreur lors de l'envoi. Veuillez réessayer.",
    contactSending: "Envoi...",
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
    caSubtitle: "13 prov. y territorios",
    usSubtitle: "51 regiones",
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
    bigMacLabel: "🍔 Índice Big Mac",
    bigMacExplainTitle: "¿Qué es el índice Big Mac?",
    bigMacExplain: "Creado por The Economist en 1986, el índice Big Mac usa el precio de un Big Mac de McDonald's para comparar el poder adquisitivo de las monedas en todo el mundo. Como un Big Mac se prepara con la misma receta en ~100 países, la diferencia de precio revela si una moneda está sobrevalorada o infravalorada respecto al dólar.",
    netBigMacLabel: "🍔 Índice NetBigMac",
    netBigMacExplainTitle: "¿Qué es el índice NetBigMac?",
    netBigMacExplain: "El índice NetBigMac es un indicador original de NetPay.tax. Mide cuántas hamburguesas Big Mac puedes comprar con $100 de salario bruto una vez descontados los impuestos sobre la renta. Combina la carga fiscal y el coste de vida local en un solo número intuitivo: cuanto más alto, mejor es tu poder adquisitivo real.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "por $100 bruto",
    bigMacPrice: "Precio local",
    shareLabel: "Compartir",
    shareMsg: (country, net, curr, score) => `En ${country}, conservo ${net} ${curr} despues de impuestos — Puntuacion NetBigMac: ${score} 🍔\nCalcula el tuyo: https://netpay.tax`,
    shareMsgSite: "Calculadora de impuestos gratuita — compara tu salario neto en 47+ paises, todas las provincias canadienses y estados de EE.UU. 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Índice Starbucks",
    starbucksExplainTitle: "¿Qué es el Índice Starbucks?",
    starbucksExplain: "El precio de un Starbucks Tall Latte en USD, usado para comparar el coste de los bienes cotidianos entre países. Como el Índice Big Mac, revela diferencias en el poder adquisitivo y los niveles de precios locales.",
    rentLabel: "🏠 Índice Alquiler",
    rentExplainTitle: "¿Qué es el Índice Alquiler?",
    rentExplain: "El coste mensual estimado de un apartamento de 1 habitación en el centro de la ciudad, en USD. Comparado con tu salario neto mensual, muestra qué porcentaje de tus ingresos va a vivienda.",
    rentOfNet: (pct) => `${pct}% del salario neto mensual`,
    groceryLabel: "🛒 Índice Cesta Básica",
    groceryExplainTitle: "¿Qué es el Índice Cesta Básica?",
    groceryExplain: "El coste mensual estimado de una cesta de la compra estándar para una persona (alimentos básicos, productos frescos y artículos del hogar), en USD. Basado en datos de coste de vida de Numbeo.",
    groceryOfNet: (pct) => `${pct}% del salario neto mensual`,
    perMonth: "/ mes",
    workHoursLabel: "⏰ Índice Horas de Trabajo",
    workHoursExplainTitle: "¿Qué es el Índice de Horas de Trabajo?",
    workHoursExplain: "El número medio de horas trabajadas por semana en este país, según datos de la OCDE y la OIT. Combinado con tu salario neto, revela tu pago efectivo por hora, una mejor medida del equilibrio trabajo-vida que el salario solo.",
    workHoursPerWeek: "h / semana prom.",
    workHoursPerHour: (val) => `≈ $${val} neto / hora`,
    indicesBtn: "📊 Índices — incl. NetBigMac",
    indicesTitle: "Índices",
    indicesClose: "✕ Cerrar",
    recentLabel: "Vistos recientemente",
    compareBtn: (n) => `Comparar (${n}/3)`,
    compareTitle: "Comparación",
    compareClose: "✕ Cerrar",
    compareReset: "🔄 Comparar otros países",
    compareNewTitle: "Agrega países con + en la lista",
    compareMinMsg: "⚠️ Selecciona al menos 2 países para comparar.",
    compareShareTitle: "MENSAJE DE COMPARTIR",
    compareCustomMsg: "O ESCRIBE EL TUYO",
    compareCustomPlaceholder: "Añade tu propio mensaje impactante...",
    comparePrivacyNote: "✓ Ningún monto compartido — solo tasas y clasificación",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Haz clic en + en un país para añadirlo",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: neto ${i.net} (${i.rate}% impuesto)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "SALARIO BRUTO",
    compareTaxLabel: "IMPUESTO",
    compareNetLabel: "NETO",
    compareRateLabel: "TASA",
    funFactBtn: "🎲 Datos curiosos",
    funFactTitle: "Datos curiosos",
    funFactClose: "✕ Cerrar",
    funFactNext: "Siguiente dato →",
    funFactNone: "No hay datos disponibles para esta región por el momento.",
    // Editorial content
    aboutTitle: "Acerca de esta calculadora",
    aboutText: "Nuestra calculadora de impuestos gratuita te permite comparar instantáneamente tu salario neto en más de 96 países, 13 provincias y territorios canadienses y 51 regiones americanas Ya sea que estés planeando una mudanza internacional, negociando una oferta de trabajo en el extranjero o simplemente tengas curiosidad sobre cómo se compara tu país, esta herramienta te da una imagen clara de cuánto conservas realmente después de los impuestos federales y regionales.",
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
    aboutPageText: "NetPay.tax es una herramienta independiente creada para ayudar a las personas a entender y comparar las tasas del impuesto sobre la renta en todo el mundo. No estamos afiliados a ningún gobierno, autoridad fiscal o institución financiera.",
    footerDisclaimer: "Solo con fines informativos. No es asesoramiento financiero ni fiscal. Consulte a un profesional calificado.",
    bigMacLabel: "🍔 Índice Big Mac",
    bigMacExplainTitle: "¿Qué es el índice Big Mac?",
    bigMacExplain: "Creado por The Economist en 1986, el índice Big Mac usa el precio de un Big Mac de McDonald's para comparar el poder adquisitivo de las monedas en todo el mundo. Como un Big Mac se prepara con la misma receta en ~100 países, la diferencia de precio revela si una moneda está sobrevalorada o infravalorada respecto al dólar.",
    netBigMacLabel: "🍔 Índice NetBigMac",
    netBigMacExplainTitle: "¿Qué es el índice NetBigMac?",
    netBigMacExplain: "El índice NetBigMac es un indicador original de NetPay.tax. Mide cuántas hamburguesas Big Mac puedes comprar con $100 de salario bruto una vez descontados los impuestos sobre la renta. Combina la carga fiscal y el coste de vida local en un solo número intuitivo: cuanto más alto, mejor es tu poder adquisitivo real.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "por $100 bruto",
    bigMacPrice: "Precio local",
    shareLabel: "Compartir",
    shareMsg: (country, net, curr, score) => `En ${country}, conservo ${net} ${curr} despues de impuestos — Puntuacion NetBigMac: ${score} 🍔\nCalcula el tuyo: https://netpay.tax`,
    shareMsgSite: "Calculadora de impuestos gratuita — compara tu salario neto en 47+ paises, todas las provincias canadienses y estados de EE.UU. 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Índice Starbucks",
    starbucksExplainTitle: "¿Qué es el Índice Starbucks?",
    starbucksExplain: "El precio de un Starbucks Tall Latte en USD, usado para comparar el coste de los bienes cotidianos entre países. Como el Índice Big Mac, revela diferencias en el poder adquisitivo y los niveles de precios locales.",
    rentLabel: "🏠 Índice Alquiler",
    rentExplainTitle: "¿Qué es el Índice Alquiler?",
    rentExplain: "El coste mensual estimado de un apartamento de 1 habitación en el centro de la ciudad, en USD. Comparado con tu salario neto mensual, muestra qué porcentaje de tus ingresos va a vivienda.",
    rentOfNet: (pct) => `${pct}% del salario neto mensual`,
    groceryLabel: "🛒 Índice Cesta Básica",
    groceryExplainTitle: "¿Qué es el Índice Cesta Básica?",
    groceryExplain: "El coste mensual estimado de una cesta de la compra estándar para una persona (alimentos básicos, productos frescos y artículos del hogar), en USD. Basado en datos de coste de vida de Numbeo.",
    groceryOfNet: (pct) => `${pct}% del salario neto mensual`,
    perMonth: "/ mes",
    workHoursLabel: "⏰ Índice Horas de Trabajo",
    workHoursExplainTitle: "¿Qué es el Índice de Horas de Trabajo?",
    workHoursExplain: "El número medio de horas trabajadas por semana en este país, según datos de la OCDE y la OIT. Combinado con tu salario neto, revela tu pago efectivo por hora, una mejor medida del equilibrio trabajo-vida que el salario solo.",
    workHoursPerWeek: "h / semana prom.",
    workHoursPerHour: (val) => `≈ $${val} neto / hora`,
    indicesBtn: "📊 Índices — incl. NetBigMac",
    indicesTitle: "Índices",
    indicesClose: "✕ Cerrar",
    recentLabel: "Vistos recientemente",
    compareBtn: (n) => `Comparar (${n}/3)`,
    compareTitle: "Comparación",
    compareClose: "✕ Cerrar",
    compareReset: "🔄 Comparar otros países",
    compareNewTitle: "Agrega países con + en la lista",
    compareMinMsg: "⚠️ Selecciona al menos 2 países para comparar.",
    compareShareTitle: "MENSAJE DE COMPARTIR",
    compareCustomMsg: "O ESCRIBE EL TUYO",
    compareCustomPlaceholder: "Añade tu propio mensaje impactante...",
    comparePrivacyNote: "✓ Ningún monto compartido — solo tasas y clasificación",

    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Haz clic en + en un país para añadirlo",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: neto ${i.net} (${i.rate}% impuesto)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "SALARIO BRUTO",
    compareTaxLabel: "IMPUESTO",
    compareNetLabel: "NETO",
    compareRateLabel: "TASA",
    funFactBtn: "🎲 Datos curiosos",
    funFactTitle: "Datos curiosos",
    funFactClose: "✕ Cerrar",
    funFactNext: "Siguiente dato →",
    funFactNone: "No hay datos disponibles para esta región por el momento.",
    contactSend: "Enviar mensaje",
    contactName: "Tu nombre",
    contactEmail: "Tu correo",
    contactMessage: "Tu mensaje",
    contactSuccess: "✅ ¡Mensaje enviado! Te responderemos pronto.",
    contactError: "❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    contactSending: "Enviando...",
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
  de: {
    title: "EINKOMMENSTEUERRECHNER",
    subtitle: (c, p, s) => `${c} Länder · ${p} kanadische Provinzen · ${s} US-Bundesstaaten`,
    salaryLabel: "JAHRESBRUTTOLOHN",
    salaryPlaceholder: "Einkommen eingeben...",
    rankingLabel: "NACH NETTOGEHALT SORTIERT",
    searchPlaceholder: "Suchen...",
    canada: "Kanada",
    usa: "Vereinigte Staaten",
    caSubtitle: "13 Provinzen & Territorien",
    usSubtitle: "51 Regionen",
    fedProv: "Bundes- + Provinzsteuer",
    fedState: "Bundes- + Staatssteuer",
    netYear: "NETTO / J",
    seeProvinces: "▼ Anzeigen",
    collapse: "▲ Einklappen",
    gross: "BRUTTO",
    federal: "BUNDESSTEUER",
    provincial: "PROVINZSTEUER",
    totalTax: "STEUERN GESAMT",
    tax: "STEUER",
    net: "NETTO",
    effectiveRate: "EFFEKTIVER GESAMTSTEUERSATZ",
    fedLabel: "Bundessteuer",
    provLabel: "Provinz/Staat",
    totalLabel: "Gesamt",
    caDetail: "Kanada · Bundes- + Provinzsteuer",
    usDetail: "USA · Bundes- + Staatssteuer",
    disclaimer: "⚠ Nur Bundes- und Provinz-/Staatseinkommensteuer. Sozialabgaben, Freibeträge und Abzüge nicht enthalten. Wechselkurse sind Näherungswerte. Bitte einen Steuerberater konsultieren.",
    emptyTitle: "EINKOMMEN EINGEBEN, UM ZU BEGINNEN",
    emptySubtitle: (c, p, s) => `${c} Länder · ${p} Provinzen · ${s} Bundesstaaten`,
    periodAnnual: "/ Jahr",
    periodMonthly: "/ Monat",
    bigMacLabel: "🍔 Big-Mac-Index",
    bigMacExplainTitle: "Was ist der Big-Mac-Index?",
    bigMacExplain: "Der 1986 vom Economist entwickelte Big-Mac-Index nutzt den Preis eines McDonald's Big Mac, um die Kaufkraft von Währungen weltweit zu vergleichen.",
    netBigMacLabel: "🍔 NetBigMac-Index",
    netBigMacExplainTitle: "Was ist der NetBigMac-Index?",
    netBigMacExplain: "Der NetBigMac-Index ist ein originaler NetPay.tax-Indikator. Er misst, wie viele Big Macs man mit 100 $ Bruttogehalt nach Abzug der Einkommensteuer kaufen kann.",
    bigMacCount: (n) => `${n} Big Macs`,
    bigMacPer100: "pro 100 $ brutto",
    bigMacPrice: "Lokaler Preis",
    shareLabel: "Teilen",
    shareMsg: (country, net, curr, score) => `In ${country} bleiben mir ${net} ${curr} nach Steuern — NetBigMac-Score: ${score} 🍔\nBerechne deins: https://netpay.tax`,
    shareMsgSite: "Kostenloser Einkommensteuerrechner — Nettogehalt in 96+ Ländern vergleichen 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ Starbucks-Index",
    starbucksExplainTitle: "Was ist der Starbucks-Index?",
    starbucksExplain: "Der Preis eines Starbucks Tall Latte in USD, um die Kosten alltäglicher Güter zu vergleichen.",
    rentLabel: "🏠 Mietindex",
    rentExplainTitle: "Was ist der Mietindex?",
    rentExplain: "Die geschätzten monatlichen Kosten für eine 1-Zimmer-Wohnung im Stadtzentrum in USD.",
    rentOfNet: (pct) => `${pct}% des monatlichen Nettogehalts`,
    groceryLabel: "🛒 Lebensmittelindex",
    groceryExplainTitle: "Was ist der Lebensmittelindex?",
    groceryExplain: "Die geschätzten monatlichen Kosten für einen Standard-Lebensmittelkorb für eine Person in USD.",
    groceryOfNet: (pct) => `${pct}% des monatlichen Nettogehalts`,
    perMonth: "/ Monat",
    workHoursLabel: "⏰ Arbeitszeitindex",
    workHoursExplainTitle: "Was ist der Arbeitszeitindex?",
    workHoursExplain: "Die durchschnittliche Wochenarbeitszeit im jeweiligen Land laut OECD- und ILO-Daten.",
    workHoursPerWeek: "Std. / Woche",
    workHoursPerHour: (val) => `≈ $${val} netto / Stunde`,
    indicesBtn: "📊 Indizes — inkl. NetBigMac",
    indicesTitle: "Indizes",
    indicesClose: "✕ Schließen",
    recentLabel: "Zuletzt angesehen",
    compareBtn: (n) => `Vergleichen (${n}/3)`,
    compareTitle: "Vergleich",
    compareClose: "✕ Schließen",
    compareReset: "🔄 Andere Länder vergleichen",
    compareNewTitle: "Länder mit + hinzufügen",
    compareMinMsg: "⚠️ Bitte mindestens 2 Länder zum Vergleichen auswählen.",
    compareShareTitle: "SHARE-NACHRICHT",
    compareCustomMsg: "ODER SCHREIBEN SIE IHRE EIGENE",
    compareCustomPlaceholder: "Fügen Sie eine eigene Botschaft hinzu...",
    comparePrivacyNote: "✓ Keine Beträge geteilt — nur Steuersätze und Ränge",
    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "Klicke + bei einem Land, um es hinzuzufügen",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: Netto ${i.net} (${i.rate}% Steuer)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "BRUTTOGEHALT",
    compareTaxLabel: "STEUER",
    compareNetLabel: "NETTO",
    compareRateLabel: "SATZ",
    funFactBtn: "🎲 Interessante Fakten",
    funFactTitle: "Interessante Fakten",
    funFactClose: "✕ Schließen",
    funFactNext: "Nächster Fakt →",
    funFactNone: "Noch kein interessanter Fakt für diese Region verfügbar.",
    contactSend: "Nachricht senden",
    contactName: "Ihr Name",
    contactEmail: "Ihre E-Mail",
    contactMessage: "Ihre Nachricht",
    contactSuccess: "✅ Nachricht gesendet! Wir melden uns bald.",
    contactError: "❌ Fehler beim Senden. Bitte erneut versuchen.",
    contactSending: "Wird gesendet...",
    footerLinks: ["Datenschutz", "Über uns", "Kontakt"],
    contactTitle: "Kontakt",
    contactText: "Für Korrekturen, Vorschläge oder Partnerschaftsanfragen kontaktieren Sie uns bitte über das Formular unten.",
    aboutTitle: "Über diesen Rechner",
    aboutText: "Unser kostenloser Einkommensteuerrechner ermöglicht den sofortigen Vergleich des Nettogehalts in 96+ Ländern, 13 kanadischen Provinzen und 51 amerikanische Regionen.",
    howTitle: "So funktioniert es",
    howSteps: [
      { icon:"1️⃣", title:"Gehalt eingeben", text:"Jahres- oder Monatsbruttolohn in der Währung Ihrer Wahl: USD, CAD, EUR, GBP oder AUD." },
      { icon:"2️⃣", title:"Rangliste ansehen", text:"Das Tool sortiert sofort alle Länder vom höchsten zum niedrigsten Nettogehalt." },
      { icon:"3️⃣", title:"Details anklicken", text:"Klicken Sie auf ein Land für eine Aufschlüsselung: Brutto, Bundessteuer, Regionalsteuer, Gesamtsteuer, Netto und effektiver Steuersatz." },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q:"Welche Steuern sind in der Berechnung enthalten?", a:"Nur Bundes- und Provinz-/Staatseinkommensteuer. Sozialabgaben, Krankenversicherungsbeiträge, Rentenabzüge oder Mehrwertsteuer sind nicht enthalten." },
      { q:"Warum werden die Ergebnisse in USD angezeigt?", a:"Alle Ergebnisse werden in USD normalisiert für einfachen internationalen Vergleich. Sie können Ihr Gehalt in CAD, EUR, GBP oder AUD eingeben." },
      { q:"Wie genau sind diese Steuersätze?", a:"Die Steuersätze basieren auf den aktuell öffentlich verfügbaren Steuersätzen. Steuergesetze ändern sich häufig — bitte konsultieren Sie immer einen Steuerberater." },
      { q:"Berücksichtigt der Rechner Steuerabzüge und Freibeträge?", a:"Nein. Der Rechner wendet die Standard-Steuersätze ohne Abzüge oder Freibeträge an." },
      { q:"Was ist der effektive Steuersatz?", a:"Der effektive Steuersatz ist der Prozentsatz Ihres Bruttoeinkommens, der als Einkommensteuer abgeführt wird — unterschiedlich vom Grenzsteuersatz." },
      { q:"Warum hat Alberta einen niedrigeren Steuersatz als Québec?", a:"Alberta profitiert von einem einheitlichen Provinzsteuersatz von 10% und Öl- und Gaseinnahmen. Québec finanziert ein umfangreiches Netz öffentlicher Dienste mit Provinzsteuersätzen bis zu 25,75%." },
    ],
    tipsTitle: "Tipps zur internationalen Steuerplanung",
    tips: [
      { icon:"🌍", title:"Gesamtvergütung, nicht nur Gehalt", text:"100.000 $ in New York und Texas sind sehr unterschiedlich nach Steuern. New York erhebt bis zu 10,9% Staatssteuer, Texas keine." },
      { icon:"🏠", title:"Homeoffice und Steuersitz", text:"Fernarbeit für ein ausländisches Unternehmen bedeutet nicht automatisch, dass Sie dort Steuern zahlen, wo Ihr Arbeitgeber sitzt." },
      { icon:"📋", title:"Doppelbesteuerungsabkommen", text:"Die meisten Länder haben Abkommen zur Vermeidung der Doppelbesteuerung. Diese können Ihre Gesamtsteuerlast erheblich reduzieren." },
      { icon:"💡", title:"Registrierte Konten nutzen", text:"RRSP und TFSA in Kanada sowie 401(k) und IRA in den USA können Ihren effektiven Steuersatz deutlich senken." },
    ],
    privacyTitle: "Datenschutzrichtlinie",
    privacyText: "Diese Website erfasst keine personenbezogenen Daten. Die eingegebenen Gehaltszahlen werden ausschließlich in Ihrem Browser verarbeitet und nie an unsere Server gesendet.",
    aboutPageTitle: "Über uns",
    aboutPageText: "NetPay.tax ist ein unabhängiges Tool zum Vergleich von Einkommenssteuersätzen weltweit. Wir sind mit keiner Regierung, Steuerbehörde oder Finanzinstitution verbunden.",
    footerDisclaimer: "Nur zur Information. Keine Finanz- oder Steuerberatung. Bitte einen qualifizierten Fachmann konsultieren.",
    currencies: [
      { code:"USD", label:"USD — US-Dollar",            symbol:"$", perUSD:1 },
      { code:"CAD", label:"CAD — Kanadischer Dollar",   symbol:"$", perUSD:1.36 },
      { code:"EUR", label:"EUR — Euro",                 symbol:"€", perUSD:0.92 },
      { code:"GBP", label:"GBP — Britisches Pfund",     symbol:"£", perUSD:0.79 },
      { code:"AUD", label:"AUD — Australischer Dollar", symbol:"$", perUSD:1.55 },
    ],
  },
  ar: {
    rtl: true,
    title: "حاسبة ضريبة الدخل",
    subtitle: (c, p, s) => `${c} دولة · ${p} مقاطعة كندية · ${s} ولاية أمريكية`,
    salaryLabel: "الراتب السنوي الإجمالي",
    salaryPlaceholder: "أدخل دخلك هنا...",
    rankingLabel: "مرتبة حسب صافي الراتب",
    searchPlaceholder: "بحث...",
    canada: "كندا",
    usa: "الولايات المتحدة",
    caSubtitle: "١٣ مقاطعة وإقليم",
    usSubtitle: "٥١ منطقة",
    fedProv: "فيدرالي + إقليمي",
    fedState: "فيدرالي + ولاية",
    netYear: "صافي / سنة",
    seeProvinces: "▼ عرض",
    collapse: "▲ طي",
    gross: "إجمالي",
    federal: "فيدرالي",
    provincial: "إقليمي",
    totalTax: "إجمالي الضريبة",
    tax: "الضريبة",
    net: "صافي",
    effectiveRate: "معدل الضريبة الفعلي",
    fedLabel: "فيدرالي",
    provLabel: "مقاطعة/ولاية",
    totalLabel: "الإجمالي",
    caDetail: "كندا · فيدرالي + إقليمي",
    usDetail: "الولايات المتحدة · فيدرالي + ولاية",
    disclaimer: "⚠ ضريبة الدخل الفيدرالية والإقليمية فقط. لا تشمل الاشتراكات الاجتماعية أو الإعفاءات. أسعار الصرف تقريبية. استشر متخصصًا ضريبيًا.",
    emptyTitle: "أدخل دخلك للبدء",
    emptySubtitle: (c, p, s) => `${c} دولة · ${p} مقاطعة · ${s} ولاية`,
    periodAnnual: "/ سنة",
    periodMonthly: "/ شهر",
    bigMacLabel: "🍔 مؤشر البيغ ماك",
    bigMacExplainTitle: "ما هو مؤشر البيغ ماك؟",
    bigMacExplain: "أنشأه مجلة إيكونوميست عام ١٩٨٦، يستخدم سعر ساندويش البيغ ماك لمقارنة القوة الشرائية للعملات حول العالم.",
    netBigMacLabel: "🍔 مؤشر NetBigMac",
    netBigMacExplainTitle: "ما هو مؤشر NetBigMac؟",
    netBigMacExplain: "مؤشر NetBigMac هو مؤشر حصري من NetPay.tax. يقيس عدد ساندويشات البيغ ماك التي يمكن شراؤها بـ١٠٠ دولار من الراتب الإجمالي بعد خصم الضريبة.",
    bigMacCount: (n) => `${n} بيغ ماك`,
    bigMacPer100: "لكل ١٠٠$ إجمالي",
    bigMacPrice: "السعر المحلي",
    shareLabel: "مشاركة",
    shareMsg: (country, net, curr, score) => `في ${country}، يبقى لي ${net} ${curr} بعد الضرائب — نتيجة NetBigMac: ${score} 🍔\nاحسب راتبك: https://netpay.tax`,
    shareMsgSite: "حاسبة ضريبة الدخل المجانية — قارن صافي راتبك في ٩٦+ دولة 🌍\nhttps://netpay.tax",
    starbucksLabel: "☕ مؤشر ستاربكس",
    starbucksExplainTitle: "ما هو مؤشر ستاربكس؟",
    starbucksExplain: "سعر قهوة ستاربكس Tall Latte بالدولار لمقارنة تكاليف السلع اليومية بين الدول.",
    rentLabel: "🏠 مؤشر الإيجار",
    rentExplainTitle: "ما هو مؤشر الإيجار؟",
    rentExplain: "التكلفة الشهرية المقدرة لشقة غرفة نوم واحدة في وسط المدينة بالدولار.",
    rentOfNet: (pct) => `${pct}% من صافي الراتب الشهري`,
    groceryLabel: "🛒 مؤشر المواد الغذائية",
    groceryExplainTitle: "ما هو مؤشر المواد الغذائية؟",
    groceryExplain: "التكلفة الشهرية المقدرة لسلة غذائية معيارية لشخص واحد بالدولار.",
    groceryOfNet: (pct) => `${pct}% من صافي الراتب الشهري`,
    perMonth: "/ شهر",
    workHoursLabel: "⏰ مؤشر ساعات العمل",
    workHoursExplainTitle: "ما هو مؤشر ساعات العمل؟",
    workHoursExplain: "متوسط ساعات العمل الأسبوعية في هذا البلد وفق بيانات OECD و ILO.",
    workHoursPerWeek: "ساعة / أسبوع",
    workHoursPerHour: (val) => `≈ $${val} صافي / ساعة`,
    indicesBtn: "📊 المؤشرات — شاملة NetBigMac",
    indicesTitle: "المؤشرات",
    indicesClose: "✕ إغلاق",
    recentLabel: "تمت مشاهدته مؤخرًا",
    compareBtn: (n) => `مقارنة (${n}/3)`,
    compareTitle: "المقارنة",
    compareClose: "✕ إغلاق",
    compareReset: "🔄 مقارنة دول أخرى",
    compareNewTitle: "أضف دولاً بالنقر على +",
    compareMinMsg: "⚠️ الرجاء اختيار دولتين على الأقل للمقارنة.",
    compareShareTitle: "رسالة المشاركة",
    compareCustomMsg: "أو اكتب رسالتك",
    compareCustomPlaceholder: "أضف رسالتك المؤثرة الخاصة...",
    comparePrivacyNote: "✓ لا تُشارك أي مبالغ — المعدلات والتصنيف فقط",
    compareAdd: "+",
    compareRemove: "✕",
    comparePlaceholder: "انقر + على دولة لإضافتها",
    compareShare: (items) => items.map(i => `${i.flag} ${i.name}: صافي ${i.net} (${i.rate}% ضريبة)`).join(' | ') + ' — netpay.tax',
    compareSalaryLabel: "الراتب الإجمالي",
    compareTaxLabel: "الضريبة",
    compareNetLabel: "الصافي",
    compareRateLabel: "المعدل",
    funFactBtn: "🎲 حقائق مثيرة",
    funFactTitle: "حقائق مثيرة",
    funFactClose: "✕ إغلاق",
    funFactNext: "الحقيقة التالية →",
    funFactNone: "لا توجد حقائق متاحة لهذه المنطقة بعد.",
    contactSend: "إرسال الرسالة",
    contactName: "اسمك",
    contactEmail: "بريدك الإلكتروني",
    contactMessage: "رسالتك",
    contactSuccess: "✅ تم إرسال الرسالة! سنعود إليك قريبًا.",
    contactError: "❌ خطأ في الإرسال. يرجى المحاولة مجددًا.",
    contactSending: "جارٍ الإرسال...",
    footerLinks: ["سياسة الخصوصية", "عن الموقع", "تواصل معنا"],
    contactTitle: "تواصل معنا",
    contactText: "للتصحيحات أو الاقتراحات أو طلبات الشراكة، تواصل معنا عبر النموذج أدناه.",
    aboutTitle: "عن هذه الحاسبة",
    aboutText: "حاسبة ضريبة الدخل المجانية تتيح مقارنة صافي الراتب فورًا في ٩٦+ دولة و١٣ مقاطعة كندية و٥١ منطقة أمريكية.",
    howTitle: "كيف تعمل",
    howSteps: [
      { icon:"1️⃣", title:"أدخل راتبك", text:"اكتب راتبك السنوي أو الشهري الإجمالي بعملتك المفضلة: USD أو CAD أو EUR أو GBP أو AUD." },
      { icon:"2️⃣", title:"شاهد الترتيب", text:"يرتب الأداة كل دولة ومنطقة من أعلى إلى أدنى صافي راتب فوريًا." },
      { icon:"3️⃣", title:"انقر للتفاصيل", text:"انقر على أي دولة لرؤية التفاصيل الكاملة: الإجمالي والضريبة والصافي والمعدل الفعلي." },
    ],
    faqTitle: "الأسئلة الشائعة",
    faqs: [
      { q:"ما الضرائب المشمولة في الحساب؟", a:"ضريبة الدخل الفيدرالية والإقليمية فقط. لا تشمل الاشتراكات الاجتماعية أو ضريبة المبيعات أو أي خصومات أخرى." },
      { q:"لماذا تُعرض النتائج بالدولار الأمريكي؟", a:"يتم تحويل جميع النتائج إلى USD لسهولة المقارنة الدولية. يمكنك إدخال راتبك بـ CAD أو EUR أو GBP أو AUD." },
      { q:"ما مدى دقة معدلات الضريبة؟", a:"تستند المعدلات إلى أحدث البيانات المتاحة للعموم. تتغير القوانين الضريبية باستمرار — استشر دائمًا متخصصًا ضريبيًا." },
      { q:"هل تأخذ الحاسبة الإعفاءات الضريبية بالاعتبار؟", a:"لا. تطبق الحاسبة شرائح الضريبة الاعتيادية دون خصومات أو إعفاءات." },
      { q:"ما هو معدل الضريبة الفعلي؟", a:"هو نسبة إجمالي الدخل التي تذهب كضريبة، وهو مختلف عن معدل الضريبة الهامشي." },
      { q:"لماذا ألبرتا أقل ضريبةً من كيبيك؟", a:"تستفيد ألبرتا من ضريبة إقليمية ثابتة بنسبة ١٠% وعائدات النفط والغاز. أما كيبيك فتموّل خدمات عامة واسعة تصل نسبتها إلى ٢٥.٧٥%." },
    ],
    tipsTitle: "نصائح التخطيط الضريبي الدولي",
    tips: [
      { icon:"🌍", title:"الراتب الكلي لا الإجمالي فقط", text:"١٠٠,٠٠٠$ في نيويورك وتكساس مختلفان جدًا بعد الضرائب. نيويورك تفرض حتى ١٠.٩% ضريبة ولاية، بينما تكساس لا تفرض شيئًا." },
      { icon:"🏠", title:"العمل عن بُعد والإقامة الضريبية", text:"العمل عن بُعد لشركة أجنبية لا يعني بالضرورة دفع الضرائب حيث مقر صاحب العمل." },
      { icon:"📋", title:"اتفاقيات تجنب الازدواج الضريبي", text:"معظم الدول لديها اتفاقيات لمنع فرض الضريبة على نفس الدخل مرتين." },
      { icon:"💡", title:"استخدام الحسابات المسجلة", text:"RRSP وTFSA في كندا و401(k) وIRA في الولايات المتحدة تساعد في تخفيض معدل الضريبة الفعلي." },
    ],
    privacyTitle: "سياسة الخصوصية",
    privacyText: "لا يجمع هذا الموقع أي بيانات شخصية. تتم معالجة أرقام الراتب التي تدخلها في متصفحك فقط ولا ترسل إلى خوادمنا.",
    aboutPageTitle: "عن الموقع",
    aboutPageText: "NetPay.tax أداة مستقلة لمساعدة الأفراد على فهم معدلات ضريبة الدخل حول العالم. نحن غير مرتبطين بأي حكومة أو سلطة ضريبية.",
    footerDisclaimer: "للأغراض المعلوماتية فقط. ليس استشارة مالية أو ضريبية. استشر متخصصًا مؤهلاً.",
    currencies: [
      { code:"USD", label:"USD — دولار أمريكي",      symbol:"$", perUSD:1 },
      { code:"CAD", label:"CAD — دولار كندي",         symbol:"$", perUSD:1.36 },
      { code:"EUR", label:"EUR — يورو",               symbol:"€", perUSD:0.92 },
      { code:"GBP", label:"GBP — جنيه إسترليني",     symbol:"£", perUSD:0.79 },
      { code:"AUD", label:"AUD — دولار أسترالي",      symbol:"$", perUSD:1.55 },
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
  { name:"Alabama",        abbr:"AL", flagImg:"https://flagcdn.com/w40/us-al.png",        brackets:[[0,500,.02],[500,3000,.04],[3000,Infinity,.05]] },
  { name:"Alaska",         abbr:"AK", flagImg:"https://flagcdn.com/w40/us-ak.png",         brackets:[[0,Infinity,0]] },
  { name:"Arizona",        abbr:"AZ", flagImg:"https://flagcdn.com/w40/us-az.png",        brackets:[[0,Infinity,.025]] },
  { name:"Arkansas",       abbr:"AR", flagImg:"https://flagcdn.com/w40/us-ar.png",       brackets:[[0,4300,.02],[4300,8500,.04],[8500,Infinity,.044]] },
  { name:"California",     abbr:"CA", flagImg:"https://flagcdn.com/w40/us-ca.png",     brackets:[[0,10099,.01],[10099,23942,.02],[23942,37788,.04],[37788,52455,.06],[52455,66295,.08],[66295,338639,.093],[338639,406364,.103],[406364,677275,.113],[677275,Infinity,.123]] },
  { name:"Colorado",       abbr:"CO", flagImg:"https://flagcdn.com/w40/us-co.png",       brackets:[[0,Infinity,.044]] },
  { name:"Connecticut",    abbr:"CT", flagImg:"https://flagcdn.com/w40/us-ct.png",    brackets:[[0,10000,.03],[10000,50000,.05],[50000,100000,.055],[100000,200000,.06],[200000,250000,.065],[250000,500000,.069],[500000,Infinity,.0699]] },
  { name:"Delaware",       abbr:"DE", flagImg:"https://flagcdn.com/w40/us-de.png",       brackets:[[0,2000,0],[2000,5000,.022],[5000,10000,.039],[10000,20000,.048],[20000,25000,.052],[25000,60000,.0555],[60000,Infinity,.066]] },
  { name:"Florida",        abbr:"FL", flagImg:"https://flagcdn.com/w40/us-fl.png",        brackets:[[0,Infinity,0]] },
  { name:"Georgia",        abbr:"GA", flagImg:"https://flagcdn.com/w40/us-ga.png", brackets:[[0,Infinity,.0549]] },
  { name:"Hawaii",         abbr:"HI", flagImg:"https://flagcdn.com/w40/us-hi.png",         brackets:[[0,2400,.014],[2400,4800,.032],[4800,9600,.055],[9600,14400,.064],[14400,19200,.068],[19200,24000,.072],[24000,36000,.076],[36000,48000,.079],[48000,Infinity,.0825]] },
  { name:"Idaho",          abbr:"ID", flagImg:"https://flagcdn.com/w40/us-id.png",          brackets:[[0,Infinity,.058]] },
  { name:"Illinois",       abbr:"IL", flagImg:"https://flagcdn.com/w40/us-il.png",       brackets:[[0,Infinity,.0495]] },
  { name:"Indiana",        abbr:"IN", flagImg:"https://flagcdn.com/w40/us-in.png",        brackets:[[0,Infinity,.0305]] },
  { name:"Iowa",           abbr:"IA", flagImg:"https://flagcdn.com/w40/us-ia.png",           brackets:[[0,6000,.044],[6000,30000,.0482],[30000,Infinity,.057]] },
  { name:"Kansas",         abbr:"KS", flagImg:"https://flagcdn.com/w40/us-ks.png",         brackets:[[0,15000,.031],[15000,30000,.0525],[30000,Infinity,.057]] },
  { name:"Kentucky",       abbr:"KY", flagImg:"https://flagcdn.com/w40/us-ky.png",       brackets:[[0,Infinity,.04]] },
  { name:"Louisiana",      abbr:"LA", flagImg:"https://flagcdn.com/w40/us-la.png",      brackets:[[0,12500,.0185],[12500,50000,.035],[50000,Infinity,.0425]] },
  { name:"Maine",          abbr:"ME", flagImg:"https://flagcdn.com/w40/us-me.png",          brackets:[[0,24500,.058],[24500,58050,.0675],[58050,Infinity,.0715]] },
  { name:"Maryland",       abbr:"MD", flagImg:"https://flagcdn.com/w40/us-md.png",       brackets:[[0,1000,.02],[1000,2000,.03],[2000,3000,.04],[3000,100000,.0475],[100000,125000,.05],[125000,150000,.0525],[150000,250000,.055],[250000,Infinity,.0575]] },
  { name:"Massachusetts",  abbr:"MA", flagImg:"https://flagcdn.com/w40/us-ma.png",  brackets:[[0,Infinity,.05]] },
  { name:"Michigan",       abbr:"MI", flagImg:"https://flagcdn.com/w40/us-mi.png",       brackets:[[0,Infinity,.0405]] },
  { name:"Minnesota",      abbr:"MN", flagImg:"https://flagcdn.com/w40/us-mn.png",      brackets:[[0,30070,.0535],[30070,98760,.068],[98760,183340,.0785],[183340,Infinity,.0985]] },
  { name:"Mississippi",    abbr:"MS", flagImg:"https://flagcdn.com/w40/us-ms.png",    brackets:[[0,10000,0],[10000,Infinity,.047]] },
  { name:"Missouri",       abbr:"MO", flagImg:"https://flagcdn.com/w40/us-mo.png",       brackets:[[0,1207,0],[1207,Infinity,.048]] },
  { name:"Montana",        abbr:"MT", flagImg:"https://flagcdn.com/w40/us-mt.png",        brackets:[[0,20500,.047],[20500,Infinity,.059]] },
  { name:"Nebraska",       abbr:"NE", flagImg:"https://flagcdn.com/w40/us-ne.png",       brackets:[[0,3700,.0246],[3700,22170,.0351],[22170,35730,.0501],[35730,Infinity,.0584]] },
  { name:"Nevada",         abbr:"NV", flagImg:"https://flagcdn.com/w40/us-nv.png",         brackets:[[0,Infinity,0]] },
  { name:"New Hampshire",  abbr:"NH", flagImg:"https://flagcdn.com/w40/us-nh.png",  brackets:[[0,Infinity,0]] },
  { name:"New Jersey",     abbr:"NJ", flagImg:"https://flagcdn.com/w40/us-nj.png",     brackets:[[0,20000,.014],[20000,35000,.0175],[35000,40000,.035],[40000,75000,.05525],[75000,500000,.0637],[500000,1000000,.0897],[1000000,Infinity,.1075]] },
  { name:"New Mexico",     abbr:"NM", flagImg:"https://flagcdn.com/w40/us-nm.png",     brackets:[[0,5500,.017],[5500,11000,.032],[11000,16000,.047],[16000,210000,.049],[210000,Infinity,.059]] },
  { name:"New York",       abbr:"NY", flagImg:"https://flagcdn.com/w40/us-ny.png",       brackets:[[0,8500,.04],[8500,11700,.045],[11700,13900,.0525],[13900,21400,.0585],[21400,80650,.0625],[80650,215400,.0685],[215400,1077550,.0965],[1077550,5000000,.103],[5000000,Infinity,.109]] },
  { name:"North Carolina", abbr:"NC", flagImg:"https://flagcdn.com/w40/us-nc.png", brackets:[[0,Infinity,.045]] },
  { name:"North Dakota",   abbr:"ND", flagImg:"https://flagcdn.com/w40/us-nd.png",   brackets:[[0,44725,.011],[44725,Infinity,.0204]] },
  { name:"Ohio",           abbr:"OH", flagImg:"https://flagcdn.com/w40/us-oh.png",           brackets:[[0,26050,0],[26050,46100,.02765],[46100,92150,.03226],[92150,115300,.03688],[115300,Infinity,.0399]] },
  { name:"Oklahoma",       abbr:"OK", flagImg:"https://flagcdn.com/w40/us-ok.png",       brackets:[[0,1000,.0025],[1000,2500,.0075],[2500,3750,.0175],[3750,4900,.0275],[4900,7200,.0375],[7200,Infinity,.0475]] },
  { name:"Oregon",         abbr:"OR", flagImg:"https://flagcdn.com/w40/us-or.png",         brackets:[[0,18400,.0475],[18400,46200,.0675],[46200,250000,.0875],[250000,Infinity,.099]] },
  { name:"Pennsylvania",   abbr:"PA", flagImg:"https://flagcdn.com/w40/us-pa.png",   brackets:[[0,Infinity,.0307]] },
  { name:"Rhode Island",   abbr:"RI", flagImg:"https://flagcdn.com/w40/us-ri.png",   brackets:[[0,77450,.0375],[77450,176050,.0475],[176050,Infinity,.0599]] },
  { name:"South Carolina", abbr:"SC", flagImg:"https://flagcdn.com/w40/us-sc.png", brackets:[[0,3460,0],[3460,17330,.03],[17330,Infinity,.064]] },
  { name:"South Dakota",   abbr:"SD", flagImg:"https://flagcdn.com/w40/us-sd.png",   brackets:[[0,Infinity,0]] },
  { name:"Tennessee",      abbr:"TN", flagImg:"https://flagcdn.com/w40/us-tn.png",      brackets:[[0,Infinity,0]] },
  { name:"Texas",          abbr:"TX", flagImg:"https://flagcdn.com/w40/us-tx.png",          brackets:[[0,Infinity,0]] },
  { name:"Utah",           abbr:"UT", flagImg:"https://flagcdn.com/w40/us-ut.png",           brackets:[[0,Infinity,.0455]] },
  { name:"Vermont",        abbr:"VT", flagImg:"https://flagcdn.com/w40/us-vt.png",        brackets:[[0,45400,.0335],[45400,110050,.066],[110050,229550,.076],[229550,Infinity,.0875]] },
  { name:"Virginia",       abbr:"VA", flagImg:"https://flagcdn.com/w40/us-va.png",       brackets:[[0,3000,.02],[3000,5000,.03],[5000,17000,.05],[17000,Infinity,.0575]] },
  { name:"Washington",     abbr:"WA", flagImg:"https://flagcdn.com/w40/us-wa.png",     brackets:[[0,Infinity,0]] },
  { name:"West Virginia",  abbr:"WV", flagImg:"https://flagcdn.com/w40/us-wv.png",  brackets:[[0,10000,.03],[10000,25000,.04],[25000,40000,.045],[40000,60000,.06],[60000,Infinity,.065]] },
  { name:"Wisconsin",      abbr:"WI", flagImg:"https://flagcdn.com/w40/us-wi.png",      brackets:[[0,13810,.0354],[13810,27630,.0465],[27630,304170,.053],[304170,Infinity,.0765]] },
  { name:"Wyoming",        abbr:"WY", flagImg:"https://flagcdn.com/w40/us-wy.png",        brackets:[[0,Infinity,0]] },
  { name:"Washington D.C.",abbr:"DC", flagImg:"https://flagcdn.com/w40/us-dc.png", brackets:[[0,10000,.04],[10000,40000,.06],[40000,60000,.065],[60000,250000,.085],[250000,500000,.0925],[500000,Infinity,.0975]] },
];

const OTHER_COUNTRIES = [
  { name:"England & Wales",flag:"🇬🇧", localPerUSD:0.79,  brackets:[[0,12570,0],[12570,50270,.20],[50270,125140,.40],[125140,Infinity,.45]] },
  { name:"Scotland",          flag:"🏴", localPerUSD:0.79,  brackets:[[0,12570,0],[12570,14876,.19],[14876,26561,.20],[26561,43662,.21],[43662,75000,.42],[75000,125140,.45],[125140,Infinity,.48]] },
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
  // ── New countries ──────────────────────────────────────────────────────
  { name:"Luxembourg",      flag:"🇱🇺", localPerUSD:0.92,  brackets:[[0,11265,0],[11265,13173,.08],[13173,15681,.09],[15681,18189,.10],[18189,23208,.11],[23208,27687,.12],[27687,32166,.14],[32166,36645,.16],[36645,41124,.18],[41124,45603,.20],[45603,50073,.22],[50073,54543,.24],[54543,59013,.26],[59013,63483,.28],[63483,67962,.30],[67962,114360,.32],[114360,166920,.34],[166920,Infinity,.42]] },
  { name:"Iceland",         flag:"🇮🇸", localPerUSD:138,   brackets:[[0,Infinity,.3732]] },
  { name:"Croatia",         flag:"🇭🇷", localPerUSD:7.53,  brackets:[[0,360000,.20],[360000,Infinity,.30]] },
  { name:"Slovenia",        flag:"🇸🇮", localPerUSD:0.92,  brackets:[[0,8755,.16],[8755,25922,.26],[25922,51842,.33],[51842,74188,.39],[74188,Infinity,.45]] },
  { name:"Slovakia",        flag:"🇸🇰", localPerUSD:0.92,  brackets:[[0,38553,.19],[38553,Infinity,.25]] },
  { name:"Estonia",         flag:"🇪🇪", localPerUSD:0.92,  brackets:[[0,Infinity,.20]] },
  { name:"Latvia",          flag:"🇱🇻", localPerUSD:0.92,  brackets:[[0,20004,.20],[20004,78100,.23],[78100,Infinity,.31]] },
  { name:"Lithuania",       flag:"🇱🇹", localPerUSD:0.92,  brackets:[[0,101094,.20],[101094,Infinity,.32]] },
  { name:"Bulgaria",        flag:"🇧🇬", localPerUSD:1.95,  brackets:[[0,Infinity,.10]] },
  { name:"Serbia",          flag:"🇷🇸", localPerUSD:108,   brackets:[[0,Infinity,.10]] },
  { name:"Ukraine",         flag:"🇺🇦", localPerUSD:37.5,  brackets:[[0,Infinity,.18]] },
  { name:"Morocco",         flag:"🇲🇦", localPerUSD:10.1,  brackets:[[0,30000,0],[30000,50000,.10],[50000,60000,.20],[60000,80000,.30],[80000,180000,.34],[180000,Infinity,.38]] },
  { name:"Qatar",           flag:"🇶🇦", localPerUSD:3.64,  brackets:[[0,Infinity,0]] },
  { name:"Kuwait",          flag:"🇰🇼", localPerUSD:0.307, brackets:[[0,Infinity,0]] },
  { name:"Bahrain",         flag:"🇧🇭", localPerUSD:0.376, brackets:[[0,Infinity,0]] },
  { name:"Jordan",          flag:"🇯🇴", localPerUSD:0.709, brackets:[[0,5000,0],[5000,10000,.05],[10000,15000,.10],[15000,20000,.15],[20000,Infinity,.20]] },
  { name:"Pakistan",        flag:"🇵🇰", localPerUSD:279,   brackets:[[0,600000,0],[600000,1200000,.05],[1200000,2400000,.15],[2400000,3600000,.25],[3600000,6000000,.30],[6000000,Infinity,.35]] },
  { name:"Bangladesh",      flag:"🇧🇩", localPerUSD:110,   brackets:[[0,300000,0],[300000,400000,.05],[400000,700000,.10],[700000,1100000,.15],[1100000,1600000,.20],[1600000,Infinity,.25]] },
  { name:"Sri Lanka",       flag:"🇱🇰", localPerUSD:300,   brackets:[[0,1200000,0],[1200000,2700000,.06],[2700000,4200000,.12],[4200000,5700000,.18],[5700000,7200000,.24],[7200000,Infinity,.36]] },
  { name:"Taiwan",          flag:"🇹🇼", localPerUSD:32.3,  brackets:[[0,540000,.05],[540000,1210000,.12],[1210000,2420000,.20],[2420000,4530000,.30],[4530000,10310000,.40],[10310000,Infinity,.45]] },
  { name:"Peru",            flag:"🇵🇪", localPerUSD:3.73,  brackets:[[0,25750,.08],[25750,120050,.14],[120050,Infinity,.30]] },
  { name:"Ecuador",         flag:"🇪🇨", localPerUSD:1,     brackets:[[0,11902,0],[11902,15159,.05],[15159,19682,.10],[19682,26031,.12],[26031,34255,.15],[34255,45407,.20],[45407,60450,.25],[60450,80600,.30],[80600,Infinity,.35]] },
  { name:"Uruguay",         flag:"🇺🇾", localPerUSD:39.5,  brackets:[[0,43117,0],[43117,61595,.10],[61595,92393,.15],[92393,184787,.24],[184787,277181,.25],[277181,369574,.27],[369574,Infinity,.31]] },
  { name:"Panama",          flag:"🇵🇦", localPerUSD:1,     brackets:[[0,11000,0],[11000,50000,.15],[50000,Infinity,.25]] },
  { name:"Costa Rica",      flag:"🇨🇷", localPerUSD:520,   brackets:[[0,929000,0],[929000,1362000,.10],[1362000,2271000,.15],[2271000,4543000,.20],[4543000,Infinity,.25]] },
  { name:"Ghana",           flag:"🇬🇭", localPerUSD:14.7,  brackets:[[0,402,0],[402,510,.05],[510,660,.10],[660,3240,.175],[3240,19980,.25],[19980,Infinity,.30]] },
  { name:"Tanzania",        flag:"🇹🇿", localPerUSD:2560,  brackets:[[0,270000,0],[270000,520000,.08],[520000,760000,.20],[760000,1000000,.25],[1000000,Infinity,.30]] },
  { name:"Ethiopia",        flag:"🇪🇹", localPerUSD:55.5,  brackets:[[0,600,0],[600,1650,.10],[1650,3200,.15],[3200,5250,.20],[5250,7800,.25],[7800,10900,.30],[10900,Infinity,.35]] },
  { name:"Mongolia",        flag:"🇲🇳", localPerUSD:3400,  brackets:[[0,Infinity,.10]] },
  { name:"Cambodia",        flag:"🇰🇭", localPerUSD:4080,  brackets:[[0,1300000,0],[1300000,2000000,.05],[2000000,8500000,.10],[8500000,12500000,.15],[12500000,Infinity,.20]] },
  { name:"Myanmar",         flag:"🇲🇲", localPerUSD:2100,  brackets:[[0,4800000,0],[4800000,10000000,.05],[10000000,20000000,.10],[20000000,30000000,.15],[30000000,Infinity,.25]] },
  { name:"Andorra",         flag:"🇦🇩", localPerUSD:0.92,  brackets:[[0,24000,0],[24000,40000,.05],[40000,Infinity,.10]] },
  { name:"Monaco",          flag:"🇲🇨", localPerUSD:0.92,  brackets:[[0,Infinity,0]] },
  { name:"Malta",           flag:"🇲🇹", localPerUSD:0.92,  brackets:[[0,9100,0],[9100,14500,.15],[14500,19500,.25],[19500,60000,.25],[60000,Infinity,.35]] },
  { name:"Cyprus",          flag:"🇨🇾", localPerUSD:0.92,  brackets:[[0,19500,0],[19500,28000,.20],[28000,36300,.25],[36300,60000,.30],[60000,Infinity,.35]] },
  { name:"Albania",         flag:"🇦🇱", localPerUSD:107,   brackets:[[0,30000,0],[30000,150000,.13],[150000,Infinity,.23]] },
  { name:"North Macedonia", flag:"🇲🇰", localPerUSD:61.5,  brackets:[[0,Infinity,.10]] },
  { name:"Bosnia",          flag:"🇧🇦", localPerUSD:1.95,  brackets:[[0,Infinity,.10]] },
  { name:"Armenia",         flag:"🇦🇲", localPerUSD:400,   brackets:[[0,Infinity,.20]] },
  { name:"Georgia",         flag:"🇬🇪", localPerUSD:2.65,  brackets:[[0,Infinity,.20]] },
  { name:"Kazakhstan",      flag:"🇰🇿", localPerUSD:450,   brackets:[[0,Infinity,.10]] },
  { name:"Azerbaijan",      flag:"🇦🇿", localPerUSD:1.70,  brackets:[[0,2500,.14],[2500,Infinity,.25]] },
  { name:"Uzbekistan",      flag:"🇺🇿", localPerUSD:12700, brackets:[[0,Infinity,.12]] },
  { name:"Tunisia",         flag:"🇹🇳", localPerUSD:3.14,  brackets:[[0,5000,0],[5000,20000,.26],[20000,30000,.28],[30000,50000,.32],[50000,Infinity,.35]] },
  { name:"Algeria",         flag:"🇩🇿", localPerUSD:135,   brackets:[[0,240000,0],[240000,480000,.23],[480000,960000,.27],[960000,1920000,.30],[1920000,3840000,.33],[3840000,Infinity,.35]] },
  { name:"Ivory Coast",     flag:"🇨🇮", localPerUSD:595,   brackets:[[0,Infinity,.20]] },
  { name:"Senegal",         flag:"🇸🇳", localPerUSD:590,   brackets:[[0,630000,0],[630000,1500000,.20],[1500000,4000000,.30],[4000000,8000000,.35],[8000000,13500000,.37],[13500000,Infinity,.40]] },
  { name:"Cameroon",        flag:"🇨🇲", localPerUSD:595,   brackets:[[0,2000000,0],[2000000,3000000,.115],[3000000,5000000,.165],[5000000,10000000,.275],[10000000,Infinity,.385]] },
];


// ── Fun Facts ─────────────────────────────────────────────────────────────
const FUN_FACTS = {
  "United States": [
    { en: "Depending on which state you live in (like Florida or Texas), you could pay 0% in state income tax!", fr: "Selon l'État où tu habites (comme la Floride ou le Texas), tu pourrais payer 0 % d'impôt provincial !", es: "Dependiendo del estado donde vivas (como Florida o Texas), ¡podrías pagar un 0% de impuesto estatal!" },
    { en: "The US federal income tax was introduced in 1913 with the 16th Amendment. The initial top rate was just 7% — for income over $500,000 (roughly $15M today).", fr: "L'impôt fédéral américain a été introduit en 1913 avec le 16e amendement. Le taux maximum initial était de seulement 7 % — pour les revenus dépassant 500 000 $.", es: "El impuesto federal de EE.UU. se introdujo en 1913. La tasa máxima inicial era solo del 7% para ingresos superiores a $500,000." },
    { en: "During WWII, the top US marginal tax rate reached 94% on income above $200,000. Today it is 37%.", fr: "Pendant la Seconde Guerre mondiale, le taux marginal maximal américain atteignait 94 % sur les revenus supérieurs à 200 000 $. Aujourd'hui, il est de 37 %.", es: "Durante la Segunda Guerra Mundial, la tasa marginal máxima de EE.UU. alcanzó el 94%. Hoy es del 37%." },
  ],
  "England & Wales": [
    { en: "In London, if you earn more than £150,000, your income tax rate climbs to 45%. That's the price of living near Big Ben!", fr: "À Londres, si tu gagnes plus de £150,000, ton taux d'imposition grimpe à 45 %. C'est le prix à payer pour vivre près de Big Ben !", es: "En Londres, si ganas más de £150.000, tu tipo impositivo sube al 45%. ¡Ese es el precio de vivir cerca del Big Ben!" },
    { en: "The UK income tax was originally introduced in 1799 by Prime Minister William Pitt the Younger to fund the Napoleonic Wars. It was meant to be temporary!", fr: "L'impôt sur le revenu au Royaume-Uni a été introduit en 1799 par William Pitt le Jeune pour financer les guerres napoléoniennes. Il devait être temporaire !", es: "El impuesto sobre la renta del Reino Unido fue introducido en 1799 para financiar las guerras napoleónicas. ¡Se suponía que era temporal!" },
    { en: "The UK has a unique 'Marriage Allowance' that lets lower earners transfer part of their personal allowance to a higher-earning spouse, saving up to £252/year.", fr: "Le Royaume-Uni a une 'allocation de mariage' unique qui permet aux personnes à faible revenu de transférer une partie de leur abattement personnel à leur conjoint.", es: "El Reino Unido tiene una 'Marriage Allowance' que permite a los contribuyentes de bajos ingresos transferir parte de su desgravación personal al cónyuge." },
  ],
  "Scotland": [
    { en: "Scotland has its own income tax rates set by the Scottish Parliament since 2017, making it the only part of the UK with devolved income tax powers. It has 6 tax bands — more than any other UK nation.", fr: "L'Écosse fixe ses propres taux d'imposition depuis 2017. C'est la seule partie du Royaume-Uni avec des pouvoirs fiscaux décentralisés, avec 6 tranches d'imposition.", es: "Escocia fija sus propias tasas de impuesto sobre la renta desde 2017, siendo la única parte del Reino Unido con poderes fiscales descentralizados. Tiene 6 tramos fiscales." },
  ],
  "Canada": [
    { en: "Canada is the world champion of hidden taxes on gas and alcohol — but they also invented Poutine, so that makes up for it!", fr: "C'est ici qu'on paie le plus de taxes cachées sur l'essence et l'alcool, mais on a inventé la Poutine, ça compense !", es: "Canadá es el campeón mundial de los impuestos ocultos en gasolina y alcohol, ¡pero también inventó la Poutine, así que hay recompensa!" },
    { en: "Canada introduced its federal income tax in 1917 — also as a 'temporary' wartime measure to fund WWI. It never went away.", fr: "Le Canada a introduit son impôt fédéral sur le revenu en 1917 — aussi comme mesure 'temporaire' de guerre pour financer la Première Guerre mondiale. Il n'a jamais disparu.", es: "Canadá introdujo su impuesto federal sobre la renta en 1917, también como medida 'temporal' de guerra para la Primera Guerra Mundial. Nunca desapareció." },
  ],
  "Ontario": [
    { en: "Ontario has a 'surtax' — a tax on your tax — that kicks in when provincial tax exceeds $5,315. You pay an extra 20% on the excess, then 56% on anything above $6,802. Ontario is the only province with a surtax.", fr: "L'Ontario a une 'surtaxe' — un impôt sur votre impôt — qui s'applique quand l'impôt provincial dépasse 5 315 $. C'est la seule province avec une surtaxe.", es: "Ontario tiene un 'sobretax' — un impuesto sobre tu impuesto — que se activa cuando el impuesto provincial supera $5,315. Es la única provincia con un sobretax." },
  ],
  "Québec": [
    { en: "Quebec has the highest provincial income tax in Canada — up to 25.75% — but in return offers North America's most generous family benefits: daycare at $10/day and heavily subsidized tuition.", fr: "Le Québec a le taux provincial le plus élevé au Canada — jusqu'à 25,75 % — mais offre en contrepartie les avantages familiaux les plus généreux en Amérique du Nord : garderies à 10 $/jour et droits de scolarité très bas.", es: "Quebec tiene el impuesto provincial más alto de Canadá, hasta 25,75%, pero ofrece las prestaciones familiares más generosas de América del Norte: guarderías a $10/día y matrículas universitarias muy subvencionadas." },
    { en: "Quebecers file TWO separate income tax returns each year — one federal and one provincial — unlike every other province where the CRA handles both.", fr: "Les Québécois remplissent DEUX déclarations de revenus distinctes chaque année — une fédérale et une provinciale — contrairement aux autres provinces où l'ARC s'occupe des deux.", es: "Los quebecos presentan DOS declaraciones de impuestos separadas cada año, una federal y una provincial, a diferencia del resto de provincias donde la CRA gestiona ambas." },
  ],
  "Alberta": [
    { en: "Alberta is the only Canadian province with NO provincial sales tax (PST). Combined with its low 10% flat provincial income tax rate, it is regularly ranked the lowest-taxed province in Canada.", fr: "L'Alberta est la seule province canadienne sans taxe de vente provinciale. Avec son taux provincial fixe de 10 %, c'est régulièrement la province la moins taxée au Canada.", es: "Alberta es la única provincia canadiense sin impuesto provincial sobre ventas. Con su tasa provincial plana del 10%, es regularmente la provincia menos gravada de Canadá." },
  ],
  "Colombie-Britannique": [
    { en: "British Columbia introduced a carbon tax in 2008, making it the first North American jurisdiction to do so. The revenue is used to reduce other taxes, making it 'revenue-neutral'.", fr: "La Colombie-Britannique a introduit une taxe carbone en 2008, première juridiction nord-américaine à le faire. Les revenus servent à réduire d'autres taxes.", es: "Columbia Británica introdujo un impuesto al carbono en 2008, siendo la primera jurisdicción de América del Norte en hacerlo. Los ingresos se usan para reducir otros impuestos." },
  ],
  "France": [
    { en: "France is the world champion of taxes — but also the country with the most vacation days per year. You can't have everything!", fr: "C'est le champion du monde des taxes, mais aussi le pays avec le plus de jours de vacances par année. On ne peut pas tout avoir !", es: "Francia es la campeona mundial de los impuestos, ¡pero también el país con más días de vacaciones al año. ¡No se puede tener todo!" },
    { en: "France introduced income tax in 1914 — just before WWI. Before that, it relied heavily on indirect taxes on salt, wine and tobacco.", fr: "La France a introduit l'impôt sur le revenu en 1914, juste avant la Première Guerre mondiale. Avant cela, elle s'appuyait sur les taxes indirectes sur le sel, le vin et le tabac.", es: "Francia introdujo el impuesto sobre la renta en 1914, justo antes de la Primera Guerra Mundial. Antes dependía de impuestos indirectos sobre la sal, el vino y el tabaco." },
    { en: "France is one of the few countries where households — not individuals — file taxes together. A family of 4 might pay less than two singles earning the same total, thanks to the 'quotient familial' system.", fr: "La France est l'un des rares pays où les ménages — pas les individus — déclarent leurs impôts ensemble. Le système du 'quotient familial' avantage les grandes familles.", es: "Francia es uno de los pocos países donde los hogares declaran impuestos juntos. El sistema de 'quotient familial' beneficia a las familias numerosas." },
  ],
  "Germany": [
    { en: "If you run out of gas on the Autobahn (the highway), it's illegal and you'll receive a hefty fine!", fr: "Si tu tombes en panne d'essence sur l'Autobahn, c'est illégal et tu recevras une amende salée !", es: "Si te quedas sin gasolina en la Autobahn (la autopista), es ilegal y recibirás una fuerte multa." },
    { en: "Germany has a 'church tax' (Kirchensteuer) of 8-9% added on top of income tax for registered church members. You can officially leave your church to avoid it.", fr: "L'Allemagne a une 'taxe d'église' (Kirchensteuer) de 8-9 % ajoutée à l'impôt sur le revenu pour les membres d'église enregistrés. On peut officiellement quitter son église pour l'éviter.", es: "Alemania tiene un 'impuesto eclesiástico' (Kirchensteuer) del 8-9% añadido al impuesto sobre la renta para los miembros registrados de la iglesia. ¡Puedes darte de baja de tu iglesia para evitarlo!" },
  ],
  "Switzerland": [
    { en: "It's the country with the highest average salary in the world — but get ready to pay $15 for a coffee and a croissant.", fr: "C'est le pays avec le plus haut salaire moyen au monde, mais prépare-toi à payer 15 $ pour un café et un croissant.", es: "Es el país con el salario medio más alto del mundo, ¡pero prepárate para pagar 15 $ por un café y un croissant!" },
    { en: "In Switzerland, tax rates vary dramatically between cantons. The difference between the lowest (Zug) and highest (Geneva) canton can be over 20 percentage points on the same income.", fr: "En Suisse, les taux d'imposition varient considérablement entre les cantons. La différence entre le canton le moins taxé (Zoug) et le plus taxé (Genève) peut dépasser 20 points de pourcentage.", es: "En Suiza, las tasas impositivas varían drásticamente entre cantones. La diferencia entre el cantón más bajo (Zug) y el más alto (Ginebra) puede superar 20 puntos porcentuales." },
  ],
  "Sweden": [
    { en: "You can ask to see anyone's tax return in Sweden — even the Prime Minister's — with a simple phone call to the tax authority!", fr: "Tu peux demander à voir la déclaration de revenus de n'importe qui, même celle du Premier ministre, en passant un simple coup de fil au fisc !", es: "¡En Suecia puedes pedir ver la declaración de impuestos de cualquiera, incluso la del Primer Ministro, con una simple llamada telefónica!" },
    { en: "Sweden once had a top marginal income tax rate of 102% in the 1970s — meaning some high earners theoretically owed more in tax than they earned. Author Astrid Lindgren (Pippi Longstocking) famously protested it.", fr: "La Suède avait autrefois un taux marginal maximum de 102 % dans les années 1970 — certains hauts revenus devaient théoriquement plus en impôts qu'ils ne gagnaient. L'auteure Astrid Lindgren (Fifi Brindacier) l'a célèbrement dénoncé.", es: "Suecia tuvo en los años 70 una tasa marginal máxima del 102%, lo que significaba que algunos contribuyentes debían en impuestos más de lo que ganaban. La autora Astrid Lindgren (Pippi Calzaslargas) lo protestó famosamente." },
  ],
  "Norway": [
    { en: "Every citizen's wealth (taxes paid, income, capital) is public record. Anyone can see what their neighbor earns!", fr: "La fortune de chaque citoyen (taxes payées, revenus, capital) est publique. Tout le monde peut voir ce que son voisin gagne !", es: "La fortuna de cada ciudadano (impuestos pagados, ingresos, capital) es pública. ¡Todo el mundo puede ver lo que gana su vecino!" },
    { en: "Norway's sovereign wealth fund — funded by oil revenues — is worth over $1.7 trillion, or about $300,000 per Norwegian citizen. This reduces the pressure on personal income taxes.", fr: "Le fonds souverain norvégien — alimenté par les revenus pétroliers — vaut plus de 1 700 milliards $, soit environ 300 000 $ par citoyen norvégien. Cela réduit la pression sur les impôts personnels.", es: "El fondo soberano de Noruega, financiado por ingresos petroleros, vale más de 1,7 billones de dólares, unos 300.000 $ por ciudadano noruego. Esto reduce la presión sobre los impuestos personales." },
  ],
  "Denmark": [
    { en: "Danes are among the most taxed people in the world — but they're also consistently ranked among the happiest.", fr: "Les Danois sont parmi les plus taxés, mais ils sont aussi classés parmi les gens les plus heureux au monde.", es: "Los daneses están entre los más gravados fiscalmente del mundo, ¡pero también son sistemáticamente clasificados entre los más felices!" },
    { en: "Denmark consistently ranks as the world's happiest country despite having one of the highest tax rates globally. Danes call their taxes 'membership fees' for a well-functioning society.", fr: "Le Danemark est régulièrement classé comme le pays le plus heureux au monde malgré l'un des taux d'imposition les plus élevés. Les Danois appellent leurs impôts des 'frais d'adhésion' à une société bien fonctionnelle.", es: "Dinamarca ocupa constantemente el primer lugar como el país más feliz del mundo a pesar de tener una de las tasas impositivas más altas. Los daneses llaman a sus impuestos 'cuotas de membresía' de una sociedad que funciona bien." },
  ],
  "Japan": [
    { en: "Japan has a 'Metabo Law' — a waist tax — that encourages companies to keep their employees healthy. Employers face fines if too many workers are overweight.", fr: "Il existe une 'taxe sur le tour de taille' (loi Metabo) pour encourager les entreprises à garder leurs employés en santé.", es: "Japón tiene la 'Ley Metabo', un impuesto sobre la cintura que incentiva a las empresas a mantener sanos a sus empleados." },
    { en: "Japan has an unusual 'inhabitant tax' that is collected by municipalities and prefectures on top of national income tax. It is paid the year AFTER earnings — meaning new retirees still get a bill.", fr: "Le Japon a une 'taxe d'habitant' inhabituelle perçue par les municipalités en plus de l'impôt national. Elle est payée l'année SUIVANT les revenus — les nouveaux retraités reçoivent encore une facture.", es: "Japón tiene un inusual 'impuesto de habitante' recaudado por los municipios además del impuesto nacional. Se paga el año SIGUIENTE a los ingresos, lo que significa que los nuevos jubilados aún reciben una factura." },
  ],
  "Australia": [
    { en: "Australia's minimum wage is one of the highest in the world — enough to buy a lot of sunscreen.", fr: "Le salaire minimum est l'un des plus élevés au monde, assez pour s'offrir beaucoup de crème solaire.", es: "El salario mínimo de Australia es uno de los más altos del mundo, suficiente para comprar mucho protector solar." },
    { en: "Australia has a 'Medicare Levy' of 2% on taxable income to fund the public health system, on top of regular income tax. Higher earners pay an additional 1.5% surcharge if they don't have private health insurance.", fr: "L'Australie a une 'taxe Medicare' de 2 % sur le revenu imposable pour financer le système de santé public. Les hauts revenus paient une surtaxe supplémentaire s'ils n'ont pas d'assurance maladie privée.", es: "Australia tiene un 'Medicare Levy' del 2% sobre la renta imponible para financiar el sistema de salud público. Los contribuyentes de altos ingresos pagan un recargo adicional si no tienen seguro médico privado." },
  ],
  "New Zealand": [
    { en: "New Zealand was the first country in the world to give women the right to vote (1893) and is one of the easiest places to start a business.", fr: "C'est le premier pays au monde à avoir donné le droit de vote aux femmes (1893) et l'un des plus faciles pour lancer une entreprise.", es: "Nueva Zelanda fue el primer país del mundo en dar el voto a las mujeres (1893) y es uno de los más fáciles para crear una empresa." },
    { en: "New Zealand has no capital gains tax on most investments, making it unusual among OECD countries. Property investors have historically paid no tax on profits from selling homes.", fr: "La Nouvelle-Zélande n'a pas d'impôt sur les plus-values pour la plupart des investissements, ce qui la distingue des pays de l'OCDE. Les investisseurs immobiliers n'ont historiquement payé aucun impôt sur les profits de vente de maisons.", es: "Nueva Zelanda no tiene impuesto sobre las ganancias de capital para la mayoría de las inversiones, lo que la hace inusual entre los países de la OCDE." },
  ],
  "Singapore": [
    { en: "Taxes are very low, but owning a single car can cost over $100,000 in permits and certificates of entitlement.", fr: "Les taxes sont très basses, mais posséder une simple voiture peut te coûter plus de 100 000 $ en permis.", es: "Los impuestos son muy bajos, pero poseer un solo coche puede costarte más de 100.000 $ en permisos y certificados." },
    { en: "Singapore offers a flat 15% tax option for non-resident professionals, OR the standard progressive rates — whichever is higher. This unusual 'pay the higher rate' rule discourages tax avoidance.", fr: "Singapour offre une option d'impôt fixe de 15 % pour les professionnels non-résidents, OU les taux progressifs standard — le plus élevé des deux s'applique.", es: "Singapur ofrece una opción de tasa plana del 15% para profesionales no residentes, O las tasas progresivas estándar, la que sea más alta. Esta inusual regla disuade la evasión fiscal." },
  ],
  "UAE": [
    { en: "Income tax is 0%. Yes, 0. Everything your boss gives you ends up in your pocket.", fr: "L'impôt sur le revenu est de 0 %. Oui, 0. Tout ce que ton patron te donne finit dans tes poches.", es: "El impuesto sobre la renta es del 0%. Sí, 0. Todo lo que tu jefe te da acaba en tu bolsillo." },
    { en: "The UAE has zero personal income tax, funded largely by oil revenues and a 9% corporate tax (introduced in 2023). It is one of the few nations where individuals can legally earn millions with zero income tax obligation.", fr: "Les Émirats arabes unis ont un impôt sur le revenu des personnes physiques nul, financé principalement par les revenus pétroliers. C'est l'un des rares pays où les individus peuvent légalement gagner des millions sans aucune obligation fiscale.", es: "Los EAU tienen cero impuesto sobre la renta personal, financiado principalmente por los ingresos petroleros. Es uno de los pocos países donde las personas pueden ganar millones legalmente sin ninguna obligación fiscal." },
  ],
  "Saudi Arabia": [
    { en: "Like its Gulf neighbors, there's no income tax — but there's a religious tax called 'Zakat' of 2.5% on wealth for citizens.", fr: "Comme ses voisins du Golfe, il n'y a pas d'impôt sur le revenu, mais il existe une taxe religieuse appelée Zakat pour les citoyens.", es: "Como sus vecinos del Golfo, no hay impuesto sobre la renta, pero existe un impuesto religioso llamado 'Zakat' para los ciudadanos." },
    { en: "Saudi Arabia has no personal income tax for individuals. However, Saudi nationals pay Zakat — a religious obligation of 2.5% on wealth held for one year — which partially functions as a wealth tax.", fr: "L'Arabie saoudite n'a pas d'impôt sur le revenu des personnes. Cependant, les ressortissants saoudiens paient la Zakat — une obligation religieuse de 2,5 % sur la richesse — qui fonctionne partiellement comme un impôt sur la fortune.", es: "Arabia Saudita no tiene impuesto sobre la renta personal. Sin embargo, los ciudadanos saudíes pagan Zakat, una obligación religiosa del 2,5% sobre la riqueza, que funciona parcialmente como un impuesto sobre el patrimonio." },
  ],
  "Hong Kong": [
    { en: "Hong Kong has a unique 'Salaries Tax' with a 15% flat cap. No matter how much you earn, you can opt to pay just 15% on your total income instead of the progressive rates. This makes it a magnet for high earners.", fr: "Hong Kong a une 'taxe sur les salaires' avec un plafond fixe de 15 %. Peu importe vos revenus, vous pouvez choisir de payer seulement 15 % au lieu des taux progressifs.", es: "Hong Kong tiene un 'Impuesto Salarial' con un límite plano del 15%. Sin importar cuánto ganes, puedes optar por pagar solo el 15% en lugar de las tasas progresivas." },
  ],
  "Russia": [
    { en: "Russia introduced a flat 13% income tax in 2001, replacing a complex progressive system. It was one of the first major economies to adopt a flat tax, and tax revenues actually increased as compliance improved.", fr: "La Russie a introduit un impôt fixe de 13 % en 2001, remplaçant un système progressif complexe. C'était l'une des premières grandes économies à adopter une taxe forfaitaire. Les recettes fiscales ont augmenté.", es: "Rusia introdujo un impuesto plano del 13% en 2001. Fue una de las primeras grandes economías en adoptar un impuesto plano, y los ingresos fiscales aumentaron a medida que mejoró el cumplimiento." },
  ],
  "China": [
    { en: "China builds the equivalent of two skyscrapers per day. A growth rate that is redefining the world economy.", fr: "Le pays construit l'équivalent de deux gratte-ciel par jour. Une croissance qui redéfinit l'économie mondiale.", es: "China construye el equivalente a dos rascacielos al día. Un crecimiento que está redefiniendo la economía mundial." },
    { en: "China has a unique system where employers withhold and remit income tax monthly. Until 2019, workers almost never filed their own returns — the state handled everything automatically.", fr: "La Chine a un système unique où les employeurs retiennent et versent l'impôt sur le revenu mensuellement. Jusqu'en 2019, les travailleurs ne remplissaient presque jamais leurs propres déclarations.", es: "China tiene un sistema único donde los empleadores retienen y remiten el impuesto sobre la renta mensualmente. Hasta 2019, los trabajadores casi nunca presentaban sus propias declaraciones de impuestos." },
  ],
  "India": [
    { en: "With over 1.4 billion inhabitants, India is the world's largest democracy and a giant in IT services exports.", fr: "Avec plus de 1,4 milliard d'habitants, c'est la plus grande démocratie au monde et un géant de l'exportation de services IT.", es: "Con más de 1.400 millones de habitantes, India es la mayor democracia del mundo y un gigante en la exportación de servicios informáticos." },
    { en: "India offers TWO separate income tax regimes to choose from each year — the old regime with many deductions, or a new simplified regime with lower rates but no deductions. Taxpayers pick whichever saves them more money.", fr: "L'Inde propose DEUX régimes fiscaux distincts au choix chaque année — l'ancien régime avec de nombreuses déductions, ou un nouveau régime simplifié. Les contribuables choisissent celui qui leur convient le mieux.", es: "India ofrece DOS regímenes fiscales separados para elegir cada año: el antiguo con muchas deducciones o el nuevo simplificado con tasas más bajas pero sin deducciones. Los contribuyentes eligen el que más les convenga." },
  ],
  "Brazil": [
    { en: "Brazilians are world champions of social media use — ideal for spreading a viral ad!", fr: "Les Brésiliens sont les champions du monde de l'utilisation des réseaux sociaux. Idéal pour faire circuler une pub virale !", es: "Los brasileños son campeones mundiales en el uso de redes sociales. ¡Ideal para hacer circular un anuncio viral!" },
    { en: "Brazil's tax system is considered one of the most complex in the world. The average Brazilian company spends over 1,500 hours per year on tax compliance — the global average is 230 hours.", fr: "Le système fiscal brésilien est considéré comme l'un des plus complexes au monde. Une entreprise brésilienne moyenne passe plus de 1 500 heures par an en conformité fiscale — la moyenne mondiale est de 230 heures.", es: "El sistema fiscal de Brasil es considerado uno de los más complejos del mundo. La empresa brasileña promedio dedica más de 1.500 horas al año al cumplimiento fiscal, frente a las 230 horas de promedio mundial." },
  ],
  "Mexico": [
    { en: "Mexico is one of the countries where people work the most hours per year — far more than Canada or the United States.", fr: "C'est l'un des pays où l'on travaille le plus d'heures par année au monde, bien plus qu'au Canada ou aux États-Unis.", es: "México es uno de los países donde más horas se trabaja al año en el mundo, mucho más que en Canadá o Estados Unidos." },
    { en: "Mexico has an annual 'Declaracion Anual' that every self-employed person must file. However, salaried workers often do NOT file if their employer already withheld the correct amount — a surprisingly simple system for most employees.", fr: "Le Mexique a une 'Declaracion Anual' annuelle que chaque travailleur indépendant doit déposer. Cependant, les salariés ne déclarent souvent PAS si leur employeur a déjà retenu le bon montant.", es: "México tiene una 'Declaración Anual' que cada trabajador independiente debe presentar. Sin embargo, los empleados asalariados a menudo NO declaran si su empleador ya retuvo el monto correcto." },
  ],
  "Netherlands": [
    { en: "The Netherlands has a famous '30% ruling' — highly skilled expats can receive 30% of their salary tax-free for up to 5 years. This makes Amsterdam one of Europe's top destinations for international tech and finance workers.", fr: "Les Pays-Bas ont la fameuse 'règle des 30 %' — les expatriés très qualifiés peuvent recevoir 30 % de leur salaire en franchise d'impôt pendant 5 ans. Cela fait d'Amsterdam l'une des premières destinations européennes pour les travailleurs internationaux.", es: "Los Países Bajos tienen la famosa 'regla del 30%': los expatriados altamente cualificados pueden recibir el 30% de su salario libre de impuestos durante 5 años. Esto convierte a Ámsterdam en uno de los principales destinos europeos para trabajadores internacionales." },
  ],
  "Spain": [
    { en: "Spain has the Siesta tradition — but watch out: work schedules often end much later in the evening than in North America.", fr: "On y trouve la Siesta, mais les horaires de travail finissent souvent beaucoup plus tard le soir qu'en Amérique du Nord.", es: "España tiene la tradición de la siesta, pero ojo: los horarios de trabajo suelen terminar mucho más tarde que en América del Norte." },
    { en: "Spain has a special 'Beckham Law' (named after David Beckham) that allows high-earning foreign workers to pay a flat 24% tax for 6 years instead of the regular progressive rates up to 47%. It was created in 2004.", fr: "L'Espagne a une 'loi Beckham' spéciale (nommée d'après David Beckham) qui permet aux travailleurs étrangers à hauts revenus de payer un impôt fixe de 24 % pendant 6 ans. Elle a été créée en 2004.", es: "España tiene la especial 'Ley Beckham' (nombrada así por David Beckham) que permite a los trabajadores extranjeros de altos ingresos pagar una tasa plana del 24% durante 6 años en lugar de las tasas progresivas de hasta el 47%." },
  ],
  "Italy": [
    { en: "To combat tax evasion, merchants are legally required to give you a receipt — even for a €1 espresso.", fr: "Pour combattre l'évasion fiscale, les commerçants sont obligés par la loi de te donner un reçu, même pour un espresso à 1 €.", es: "Para combatir la evasión fiscal, los comerciantes están legalmente obligados a darte un recibo, incluso por un espreso de 1 €." },
    { en: "Italy offers a flat 100,000 EUR/year tax on all foreign income for new residents — regardless of how much you earn abroad. This 'non-dom' regime attracted many high-net-worth individuals to move to Italy.", fr: "L'Italie offre un impôt fixe de 100 000 € par an sur tous les revenus étrangers pour les nouveaux résidents — peu importe ce que vous gagnez à l'étranger. Ce régime a attiré de nombreux individus fortunés en Italie.", es: "Italia ofrece un impuesto fijo de 100.000 euros al año sobre todos los ingresos extranjeros para nuevos residentes, independientemente de cuánto ganen en el extranjero. Este régimen atrajo a muchas personas adineradas a mudarse a Italia." },
  ],
  "Portugal": [
    { en: "The NHR program attracted thousands of retirees and tech workers by offering 0% tax on foreign income for 10 years. It was abolished in 2024.", fr: "Le programme NHR a attiré des milliers de retraités et de travailleurs tech en offrant 0 % d'impôt sur les revenus étrangers pendant 10 ans.", es: "El programa NHR atrajo a miles de jubilados y trabajadores tecnológicos ofreciendo un 0% de impuesto sobre ingresos extranjeros durante 10 años." },
    { en: "Portugal's NHR (Non-Habitual Resident) regime offered foreign retirees and workers a flat 10-20% tax rate for 10 years. It attracted thousands of expats and remote workers but was controversially abolished in 2024.", fr: "Le régime NHR (résident non habituel) du Portugal offrait aux retraités et travailleurs étrangers un taux fixe de 10-20 % pendant 10 ans. Il a attiré des milliers d'expatriés mais a été controversialement aboli en 2024.", es: "El régimen NHR (Residente No Habitual) de Portugal ofrecía a jubilados y trabajadores extranjeros una tasa plana del 10-20% durante 10 años. Atrajo a miles de expatriados pero fue abolido polémicamente en 2024." },
  ],
  "Ireland": [
    { en: "Many major tech companies have their headquarters here due to a very low corporate tax rate (12.5%), which artificially boosts the country's GDP.", fr: "Plusieurs grandes entreprises tech y ont leur siège à cause d'un taux d'imposition très bas (12.5 %), ce qui booste artificiellement le PIB.", es: "Muchas grandes empresas tecnológicas tienen su sede aquí gracias a una tasa impositiva corporativa muy baja (12,5%), lo que impulsa artificialmente el PIB del país." },
    { en: "Ireland has one of Europe's most business-friendly corporate tax rates at 12.5%, which attracted Google, Facebook, Apple and dozens of multinationals to set up European HQs in Dublin. Personal income taxes are, however, quite high.", fr: "L'Irlande a l'un des taux d'imposition des sociétés les plus favorables d'Europe à 12,5 %, ce qui a attiré Google, Facebook et Apple à Dublin. Les impôts sur le revenu des particuliers sont cependant assez élevés.", es: "Irlanda tiene uno de los tipos del impuesto corporativo más favorables de Europa, el 12,5%, lo que atrajo a Google, Facebook y Apple a establecer sus sedes europeas en Dublín. Sin embargo, los impuestos personales son bastante altos." },
  ],
  "South Korea": [
    { en: "South Korea has the fastest public Wi-Fi in the world. Perfect for checking your net salary at the beach!", fr: "Le Wi-Fi public y est le plus rapide du monde. Pratique pour vérifier ton salaire net sur la plage !", es: "Corea del Sur tiene el Wi-Fi público más rápido del mundo. ¡Perfecto para consultar tu salario neto en la playa!" },
    { en: "South Korea has a special 19% flat tax rate for foreign workers in specific industries. Additionally, Koreans who earn income abroad must report it, but enforcement for overseas income has historically been very lax.", fr: "La Corée du Sud a un taux d'imposition fixe spécial de 19 % pour les travailleurs étrangers dans certaines industries. La Corée a historiquement été très peu stricte sur les revenus à l'étranger.", es: "Corea del Sur tiene una tasa plana especial del 19% para trabajadores extranjeros en industrias específicas. Históricamente ha sido muy poco estricta con los ingresos obtenidos en el extranjero." },
  ],
  "Thailand": [
    { en: "It's technically illegal to step on a banknote or coin in Thailand, as they bear the image of the King, who is sacred.", fr: "Il est techniquement illégal de marcher sur un billet de banque ou une pièce, car ils portent l'image du Roi, qui est sacré.", es: "Técnicamente es ilegal pisar un billete o una moneda en Tailandia, ya que llevan la imagen del Rey, que es sagrado." },
    { en: "Thailand changed its tax rules in 2024: foreign income brought into Thailand is now taxable regardless of when it was earned — closing a famous loophole used by expats and digital nomads for decades.", fr: "La Thaïlande a modifié ses règles fiscales en 2024 : les revenus étrangers transférés en Thaïlande sont désormais imposables, quelle que soit la date de leur gain — fermant une fameuse faille utilisée par les expatriés pendant des décennies.", es: "Tailandia cambió sus reglas fiscales en 2024: los ingresos extranjeros traídos a Tailandia ahora son gravables independientemente de cuándo se ganaron, cerrando una famosa laguna utilizada por expatriados durante décadas." },
  ],
  "Poland": [
    { en: "Public university education is free for citizens, and the cost of living is one of the lowest in the European Union.", fr: "L'éducation universitaire publique est gratuite pour les citoyens, et le coût de la vie y est l'un des plus bas de l'Union Européenne.", es: "La educación universitaria pública es gratuita para los ciudadanos y el coste de vida es uno de los más bajos de la Unión Europea." },
    { en: "Poland introduced a 'Middle Class Relief' tax break in 2022 that was so complex — applied only at specific income bands — that many workers accidentally ended up owing MORE tax. It was abolished after just one year.", fr: "La Pologne a introduit un allégement fiscal pour la 'classe moyenne' en 2022 si complexe que de nombreux travailleurs ont fini par devoir PLUS d'impôts. Il a été aboli après seulement un an.", es: "Polonia introdujo un alivio fiscal para la 'clase media' en 2022 que era tan complejo que muchos trabajadores terminaron debiendo MÁS impuestos. Fue abolido después de solo un año." },
  ],
  "South Africa": [
    { en: "South Africa is the only country in the world with three different capitals: Pretoria, Cape Town, and Bloemfontein.", fr: "C'est le seul pays au monde à avoir trois capitales différentes : Pretoria, Le Cap et Bloemfontein.", es: "Sudáfrica es el único país del mundo con tres capitales diferentes: Pretoria, Ciudad del Cabo y Bloemfontein." },
    { en: "South Africa's SARS (South African Revenue Service) was once ranked as one of the most efficient tax authorities in the developing world, with a voluntary compliance rate of over 95%. That reputation has since declined with corruption scandals.", fr: "Le SARS (Service des recettes d'Afrique du Sud) était autrefois classé parmi les autorités fiscales les plus efficaces des pays en développement, avec un taux de conformité volontaire de plus de 95 %.", es: "El SARS de Sudáfrica fue alguna vez considerado una de las autoridades fiscales más eficientes del mundo en desarrollo, con una tasa de cumplimiento voluntario de más del 95%." },
  ],
  "Greece": [
    { en: "Greece receives more tourists every year than there are inhabitants in the entire country. The economy relies massively on your vacation!", fr: "Il y a plus de touristes chaque année que d'habitants dans tout le pays. L'économie repose massivement sur tes vacances !", es: "Grecia recibe cada año más turistas que habitantes tiene todo el país. ¡La economía depende enormemente de tus vacaciones!" },
    { en: "Greece introduced a flat 7% income tax for foreign retirees who move to Greece — to attract pensioners and boost the economy after the 2010 debt crisis devastated the country.", fr: "La Grèce a introduit un impôt fixe de 7 % sur le revenu pour les retraités étrangers qui s'y installent — pour attirer les pensionnés et relancer l'économie après la crise de la dette de 2010.", es: "Grecia introdujo un impuesto plano del 7% sobre la renta para los jubilados extranjeros que se mudan allí, para atraer pensionistas y reactivar la economía tras la crisis de deuda de 2010." },
  ],
  "Finland": [
    { en: "Speeding fines in Finland are calculated based on your salary. A millionaire once received a fine of over €100,000!", fr: "Les amendes pour excès de vitesse sont calculées selon ton salaire. Un millionnaire a déjà reçu une amende de plus de 100 000 € !", es: "Las multas por exceso de velocidad en Finlandia se calculan según tu salario. ¡Un millonario llegó a recibir una multa de más de 100.000 €!" },
    { en: "Finland publishes every citizen's income tax return publicly each year. On 'Tax Day' (usually in November), anyone can call the tax authority and ask how much their neighbor — or their boss — pays in taxes.", fr: "La Finlande publie la déclaration de revenus de chaque citoyen publiquement chaque année. Le 'Jour des impôts', n'importe qui peut appeler les autorités fiscales et demander combien son voisin — ou son patron — paie en impôts.", es: "Finlandia publica públicamente la declaración de impuestos de cada ciudadano cada año. El 'Día de Impuestos', cualquiera puede llamar a la autoridad fiscal y preguntar cuánto paga en impuestos su vecino o su jefe." },
  ],
  "Austria": [
    { en: "In Austria, the right to vote is granted from age 16 for all national elections — among the youngest voting ages in the world.", fr: "Le droit de vote est accordé dès l'âge de 16 ans pour toutes les élections nationales.", es: "En Austria, el derecho a voto se concede a partir de los 16 años para todas las elecciones nacionales." },
    { en: "Austria has the highest top marginal income tax rate in the German-speaking world at 55% (for income over EUR 1M). Even so, Austria consistently ranks among Europe's wealthiest and most satisfied populations.", fr: "L'Autriche a le taux marginal maximum le plus élevé des pays germanophones à 55 % (pour les revenus supérieurs à 1 M€). Pourtant, l'Autriche se classe régulièrement parmi les populations européennes les plus riches et les plus satisfaites.", es: "Austria tiene la tasa marginal máxima más alta del mundo germanohablante, el 55% para ingresos superiores a 1 millón de euros. Aun así, Austria se clasifica constantemente entre las poblaciones europeas más ricas y satisfechas." },
  ],
  "Belgium": [
    { en: "Belgium taxes the highest earners in Europe the most — up to 50%. But they do make excellent chocolate and waffles.", fr: "C'est le pays où l'on taxe le plus les revenus élevés en Europe (jusqu'à 50 %). Mais le chocolat et les gaufres sont excellents.", es: "Bélgica es el país que más grava los ingresos altos en Europa, hasta el 50%. Pero el chocolate y los gofres son excelentes." },
    { en: "Belgium has one of the highest top income tax rates in the world at 50%, plus local taxes. However, it is famous for generous employee benefits: company cars, meal vouchers, and expense accounts that are often tax-exempt.", fr: "La Belgique a l'un des taux d'imposition les plus élevés au monde à 50 %. Cependant, elle est célèbre pour ses généreux avantages aux employés : voitures de société, chèques-repas et notes de frais souvent exonérés d'impôt.", es: "Bélgica tiene una de las tasas máximas de impuesto sobre la renta más altas del mundo, el 50%. Sin embargo, es famosa por los generosos beneficios para empleados: coches de empresa, vales de comida y gastos de representación a menudo exentos de impuestos." },
  ],
  "Israel": [
    { en: "Israel has the highest number of start-ups per capita in the world. A true economic powerhouse!", fr: "C'est le pays qui compte le plus grand nombre de start-ups par habitant au monde. Un vrai moteur économique !", es: "Israel tiene el mayor número de start-ups per cápita del mundo. ¡Un verdadero motor económico!" },
    { en: "Israel offers new immigrants (Olim) and returning residents a 10-year tax exemption on all foreign income. This policy, known as the 'Olim Benefit', has attracted thousands of wealthy Jewish diaspora members to move to Israel.", fr: "Israël offre aux nouveaux immigrants et résidents de retour une exonération fiscale de 10 ans sur tous les revenus étrangers. Cette politique, connue sous le nom d'avantage 'Olim', a attiré des milliers de membres aisés de la diaspora juive.", es: "Israel ofrece a los nuevos inmigrantes (Olim) una exención fiscal de 10 años sobre todos los ingresos extranjeros. Esta política ha atraído a miles de miembros adinerados de la diáspora judía a mudarse a Israel." },
  ],
  "Turkey": [
    { en: "Istanbul is the only city in the world located on two continents at once: Europe and Asia.", fr: "Istanbul est la seule ville au monde située sur deux continents à la fois : l'Europe et l'Asie.", es: "Estambul es la única ciudad del mundo situada en dos continentes a la vez: Europa y Asia." },
    { en: "Turkey has a special 50% income tax deduction for authors, scientists, artists and athletes on royalties and prize money. A Turkish novelist pays half the income tax on their book earnings compared to a regular worker.", fr: "La Turquie offre une déduction fiscale de 50 % sur le revenu pour les auteurs, scientifiques, artistes et athlètes sur les redevances. Un romancier turc paie deux fois moins d'impôt sur ses revenus de livres.", es: "Turquía tiene una deducción especial del 50% en el impuesto sobre la renta para autores, científicos, artistas y atletas sobre regalías y premios. ¡Un novelista turco paga la mitad del impuesto sobre los ingresos de sus libros!" },
  ],
  "Mexico": [
    { en: "Mexico's richest 1% pay a lower effective tax rate than the middle class — a study showed that the wealthiest Mexicans pay about 7% effective rate thanks to legal tax structures, while formal employees pay 15-20%.", fr: "Le 1 % le plus riche du Mexique paie un taux effectif d'imposition inférieur à celui de la classe moyenne — les Mexicains les plus riches paient environ 7 % de taux effectif grâce à des structures fiscales légales.", es: "El 1% más rico de México paga una tasa efectiva de impuesto más baja que la clase media: los mexicanos más ricos pagan alrededor del 7% de tasa efectiva gracias a estructuras fiscales legales, mientras los empleados formales pagan 15-20%." },
  ],
  "Chile": [
    { en: "Chile is one of the most economically stable countries in Latin America, with landscapes ranging from the driest desert to glaciers.", fr: "C'est l'un des pays les plus stables économiquement en Amérique latine, avec des paysages allant du désert le plus sec aux glaciers.", es: "Chile es uno de los países económicamente más estables de América Latina, con paisajes que van desde el desierto más seco hasta los glaciares." },
    { en: "Chile is one of Latin America's most stable economies, partly thanks to its mandatory pension savings system (AFP) requiring workers to save 10% of their salary. However, pension income is taxed as regular income in retirement.", fr: "Le Chili est l'une des économies les plus stables d'Amérique latine, en partie grâce à son système d'épargne-retraite obligatoire (AFP) exigeant des travailleurs d'épargner 10 % de leur salaire.", es: "Chile es una de las economías más estables de América Latina, en parte gracias a su sistema de ahorro previsional obligatorio (AFP) que exige a los trabajadores ahorrar el 10% de su salario." },
  ],
  "Colombia": [
    { en: "Colombia is the second most biodiverse country in the world after Brazil. A paradise for remote workers who love nature.", fr: "C'est le deuxième pays le plus riche en biodiversité au monde après le Brésil. Un paradis pour le télétravail nature.", es: "Colombia es el segundo país más biodiverso del mundo después de Brasil. Un paraíso para el teletrabajo en la naturaleza." },
    { en: "Colombia has a 'simple taxation regime' for small businesses that replaces income tax, industry tax, VAT and other obligations with a single flat rate between 1-11% of gross revenue. It radically simplified taxes for millions of entrepreneurs.", fr: "La Colombie a un 'régime de taxation simple' pour les petites entreprises qui remplace l'impôt sur le revenu, la taxe industrielle et la TVA par un taux unique de 1 à 11 % du chiffre d'affaires brut.", es: "Colombia tiene un 'régimen simple de tributación' para pequeñas empresas que reemplaza el impuesto sobre la renta, el impuesto de industria, el IVA y otras obligaciones con una tasa plana de entre 1-11% de los ingresos brutos." },
  ],
  "Malaysia": [
    { en: "Kuala Lumpur has the tallest twin towers in the world (Petronas Towers). Malaysia's economy is highly diversified.", fr: "Kuala Lumpur possède les tours jumelles les plus hautes du monde (Petronas Towers). L'économie y est très diversifiée.", es: "Kuala Lumpur tiene las torres gemelas más altas del mundo (Torres Petronas). La economía de Malasia está muy diversificada." },
    { en: "Malaysia introduced a 'Departure Levy' in 2019 — a tax you pay when you leave the country on an international flight. It ranges from RM 8 for economy class to RM 150 for premium class.", fr: "La Malaisie a introduit une 'taxe de départ' en 2019 — un impôt payé lors d'un vol international au départ du pays. Elle varie de 8 RM en classe économique à 150 RM en classe premium.", es: "Malasia introdujo un 'Impuesto de Salida' en 2019, un impuesto que se paga al salir del país en un vuelo internacional. Varía de 8 RM en clase económica a 150 RM en clase premium." },
  ],
  "Philippines": [
    { en: "The Philippines has a 'TRABAHO' law that reduced the top corporate income tax from 30% (highest in ASEAN) to 20-25%. For workers, the threshold where income tax starts is PHP 250,000 — below that, zero tax is owed.", fr: "Les Philippines ont une loi 'TRABAHO' qui a réduit le taux maximum d'imposition des sociétés de 30 % à 20-25 %. Pour les travailleurs, le seuil de l'impôt sur le revenu est de 250 000 PHP — en dessous, zéro impôt.", es: "Filipinas tiene una ley 'TRABAHO' que redujo el impuesto corporativo máximo del 30% al 20-25%. Para los trabajadores, el umbral donde comienza el impuesto sobre la renta es PHP 250,000: por debajo de eso, no se debe ningún impuesto." },
  ],
  "Indonesia": [
    { en: "Indonesia has a 'tax holiday' program for investors in strategic industries — up to 20 years of zero corporate tax. For individuals, the tax authority estimated that only 1 in 10 people who should file actually do.", fr: "L'Indonésie a un programme de 'vacances fiscales' pour les investisseurs dans les industries stratégiques — jusqu'à 20 ans sans impôt sur les sociétés. Pour les particuliers, l'autorité fiscale estime que seulement 1 personne sur 10 déclare ses impôts.", es: "Indonesia tiene un programa de 'vacaciones fiscales' para inversores en industrias estratégicas: hasta 20 años sin impuesto corporativo. Para las personas, la autoridad fiscal estima que solo 1 de cada 10 personas que deberían declarar realmente lo hacen." },
  ],
  "Vietnam": [
    { en: "Vietnam's economy is booming — it has become one of the world's largest exporters of phones and electronics.", fr: "L'économie explose ici ! C'est devenu l'un des plus grands exportateurs de téléphones et d'électronique au monde.", es: "La economía de Vietnam está en auge: se ha convertido en uno de los mayores exportadores de teléfonos y electrónica del mundo." },
    { en: "Vietnam taxes resident individuals on worldwide income, but the system is still developing. A notable quirk: income from freelancing or selling online often goes completely unreported and untaxed due to a lack of enforcement infrastructure.", fr: "Le Vietnam impose les particuliers résidents sur leurs revenus mondiaux, mais le système est encore en développement. Un fait notable : les revenus du travail indépendant en ligne sont souvent complètement non déclarés faute d'infrastructure de contrôle.", es: "Vietnam grava a los residentes sobre sus ingresos mundiales, pero el sistema aún se está desarrollando. Un dato curioso: los ingresos del trabajo independiente online a menudo no se declaran ni se gravan por falta de infraestructura de control." },
  ],
  "Egypt": [
    { en: "Egypt reformed its income tax system in 2023, raising the top rate to 27.5%. But with a large informal economy — estimated at 40% of GDP — a huge portion of income completely escapes taxation.", fr: "L'Égypte a réformé son système fiscal en 2023, portant le taux maximum à 27,5 %. Mais avec une économie informelle estimée à 40 % du PIB, une énorme portion des revenus échappe complètement à l'impôt.", es: "Egipto reformó su sistema de impuesto sobre la renta en 2023, elevando la tasa máxima al 27,5%. Pero con una economía informal estimada en el 40% del PIB, una enorme porción de los ingresos escapa completamente a la tributación." },
  ],
  "Nigeria": [
    { en: "Nigeria's federal government relies almost entirely on oil revenues — personal income tax goes to STATE governments, not the federal government. This creates massive variation in services between oil-rich and poor states.", fr: "Le gouvernement fédéral nigérian s'appuie presque entièrement sur les revenus pétroliers — l'impôt sur le revenu des personnes physiques va aux GOUVERNEMENTS des États. Cela crée d'énormes variations de services entre les États.", es: "El gobierno federal de Nigeria depende casi por completo de los ingresos petroleros: el impuesto sobre la renta de las personas físicas va a los GOBIERNOS estatales. Esto crea enormes variaciones en los servicios entre estados ricos en petróleo y estados pobres." },
  ],
  "Kenya": [
    { en: "Kenya introduced a controversial 'Digital Service Tax' of 1.5% on revenue from digital marketplaces in 2021 — taxing platforms like Uber, Airbnb and Netflix on earnings generated in Kenya.", fr: "Le Kenya a introduit une controversée 'taxe sur les services numériques' de 1,5 % sur les revenus des marchés numériques en 2021 — taxant des plateformes comme Uber, Airbnb et Netflix sur leurs revenus générés au Kenya.", es: "Kenia introdujo un controvertido 'Impuesto al Servicio Digital' del 1,5% sobre los ingresos de los mercados digitales en 2021, gravando plataformas como Uber, Airbnb y Netflix sobre los ingresos generados en Kenia." },
  ],
  "Argentina": [
    { en: "Argentina holds the world record for the highest number of psychologists per capita. Financial stress makes you think!", fr: "Le pays détient le record du monde du nombre de psychologues par habitant. Les finances, ça fait réfléchir !", es: "Argentina ostenta el récord mundial del mayor número de psicólogos per cápita. ¡Las finanzas dan mucho que pensar!" },
    { en: "Argentina has a 'Bienes Personales' (Personal Assets Tax) — an annual wealth tax of 0.5-1.75% on net worth above ARS 11M. In 2023, with inflation over 200%, millions of middle-class Argentines suddenly became 'wealthy' on paper.", fr: "L'Argentine a une taxe 'Bienes Personales' — un impôt annuel sur la fortune de 0,5-1,75 % sur la valeur nette. En 2023, avec une inflation de plus de 200 %, des millions d'Argentins de classe moyenne sont soudainement devenus 'riches' sur le papier.", es: "Argentina tiene el 'Impuesto sobre Bienes Personales', un impuesto anual sobre el patrimonio del 0,5-1,75% sobre el patrimonio neto. En 2023, con una inflación superior al 200%, millones de argentinos de clase media se convirtieron repentinamente en 'ricos' sobre el papel." },
  ],
};


// ── Big Mac Index Data (The Economist, Jan 2024) ─────────────────────────
// Price in local currency → converted to USD
const BIGMAC_USD = {
  "United States":        5.69,
  "Canada":               6.39,
  "England & Wales":      5.08,
  "Scotland":             5.08,
  "France":               5.52,
  "Germany":              5.52,
  "Switzerland":          8.17,
  "Sweden":               6.20,
  "Norway":               6.30,
  "Denmark":              6.80,
  "Netherlands":          5.52,
  "Spain":                5.15,
  "Italy":                5.15,
  "Portugal":             4.70,
  "Ireland":              5.88,
  "Belgium":              5.52,
  "Austria":              5.52,
  "Finland":              6.10,
  "Greece":               4.50,
  "Poland":               3.10,
  "Czech Republic":       4.20,
  "Hungary":              3.60,
  "Romania":              3.40,
  "Russia":               2.39,
  "Turkey":               3.10,
  "Israel":               5.84,
  "Egypt":                2.10,
  "South Africa":         2.63,
  "Nigeria":              2.55,
  "Kenya":                2.30,
  "Australia":            5.95,
  "New Zealand":          5.12,
  "Japan":                3.10,
  "South Korea":          4.46,
  "China":                3.43,
  "India":                2.54,
  "Hong Kong":            3.18,
  "Singapore":            5.05,
  "Malaysia":             2.60,
  "Thailand":             2.89,
  "Indonesia":            2.62,
  "Vietnam":              2.90,
  "Philippines":          3.10,
  "UAE":                  4.73,
  "Saudi Arabia":         4.07,
  "Mexico":               4.00,
  "Brazil":               4.11,
  "Argentina":            4.50,
  "Chile":                3.80,
  "Colombia":             3.50,
  // Canadian provinces - same as Canada
  "Ontario":              6.39,
  "Quebec":               6.39,
  "Québec":               6.39,
  "Alberta":              6.39,
  "Colombie-Britannique": 6.39,
  "Saskatchewan":         6.39,
  "Manitoba":             6.39,
  "Nouvelle-Écosse":      6.39,
  "Nouveau-Brunswick":    6.39,
  "Île-du-Prince-Édouard":6.39,
  "Terre-Neuve-et-Labrador":6.39,
  "Territoires du Nord-Ouest":6.39,
  "Yukon":                6.39,
  "Nunavut":              6.39,
};

// US average - same for all states
const US_STATE_BIGMAC = 5.69;

function getBigMacPrice(countryKey) {
  return BIGMAC_USD[countryKey] || US_STATE_BIGMAC;
}

const STARBUCKS_USD = {
  "United States":4.65,"Canada":5.20,"England & Wales":5.10,"Scotland":5.10,
  "France":5.60,"Germany":5.45,"Switzerland":7.80,"Sweden":5.90,"Norway":6.80,
  "Denmark":6.50,"Netherlands":5.50,"Spain":4.40,"Italy":4.20,"Portugal":4.00,
  "Ireland":5.30,"Belgium":5.40,"Austria":5.50,"Finland":5.80,"Greece":4.50,
  "Poland":3.80,"Czech Republic":3.90,"Hungary":3.50,"Romania":3.20,
  "Australia":4.80,"New Zealand":4.60,"Japan":4.50,"South Korea":5.20,
  "China":4.30,"India":3.20,"Hong Kong":5.60,"Singapore":5.50,
  "Malaysia":3.40,"Thailand":3.60,"Indonesia":3.10,"Vietnam":3.00,
  "Philippines":3.20,"UAE":6.00,"Saudi Arabia":5.80,"Qatar":5.90,
  "Israel":5.40,"Turkey":3.50,"Egypt":2.80,"Nigeria":3.00,"Kenya":2.90,
  "South Africa":3.20,"Russia":3.50,"Brazil":3.80,"Mexico":4.20,
  "Argentina":3.00,"Chile":3.90,"Colombia":3.20,"Morocco":3.50,
  "Monaco":8.00,"Luxembourg":5.60,"Iceland":7.20,"Andorra":4.50,
  "Panama":4.50,"Costa Rica":4.00,"Estonia":4.20,
};
function getStarbucksPrice(key) { return STARBUCKS_USD[key] || 4.65; }

const RENT_USD = {
  "United States":1800,"Canada":1650,"England & Wales":2200,"Scotland":1400,
  "France":1100,"Germany":1200,"Switzerland":2400,"Sweden":1300,"Norway":1600,
  "Denmark":1500,"Netherlands":1600,"Spain":950,"Italy":900,"Portugal":850,
  "Ireland":1900,"Belgium":1000,"Austria":1100,"Finland":1050,"Greece":700,
  "Poland":700,"Czech Republic":750,"Hungary":650,"Romania":500,
  "Australia":1550,"New Zealand":1400,"Japan":900,"South Korea":700,
  "China":600,"India":350,"Hong Kong":2200,"Singapore":2100,
  "Malaysia":450,"Thailand":500,"Indonesia":350,"Vietnam":400,
  "Philippines":380,"UAE":1800,"Saudi Arabia":1400,"Qatar":1600,
  "Israel":1600,"Turkey":400,"Egypt":200,"Nigeria":250,"Kenya":280,
  "South Africa":450,"Russia":450,"Brazil":500,"Mexico":500,
  "Argentina":300,"Chile":600,"Colombia":400,"Morocco":350,
  "Monaco":5000,"Luxembourg":1800,"Iceland":1400,"Andorra":900,
  "Panama":700,"Costa Rica":600,"Estonia":700,
};
function getRent(key) { return RENT_USD[key] || 800; }

const GROCERY_USD = {
  "United States":400,"Canada":420,"England & Wales":380,"Scotland":360,
  "France":350,"Germany":330,"Switzerland":550,"Sweden":380,"Norway":420,
  "Denmark":400,"Netherlands":360,"Spain":280,"Italy":270,"Portugal":250,
  "Ireland":360,"Belgium":330,"Austria":340,"Finland":370,"Greece":260,
  "Poland":220,"Czech Republic":230,"Hungary":210,"Romania":180,
  "Australia":380,"New Zealand":360,"Japan":320,"South Korea":300,
  "China":200,"India":120,"Hong Kong":380,"Singapore":360,
  "Malaysia":180,"Thailand":160,"Indonesia":140,"Vietnam":130,
  "Philippines":150,"UAE":350,"Saudi Arabia":320,"Qatar":340,
  "Israel":400,"Turkey":160,"Egypt":100,"Nigeria":120,"Kenya":110,
  "South Africa":170,"Russia":180,"Brazil":200,"Mexico":180,
  "Argentina":150,"Chile":200,"Colombia":160,"Morocco":140,
  "Monaco":700,"Luxembourg":380,"Iceland":420,"Andorra":300,
  "Panama":250,"Costa Rica":220,"Estonia":270,
};
function getGrocery(key) { return GROCERY_USD[key] || 300; }

// ── Average weekly work hours ─────────────────────────────────────────────
const WORKHOURS = {
  "United States":38.7,"Canada":36.6,"England & Wales":36.4,"Scotland":36.4,
  "France":35.6,"Germany":34.2,"Switzerland":35.9,"Sweden":30.5,"Norway":27.3,
  "Denmark":32.4,"Netherlands":30.3,"Spain":37.7,"Italy":36.0,"Portugal":39.2,
  "Ireland":35.5,"Belgium":36.2,"Austria":37.0,"Finland":37.4,"Greece":41.5,
  "Poland":40.4,"Czech Republic":40.0,"Hungary":39.9,"Romania":40.1,
  "Australia":32.4,"New Zealand":34.0,"Japan":33.5,"South Korea":38.3,
  "China":46.1,"India":47.6,"Hong Kong":44.4,"Singapore":45.6,
  "Malaysia":46.0,"Thailand":46.8,"Indonesia":40.0,"Vietnam":45.5,
  "Philippines":42.8,"UAE":43.2,"Saudi Arabia":40.6,"Qatar":44.0,
  "Israel":36.6,"Turkey":45.5,"Egypt":43.0,"Nigeria":40.0,"Kenya":46.0,
  "South Africa":42.6,"Russia":37.5,"Brazil":39.7,"Mexico":45.1,
  "Argentina":38.4,"Chile":38.0,"Colombia":48.0,"Morocco":44.0,
  "Monaco":35.0,"Luxembourg":37.0,"Iceland":40.4,"Andorra":38.0,
  "Panama":42.0,"Costa Rica":44.0,"Estonia":39.6,
};
function getWorkHours(key) { return WORKHOURS[key] || 40; }


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
    <img src={src} alt={abbr} onError={() => setErr(true)} referrerPolicy="no-referrer" crossOrigin="anonymous"
      style={{ width:size+8, height:size*0.65, objectFit:"cover", borderRadius:2, flexShrink:0, display:"block" }} />
  );
}

// ── Language switcher ─────────────────────────────────────────────────────
const LANGS = [
  { code:"en", label:"EN", flag:"🇬🇧", tooltip:"English"  },
  { code:"fr", label:"FR", flag:"🇫🇷", tooltip:"Français" },
  { code:"es", label:"ES", flag:"🇪🇸", tooltip:"Español"  },
  { code:"de", label:"DE", flag:"🇩🇪", tooltip:"Deutsch"  },
  { code:"ar", label:"عر", flag:"🇸🇦", tooltip:"العربية"  },
];

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
      {LANGS.map(l => (
        <div key={l.code} onClick={() => setLang(l.code)} title={l.tooltip}
          style={{
            background: lang===l.code ? "rgba(79,255,176,0.12)" : "transparent",
            border: `2px solid ${lang===l.code ? "#4fffb0" : "rgba(255,255,255,0.15)"}`,
            borderRadius:7, padding:"5px 9px", cursor:"pointer", display:"flex", alignItems:"center", gap:5,
            transition:"all 0.18s",
            opacity: lang===l.code ? 1 : 0.55,
            boxShadow: lang===l.code ? "0 0 8px rgba(79,255,176,0.25)" : "none",
          }}>
          <span style={{ fontSize:14 }}>{l.flag}</span>
          <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight:700, color: lang===l.code ? "#4fffb0" : "#8aaac8", letterSpacing:"0.06em" }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}


// ── Fun Fact Modal ────────────────────────────────────────────────────────
function FunFactModal({ countryKey, lang, t, onClose }) {
  const facts = FUN_FACTS[countryKey] || [];
  const [idx, setIdx] = React.useState(0);
  const fact = facts[idx];
  const text = fact ? (fact[lang] || fact["en"]) : null;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)" }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:"linear-gradient(135deg,#0a1628,#0d1e34)", border:"1px solid #4a80d4", borderRadius:16, width:"min(480px,92vw)", padding:"28px 28px 24px", boxShadow:"0 0 60px rgba(79,255,176,0.12)", animation:"fi 0.25s ease" }}>
        
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:28 }}>🎲</span>
            <span style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#4a80d4" }}>{t.funFactTitle}</span>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"1px solid #1a2c3a", borderRadius:7, color:"#7898b8", padding:"5px 11px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace" }}>
            {t.funFactClose}
          </button>
        </div>

        {/* Country label */}
        <div style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:"#4fffb0", letterSpacing:"0.1em", marginBottom:14, opacity:0.7 }}>
          {countryKey.toUpperCase()}
        </div>

        {/* Fact text */}
        <div style={{ background:"rgba(79,255,176,0.04)", border:"1px solid rgba(79,255,176,0.15)", borderRadius:10, padding:"18px 20px", marginBottom:18, minHeight:80 }}>
          {text
            ? <p style={{ fontSize:14, color:"#d4e8ff", lineHeight:1.85, fontFamily:"'DM Sans',sans-serif" }}>{text}</p>
            : <p style={{ fontSize:13, color:"#5a7a98", fontStyle:"italic" }}>{t.funFactNone}</p>
          }
        </div>

        {/* Navigation */}
        {facts.length > 1 && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", gap:6 }}>
              {facts.map((_, i) => (
                <div key={i} onClick={() => setIdx(i)}
                  style={{ width:8, height:8, borderRadius:"50%", background: i===idx ? "#4fffb0" : "#1e3050", cursor:"pointer", transition:"background 0.2s" }} />
              ))}
            </div>
            <button onClick={() => setIdx((idx + 1) % facts.length)}
              style={{ background:"rgba(79,255,176,0.08)", border:"1px solid #4fffb0", borderRadius:7, color:"#4fffb0", padding:"7px 14px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight:600, transition:"all 0.2s" }}>
              {t.funFactNext}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ── BigMac Index Section ──────────────────────────────────────────────────
function BigMacSection({ countryKey, isUSState, salaryUSD, calc, t }) {
  const [tooltip, setTooltip] = React.useState(null); // "bm" | "nbm" | null

  const bmPrice = isUSState ? US_STATE_BIGMAC : getBigMacPrice(countryKey);
  const bmAvailable = bmPrice > 0;

  // NetBigMac: how many Big Macs with $100 gross after tax
  const netPer100 = salaryUSD > 0 && bmAvailable
    ? Math.round((100 * (1 - calc.effectiveRate / 100)) / bmPrice)
    : null;

  // Big Mac price in input currency shown via USD
  const bmPriceDisplay = bmPrice.toFixed(2);

  return (
    <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #1a2e40" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>

        {/* Big Mac Index */}
        <div style={{ background:"#040e18", border:"1px solid #1a2e40", borderRadius:9, padding:"12px 14px", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:8 }}>
            <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.08em" }}>{t.bigMacLabel}</span>
            <span onClick={() => setTooltip(tooltip==="bm" ? null : "bm")}
              style={{ width:14, height:14, borderRadius:"50%", background:"#1a3050", border:"1px solid #2a4060", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#6a9ab8", cursor:"pointer", fontWeight:700, flexShrink:0 }}>?</span>
          </div>
          <div style={{ fontSize:18, fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#ffe066" }}>
            ${bmPriceDisplay}
            <span style={{ fontSize:9, color:"#5a7a98", marginLeft:4 }}>USD</span>
          </div>
          <div style={{ fontSize:8, color:"#5a7a98", fontFamily:"'DM Mono',monospace", marginTop:2 }}>{t.bigMacPrice}</div>

          {tooltip === "bm" && (
            <div onClick={() => setTooltip(null)}
              style={{ position:"fixed", inset:0, zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.80)", backdropFilter:"blur(4px)" }}>
              <div onClick={e => e.stopPropagation()}
                style={{ background:"#0d1e34", border:"1px solid #ffe066", borderRadius:12, padding:"22px 24px", width:"min(380px,88vw)", boxShadow:"0 0 40px rgba(255,224,102,0.1)" }}>
                <div style={{ fontSize:16, fontWeight:700, color:"#ffe066", marginBottom:10, fontFamily:"'Bebas Neue'", letterSpacing:"0.06em" }}>{t.bigMacExplainTitle}</div>
                <p style={{ fontSize:13, color:"#b0c8e0", lineHeight:1.8 }}>{t.bigMacExplain}</p>
                <button onClick={() => setTooltip(null)}
                  style={{ marginTop:16, background:"rgba(255,224,102,0.08)", border:"1px solid #ffe066", borderRadius:7, color:"#ffe066", padding:"7px 16px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", width:"100%" }}>
                  OK
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NetBigMac Index */}
        <div style={{ background:"#040e18", border:"1px solid #1a2e40", borderRadius:9, padding:"12px 14px", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:8 }}>
            <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.08em" }}>{t.netBigMacLabel}</span>
            <span onClick={() => setTooltip(tooltip==="nbm" ? null : "nbm")}
              style={{ width:14, height:14, borderRadius:"50%", background:"#1a3050", border:"1px solid #2a4060", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#6a9ab8", cursor:"pointer", fontWeight:700, flexShrink:0 }}>?</span>
          </div>
          {netPer100 !== null ? (
            <>
              <div style={{ fontSize:18, fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#4fffb0" }}>
                {netPer100}
                <span style={{ fontSize:11, marginLeft:4 }}>🍔</span>
              </div>
              <div style={{ fontSize:8, color:"#5a7a98", fontFamily:"'DM Mono',monospace", marginTop:2 }}>{t.bigMacPer100}</div>
            </>
          ) : (
            <div style={{ fontSize:12, color:"#3a5060", fontFamily:"'DM Mono',monospace" }}>—</div>
          )}

          {tooltip === "nbm" && (
            <div onClick={() => setTooltip(null)}
              style={{ position:"fixed", inset:0, zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.80)", backdropFilter:"blur(4px)" }}>
              <div onClick={e => e.stopPropagation()}
                style={{ background:"#0d1e34", border:"1px solid #4fffb0", borderRadius:12, padding:"22px 24px", width:"min(380px,88vw)", boxShadow:"0 0 40px rgba(79,255,176,0.1)" }}>
                <div style={{ fontSize:16, fontWeight:700, color:"#4fffb0", marginBottom:10, fontFamily:"'Bebas Neue'", letterSpacing:"0.06em" }}>{t.netBigMacExplainTitle}</div>
                <p style={{ fontSize:13, color:"#b0c8e0", lineHeight:1.8 }}>{t.netBigMacExplain}</p>
                <div style={{ marginTop:14, padding:"10px 14px", background:"rgba(79,255,176,0.06)", border:"1px solid rgba(79,255,176,0.2)", borderRadius:8 }}>
                  <div style={{ fontSize:10, color:"#4fffb0", fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em" }}>FORMULE / FORMULA</div>
                  <div style={{ fontSize:11, color:"#88b8d0", fontFamily:"'DM Mono',monospace", marginTop:4 }}>($100 x (1 - taux effectif)) / prix Big Mac</div>
                </div>
                <button onClick={() => setTooltip(null)}
                  style={{ marginTop:14, background:"rgba(79,255,176,0.08)", border:"1px solid #4fffb0", borderRadius:7, color:"#4fffb0", padding:"7px 16px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", width:"100%" }}>
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Share Buttons ─────────────────────────────────────────────────────────
function ShareButtons({ msg, t, compact = false }) {
  const encoded = encodeURIComponent(msg);
  const url = encodeURIComponent("https://netpay.tax");

  const btns = [
    {
      label:"X",
      icon:"𝕏",
      color:"#1a1a2e",
      border:"#444",
      hover:"#222",
      href:`https://twitter.com/intent/tweet?text=${encoded}`,
    },
    {
      label:"LinkedIn",
      icon:"in",
      color:"#0a1a30",
      border:"#0077b5",
      hover:"#0077b5",
      href:`https://www.linkedin.com/sharing/share-offsite/?url=https://netpay.tax&summary=${encoded}`,
    },
    {
      label:"Facebook",
      icon:"f",
      color:"#0a1428",
      border:"#1877f2",
      hover:"#1877f2",
      href:`https://www.facebook.com/sharer/sharer.php?u=https://netpay.tax&quote=${encoded}`,
    },
    {
      label:"Reddit",
      icon:"r/",
      color:"#1a0e0a",
      border:"#ff4500",
      hover:"#ff4500",
      href:`https://www.reddit.com/submit?url=https://netpay.tax&title=${encoded}`,
    },
    {
      label:"WhatsApp",
      icon:"W",
      color:"#0a1a12",
      border:"#25d366",
      hover:"#25d366",
      href:`https://wa.me/?text=${encoded}`,
    },
  ];

  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
      {!compact && (
        <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.1em", marginRight:2 }}>
          {t.shareLabel}
        </span>
      )}
      {btns.map(b => (
        <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
          title={b.label}
          style={{ background:b.color, border:`1px solid ${b.border}`, borderRadius:7, padding: compact ? "5px 9px" : "6px 11px", cursor:"pointer", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize: compact ? 11 : 12, fontWeight:700, color:b.border, fontFamily:"'DM Mono',monospace", transition:"all 0.18s", minWidth: compact ? 28 : 32 }}>
          {b.icon}
        </a>
      ))}
    </div>
  );
}


// ── Indices Modal ─────────────────────────────────────────────────────────
function IndicesModal({ countryKey, isUSState, salaryUSD, calc, t, onClose }) {
  const [tooltip, setTooltip] = React.useState(null);

  const bmPrice   = isUSState ? US_STATE_BIGMAC : getBigMacPrice(countryKey);
  const netPer100 = salaryUSD > 0 && bmPrice > 0
    ? Math.round((100 * (1 - calc.effectiveRate / 100)) / bmPrice)
    : null;

  const sbPrice   = getStarbucksPrice(countryKey);
  const rent      = getRent(countryKey);
  const grocery   = getGrocery(countryKey);
  const netMonthly = salaryUSD > 0 ? (salaryUSD * (1 - calc.effectiveRate / 100)) / 12 : 0;
  const rentPct   = netMonthly > 0 ? Math.round((rent / netMonthly) * 100) : null;
  const grocPct   = netMonthly > 0 ? Math.round((grocery / netMonthly) * 100) : null;

  const indices = [
    {
      id: "bm",
      label: t.bigMacLabel,
      value: `$${bmPrice.toFixed(2)}`,
      unit: "USD",
      sub: t.bigMacPrice,
      color: "#ffe066",
      explain: { title: t.bigMacExplainTitle, text: t.bigMacExplain, color: "#ffe066" },
    },
    {
      id: "nbm",
      label: t.netBigMacLabel,
      value: netPer100 !== null ? `${netPer100} 🍔` : "—",
      unit: "",
      sub: t.bigMacPer100,
      color: "#4fffb0",
      explain: { title: t.netBigMacExplainTitle, text: t.netBigMacExplain, color: "#4fffb0" },
    },
    {
      id: "sb",
      label: t.starbucksLabel,
      value: `$${sbPrice.toFixed(2)}`,
      unit: "USD",
      sub: t.perMonth,
      color: "#00b386",
      explain: { title: t.starbucksExplainTitle, text: t.starbucksExplain, color: "#00b386" },
    },
    {
      id: "rent",
      label: t.rentLabel,
      value: `$${rent.toLocaleString()}`,
      unit: "USD",
      sub: rentPct !== null ? t.rentOfNet(rentPct) : "",
      color: "#ff9955",
      explain: { title: t.rentExplainTitle, text: t.rentExplain, color: "#ff9955" },
    },
    {
      id: "grocery",
      label: t.groceryLabel,
      value: `$${grocery.toLocaleString()}`,
      unit: "USD",
      sub: grocPct !== null ? t.groceryOfNet(grocPct) : "",
      color: "#88ccff",
      explain: { title: t.groceryExplainTitle, text: t.groceryExplain, color: "#88ccff" },
    },
    {
      id: "wh",
      label: t.workHoursLabel,
      value: `${getWorkHours(countryKey)}`,
      unit: t.workHoursPerWeek,
      sub: netMonthly > 0 ? t.workHoursPerHour(((netMonthly * 12) / (getWorkHours(countryKey) * 52)).toFixed(1)) : "",
      color: "#cc88ff",
      explain: { title: t.workHoursExplainTitle, text: t.workHoursExplain, color: "#cc88ff" },
    },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)" }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:"linear-gradient(135deg,#0a1628,#0d1e34)", border:"1px solid #4a80d4", borderRadius:16, width:"min(360px,90vw)", maxHeight:"85vh", overflowY:"auto", padding:"18px 16px 16px", boxShadow:"0 0 60px rgba(79,255,176,0.1)", animation:"fi 0.25s ease" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:24 }}>📊</span>
            <span style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#4a80d4" }}>{t.indicesTitle}</span>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"1px solid #1a2c3a", borderRadius:7, color:"#7898b8", padding:"5px 11px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace" }}>
            {t.indicesClose}
          </button>
        </div>

        {/* Country label */}
        <div style={{ fontSize:10, fontFamily:"'DM Mono',monospace", color:"#4fffb0", letterSpacing:"0.1em", marginBottom:14, opacity:0.7 }}>
          {countryKey.toUpperCase()}
        </div>

        {/* Indices list — 2 columns, vertical cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {indices.map(idx => (
            <div key={idx.id}
              style={{ background:"rgba(10,20,40,0.8)", border:`1px solid ${idx.color}44`, borderRadius:10, padding:"10px 11px", display:"flex", flexDirection:"column", gap:4, position:"relative" }}>

              {/* Label row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.05em", lineHeight:1.3 }}>{idx.label}</span>
                <span onClick={() => setTooltip(tooltip === idx.id ? null : idx.id)}
                  style={{ width:14, height:14, borderRadius:"50%", background:"#1a3050", border:"1px solid #2a4060", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#6a9ab8", cursor:"pointer", fontWeight:700, flexShrink:0 }}>?</span>
              </div>

              {/* Big value */}
              <div style={{ fontSize:20, fontFamily:"'DM Mono',monospace", fontWeight:700, color:idx.color, lineHeight:1 }}>{idx.value}</div>

              {/* Unit + sub */}
              {idx.unit && <div style={{ fontSize:8, color:"#5a7a98", fontFamily:"'DM Mono',monospace" }}>{idx.unit}</div>}
              {idx.sub && <div style={{ fontSize:8, color:"#6a8aaa", fontFamily:"'DM Mono',monospace", lineHeight:1.3 }}>{idx.sub}</div>}

              {/* Tooltip overlay */}
              {tooltip === idx.id && (
                <div onClick={() => setTooltip(null)}
                  style={{ position:"fixed", inset:0, zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.80)", backdropFilter:"blur(4px)" }}>
                  <div onClick={e => e.stopPropagation()}
                    style={{ background:"#0d1e34", border:`1px solid ${idx.explain.color}`, borderRadius:12, padding:"20px 22px", width:"min(360px,86vw)", boxShadow:`0 0 40px ${idx.explain.color}22` }}>
                    <div style={{ fontSize:16, fontWeight:700, color:idx.explain.color, marginBottom:10, fontFamily:"'Bebas Neue'", letterSpacing:"0.06em" }}>{idx.explain.title}</div>
                    <p style={{ fontSize:12, color:"#b0c8e0", lineHeight:1.8 }}>{idx.explain.text}</p>
                    {idx.id === "nbm" && (
                      <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(79,255,176,0.06)", border:"1px solid rgba(79,255,176,0.2)", borderRadius:8 }}>
                        <div style={{ fontSize:9, color:"#4fffb0", fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", marginBottom:4 }}>FORMULE</div>
                        <div style={{ fontSize:11, color:"#88b8d0", fontFamily:"'DM Mono',monospace" }}>($100 × (1 - taux effectif)) ÷ prix Big Mac</div>
                      </div>
                    )}
                    <button onClick={() => setTooltip(null)}
                      style={{ marginTop:14, background:"rgba(79,255,176,0.08)", border:`1px solid ${idx.explain.color}`, borderRadius:7, color:idx.explain.color, padding:"7px 16px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", width:"100%" }}>
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


// ── Compare Modal ─────────────────────────────────────────────────────────
// ── Smart share message generator ─────────────────────────────────────────
function generateSmartMessages(items, lang) {
  if (items.length < 2) return [];
  const sorted = [...items].sort((a,b) => a.calc.effectiveRate - b.calc.effectiveRate);
  const lowest  = sorted[0];
  const highest = sorted[sorted.length - 1];
  const diff    = highest.calc.effectiveRate - lowest.calc.effectiveRate;
  const mult    = lowest.calc.effectiveRate < 1
    ? null
    : (highest.calc.effectiveRate / lowest.calc.effectiveRate).toFixed(1);
  const hasZero = items.some(i => i.calc.effectiveRate === 0);
  const topRank = items.find(i => i.rank <= 5);
  const msgs = { en:[], fr:[], es:[], de:[], ar:[] };

  // Message 1 — big gap
  if (diff >= 20) {
    msgs.en.push(`${highest.flag} ${highest.name} taxes ${diff.toFixed(0)}% more than ${lowest.flag} ${lowest.name} — same salary, different country. What's your rate? → netpay.tax`);
    msgs.fr.push(`${highest.flag} ${highest.name} taxe ${diff.toFixed(0)}% de plus que ${lowest.flag} ${lowest.name} — même salaire, pays différent. Quel est votre taux ? → netpay.tax`);
    msgs.es.push(`${highest.flag} ${highest.name} cobra ${diff.toFixed(0)}% más que ${lowest.flag} ${lowest.name} — mismo salario, país distinto. ¿Cuál es tu tasa? → netpay.tax`);
    msgs.de.push(`${highest.flag} ${highest.name} besteuert ${diff.toFixed(0)}% mehr als ${lowest.flag} ${lowest.name} — gleiches Gehalt, anderes Land. Was ist Ihr Steuersatz? → netpay.tax`);
    msgs.ar.push(`${highest.flag} ${highest.name} تفرض ${diff.toFixed(0)}% ضريبة أكثر من ${lowest.flag} ${lowest.name} — نفس الراتب، بلد مختلف. ما معدل ضريبتك؟ → netpay.tax`);
  }

  // Message 2 — multiplier
  if (mult && parseFloat(mult) >= 1.5) {
    msgs.en.push(`With the same salary, ${lowest.flag} ${lowest.name} puts ${mult}x more money in your pocket than ${highest.flag} ${highest.name}. Verify yours → netpay.tax`);
    msgs.fr.push(`À salaire égal, ${lowest.flag} ${lowest.name} vous laisse ${mult}x plus en poche que ${highest.flag} ${highest.name}. Vérifiez le vôtre → netpay.tax`);
    msgs.es.push(`Con el mismo salario, ${lowest.flag} ${lowest.name} te deja ${mult}x más dinero que ${highest.flag} ${highest.name}. Verifica el tuyo → netpay.tax`);
    msgs.de.push(`Beim gleichen Gehalt lässt ${lowest.flag} ${lowest.name} ${mult}x mehr Geld übrig als ${highest.flag} ${highest.name}. Überprüfen Sie Ihres → netpay.tax`);
    msgs.ar.push(`بنفس الراتب، ${lowest.flag} ${lowest.name} يترك لك ${mult}x أموالًا أكثر من ${highest.flag} ${highest.name}. تحقق من معدلك → netpay.tax`);
  }

  // Message 3 — zero tax country
  if (hasZero) {
    const zeroCountry = items.find(i => i.calc.effectiveRate === 0);
    msgs.en.push(`${zeroCountry.flag} ${zeroCountry.name} has 0% income tax. That's not a typo. Compare with your own country → netpay.tax`);
    msgs.fr.push(`${zeroCountry.flag} ${zeroCountry.name} prélève 0% d'impôt sur le revenu. Ce n'est pas une faute. Comparez avec votre pays → netpay.tax`);
    msgs.es.push(`${zeroCountry.flag} ${zeroCountry.name} tiene un 0% de impuesto sobre la renta. No es un error. Compara con tu país → netpay.tax`);
    msgs.de.push(`${zeroCountry.flag} ${zeroCountry.name} hat 0% Einkommensteuer. Kein Tippfehler. Vergleichen Sie mit Ihrem Land → netpay.tax`);
    msgs.ar.push(`${zeroCountry.flag} ${zeroCountry.name} تفرض 0% ضريبة دخل. هذه ليست خطأ. قارن مع بلدك → netpay.tax`);
  }

  // Message 4 — challenge
  msgs.en.push(`I just compared tax rates across ${items.map(i=>i.flag+' '+i.name).join(', ')}. The gap surprised me — what about your country? → netpay.tax`);
  msgs.fr.push(`Je viens de comparer les taux d'imposition de ${items.map(i=>i.flag+' '+i.name).join(', ')}. L'écart m'a surpris — et votre pays ? → netpay.tax`);
  msgs.es.push(`Acabo de comparar los tipos impositivos de ${items.map(i=>i.flag+' '+i.name).join(', ')}. La diferencia me sorprendió — ¿y tu país? → netpay.tax`);
  msgs.de.push(`Ich habe gerade die Steuersätze von ${items.map(i=>i.flag+' '+i.name).join(', ')} verglichen. Der Unterschied hat mich überrascht — und Ihr Land? → netpay.tax`);
  msgs.ar.push(`لقد قارنت للتو معدلات الضرائب في ${items.map(i=>i.flag+' '+i.name).join(', ')}. الفرق فاجأني — وبلدك؟ → netpay.tax`);

  // Message 5 — rank based
  if (topRank) {
    msgs.en.push(`${topRank.flag} ${topRank.name} ranks in the top 5 most tax-friendly countries in the world. Is your country close? → netpay.tax`);
    msgs.fr.push(`${topRank.flag} ${topRank.name} figure dans le top 5 mondial des pays les plus avantageux fiscalement. Et le vôtre ? → netpay.tax`);
    msgs.es.push(`${topRank.flag} ${topRank.name} está en el top 5 mundial de países más ventajosos fiscalmente. ¿Y el tuyo? → netpay.tax`);
    msgs.de.push(`${topRank.flag} ${topRank.name} ist unter den Top 5 der steuerfreundlichsten Länder weltweit. Und Ihres? → netpay.tax`);
    msgs.ar.push(`${topRank.flag} ${topRank.name} في أفضل 5 دول من حيث الضرائب عالميًا. وبلدك؟ → netpay.tax`);
  }

  return (msgs[lang] || msgs.en).filter(Boolean);
}

function CompareModal({ items, onRemove, onClose, onReset, fmt, t, lang, sortedList }) {
  const [customMsg, setCustomMsg] = React.useState("");
  const [selectedMsg, setSelectedMsg] = React.useState(0);

  const itemsWithRank = items.map(item => ({
    ...item,
    rank: sortedList ? (sortedList.findIndex(r => r.id === item.id) + 1) || 99 : 99,
  }));

  const smartMsgs = React.useMemo(() => generateSmartMessages(itemsWithRank, lang), [items, lang]);
  const totalItems = items.length;
  const activeMsg = customMsg.trim() || (smartMsgs[selectedMsg] || "");

  const shareLines = [
    "🏆 " + (t.compareTitle) + " — netpay.tax",
    ...itemsWithRank.map(i => `${i.flag} ${i.name} : ${i.calc.effectiveRate.toFixed(1)}% · #${i.rank}/160`),
    "",
    activeMsg,
  ].join("\n");

  const encoded = encodeURIComponent(shareLines);
  const rows = [
    { label: t.compareSalaryLabel, color:"#7799cc", fn: c => fmt(c.netUSD + c.totalTaxUSD) },
    { label: t.compareTaxLabel,    color:"#dd4444", fn: c => fmt(c.totalTaxUSD) },
    { label: t.compareNetLabel,    color:"#4fffb0", fn: c => fmt(c.netUSD) },
    { label: t.compareRateLabel,   color:"#ff9955", fn: c => `${c.effectiveRate.toFixed(1)}%` },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)" }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:"linear-gradient(135deg,#0a1628,#0d1e34)", border:"1px solid #4fffb0", borderRadius:16, width:"min(500px,94vw)", maxHeight:"92vh", overflowY:"auto", padding:"18px 16px 16px", boxShadow:"0 0 60px rgba(79,255,176,0.1)", animation:"fi 0.25s ease" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <span style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:"0.08em", color:"#4fffb0" }}>{t.compareTitle}</span>
          <button onClick={onClose} style={{ background:"none", border:"1px solid #1a2c3a", borderRadius:7, color:"#7898b8", padding:"4px 10px", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace" }}>{t.compareClose}</button>
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${totalItems}, 1fr)`, gap:8, marginBottom:14 }}>
          {itemsWithRank.map(item => (
            <div key={item.id} style={{ background:"rgba(10,20,40,0.8)", border:"1px solid #1a3050", borderRadius:10, padding:"10px 8px" }}>
              <div style={{ textAlign:"center", marginBottom:10, paddingBottom:8, borderBottom:"1px solid #1a2e48" }}>
                <div style={{ fontSize:26, marginBottom:2 }}>{item.flag}</div>
                <div style={{ fontSize:10, fontWeight:600, color:"#c0d0e8", fontFamily:"'DM Mono',monospace", lineHeight:1.3, marginBottom:2 }}>{item.name}</div>
                <div style={{ fontSize:9, color:"#4a6a88", fontFamily:"'DM Mono',monospace", marginBottom:4 }}>#{item.rank}/160</div>
                <button onClick={() => onRemove(item.id)}
                  style={{ background:"none", border:"1px solid #1a2e48", borderRadius:5, color:"#5a7090", fontSize:9, cursor:"pointer", fontFamily:"'DM Mono',monospace", padding:"2px 8px" }}>
                  {t.compareRemove}
                </button>
              </div>
              {rows.map(row => (
                <div key={row.label} style={{ marginBottom:7 }}>
                  <div style={{ fontSize:7, fontFamily:"'DM Mono',monospace", color:"#5a7a98", letterSpacing:"0.08em", marginBottom:2 }}>{row.label}</div>
                  <div dir="ltr" style={{ fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:700, color:row.color }}>{row.fn(item.calc)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Smart messages + custom input */}
        {items.length >= 2 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.1em", marginBottom:8 }}>{t.compareShareTitle || "MESSAGE DE PARTAGE"}</div>

            {/* Suggested messages */}
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:10 }}>
              {smartMsgs.slice(0,4).map((msg, i) => (
                <div key={i} onClick={() => { setSelectedMsg(i); setCustomMsg(""); }}
                  style={{ background: selectedMsg===i && !customMsg ? "rgba(79,255,176,0.08)" : "rgba(10,20,40,0.6)", border:`1px solid ${selectedMsg===i && !customMsg ? "#4fffb0" : "#1a2e48"}`, borderRadius:8, padding:"8px 11px", cursor:"pointer", transition:"all 0.15s" }}>
                  <div style={{ fontSize:11, color: selectedMsg===i && !customMsg ? "#c0e8d0" : "#8aaac8", lineHeight:1.5 }}>{msg}</div>
                </div>
              ))}
            </div>

            {/* Custom message */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#5a7a98", letterSpacing:"0.08em", marginBottom:5 }}>{t.compareCustomMsg || "OU ÉCRIVEZ LE VÔTRE"}</div>
              <textarea value={customMsg} onChange={e => setCustomMsg(e.target.value)}
                placeholder={t.compareCustomPlaceholder || "Ajoutez votre propre message percutant..."}
                style={{ width:"100%", background:"#060e1a", border:"1px solid #1a2e48", borderRadius:8, color:"#c0d0e8", padding:"9px 12px", fontSize:12, fontFamily:"'DM Sans',sans-serif", resize:"none", height:60, boxSizing:"border-box", outline:"none" }} />
            </div>

            {/* Share buttons */}
            <div style={{ display:"flex", gap:7, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.1em" }}>PARTAGER</span>
              {[
                { label:"𝕏",  color:"#666",   href:`https://twitter.com/intent/tweet?text=${encoded}` },
                { label:"in", color:"#0077b5", href:`https://www.linkedin.com/sharing/share-offsite/?url=https://netpay.tax&summary=${encoded}` },
                { label:"f",  color:"#1877f2", href:`https://www.facebook.com/sharer/sharer.php?u=https://netpay.tax&quote=${encoded}` },
                { label:"W",  color:"#25d366", href:`https://wa.me/?text=${encoded}` },
                { label:"r/", color:"#ff4500", href:`https://www.reddit.com/submit?url=https://netpay.tax&title=${encoded}` },
              ].map(b => (
                <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
                  style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${b.color}`, borderRadius:7, padding:"5px 11px", color:b.color, textDecoration:"none", fontSize:12, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>
                  {b.label}
                </a>
              ))}
            </div>

            {/* Privacy note */}
            <div style={{ marginTop:8, fontSize:9, color:"#3a5570", fontFamily:"'DM Mono',monospace", fontStyle:"italic" }}>
              {t.comparePrivacyNote || "✓ Aucun montant partagé — taux et classement uniquement"}
            </div>
          </div>
        )}

        {items.length < 2 && (
          <div style={{ textAlign:"center", padding:"8px 0", fontSize:11, color:"#3a5570", fontFamily:"'DM Mono',monospace" }}>{t.comparePlaceholder}</div>
        )}

        {/* Reset button */}
        {items.length > 0 && (
          <div style={{ marginTop:12, display:"flex", justifyContent:"center" }}>
            <button onClick={onReset}
              style={{ background:"#0a1628", border:"2px solid #4fffb0", borderRadius:30, color:"#4fffb0", padding:"10px 24px", cursor:"pointer", fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:700, boxShadow:"0 4px 24px rgba(79,255,176,0.2)", letterSpacing:"0.06em", display:"flex", alignItems:"center", gap:8 }}>
              {t.compareReset}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────
function DetailPanel({ label, flagEl, subtitle, calc, hasProv, fmt, currCode, onClose, t, countryKey, lang, salaryUSD, isUSState }) {
  const [showFact, setShowFact]       = React.useState(false);
  const [showIndices, setShowIndices] = React.useState(false);
  const hasFacts = !!(FUN_FACTS[countryKey] && FUN_FACTS[countryKey].length > 0);
  return (
    <div style={{ background:"linear-gradient(135deg,#080f1e,#0a1628)", border:"1px solid #4fffb0", borderRadius:13, padding:"20px 22px", marginBottom:0, animation:"fi 0.3s ease", boxShadow:"0 0 30px rgba(79,255,176,0.04)" }}>
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


      {/* Share + Buttons */}
      <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #1a2e40", display:"flex", flexDirection:"column", gap:8 }}>
        <ShareButtons
          msg={t.shareMsg(
            label,
            fmt(calc.netUSD),
            currCode,
            salaryUSD > 0 ? Math.round((100 * (1 - calc.effectiveRate / 100)) / getBigMacPrice(countryKey)) : "?"
          )}
          t={t}
        />
        <button onClick={() => setShowIndices(true)}
          style={{ background:"rgba(255,224,102,0.07)", border:"1px solid #ffe066", borderRadius:8, color:"#ffe066", padding:"9px 18px", cursor:"pointer", fontSize:12, fontFamily:"'DM Mono',monospace", fontWeight:600, letterSpacing:"0.06em", transition:"all 0.2s", width:"100%" }}>
          {t.indicesBtn}
        </button>
        <button onClick={() => setShowFact(true)}
          disabled={!hasFacts}
          style={{ background: hasFacts ? "rgba(79,255,176,0.08)" : "transparent", border:`1px solid ${hasFacts ? "#4fffb0" : "#1a2e40"}`, borderRadius:8, color: hasFacts ? "#4fffb0" : "#3a5060", padding:"9px 18px", cursor: hasFacts ? "pointer" : "default", fontSize:12, fontFamily:"'DM Mono',monospace", fontWeight:600, letterSpacing:"0.06em", transition:"all 0.2s", width:"100%" }}>
          {t.funFactBtn}
        </button>
      </div>

      {showIndices && <IndicesModal countryKey={countryKey} isUSState={isUSState} salaryUSD={salaryUSD} calc={calc} t={t} onClose={() => setShowIndices(false)} />}
      {showFact && <FunFactModal countryKey={countryKey} lang={lang} t={t} onClose={() => setShowFact(false)} />}

    </div>
  );
}

// ── Sub-row (province / state) ────────────────────────────────────────────
function SubRow({ name, abbr, flagImg, subtitle, isSelected, calc, maxNetUSD, fmt, onClick, t, onCompare, inCompare, flag }) {
  const rc = rateColor(calc?.effectiveRate ?? 0);
  const barPct = maxNetUSD > 0 && calc ? (calc.netUSD / maxNetUSD) * 100 : 0;
  return (
    <div onClick={onClick}
      style={{ background:isSelected?"#0b1e2e":"#0c1525", border:`1px solid ${isSelected?"#4fffb0":"#1a2e48"}`, borderRadius:7, padding:"8px 12px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.15s" }}>
      <FlagImg src={flagImg} abbr={abbr} size={18} />
      <div style={{ flex:1, minWidth:0, overflow:"hidden" }}>
        <div style={{ fontSize:11, fontWeight:500, color:isSelected?"#4fffb0":"#a0a8bc", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</div>
        <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"#7090b0" }}>{subtitle}</div>
      </div>
      <div style={{ flex:1, minWidth:30 }}>
        <div style={{ background:"#050809", borderRadius:3, height:3, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${barPct}%`, background:isSelected?"#4fffb0":"#162535", borderRadius:3, transition:"width 0.5s" }} />
        </div>
      </div>
      <div style={{ textAlign:"right", minWidth:76 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:500, color:isSelected?"#4fffb0":"#b8bcc8" }}>{fmt(calc.netUSD)}</div>
        <div style={{ fontSize:7, color:"#8aaac8", fontFamily:"'DM Mono',monospace" }}>{t.netYear}</div>
      </div>
      <div style={{ padding:"2px 6px", borderRadius:4, fontSize:8, fontFamily:"'DM Mono',monospace", fontWeight:600, background:"rgba(0,0,0,0.5)", color:rc, border:`1px solid ${rc}22`, minWidth:36, textAlign:"center" }}>
        {calc.effectiveRate===0 ? "0%" : `${calc.effectiveRate.toFixed(1)}%`}
      </div>
      <div onClick={onCompare} title="Comparer"
        style={{ width:16, height:16, borderRadius:"50%", border:`1px solid ${inCompare?"#4fffb0":"#2a3e58"}`, background:inCompare?"rgba(79,255,176,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:inCompare?"#4fffb0":"#4a6a88", cursor:"pointer", flexShrink:0, fontWeight:700, transition:"all 0.15s" }}>
        {inCompare ? "✓" : "+"}
      </div>
    </div>
  );
}

// ── Country row ───────────────────────────────────────────────────────────
function CountryRow({ rank, flag, name, isSelected, netUSD, effectiveRate, maxNetUSD, fmt, onClick, t, onCompare, inCompare }) {
  const rc = rateColor(effectiveRate);
  const barPct = maxNetUSD > 0 ? (netUSD / maxNetUSD) * 100 : 0;
  return (
    <div onClick={onClick}
      style={{ background:isSelected?"#0b1e2e":"#0c1525", border:`1px solid ${isSelected?"#4fffb0":"#1a2e48"}`, borderRadius:8, padding:"11px 12px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", transition:"all 0.15s", overflow:"hidden" }}>
      <div style={{ width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,fontFamily:"'DM Mono',monospace",flexShrink:0,
        background:rank===1?"rgba(79,255,176,0.1)":rank<4?"rgba(100,150,255,0.07)":"#0c1525",
        color:rank===1?"#4fffb0":rank===2?"#5588ff":rank===3?"#ffaa30":"#8aaac8",
        border:`1px solid ${rank===1?"rgba(79,255,176,0.2)":"#1a2e48"}`
      }}>{rank}</div>
      <span style={{ fontSize:20, flexShrink:0 }}>{flag}</span>
      <div style={{ flex:3, minWidth:0 }}>
        <div style={{ fontSize:15, fontWeight:600, color:isSelected?"#4fffb0":"#d0d8e8", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</div>
      </div>
      <div style={{ textAlign:"right", flexShrink:0 }}>
        <div dir="ltr" style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600, color:isSelected?"#4fffb0":"#c8ccd8" }}>{fmt(netUSD)}</div>
        <div style={{ fontSize:7, color:"#8aaac8", fontFamily:"'DM Mono',monospace" }}>{t.netYear}</div>
      </div>
      <div style={{ padding:"2px 5px", borderRadius:4, fontSize:8, fontFamily:"'DM Mono',monospace", fontWeight:600, background:"rgba(0,0,0,0.5)", color:rc, border:`1px solid ${rc}22`, flexShrink:0, textAlign:"center", minWidth:34 }}>
        {effectiveRate===0 ? "0%" : `${effectiveRate.toFixed(1)}%`}
      </div>
      <div onClick={onCompare} title="Comparer"
        style={{ width:18, height:18, borderRadius:"50%", border:`1px solid ${inCompare?"#4fffb0":"#2a3e58"}`, background:inCompare?"rgba(79,255,176,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:inCompare?"#4fffb0":"#4a6a88", cursor:"pointer", flexShrink:0, fontWeight:700, transition:"all 0.15s" }}>
        {inCompare ? "✓" : "+"}
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
    <div id="about-section" style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0", width:"100%", boxSizing:"border-box" }}>
      {/* About */}
      <div style={{ marginBottom:36 }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:10 }}>{t.aboutTitle}</h2>
        <p style={{ fontSize:14, color:"#9ab8d0", lineHeight:1.8, maxWidth:760 }}>{t.aboutText}</p>
      </div>
      {/* How it works */}
      <div style={{ marginBottom:36 }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:16 }}>{t.howTitle}</h2>
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
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0", width:"100%", boxSizing:"border-box" }}>
      <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:16 }}>{t.faqTitle}</h2>
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
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0", width:"100%", boxSizing:"border-box" }}>
      <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:16 }}>{t.tipsTitle}</h2>
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
    <div id="privacy-section" style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0", width:"100%", boxSizing:"border-box" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
        <div style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"20px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:10 }}>{t.privacyTitle}</h2>
          <p style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.8 }}>{t.privacyText}</p>
        </div>
        <div style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"20px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:10 }}>{t.aboutPageTitle}</h2>
          <p style={{ fontSize:12, color:"#7a9ab8", lineHeight:1.8 }}>{t.aboutPageText}</p>
        </div>
      </div>
    </div>
  );
}


// ── Section: Contact Form (Formspree) ────────────────────────────────────
function ContactSection({ t }) {
  const [name, setName]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus]   = React.useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xkgjznqw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth:980, margin:"0 auto", padding:"40px 18px 0", width:"100%", boxSizing:"border-box" }}>
      <div style={{ background:"#0d1a2e", border:"1px solid #1e3050", borderRadius:10, padding:"24px 20px", maxWidth:560, boxSizing:"border-box" }}>
        <h2 id="contact-section" style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:"0.08em", color:"#d4e8ff", marginBottom:8 }}>{t.contactTitle}</h2>
        <p style={{ fontSize:13, color:"#7a9ab8", marginBottom:20, lineHeight:1.6 }}>{t.contactText}</p>

        {status === "success" ? (
          <div style={{ padding:"16px", background:"rgba(79,255,176,0.08)", border:"1px solid #4fffb0", borderRadius:8, color:"#4fffb0", fontSize:14 }}>
            {t.contactSuccess}
          </div>
        ) : (
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={t.contactName}
                  style={{ padding:"11px 14px", background:"#060e1a", border:"1px solid #1e3050", borderRadius:8, color:"#c0d0e8", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" }} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.contactEmail} type="email"
                  style={{ padding:"11px 14px", background:"#060e1a", border:"1px solid #1e3050", borderRadius:8, color:"#c0d0e8", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" }} />
              </div>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t.contactMessage} rows={4}
                style={{ padding:"11px 14px", background:"#060e1a", border:"1px solid #1e3050", borderRadius:8, color:"#c0d0e8", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"vertical" }} />
              {status === "error" && (
                <div style={{ color:"#ff6b6b", fontSize:12 }}>{t.contactError}</div>
              )}
              <button onClick={handleSubmit} disabled={status==="sending" || !name || !email || !message}
                style={{ padding:"12px 24px", background: (!name||!email||!message) ? "#0d1a2e" : "rgba(79,255,176,0.12)", border:"1px solid #4fffb0", borderRadius:8, color: (!name||!email||!message) ? "#3a5570" : "#4fffb0", fontSize:13, fontWeight:600, fontFamily:"'DM Mono',monospace", cursor: (!name||!email||!message) ? "default" : "pointer", transition:"all 0.2s", alignSelf:"flex-start" }}>
                {status === "sending" ? t.contactSending : t.contactSend}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{ maxWidth:980, margin:"40px auto 0", padding:"24px 18px 32px", borderTop:"1px solid #1e3050", width:"100%", boxSizing:"border-box" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, letterSpacing:"0.1em", color:"#4fffb0", marginBottom:4 }}>NetPay.tax</div>
          <p style={{ fontSize:11, color:"#5a7a98", maxWidth:500 }}>{t.footerDisclaimer}</p>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {t.footerLinks.map((link, i) => (
            <span key={i} style={{ fontSize:12, color:"#6a9ab8", cursor:"pointer", textDecoration:"underline" }}
              onClick={() => {
                if (i===2) document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"});
                else if (i===0) document.getElementById("privacy-section")?.scrollIntoView({behavior:"smooth"});
                else document.getElementById("about-section")?.scrollIntoView({behavior:"smooth"});
              }}>
              {link}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid #1a2e40", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
        <ShareButtons msg={t.shareMsgSite} t={t} compact={true} />
        <div style={{ fontSize:10, color:"#3a5570", textAlign:"center" }}>
          © {new Date().getFullYear()} NetPay.tax — {t.footerDisclaimer}
        </div>
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
    if (bl === "de") return "de";
    if (bl === "ar") return "ar";
    return "en";
  });
  const [salary, setSalary]    = useState("");
  const [inputCurrency, setIC] = useState("CAD");
  const [search, setSearch]    = useState("");
  const [selected, setSelected]= useState(null);
  const [caOpen, setCaOpen]    = useState(false);
  const [usOpen, setUsOpen]    = useState(false);
  const [period, setPeriod]    = useState("annual");
  const [compareList, setCompareList] = useState([]); // [{id, name, flag, calc}]
  const [showCompare, setShowCompare] = useState(false);
  const [showCompareWarn, setShowCompareWarn] = useState(false);
  const [recentList,  setRecentList]  = useState(() => {
    try { return JSON.parse(localStorage.getItem("np_recent") || "[]"); } catch { return []; }
  });

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
    const all = [
      { id:"__CA__", isGroup:true, group:"CA", flag:"🇨🇦", name:t.canada, netUSD:caNet, effectiveRate:0 },
      { id:"__US__", isGroup:true, group:"US", flag:"🇺🇸", name:t.usa,    netUSD:usNet, effectiveRate:0 },
      ...OTHER_COUNTRIES.map(c => ({ id:c.name, isGroup:false, flag:c.flag, name:c.name, ...countryCalcs[c.name] })),
    ].sort((a,b) => b.netUSD - a.netUSD);
    // Put recently viewed at top (preserve their relative order)
    if (recentList.length > 0) {
      const recents = recentList.map(id => all.find(x => x.id === id)).filter(Boolean);
      const rest = all.filter(x => !recentList.includes(x.id));
      return [...recents, ...rest];
    }
    return all;
  }, [salaryUSD, provCalcs, stateCalcs, countryCalcs, lang, recentList]);

  const maxNet       = sortedList[0]?.netUSD || 1;
  const sortedProvs  = useMemo(() => [...PROVINCES_CA].sort((a,b) => (provCalcs[b.name]?.netUSD||0)-(provCalcs[a.name]?.netUSD||0)), [provCalcs]);
  const sortedStates = useMemo(() => [...STATES_US].sort((a,b)    => (stateCalcs[b.name]?.netUSD||0)-(stateCalcs[a.name]?.netUSD||0)), [stateCalcs]);

  // Resolve detail panel
  let detail = null;
  if (selected && salaryUSD) {
    const prov    = PROVINCES_CA.find(p => p.name === selected);
    const state   = STATES_US.find(s => s.name === selected);
    const country = OTHER_COUNTRIES.find(c => c.name === selected);
    if (prov)     detail = { label:prov.name,    flagEl:<FlagImg src={prov.flagImg}   abbr={prov.abbr}   size={24}/>, subtitle:t.caDetail, calc:provCalcs[prov.name],       hasProv:true,  countryKey:prov.name,    isUSState:false };
    else if (state)   detail = { label:state.name,   flagEl:<FlagImg src={state.flagImg}  abbr={state.abbr}  size={24}/>, subtitle:t.usDetail, calc:stateCalcs[state.name],     hasProv:true,  countryKey:state.name,   isUSState:true  };
    else if (country) detail = { label:country.name, flagEl:<span style={{fontSize:26}}>{country.flag}</span>,           subtitle:null,        calc:countryCalcs[country.name], hasProv:false, countryKey:country.name, isUSState:false };
  }

  // Track recently viewed
  function selectAndTrack(id) {
    setSelected(prev => prev === id ? null : id);
    if (id) setRecentList(prev => {
      const updated = [id, ...prev.filter(x => x !== id)].slice(0, 5);
      try { localStorage.setItem("np_recent", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }

  // Add/remove from compare list
  function toggleCompare(e, item) {
    e.stopPropagation();
    setCompareList(prev => {
      if (prev.find(x => x.id === item.id)) return prev.filter(x => x.id !== item.id);
      if (prev.length >= 3) return prev;
      return [...prev, item];
    });
  }

  const match = (name) => !search || name.toLowerCase().includes(search.toLowerCase());

  return (
    <div dir={t.rtl ? "rtl" : "ltr"} style={{ minHeight:"100vh", background:"#0a0f1a", fontFamily:"'DM Sans',sans-serif", color:"#e8eaf0", overflowX:"hidden", width:"100%", direction: t.rtl ? "rtl" : "ltr" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Bebas+Neue&family=Noto+Sans+Arabic:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0d1117}
        ::-webkit-scrollbar-thumb{background:#2a3045;border-radius:2px}
        .inp:focus{outline:none;border-color:#4fffb0 !important;box-shadow:0 0 0 3px rgba(79,255,176,0.07)}
        .salary-inp{border-color:#4fffb0 !important;transition:all 0.25s ease !important;}
        .salary-inp:focus{box-shadow:0 0 0 4px rgba(79,255,176,0.15) !important;transform:scaleX(1.03);transform-origin:left;}
        .row:hover{background:#0e1520 !important}
        .grow:hover{background:#0c1d2c !important}
        html,body,#root{background:#0a0f1a;margin:0;padding:0;min-height:100%;overflow-x:hidden;}
        [dir=rtl]{font-family:'Noto Sans Arabic','DM Sans',sans-serif !important;}
        @keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
        :root{--blue:#4a80d4;--green:#4fffb0;--green-logo:#4a9e50;}
        .logo-blue{color:var(--blue)!important;}
        select{appearance:none;-webkit-appearance:none}
        select option{background:#0d1520}
      `}</style>

      {/* ── Header ── */}
      <div style={{ background:"linear-gradient(135deg,#0a1428 0%,#0d1a2e 50%,#080b12 100%)", borderBottom:"1px solid #1e3a60", padding:"18px 22px 16px" }}>
        <div style={{ maxWidth:980, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap", width:"100%", boxSizing:"border-box" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
              <div style={{ width:5, height:28, background:"#4fffb0", borderRadius:3 }} />
              <h1 style={{ fontFamily:"'Bebas Neue'", fontSize:28, letterSpacing:"0.08em", color:"#fff", lineHeight:1 }}>NetPay.tax</h1>
            </div>
            <p style={{ color:"#4a6a8a", fontSize:10, marginLeft:15, fontFamily:"'DM Mono',monospace" }}>
              {t.subtitle(OTHER_COUNTRIES.length, PROVINCES_CA.length, STATES_US.length)}
            </p>
          </div>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>

      <AboutSection t={t} />

      <div style={{ maxWidth:980, margin:"0 auto", padding:"20px 18px", width:"100%", boxSizing:"border-box" }}>

        {/* ── Salary input ── */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:"block", fontSize:9, fontFamily:"'DM Mono',monospace", color:"#4fffb0", letterSpacing:"0.16em", marginBottom:7 }}>{t.salaryLabel}</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <div style={{ position:"relative", flex:"1 1 180px", maxWidth:340 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#4fffb0", fontSize:15, fontFamily:"'DM Mono',monospace" }}>{currInfo.symbol}</span>
              <input className="inp salary-inp" type="text" value={salary}
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
            {detail && (
              <div style={{ position:"sticky", top:8, zIndex:100, marginBottom:18 }}>
                <DetailPanel {...detail} fmt={fmt} currCode={inputCurrency} onClose={() => setSelected(null)} t={t} lang={lang} salaryUSD={salaryUSD} />
              </div>
            )}

            {/* Recently viewed */}
            {recentList.length > 0 && !search && (() => {
              const recentItems = recentList.map(id => {
                const c = OTHER_COUNTRIES.find(x => x.name === id);
                const p = PROVINCES_CA.find(x => x.name === id);
                const s = STATES_US.find(x => x.name === id);
                const calc = countryCalcs[id] || provCalcs[id] || stateCalcs[id];
                if (!calc) return null;
                return { id, name: id, flag: c?.flag || "🏴", flagEl: c ? <span style={{fontSize:14}}>{c.flag}</span> : <FlagImg src={p?.flagImg||s?.flagImg} abbr={p?.abbr||s?.abbr} size={14}/> };
              }).filter(Boolean);
              if (!recentItems.length) return null;
              return (
                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:8, fontFamily:"'DM Mono',monospace", color:"#4a6a88", letterSpacing:"0.12em", marginBottom:5 }}>{t.recentLabel}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {recentItems.map(item => (
                      <div key={item.id} onClick={() => selectAndTrack(item.id)}
                        style={{ display:"flex", alignItems:"center", gap:5, background:"#0d1a2e", border:`1px solid ${selected===item.id?"#4fffb0":"#1a2e48"}`, borderRadius:6, padding:"4px 9px", cursor:"pointer", fontSize:11, color:selected===item.id?"#4fffb0":"#8aaac8", fontFamily:"'DM Mono',monospace", transition:"all 0.15s" }}>
                        {item.flagEl}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* List header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:8 }}>
              <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", color:"#8aaac8", letterSpacing:"0.14em" }}>{t.rankingLabel}</span>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>

                <input className="inp" type="text" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
                  style={{ background:"#0d1a2e", border:"1px solid #152030", borderRadius:7, color:"#c0c8d8", padding:"6px 11px", fontSize:11, width:160, transition:"all 0.2s" }}
                />
              </div>
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
                              onClick={() => selectAndTrack(p.name)}
                              inCompare={!!compareList.find(x => x.id === p.name)}
                              onCompare={(e) => { e.stopPropagation(); toggleCompare(e, { id:p.name, name:p.name, flag:"🇨🇦", calc:provCalcs[p.name] }); }}
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
                              onClick={() => selectAndTrack(s.name)}
                              inCompare={!!compareList.find(x => x.id === s.name)}
                              onCompare={(e) => { e.stopPropagation(); toggleCompare(e, { id:s.name, name:s.name, flag:"🇺🇸", calc:stateCalcs[s.name] }); }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  const cCalc = countryCalcs[r.name] || { netUSD: r.netUSD, effectiveRate: r.effectiveRate, totalTaxUSD: salaryUSD - r.netUSD, taxUSD: 0, provTaxUSD: 0 };
                  return (
                    <CountryRow key={r.id} rank={rank} flag={r.flag} name={r.name}
                      isSelected={selected===r.id}
                      netUSD={r.netUSD} effectiveRate={r.effectiveRate} maxNetUSD={maxNet} fmt={fmt} t={t}
                      onClick={() => selectAndTrack(r.id)}
                      inCompare={!!compareList.find(x => x.id === r.id)}
                      onCompare={(e) => toggleCompare(e, { id:r.id, name:r.name, flag:r.flag, calc:cCalc })}
                    />
                  );
                })}
            </div>

            <div style={{ marginTop:16, padding:"10px 14px", background:"#0c1525", borderRadius:8, border:"1px solid #101820" }}>
              <p style={{ fontSize:9, color:"#8ab0cc", lineHeight:1.9, fontFamily:"'DM Mono',monospace" }}>{t.disclaimer}</p>
            </div>

            {/* Floating compare button */}
            {compareList.length > 0 && (
              <div style={{ position:"sticky", bottom:12, display:"flex", flexDirection:"column", alignItems:"center", gap:8, marginTop:14, zIndex:200 }}>
                {compareList.length === 1 && showCompareWarn && (
                  <div style={{ background:"#0d1a2e", border:"1px solid #ff9955", borderRadius:10, padding:"8px 16px", fontSize:11, color:"#ff9955", fontFamily:"'DM Mono',monospace", textAlign:"center", animation:"fi 0.2s ease" }}>
                    {t.compareMinMsg}
                  </div>
                )}
                <button onClick={() => {
                  if (compareList.length < 2) { setShowCompareWarn(true); setTimeout(() => setShowCompareWarn(false), 3000); }
                  else { setShowCompareWarn(false); setShowCompare(true); }
                }}
                  style={{ background:"#0a1628", border:`2px solid ${compareList.length < 2 ? "#ff9955" : "#4fffb0"}`, borderRadius:30, color:compareList.length < 2 ? "#ff9955" : "#4fffb0", padding:"11px 26px", cursor:"pointer", fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:700, boxShadow:`0 4px 24px ${compareList.length < 2 ? "rgba(255,153,85,0.2)" : "rgba(79,255,176,0.25)"}`, animation:"fi 0.2s ease", letterSpacing:"0.06em", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}>
                  <span>⚖️</span>
                  <span>{t.compareBtn(compareList.length)}</span>
                </button>
              </div>
            )}
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
      <ContactSection t={t} />
      <Footer t={t} />

      {/* Compare modal — App level */}
      {showCompare && compareList.length > 0 && (
        <CompareModal
          items={compareList}
          onRemove={(id) => setCompareList(prev => prev.filter(x => x.id !== id))}
          onClose={() => setShowCompare(false)}
          onReset={() => { setCompareList([]); setShowCompare(false); }}
          fmt={fmt} t={t} lang={lang} sortedList={sortedList}
        />
      )}
    </div>
  );
}
