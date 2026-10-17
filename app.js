(()=>{'use strict';const C=window.MAGAZINE,M=window.Magazine,$=s=>document.querySelector(s),N=M.pages.length;let current=0,returnFocus=null,flip;
const book=$('#book');
if(M.mode){document.body.classList.add('print-mode');book.innerHTML=M.pages.map(M.pageHTML).join('');return;}
book.innerHTML=M.pages.map(M.pageHTML).reverse().join('');
flip=new St.PageFlip(book,{width:600,height:848,size:'stretch',minWidth:280,maxWidth:600,minHeight:396,maxHeight:848,showCover:true,usePortrait:true,autoSize:true,drawShadow:!matchMedia('(max-width:700px)').matches,maxShadowOpacity:.32,flippingTime:matchMedia('(prefers-reduced-motion: reduce)').matches?100:matchMedia('(max-width:700px)').matches?280:700,mobileScrollSupport:true,startPage:N-1,clickEventForward:true,useMouseEvents:true,swipeDistance:25,showPageCorners:!matchMedia('(max-width:700px)').matches,disableFlipByClick:false});
function hydrate(){document.querySelectorAll('.page').forEach(el=>{const distance=Math.abs(Number(el.dataset.logical)-current);if(distance<(matchMedia('(max-width:700px)').matches?2:3)){el.querySelectorAll('img[data-src]').forEach(img=>{img.src=img.dataset.src;img.dataset.managed='1';if(img.dataset.srcset)img.srcset=img.dataset.srcset;delete img.dataset.src;});}else if(distance>4){el.querySelectorAll('img[data-managed][src]').forEach(img=>{img.dataset.src=img.getAttribute('src');img.removeAttribute('src');img.removeAttribute('srcset');});}})}
function sizeContent(){const width=flip.getBoundsRect().pageWidth;if(!width)return;const mobile=matchMedia('(max-width:700px)').matches;book.style.setProperty('--page-scale',width/(mobile?390:600));book.style.setProperty('--cover-shift',flip.getOrientation()==='landscape'?(current===0?width/2:current>=N-1?-width/2:0)+'px':'0px')}
function update(e){current=N-1-(typeof e?.data==='number'?e.data:flip.getCurrentPageIndex());$('#page-indicator').textContent=`${current+1} / ${N}`;$('#previous').disabled=current===0;$('#next').disabled=current>=N-1;hydrate();requestAnimationFrame(sizeContent);}
flip.on('flip',update);flip.on('changeOrientation',()=>setTimeout(update,0));flip.loadFromHTML(book.querySelectorAll('.page'));update();
function go(page){const n=Math.max(0,Math.min(N-1,page-1));flip.turnToPage(N-1-n);current=n;update();history.replaceState(null,'',`#page=${n+1}`)}
function next(){if(current<N-1)flip.flipPrev('top')};function prev(){if(current>0)flip.flipNext('top')};
$('#next').onclick=next;$('#previous').onclick=prev;
$('#navigation').innerHTML=M.navigation.map(s=>`<a href="#page=${s.page}" data-page="${s.page}"><span>${M.esc(s.arabic)}<small>${M.esc(s.english)}</small></span><b>${s.page}</b></a>`).join('');
const drawer=$('#drawer');function closeDrawer(){drawer.hidden=true;$('#overview').setAttribute('aria-expanded','false');$('#overview').focus()};$('#overview').onclick=()=>{drawer.hidden=!drawer.hidden;$('#overview').setAttribute('aria-expanded',String(!drawer.hidden));if(!drawer.hidden)$('#close-drawer').focus()};$('#close-drawer').onclick=closeDrawer;
document.addEventListener('click',e=>{const link=e.target.closest('[data-page]');if(link){e.preventDefault();go(Number(link.dataset.page));if(!drawer.hidden)closeDrawer()};const button=e.target.closest('[data-media]');if(button){e.preventDefault();openMedia(button.dataset.media,button)}});
const dialog=$('#media-dialog');let backgroundAudio=null,resumeMusic=false,mediaItems=[],mediaIndex=0;
function openMedia(id,trigger){
 const m=M.media.get(id);if(!m)return;const alreadyOpen=dialog.open,filmRoom=$('#film-dialog');
 if(!alreadyOpen)returnFocus=filmRoom.open?$('#films'):(trigger||document.activeElement);
 if(filmRoom.open)filmRoom.close();
 const old=dialog.querySelector('video');if(old){old.pause();old.removeAttribute('src');old.load()}
 const v=m.type==='video';mediaItems=v?C.videos.filter(x=>!x.hidden).sort((a,b)=>a.sortOrder-b.sortOrder):M.pages[current].media.map(x=>M.media.get(x)).filter(x=>x?.type==='image');if(!mediaItems.some(x=>x.id===id))mediaItems=[m];mediaIndex=mediaItems.findIndex(x=>x.id===id);
 $('#media-content').classList.remove('zoomed');$('#zoom-photo').hidden=v;$('#zoom-photo').textContent='تكبير الصورة +';
 $('#media-content').innerHTML=`<p class="media-kicker">${v?'THE FILM ROOM · لحظات تتحرك':'CLOSER LOOK · تفاصيل من حكايتنا'}</p>`+(v?`<video controls playsinline preload="metadata" poster="${m.poster}" src="${m.optimizedPath}" aria-label="${M.esc(m.captionArabic)}"></video>`:`<img class="lightbox-photo" src="${m.optimizedPath}" alt="${M.esc(m.captionArabic)}">`)+`<div class="media-title"><h3>${M.esc(m.childNameArabic||m.captionArabic)}</h3><span class="media-count">${mediaIndex+1} / ${mediaItems.length}</span></div>${m.aiStatus==='verified'?'<small>محتوى إبداعي بالذكاء الاصطناعي · AI Creative Content</small>':''}`;
 $('#media-prev').disabled=mediaIndex===0;$('#media-next').disabled=mediaIndex>=mediaItems.length-1;$('#media-return').textContent=`العودة إلى صفحة ${current+1}`;
 $('#media-reel').innerHTML=v?mediaItems.map(x=>`<button data-media="${x.id}" aria-current="${x.id===id}" aria-label="${M.esc(x.captionArabic)}"><img loading="lazy" src="${x.poster}" alt=""></button>`).join(''):'';
 if(backgroundAudio&&!backgroundAudio.paused){backgroundAudio.pause();resumeMusic=true}
 if(!alreadyOpen)dialog.showModal();$('#close-media').focus();
 if(v&&trigger)dialog.querySelector('video').play().catch(()=>{});
}
$('#media-prev').onclick=()=>{if(mediaIndex>0)openMedia(mediaItems[mediaIndex-1].id,$('#media-prev'))};
$('#media-next').onclick=()=>{if(mediaIndex<mediaItems.length-1)openMedia(mediaItems[mediaIndex+1].id,$('#media-next'))};
$('#zoom-photo').onclick=()=>{const z=$('#media-content').classList.toggle('zoomed');$('#zoom-photo').textContent=z?'عرض الصورة كاملة −':'تكبير الصورة +'};
function closeMedia(){const v=dialog.querySelector('video');if(v){v.pause();v.removeAttribute('src');v.load()}dialog.close();$('#media-content').replaceChildren();$('#media-reel').replaceChildren();returnFocus?.focus();if(resumeMusic&&backgroundAudio){backgroundAudio.play().catch(()=>{});resumeMusic=false}}
$('#close-media').onclick=closeMedia;$('#media-return').onclick=closeMedia;dialog.addEventListener('cancel',e=>{e.preventDefault();closeMedia()});dialog.addEventListener('click',e=>{if(e.target===dialog)closeMedia()});
document.addEventListener('keydown',e=>{if(dialog.open||document.querySelector('#film-dialog').open)return;if(e.key==='Escape'&&!drawer.hidden){closeDrawer();return}if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowLeft'){e.preventDefault();next()}if(e.key==='ArrowRight'){e.preventDefault();prev()}});
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else document.body.classList.toggle('presentation')}catch{document.body.classList.toggle('presentation')}};
if(C.audio.enabled){backgroundAudio=new Audio(C.audio.path);backgroundAudio.loop=true;backgroundAudio.preload='none';$('#music').hidden=false;$('#music').onclick=()=>{if(backgroundAudio.paused)backgroundAudio.play().then(()=>{$('#music').textContent='Ⅱ';$('#music').setAttribute('aria-label','إيقاف الموسيقى')}).catch(()=>{$('#music').hidden=true});else{backgroundAudio.pause();$('#music').textContent='♫';$('#music').setAttribute('aria-label','تشغيل الموسيقى')}};backgroundAudio.addEventListener('error',()=>$('#music').hidden=true)}
function introDone(){$('#intro').hidden=true;try{sessionStorage.setItem('october-intro','1')}catch{}}$('#skip').onclick=introDone;try{if(sessionStorage.getItem('october-intro'))introDone();else introDone()}catch{setTimeout(introDone,1300)}
const params=new URLSearchParams(location.search),vid=params.get('video');const page=Number(location.hash.match(/page=(\d+)/)?.[1]||1);if(vid&&M.media.has(vid)){go(M.pages.findIndex(p=>p.media.includes(vid))+1);introDone();openMedia(vid)}else if(page>1)go(page);
window.addEventListener('hashchange',()=>{const n=Number(location.hash.match(/page=(\d+)/)?.[1]||1);go(n)});
window.magazineAPI={go,next,prev,openMedia,closeMedia,get current(){return current},pageCount:N,flip};
new ResizeObserver(()=>requestAnimationFrame(sizeContent)).observe(book);
})();


