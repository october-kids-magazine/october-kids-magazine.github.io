(function () {
  if (window.Magazine.mode) return;
  const C=window.MAGAZINE, M=window.Magazine, api=window.magazineAPI;
  const group=C.activityDirectory.find(x=>x.id===new URLSearchParams(location.search).get('category') && x.ids);
  if (!group) return;
  if (group.id === 'ai-images') {
    const heroesPage=M.pages.findIndex(p=>group.ids.every(id=>p.media.includes(id)));
    if(heroesPage>=0){api.go(heroesPage+1);return;}
  }
  const items=group.ids.map(id=>M.media.get(id)).filter(x=>x&&!x.hidden);
  const dialog=document.createElement('dialog');
  dialog.className='category-dialog';
  dialog.setAttribute('aria-labelledby','category-title');
  dialog.innerHTML=`<button class="category-close" aria-label="العودة إلى المجلة">×</button><h2 id="category-title">${M.esc(group.arabic)}</h2><p lang="en" dir="ltr">${M.esc(group.english)}</p><div class="category-items">${items.map(m=>`<button data-category-media="${m.id}" aria-label="${M.esc(m.captionArabic)}"><img loading="lazy" src="${m.poster||m.thumbnail||m.optimizedPath}" alt="${M.esc(m.captionArabic)}"><span>${m.type==='video'?'▶ شاهد الفيديو':'افتح الصورة'}</span></button>`).join('')}</div>`;
  document.body.append(dialog);
  api.go(M.pages.findIndex(p=>p.section==='activity-portal')+1);
  dialog.querySelector('.category-close').onclick=()=>dialog.close();
  dialog.addEventListener('click',event=>{
    const button=event.target.closest('[data-category-media]');
    if(button)api.openMedia(button.dataset.categoryMedia,button,group.ids);
    else if(event.target===dialog)dialog.close();
  });
  dialog.showModal();
})();
