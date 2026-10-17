/* Web-only enhancements. The shared renderer remains the print source. */
(()=>{
const M=window.Magazine,A=window.magazineAPI,$=s=>document.querySelector(s);if(M.mode||!A)return;
const E=M.esc,range=$('#page-range'),nav=$('#chapter-nav'),films=$('#film-dialog');range.max=A.pageCount;
nav.innerHTML=M.navigation.map(s=>`<button data-page="${s.page}">${E(s.arabic)}</button>`).join('');
$('#open-book').onclick=()=>A.next();range.onchange=()=>A.go(Number(range.value));
const title=p=>M.navigation.find(n=>n.id===p.section)?.arabic||({cover:'الغلاف',contents:'الفهرس',closing:'إلى لقاء',reflection:'غدًا أجمل'}[p.section]||'حكاية يوم');
let overviewBuilt=false;
function overview(){if(overviewBuilt)return;overviewBuilt=true;$('#page-overview').innerHTML=M.pages.map((p,i)=>{const m=M.media.get(p.media[0]);return `<button class="page-tile" data-page="${i+1}" aria-label="صفحة ${i+1}: ${E(title(p))}">${m?`<img loading="lazy" src="${m.thumbnail||m.poster}" alt="">`:`<span class="tile-type">${String(i+1).padStart(2,'0')}</span>`}<b>${String(i+1).padStart(2,'0')}</b><span>${E(title(p))}</span></button>`}).join('')}
$('#overview').addEventListener('click',()=>{overview();paint()});
$('#films').onclick=()=>{const items=window.MAGAZINE.videos.filter(v=>!v.hidden).sort((a,b)=>a.sortOrder-b.sortOrder);$('#film-library').innerHTML=items.map(v=>`<button class="film-card" data-media="${v.id}" aria-label="تشغيل ${E(v.captionArabic)}"><img loading="lazy" src="${v.poster}" alt=""><span>▶ ${Math.floor(v.duration/60)}:${String(Math.floor(v.duration%60)).padStart(2,'0')}</span><h3>${E(v.captionArabic)}</h3>${v.aiStatus==='verified'?'<small>محتوى إبداعي بالذكاء الاصطناعي</small>':''}</button>`).join('');films.showModal();$('#close-films').focus()};
$('#close-films').onclick=()=>{films.close();$('#films').focus()};films.addEventListener('click',e=>{if(e.target===films)films.close()});
function paint(){const p=M.pages[A.current],landscape=A.flip.getOrientation()==='landscape';range.value=A.current+1;$('#chapter-label').textContent=title(p);$('#open-book').hidden=A.current!==0;$('#turn-hint').hidden=A.current>2;nav.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',String(M.navigation[i].id===p.section)));document.querySelectorAll('.page-tile').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.page)===A.current+1)));document.querySelectorAll('.page').forEach(el=>{const n=Number(el.dataset.logical);el.classList.toggle('is-reading',n===A.current||(landscape&&n===A.current-1));});
 if(landscape&&A.current>0&&A.current<A.pageCount-1)$('#page-indicator').textContent=`${A.current}–${A.current+1} / ${A.pageCount}`;
}
A.flip.on('flip',()=>requestAnimationFrame(paint));A.flip.on('changeOrientation',()=>setTimeout(paint,0));A.flip.on('changeState',e=>document.body.classList.toggle('turning',e.data!=='read'));paint();
})();

