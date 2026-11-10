(()=>{'use strict';
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)'),toggle=document.querySelector('.motion-toggle'),videos=[...document.querySelectorAll('video')];
let manualPause=false;try{manualPause=localStorage.getItem('jl-motion')==='paused'}catch{}
const paused=()=>reduce.matches||manualPause;
function loadVideo(v){const source=v.querySelector('source[data-src]');if(source){source.src=source.dataset.src;source.removeAttribute('data-src');v.load()}}
function sync(){root.classList.toggle('motion-paused',paused());if(toggle){toggle.textContent=reduce.matches?'Motion off · reduced motion':manualPause?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused()))}
videos.forEach(v=>{if(paused()||document.hidden||v.dataset.visible!=='true')v.pause();else if(!v.dataset.userPaused){loadVideo(v);v.muted=true;v.play().catch(()=>{})}});
if(paused())document.querySelectorAll('.parallax-item').forEach(e=>e.style.removeProperty('--parallax'))}
toggle?.addEventListener('click',()=>{if(reduce.matches)return;manualPause=!manualPause;try{localStorage.setItem('jl-motion',manualPause?'paused':'playing')}catch{}sync()});
reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
const vio=new IntersectionObserver(entries=>{entries.forEach(e=>{e.target.dataset.visible=String(e.isIntersecting)});sync()},{threshold:.25});videos.forEach(v=>{vio.observe(v);v.addEventListener('pointerdown',()=>{if(!v.paused)v.dataset.userPaused='true';else{delete v.dataset.userPaused;loadVideo(v)}});v.addEventListener('keydown',()=>loadVideo(v))});
sync();
let queued=false;addEventListener('scroll',()=>{if(queued||paused())return;queued=true;requestAnimationFrame(()=>{queued=false;document.querySelectorAll('.parallax-item').forEach(e=>e.style.setProperty('--parallax',Math.min(scrollY*.07,30)+'px'))})},{passive:true});
if(!reduce.matches&&'IntersectionObserver'in window){root.classList.add('js-motion');const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');obs.unobserve(e.target)}}),{threshold:.05});document.querySelectorAll('.project,.about-facts>div').forEach(e=>{e.classList.add('reveal','pending');obs.observe(e)})}
const links=[...document.querySelectorAll('nav a[href^="#"]')];const navObs=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -55% 0px',threshold:0});links.forEach(a=>{const el=document.querySelector(a.hash);if(el)navObs.observe(el)});
const box=document.querySelector('.lightbox');let previous=null;function close(){if(!box)return;box.hidden=true;document.body.style.overflow='';previous?.focus()}
document.querySelectorAll('.product-shot a, .image-preview').forEach(a=>a.addEventListener('click',e=>{if(!box)return;e.preventDefault();previous=a;box.querySelector('img').src=a.href;box.querySelector('img').alt=a.querySelector('img').alt;box.hidden=false;document.body.style.overflow='hidden';box.querySelector('button').focus()}));
box?.querySelector('button').addEventListener('click',close);box?.addEventListener('click',e=>{if(e.target===box)close()});box?.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){e.preventDefault();box.querySelector('button').focus()}});
})();