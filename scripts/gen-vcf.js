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
    note: "Drives full-funnel growth at Turkey's leading tech e-commerce platform through AI-powered marketing. Expert in paid search (SEM), SEO strategy, CRM automation, and influencer programs built on predictive analytics and data intelligence.",
  },
  tr: {
    file: 'tolga-polat-tr.vcf',
    title: 'Dijital Pazarlama Müdürü',
    role: 'Pazarlama lideri',
    country: 'Turkiye',
    note: "Türkiye'nin önde gelen teknoloji e-ticaret platformunda yapay zeka destekli pazarlama stratejileriyle tam hunili büyümeyi yönetir. Ücretli arama (SEM), SEO stratejisi, CRM otomasyonu ve tahmine dayalı veri analitiğine dayalı influencer programlarında uzman.",
  },
  es: {
    file: 'tolga-polat-es.vcf',
    title: 'Director de Marketing Digital',
    role: 'Líder de marketing',
    country: 'Turkiye',
    note: "Impulsa el crecimiento full-funnel en la plataforma e-commerce tech líder de Turquía con marketing potenciado por IA. Experto en búsqueda pagada (SEM), estrategia SEO, automatización CRM y programas de influencers basados en analítica predictiva.",
  },
  de: {
    file: 'tolga-polat-de.vcf',
    title: 'Leiter Digitales Marketing',
    role: 'Marketing-Leiter',
    country: 'Turkiye',
    note: "Steuert Full-Funnel-Wachstum bei der führenden Tech-E-Commerce-Plattform der Türkei mit KI-gestütztem Marketing. Experte für bezahlte Suche (SEM), SEO-Strategie, CRM-Automatisierung und Influencer-Programme auf Basis prädiktiver Analytik.",
  },
  fr: {
    file: 'tolga-polat-fr.vcf',
    title: 'Directeur Marketing Digital',
    role: 'Responsable marketing',
    country: 'Turkiye',
    note: "Pilote la croissance full-funnel de la première plateforme e-commerce tech de Turquie avec un marketing piloté par l'IA. Expert en search payant (SEM), stratégie SEO, automatisation CRM et programmes influenceurs fondés sur l'analytique prédictive.",
  },
  'zh-TW': {
    file: 'tolga-polat-zh-TW.vcf',
    title: '數位行銷總監',
    role: '行銷領導者',
    country: '土耳其',
    note: '主導土耳其最大科技電商平台的全漏斗成長，以人工智慧驅動行銷策略。專精搜尋引擎行銷（SEM）、搜尋引擎優化（SEO）策略、客戶關係管理（CRM）自動化、預測分析與網紅行銷。',
  },
  'zh-CN': {
    file: 'tolga-polat-zh-CN.vcf',
    title: '数字营销总监',
    role: '营销领导者',
    country: '土耳其',
    note: '主导土耳其最大科技电商平台的全漏斗增长，以人工智能驱动营销策略。精通搜索引擎营销（SEM）、搜索引擎优化（SEO）策略、客户关系管理（CRM）自动化、预测分析与网红营销。',
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
