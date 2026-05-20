export const LANGUAGES = ['en', 'tr', 'es', 'de', 'fr', 'zh-TW', 'zh-CN'];

export const LANG_LABELS = {
  en: 'EN', tr: 'TR', es: 'ES', de: 'DE', fr: 'FR', 'zh-TW': '繁', 'zh-CN': '简',
};

export const LANG_NAMES = {
  en: 'English', tr: 'Türkçe', es: 'Español', de: 'Deutsch',
  fr: 'Français', 'zh-TW': '繁體中文', 'zh-CN': '简体中文',
};

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
    summary: "Marketing leader building performance-driven growth for Türkiye's largest tech e-commerce marketplace across SEO, paid media, automation, and analytics.",
    save: 'Save Contact',
    scan: 'Scan to Save',
    vcf: 'tolga-polat.vcf',
  },
  tr: {
    title: 'Dijital Pazarlama Müdürü',
    summary: "Türkiye'nin en büyük teknoloji e-ticaret platformunda SEO, ücretli medya, otomasyon ve analitik alanlarında performansa dayalı büyüme inşa eden pazarlama lideri.",
    save: 'Kişiyi Kaydet',
    scan: 'Tara ve Kaydet',
    vcf: 'tolga-polat-tr.vcf',
  },
  es: {
    title: 'Director de Marketing Digital',
    summary: "Líder de marketing construyendo crecimiento basado en rendimiento para el mayor marketplace de e-commerce tech de Türkiye en SEO, medios de pago, automatización y analítica.",
    save: 'Guardar Contacto',
    scan: 'Escanear para Guardar',
    vcf: 'tolga-polat-es.vcf',
  },
  de: {
    title: 'Leiter Digitales Marketing',
    summary: "Marketing-Leiter, der leistungsgetriebenes Wachstum für Türkiyes größten Tech-E-Commerce-Marktplatz in SEO, bezahlten Medien, Automatisierung und Analytics aufbaut.",
    save: 'Kontakt Speichern',
    scan: 'Scannen zum Speichern',
    vcf: 'tolga-polat-de.vcf',
  },
  fr: {
    title: 'Directeur du Marketing Digital',
    summary: "Leader marketing construisant une croissance axée sur la performance pour le plus grand marketplace e-commerce tech de Türkiye dans le SEO, médias payants, automatisation et analytique.",
    save: 'Enregistrer',
    scan: 'Scanner pour Enregistrer',
    vcf: 'tolga-polat-fr.vcf',
  },
  'zh-TW': {
    title: '數位行銷總監',
    summary: '行銷領導者，為土耳其最大科技電商平台構建以績效為核心的增長體系，涵蓋 SEO、付費媒體、自動化與數據分析。',
    save: '儲存聯絡人',
    scan: '掃描以儲存',
    vcf: 'tolga-polat-zh-TW.vcf',
  },
  'zh-CN': {
    title: '数字营销总监',
    summary: '营销领导者，为土耳其最大科技电商平台构建以绩效为核心的增长体系，涵盖 SEO、付费媒体、自动化与数据分析。',
    save: '保存联系人',
    scan: '扫描以保存',
    vcf: 'tolga-polat-zh-CN.vcf',
  },
};

export function t(lang) {
  return T[lang] || T.en;
}
