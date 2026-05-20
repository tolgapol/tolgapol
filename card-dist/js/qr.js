export function renderQr(text, errorLevel = 'L') {
  const target = document.getElementById('qr-code');
  if (!target || typeof window.qrcode === 'undefined') return;
  try {
    const qr = window.qrcode(0, errorLevel);
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    let d = '';
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (qr.isDark(y, x)) d += `M${x} ${y}h1v1H${x}z`;
      }
    }
    target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" role="img" aria-label="vCard QR code" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  } catch {
    target.textContent = '';
  }
}
