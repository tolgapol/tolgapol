export const LANGUAGES = ['en', 'tr', 'es', 'de', 'fr', 'zh-TW', 'zh-CN'];

export const BASE_URL = 'https://hi.tolgapol.com/';

export const PROFILE = {
  name: 'Tolga Polat',
  company: 'incehesap.com',
  photo: 'assets/tolga-polat.jpg',
  phone: '+905074972087',
  emailWork: 't.polat@incehesap.com',
  emailPersonal: 'tlqplt@gmail.com',
  companyUrl: 'https://incehesap.com',
  personalUrl: 'https://tolgapol.com',
  linkedin: 'tolgapol',
  instagram: 'moonlightsonata',
  github: 'tolgapol',
};

const T = {
  en: {
    title: 'Head of Digital Marketing',
    location: 'Istanbul, Türkiye',
    summary: 'Performance-driven marketing leader scaling Turkey\'s largest tech e-commerce platform through AI-powered growth strategies — paid search, SEO, CRM automation, and influencer programs built on predictive analytics.',
    save: 'Add to Contacts',
    scan: 'Scan to Add',
    linkedin: 'LinkedIn',
    email: 'Email',
    vcf: 'tolga-polat.vcf',
  },
  tr: {
    title: 'Dijital Pazarlama Müdürü',
    location: 'İstanbul, Türkiye',
    summary: 'Türkiye\'nin en büyük teknoloji e-ticaret platformunu yapay zeka destekli büyüme stratejileriyle ölçeklendiren pazarlama lideri; ücretli arama, SEO, CRM otomasyonu ve tahmine dayalı analitik odaklı influencer iş birlikleri.',
    save: 'Rehbere Ekle',
    scan: 'Tara ve Ekle',
    linkedin: 'LinkedIn',
    email: 'E-posta',
    vcf: 'tolga-polat-tr.vcf',
  },
  es: {
    title: 'Director de Marketing Digital',
    location: 'Estambul, Turquía',
    summary: 'Líder de marketing que escala la mayor plataforma e-commerce tech de Turquía con estrategias de crecimiento potenciadas por IA — búsqueda pagada, SEO, automatización CRM y programas de influencers basados en analítica predictiva.',
    save: 'Añadir a contactos',
    scan: 'Escanear para agregar',
    linkedin: 'LinkedIn',
    email: 'Correo',
    vcf: 'tolga-polat-es.vcf',
  },
  de: {
    title: 'Leiter Digitales Marketing',
    location: 'Istanbul, Türkei',
    summary: 'Performance-orientierter Marketing-Leiter, der die größte Tech-E-Commerce-Plattform der Türkei mit KI-gestützten Wachstumsstrategien skaliert — bezahlte Suche, SEO, CRM-Automatisierung und Influencer-Kampagnen auf Basis prädiktiver Analytik.',
    save: 'Kontakt hinzufügen',
    scan: 'Scannen zum Hinzufügen',
    linkedin: 'LinkedIn',
    email: 'E-Mail',
    vcf: 'tolga-polat-de.vcf',
  },
  fr: {
    title: 'Directeur Marketing Digital',
    location: 'Istanbul, Turquie',
    summary: 'Responsable marketing développant la première plateforme e-commerce tech de Turquie via des stratégies de croissance pilotées par l\'IA — search payant, SEO, automatisation CRM et programmes influenceurs fondés sur l\'analytique prédictive.',
    save: 'Ajouter aux contacts',
    scan: 'Scanner pour ajouter',
    linkedin: 'LinkedIn',
    email: 'E-mail',
    vcf: 'tolga-polat-fr.vcf',
  },
  'zh-TW': {
    title: '數位行銷總監',
    location: '伊斯坦堡，土耳其',
    summary: '以人工智慧驅動成長的行銷領導者，透過搜尋引擎行銷（SEM）、搜尋引擎優化（SEO）、客戶關係管理（CRM）自動化與預測分析，推動土耳其最大科技電商平台持續擴張。',
    save: '加入聯絡人',
    scan: '掃描以加入',
    linkedin: '領英',
    email: '電子郵件',
    vcf: 'tolga-polat-zh-TW.vcf',
  },
  'zh-CN': {
    title: '数字营销总监',
    location: '伊斯坦布尔，土耳其',
    summary: '以人工智能驱动增长的营销领导者，通过搜索引擎营销（SEM）、搜索引擎优化（SEO）、客户关系管理（CRM）自动化与预测分析，推动土耳其最大科技电商平台持续扩张。',
    save: '添加到联系人',
    scan: '扫描以添加',
    linkedin: '领英',
    email: '电子邮件',
    vcf: 'tolga-polat-zh-CN.vcf',
  },
};

export function t(lang) {
  return T[lang] || T.en;
}
