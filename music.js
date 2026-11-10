/* FLORAISON · "Petal to Petal" theme player (loops the Suno track) */
(function(){
  const me=document.currentScript&&document.currentScript.src||location.href;
  const SRC=new URL('audio/petal-to-petal.mp3',me).href;
  const css=`#fl-sound{position:fixed;right:18px;bottom:18px;z-index:80;display:flex;align-items:center;gap:10px;height:40px;padding:0 16px 0 14px;border-radius:20px;background:rgba(12,12,11,.78);color:#fbfaf7;border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(8px);font:400 10px/1 "Jost","Futura","Helvetica Neue",Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;cursor:pointer}
#fl-sound:hover{border-color:#fbfaf7}#fl-sound:focus-visible{outline:2px solid #fbfaf7;outline-offset:3px}
#fl-sound .eq{display:flex;gap:2px;align-items:flex-end;height:12px}#fl-sound .eq i{width:2px;height:3px;background:currentColor;border-radius:1px}
#fl-sound.on .eq i{animation:fleq .9s ease-in-out infinite}#fl-sound.on .eq i:nth-child(2){animation-delay:-.3s}#fl-sound.on .eq i:nth-child(3){animation-delay:-.6s}#fl-sound.on .eq i:nth-child(4){animation-delay:-.15s}
#fl-sound.wait .eq i{opacity:.4}
@keyframes fleq{0%,100%{height:3px}50%{height:12px}}
@media (prefers-reduced-motion:reduce){#fl-sound.on .eq i{animation:none;height:8px}}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  const b=document.createElement('button');b.id='fl-sound';b.type='button';b.setAttribute('aria-pressed','false');
  b.innerHTML='<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="tx">Sound · Petal to Petal</span>';
  document.body.appendChild(b);
  const tx=b.querySelector('.tx');
  let a=null,on=false,fade=null,wasOn=false;
  const TARGET=.8;
  function ramp(to,ms,done){
    cancelAnimationFrame(fade);const from=a.volume,t0=performance.now();
    const f=now=>{const k=Math.min(1,(now-t0)/ms);a.volume=from+(to-from)*k;if(k<1)fade=requestAnimationFrame(f);else done&&done()};fade=requestAnimationFrame(f);
  }
  function set(v){on=v;b.classList.toggle('on',v);b.setAttribute('aria-pressed',String(v));tx.textContent=v?'Sound on · Petal to Petal':'Sound · Petal to Petal'}
  b.addEventListener('click',async e=>{
    e.stopPropagation();
    if(!a){a=new Audio(SRC);a.loop=true;a.preload='auto';a.volume=0;
      a.addEventListener('waiting',()=>b.classList.add('wait'));a.addEventListener('playing',()=>b.classList.remove('wait'));}
    if(!on){
      try{a.volume=0;await a.play();set(true);ramp(TARGET,1800)}
      catch(err){tx.textContent='Tap again to play'}
    }else{set(false);ramp(0,900,()=>{if(!on)a.pause()})}
  });
  document.addEventListener('visibilitychange',()=>{if(!a)return;if(document.hidden){wasOn=on;if(on)a.pause()}else if(wasOn&&on){a.play().catch(()=>{})}});
})();
