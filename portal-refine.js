(function () {
  const C = window.MAGAZINE, M = window.Magazine;
  if (!C || !M) return;
  const icons = {
    book: '<path d="M36 18Q23 10 9 16V57Q23 51 36 59Q49 51 63 57V16Q49 10 36 18Z" fill="#f4ca67"/><path d="M36 18V59M17 26L28 29M17 36L28 39M44 29L55 26M44 39L55 36"/>',
    stage: '<path d="M9 15H63V58H9Z" fill="#f3ce76"/><path d="M9 15H29Q27 36 9 42ZM63 15H43Q45 36 63 42Z" fill="#dc838e"/><path d="M7 61H65M36 27L39 34L47 35L41 41L42 49L36 45L30 49L31 41L25 35L33 34Z" fill="#fff8df"/>',
    pencil: '<path d="M15 51L47 13L59 25L27 63L10 66Z" fill="#f4ca67"/><path d="M47 13L59 25L51 33L39 21Z" fill="#dc838e"/><path d="M15 51L27 63M10 66L15 51M24 50L47 24"/>',
    speech: '<path d="M11 14H61V48H35L23 60V48H11Z" fill="#f3d275"/><path d="M24 29H48M24 38H42"/>',
    music: '<path d="M27 47V16L56 10V42"/><circle cx="20" cy="49" r="9" fill="#dc838e"/><circle cx="49" cy="44" r="9" fill="#83b9b4"/><path d="M27 23L56 17"/>',
    blocks: '<path d="M11 39H34V62H11Z" fill="#eaa277"/><path d="M38 39H61V62H38Z" fill="#83b9b4"/><path d="M25 12H48V35H25Z" fill="#f3ce76"/><path d="M31 23H42M22 50H29M45 50H54"/>',
    flag: '<path d="M19 61V11"/><path d="M20 12H59V25H20Z" fill="#d96367"/><path d="M20 25H59V38H20Z" fill="#fff8df"/><path d="M20 38H59V51H20Z" fill="#355c56"/><path d="M38 28L41 34L44 28" stroke="#dca345"/>',
    star: '<path d="M36 10L44 27L63 30L49 43L52 62L36 53L20 62L23 43L9 30L28 27Z" fill="#f4ca67"/><path d="M28 38H29M43 38H44M29 45Q36 51 43 45"/>',
    play: '<rect x="10" y="17" width="52" height="40" rx="12" fill="#83b9b4"/><path d="M30 27L47 37L30 47Z" fill="#fff8df"/>',
    dream: '<path d="M18 49Q9 42 15 33Q11 22 23 20Q30 10 40 18Q52 14 56 25Q66 31 58 40Q58 53 45 51Q34 63 24 53Z" fill="#d9c9ed"/><path d="M29 34L36 27L43 34L36 41Z" fill="#f4ca67"/><path d="M25 47L48 47"/>'
  };
  const art = icon => `<svg class="portal-icon" viewBox="0 0 72 72" fill="none" stroke="#315b55" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon] || icons.star}</svg>`;
  const esc = M.esc;
  // The child portrait spread receives the new title; neighboring video layouts stay intact.
  for (const page of M.pages.filter(p => p.section === 'creative' && p.media.some(id => M.media.get(id)?.type === 'video'))) {
    page.html = page.html.replace('<h2>أبطالنا بالذكاء الاصطناعي</h2>', '<h2>إبداعات أطفالنا</h2>').replace('Our AI Heroes</p>', 'Children’s Creative Moments</p>');
  }
  for (const item of C.activityDirectory) {
    if (!item.section) continue;
    for (const page of M.pages.filter(p => p.section === item.section)) {
      page.html = page.html.replace(/<div class="section-head">[\s\S]*?<\/div>/, head(item.arabic, item.english));
    }
  }
  const portal = M.pages.find(p => p.section === 'activity-portal');
  if (!portal) return;
  portal.html = `${head('اكتشفوا عالمنا', 'Explore Our World')}<p class="portal-intro">اختاروا نوع المحتوى… واضغطوا أو امسحوا الرمز للوصول إليه.</p><div class="portal-cards">${(C.activityDirectory || []).map((x, i) => `<a class="portal-card portal-color-${i}" href="${esc(x.url)}" data-portal-target="${esc(x.target)}">${art(x.icon)}<div class="portal-copy"><h3>${esc(x.arabic)}</h3><small lang="en" dir="ltr">${esc(x.english)}</small></div><img class="portal-qr" src="assets/qr/portal-${x.qr}.png" alt="رمز الانتقال إلى ${esc(x.arabic)}"><span class="portal-action">${x.target.indexOf('video=') >= 0 ? 'شاهد الفيديو' : 'افتح المحتوى'} ←</span></a>`).join('')}</div>`;
  function head(ar, en) { return `<div class="section-head"><span class="section-number"></span><h2>${esc(ar)}</h2><p class="eyebrow" lang="en" dir="ltr">${esc(en)}</p></div>`; }
})();
