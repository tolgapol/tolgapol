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
    summary: 'Performance-driven marketing leader scaling Turkey\'s largest tech e-commerce platform through paid search, SEO strategy, lifecycle CRM automation, and data-backed influencer partnerships.',
    save: 'Add to Contacts',
    scan: 'Scan to Add',
    vcf: 'tolga-polat.vcf',
  },
  tr: {
    title: 'Dijital Pazarlama Müdürü',
    location: 'İstanbul, Türkiye',
    summary: 'Türkiye\'nin en büyük teknoloji e-ticaret platformunu ücretli arama, SEO stratejisi, yaşam döngüsü CRM otomasyonu ve veri odaklı influencer iş birlikleriyle büyüten performans odaklı pazarlama lideri.',
    save: 'Rehbere Ekle',
    scan: 'Tara ve Ekle',
    vcf: 'tolga-polat-tr.vcf',
  },
  es: {
    title: 'Director de Marketing Digital',
    location: 'Estambul, Turquía',
    summary: 'Líder de marketing orientado al rendimiento que escala la mayor plataforma e-commerce tech de Turquía mediante búsqueda pagada, SEO, automatización CRM y alianzas con influencers basadas en datos.',
    save: 'Añadir a contactos',
    scan: 'Escanear para agregar',
    vcf: 'tolga-polat-es.vcf',
  },
  de: {
    title: 'Leiter Digitales Marketing',
    location: 'Istanbul, Türkei',
    summary: 'Performance-orientierter Marketing-Leiter, der die größte Tech-E-Commerce-Plattform der Türkei durch bezahlte Suche, SEO-Strategie, CRM-Automatisierung und datengestützte Influencer-Kampagnen skaliert.',
    save: 'Kontakt hinzufügen',
    scan: 'Scannen zum Hinzufügen',
    vcf: 'tolga-polat-de.vcf',
  },
  fr: {
    title: 'Directeur Marketing Digital',
    location: 'Istanbul, Turquie',
    summary: 'Responsable marketing axé performance, développant la première plateforme e-commerce tech de Turquie via le search payant, le SEO, l\'automatisation CRM et des partenariats influenceurs fondés sur les données.',
    save: 'Ajouter aux contacts',
    scan: 'Scanner pour ajouter',
    vcf: 'tolga-polat-fr.vcf',
  },
  'zh-TW': {
    title: '數位行銷總監',
    location: '伊斯坦堡，土耳其',
    summary: '以數據驅動的行銷領導者，透過搜尋引擎行銷（SEM）、搜尋引擎優化（SEO）、客戶關係管理（CRM）自動化與網紅合作，推動土耳其最大科技電商平台持續成長。',
    save: '加入聯絡人',
    scan: '掃描以加入',
    vcf: 'tolga-polat-zh-TW.vcf',
  },
  'zh-CN': {
    title: '数字营销总监',
    location: '伊斯坦布尔，土耳其',
    summary: '以数据驱动的营销领导者，通过搜索引擎营销（SEM）、搜索引擎优化（SEO）、客户关系管理（CRM）自动化与网红营销，推动土耳其最大科技电商平台持续增长。',
    save: '添加到联系人',
    scan: '扫描以添加',
    vcf: 'tolga-polat-zh-CN.vcf',
  },
};

export function t(lang) {
  return T[lang] || T.en;
}
