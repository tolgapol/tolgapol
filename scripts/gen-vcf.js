#!/usr/bin/env node
// Generates multilingual VCF files for hi.tolgapol.com
const fs = require('fs');
const path = require('path');

const CARD_DIST = path.join(__dirname, '..', 'card-dist');

function foldVCardLine(line) {
  const buf = Buffer.from(line, 'utf8');
  if (buf.length <= 75) return line;
  const chunks = [];
  let offset = 0;
  let isFirst = true;
  while (offset < buf.length) {
    const limit = isFirst ? 75 : 74;
    let end = offset + limit;
    if (end >= buf.length) {
      chunks.push((isFirst ? '' : ' ') + buf.slice(offset).toString('utf8'));
      break;
    }
    while (end > offset && (buf[end] & 0xC0) === 0x80) end--;
    chunks.push((isFirst ? '' : ' ') + buf.slice(offset, end).toString('utf8'));
    offset = end;
    isFirst = false;
  }
  return chunks.join('\r\n');
}

function escVCard(str) {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function extractPhotoBlock() {
  const vcf = fs.readFileSync(path.join(CARD_DIST, 'tolga-polat.vcf'), 'utf8');
  const lines = vcf.split('\n');
  const block = [];
  let inPhoto = false;
  for (const line of lines) {
    if (line.startsWith('PHOTO;')) { inPhoto = true; }
    if (inPhoto) {
      if (line.startsWith('X-SOCIAL') || line.startsWith('REV') || line.startsWith('END')) break;
      block.push(line.trimEnd());
    }
  }
  return block.join('\r\n');
}

const LANGS = {
  en: {
    file: 'tolga-polat.vcf',
    title: 'Head of Digital Marketing',
    role: 'Marketing leader',
    country: 'Turkiye',
    note: "Head of Digital Marketing at incehesap.com — Turkiye's tech e-commerce marketplace. Builds performance-driven growth across SEO, paid media, CRM automation, analytics, and conversion optimisation.",
  },
  tr: {
    file: 'tolga-polat-tr.vcf',
    title: 'Dijital Pazarlama Müdürü',
    role: 'Pazarlama lideri',
    country: 'Turkiye',
    note: "incehesap.com'da Dijital Pazarlama Müdürü — Turkiye'nin teknoloji e-ticaret platformu. SEO, ücretli medya, CRM otomasyonu, analitik ve dönüşüm optimizasyonu alanlarında büyüme sistemleri kuruyor.",
  },
  es: {
    file: 'tolga-polat-es.vcf',
    title: 'Director de Marketing Digital',
    role: 'Líder de marketing',
    country: 'Turkiye',
    note: "Director de Marketing Digital en incehesap.com — el marketplace e-commerce tech de Turkiye. Construye crecimiento en SEO, medios de pago, automatización CRM, analítica y optimización de conversión.",
  },
  de: {
    file: 'tolga-polat-de.vcf',
    title: 'Leiter Digitales Marketing',
    role: 'Marketing-Leiter',
    country: 'Turkiye',
    note: "Leiter Digitales Marketing bei incehesap.com — Turkiyes Tech-E-Commerce-Marktplatz. Baut leistungsgetriebenes Wachstum in SEO, bezahlten Medien, CRM-Automatisierung, Analytics und Conversion-Optimierung auf.",
  },
  fr: {
    file: 'tolga-polat-fr.vcf',
    title: 'Directeur du Marketing Digital',
    role: 'Responsable marketing',
    country: 'Turkiye',
    note: "Directeur du Marketing Digital chez incehesap.com — le marketplace e-commerce tech de Turkiye. Construit une croissance basée sur la performance dans le SEO, les médias payants, l'automatisation CRM et l'optimisation de conversion.",
  },
  'zh-TW': {
    file: 'tolga-polat-zh-TW.vcf',
    title: '數位行銷總監',
    role: '行銷領導者',
    country: '土耳其',
    note: 'incehesap.com 數位行銷總監 — 土耳其科技電商平台。在 SEO、付費媒體、CRM 自動化、數據分析和轉化優化方面構建以績效為核心的增長體系。',
  },
  'zh-CN': {
    file: 'tolga-polat-zh-CN.vcf',
    title: '数字营销总监',
    role: '营销领导者',
    country: '土耳其',
    note: 'incehesap.com 数字营销总监 — 土耳其科技电商平台。在 SEO、付费媒体、CRM 自动化、数据分析和转化优化方面构建以绩效为核心的增长体系。',
  },
};

function buildVcf(lang) {
  const d = LANGS[lang];
  const photo = extractPhotoBlock();
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Polat;Tolga;;;',
    'FN:Tolga Polat',
    foldVCardLine('TITLE:' + escVCard(d.title)),
    foldVCardLine('ROLE:' + escVCard(d.role)),
    'ORG:incehesap.com;',
    'TEL;type=CELL;type=VOICE;type=pref:+905074972087',
    'EMAIL;type=INTERNET;type=WORK;type=pref:t.polat@incehesap.com',
    'EMAIL;type=INTERNET;type=HOME:tlqplt@gmail.com',
    'URL;type=WORK;type=pref:https://incehesap.com',
    'URL;type=HOME:https://tolgapol.com',
    'BDAY:1992-07-28',
    foldVCardLine('item1.ADR;type=WORK;type=pref:;;incehesap.com\\nAtabey Caddesi No:9/1;Istanbul;Cekmekoy;34788;' + escVCard(d.country)),
    'item1.X-ABADR:tr',
    foldVCardLine('NOTE:' + escVCard(d.note)),
    photo,
    'X-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/tolgapol',
    'X-SOCIALPROFILE;type=Instagram;x-user=moonlightsonata:https://instagram.com/moonlightsonata',
    'X-SOCIALPROFILE;type=GitHub;x-user=tolgapol:https://github.com/tolgapol',
    'REV:20260521T000000Z',
    'END:VCARD',
  ];
  return lines.join('\r\n') + '\r\n';
}

for (const [lang, d] of Object.entries(LANGS)) {
  const content = buildVcf(lang);
  const dest = path.join(CARD_DIST, d.file);
  fs.writeFileSync(dest, content);
  console.log('wrote', d.file, Buffer.byteLength(content, 'utf8'), 'bytes');
}
