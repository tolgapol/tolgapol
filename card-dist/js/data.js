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
    summary: 'Head of Digital Marketing at incehesap.com - Turkiye\'s leading tech e-commerce platform. Drives growth through SEM, SEO, CRM automation, and influencer marketing.',
    save: 'Add to Contacts',
    scan: 'Scan to Add',
    vcf: 'tolga-polat.vcf',
  },
  tr: {
    title: 'Dijital Pazarlama Müdürü',
    location: 'İstanbul, Türkiye',
    summary: 'incehesap.com\'da Dijital Pazarlama Müdürü - Türkiye\'nin en büyük teknoloji e-ticaret platformu. SEM, SEO, CRM otomasyonu ve influencer pazarlama ile büyümeyi yönlendiriyor.',
    save: 'Rehbere Ekle',
    scan: 'Tara ve Ekle',
    vcf: 'tolga-polat-tr.vcf',
  },
  es: {
    title: 'Director de Marketing Digital',
    location: 'Estambul, Turquía',
    summary: 'Director de Marketing Digital en incehesap.com - la mayor plataforma e-commerce tech de Turquía. Impulsa el crecimiento con SEM, SEO, CRM y marketing de influencers.',
    save: 'Añadir a contactos',
    scan: 'Escanear para agregar',
    vcf: 'tolga-polat-es.vcf',
  },
  de: {
    title: 'Leiter Digitales Marketing',
    location: 'Istanbul, Türkei',
    summary: 'Leiter Digitales Marketing bei incehesap.com - der führenden Tech-E-Commerce-Plattform der Türkei. Wachstum durch SEM, SEO, CRM-Automatisierung und Influencer-Marketing.',
    save: 'Kontakt hinzufügen',
    scan: 'Scannen zum Hinzufügen',
    vcf: 'tolga-polat-de.vcf',
  },
  fr: {
    title: 'Directeur Marketing Digital',
    location: 'Istanbul, Turquie',
    summary: 'Directeur Marketing Digital chez incehesap.com - la première plateforme e-commerce tech de Turquie. Pilote la croissance via SEM, SEO, CRM et marketing d\'influence.',
    save: 'Ajouter aux contacts',
    scan: 'Scanner pour ajouter',
    vcf: 'tolga-polat-fr.vcf',
  },
  'zh-TW': {
    title: '數位行銷總監',
    location: '伊斯坦堡，土耳其',
    summary: 'incehesap.com 數位行銷總監 - 土耳其領先的科技電商平台，負責 SEM、SEO、CRM 自動化與網紅行銷。',
    save: '加入聯絡人',
    scan: '掃描以加入',
    vcf: 'tolga-polat-zh-TW.vcf',
  },
  'zh-CN': {
    title: '数字营销总监',
    location: '伊斯坦布尔，土耳其',
    summary: 'incehesap.com 数字营销总监 - 土耳其领先的科技电商平台，负责 SEM、SEO、CRM 自动化与网红营销。',
    save: '添加到联系人',
    scan: '扫描以添加',
    vcf: 'tolga-polat-zh-CN.vcf',
  },
};

export function t(lang) {
  return T[lang] || T.en;
}
