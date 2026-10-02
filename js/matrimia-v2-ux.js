import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const sb=createClient("https://sctzockiurjsxzdkctmy.supabase.co","sb_publishable_hAZ4e_wz4f9R7wc4YdkbmQ_7HozQD9G");
const page=(location.pathname.split('/').pop()||'').toLowerCase();
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

function css(){
 const st=document.createElement('style');st.textContent=`
 .mia-v2-search{border:1px solid #dbe3ec;background:#fff;color:#183b66;border-radius:10px;padding:9px 12px;font-weight:800;cursor:pointer;white-space:nowrap}.mia-v2-search:hover{background:#f7f9fc}
 .mia-v2-modal{position:fixed;inset:0;background:#071a30a8;z-index:5000;display:none;align-items:flex-start;justify-content:center;padding:8vh 16px}.mia-v2-modal.open{display:flex}.mia-v2-panel{width:min(850px,96vw);max-height:82vh;overflow:auto;background:#fff;border-radius:18px;box-shadow:0 25px 80px #0005;padding:22px}.mia-v2-panel h2{margin:0 0 14px;color:#0d264c}.mia-v2-input{width:100%;box-sizing:border-box;padding:13px 15px;border:1px solid #ccd7e4;border-radius:11px;font-size:16px}.mia-v2-results{margin-top:14px}.mia-v2-result{display:block;padding:12px 14px;border:1px solid #e4eaf1;border-radius:11px;margin:8px 0;text-decoration:none;color:#1f2937;background:#fff}.mia-v2-result:hover{border-color:#9bb5d1;background:#f7f9fc}.mia-v2-result strong{color:#0d264c}.mia-v2-kind{font-size:11px;font-weight:900;color:#1e4e79;text-transform:uppercase;letter-spacing:.05em}.mia-v2-close{float:right;border:0;background:#eef3f8;border-radius:9px;padding:7px 10px;cursor:pointer}
 .mia-v2-adv{margin:12px 0;padding:12px;border:1px solid #e1e8f0;border-radius:13px;background:#f8fafc}.mia-v2-adv summary{cursor:pointer;font-weight:900;color:#183b66}.mia-v2-grid{display:grid;grid-template-columns:1fr 1fr auto auto;gap:9px;margin-top:10px}.mia-v2-grid input,.mia-v2-grid select,.mia-v2-grid button{min-height:39px;border:1px solid #ccd7e4;border-radius:9px;padding:7px 10px;background:#fff}.mia-v2-grid button{font-weight:800;color:#183b66;cursor:pointer}.mia-v2-saved{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.mia-v2-chip{border:1px solid #cfd9e5;background:#fff;border-radius:999px;padding:6px 10px;cursor:pointer;font-size:12px}
 .mia-v2-menu-btn{border:1px solid #d5dee8;background:#fff;border-radius:8px;padding:5px 9px;font-weight:900;cursor:pointer}.mia-v2-menu{position:fixed;z-index:4500;min-width:190px;background:#fff;border:1px solid #dce4ed;border-radius:12px;box-shadow:0 14px 40px #0d264c30;padding:6px}.mia-v2-menu button,.mia-v2-menu a{display:block;width:100%;box-sizing:border-box;text-align:left;border:0;background:#fff;color:#24364b;padding:10px;border-radius:8px;text-decoration:none;cursor:pointer;font-weight:700}.mia-v2-menu button:hover,.mia-v2-menu a:hover{background:#eef4fa}
 .mia-v2-duplicate{border:1px solid #cfd9e5;background:#fff;color:#183b66;border-radius:10px;padding:10px 14px;font-weight:900;cursor:pointer;margin-left:8px}.mia-v2-banner{padding:11px 14px;border-radius:11px;background:#fff7e6;border:1px solid #f5c46b;color:#7b4b00;margin:0 0 14px;font-weight:700}
 .mia-v2-timeline{margin-top:18px}.mia-v2-event{display:grid;grid-template-columns:145px 18px 1fr;gap:10px;align-items:start;padding:7px 0}.mia-v2-dot{width:10px;height:10px;border-radius:50%;background:#1e4e79;margin-top:5px}.mia-v2-event time{font-size:12px;color:#667085}.mia-v2-event strong{color:#0d264c}
 .mia-v2-today{margin:0 0 24px;padding:15px 18px;border:1px solid #dce5ee;border-radius:16px;background:#fff;box-shadow:0 7px 22px #0d264c0c}.mia-v2-today-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:11px}.mia-v2-today h2{margin:0;color:#0d264c;font-size:17px}.mia-v2-today-note{font-size:11px;color:#8a98aa}.mia-v2-cards{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:9px}.mia-v2-card{padding:10px 8px;border-radius:11px;background:#f7f9fc;border:1px solid #e3e9ef;text-align:center;transition:.15s ease}.mia-v2-card:hover{transform:translateY(-1px);border-color:#b9cadb;background:#fff}.mia-v2-card b{display:block;font-size:21px;color:#183b66;line-height:1.1}.mia-v2-card span{display:block;margin-top:5px;font-size:11px;color:#667085;font-weight:800;line-height:1.25}.mia-v2-card.has-value{background:#fff8ea;border-color:#f1cc84}.mia-v2-card.has-value b{color:#9a5d00}
 .mia-m-bulk{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 12px;margin:10px 0;background:#f8fafc;border:1px solid #dce5ee;border-radius:12px}.mia-m-bulk button,.mia-m-bulk select{border:1px solid #cfd9e5;background:#fff;color:#183b66;border-radius:9px;padding:8px 10px;font-weight:800;cursor:pointer}.mia-m-bulk .count{font-size:12px;color:#667085;font-weight:800;margin-right:auto}.mia-m-check{width:17px;height:17px;cursor:pointer}.mia-m-fav,.mia-m-center{position:relative;border:1px solid #dbe3ec;background:#fff;color:#183b66;border-radius:10px;padding:9px 11px;font-weight:850;cursor:pointer;white-space:nowrap}.mia-m-center{width:40px;padding:9px 8px}.mia-m-utility{position:static;z-index:auto;display:flex;align-items:center;justify-content:flex-end;gap:7px;margin-left:auto;min-width:0;padding:0}.mia-m-utility .mia-v2-search,.mia-m-utility .mia-m-fav,.mia-m-utility .mia-m-center{box-shadow:none;margin:0;flex:0 0 auto}.mia-m-utility .mia-m-fav{font-size:0;width:40px;height:40px;padding:0}.mia-m-utility .mia-m-fav:after{content:'★';font-size:17px}.mia-m-utility .mia-v2-search{font-size:0;width:40px;height:40px;padding:0}.mia-m-utility .mia-v2-search:after{content:'⌕';font-size:21px;line-height:1}.mia-m-utility .mia-m-center{width:40px;height:40px;padding:0}.mia-m-note-box,.mia-v2-timeline{clear:both;width:100%;box-sizing:border-box;padding:20px 22px!important;margin:18px 0 0!important}.mia-m-note-box h2,.mia-v2-timeline h2{margin:0 0 4px!important;line-height:1.25}.mia-m-note-box>p,.mia-v2-timeline>p{margin:0 0 12px!important;line-height:1.4}.mia-m-note-box textarea{display:block;margin-top:10px}.mia-m-note-box button{display:inline-flex}.mia-m-injected-stack{display:block;width:100%;clear:both}.mia-m-injected-stack>section:first-child{margin-top:18px!important}@media(max-width:1180px){.mia-m-utility{gap:5px}.mia-m-utility .mia-m-fav,.mia-m-utility .mia-m-center,.mia-m-utility .mia-v2-search{width:36px;height:36px}}@media(max-width:800px){.mia-m-utility{width:auto;flex-wrap:nowrap}.mia-m-note-box,.mia-v2-timeline{padding:16px!important}}.mia-m-badge{position:absolute;right:-5px;top:-6px;background:#c2410c;color:#fff;border-radius:999px;min-width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;padding:0 3px}.mia-m-note{border:1px solid #e1e8f0;border-radius:12px;padding:11px 12px;margin:8px 0;background:#fff}.mia-m-note small{color:#667085}.mia-m-note p{margin:5px 0 0;white-space:pre-wrap}.mia-m-note-box textarea{width:100%;box-sizing:border-box;min-height:82px;border:1px solid #ccd7e4;border-radius:10px;padding:10px;resize:vertical}.mia-m-note-box button{margin-top:8px;border:0;border-radius:9px;padding:9px 13px;background:#183b66;color:#fff;font-weight:900;cursor:pointer}.mia-m-star{display:inline-flex;align-items:center;justify-content:center;border:1px solid #d5dee8;background:#fff;color:#8a98aa;border-radius:9px;width:34px;height:34px;padding:0;font-size:18px;font-weight:900;cursor:pointer;margin-left:9px;vertical-align:middle}.mia-m-star.on{color:#b7791f;background:#fff8e7;border-color:#f0cc80}.mia-m-detail-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.mia-m-more{position:relative}.mia-m-more-btn{border:1px solid #cfd9e5;background:#fff;color:#183b66;border-radius:10px;padding:10px 14px;font-weight:900;cursor:pointer}.mia-m-more-menu{display:none;position:absolute;right:0;top:calc(100% + 6px);z-index:4300;min-width:205px;background:#fff;border:1px solid #dce4ed;border-radius:12px;box-shadow:0 14px 40px #0d264c30;padding:6px}.mia-m-more.open .mia-m-more-menu{display:block}.mia-m-more-menu button{display:block;width:100%;border:0;background:#fff;color:#24364b;text-align:left;padding:10px;border-radius:8px;font-weight:750;cursor:pointer}.mia-m-more-menu button:hover{background:#eef4fa}.mia-m-more-menu .danger{color:#b42318}.mia-m-section-title{margin:18px 0 8px;color:#0d264c}.mia-m-list a{display:block;padding:10px 11px;border:1px solid #e4eaf1;border-radius:10px;margin:7px 0;text-decoration:none;color:#24364b}.mia-m-list a:hover{background:#f7f9fc}.mia-m-list small{display:block;color:#667085;margin-top:3px}
 @media(max-width:1100px){.mia-v2-cards{grid-template-columns:repeat(3,1fr)}}@media(max-width:850px){.mia-v2-grid{grid-template-columns:1fr}.mia-v2-cards{grid-template-columns:repeat(2,1fr)}.mia-m-utility{right:12px;top:8px}.mia-m-utility .mia-m-fav{display:none}.mia-m-utility .mia-v2-search{font-size:0;width:40px;padding:9px}.mia-m-utility .mia-v2-search::first-letter{font-size:16px}.mia-m-detail-actions{gap:6px}}`;
 document.head.appendChild(st);
}

async function session(){const {data:{session}}=await sb.auth.getSession();return session;}

function globalSearch(){
 if(['login.html','index.html','autista.html','viaggio-autista.html','superadmin.html'].includes(page))return;
 const btn=document.createElement('button');btn.className='mia-v2-search';btn.type='button';btn.textContent='⌕  Cerca in MatRi-mIA';document.body.appendChild(btn);
 const modal=document.createElement('div');modal.className='mia-v2-modal';modal.innerHTML=`<div class="mia-v2-panel"><button class="mia-v2-close">✕</button><h2>Ricerca globale</h2><input class="mia-v2-input" type="search" placeholder="Numero, cliente, tratta, targa, autista..."><div class="mia-v2-results"><div style="color:#667085;padding:14px">Scrivi almeno 2 caratteri.</div></div></div>`;document.body.appendChild(modal);
 const input=$('.mia-v2-input',modal),out=$('.mia-v2-results',modal);let timer;
 btn.onclick=()=>{modal.classList.add('open');setTimeout(()=>input.focus(),50)};$('.mia-v2-close',modal).onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
 input.oninput=()=>{clearTimeout(timer);timer=setTimeout(()=>searchAll(input.value.trim(),out),260)};
}
async function searchAll(q,out){
 if(q.length<2){out.innerHTML='<div style="color:#667085;padding:14px">Scrivi almeno 2 caratteri.</div>';return}
 out.innerHTML='<div style="padding:14px">Ricerca...</div>';const term=`%${q}%`;
 const defs=[
 ['Pratica','pratiche','id,numero_pratica,cliente,partenza,destinazione',`numero_pratica.ilike.${term},cliente.ilike.${term},partenza.ilike.${term},destinazione.ilike.${term}`,'dettaglio-pratica.html'],
 ['Preventivo','preventivi','id,numero_preventivo,cliente,partenza,destinazione',`numero_preventivo.ilike.${term},cliente.ilike.${term},partenza.ilike.${term},destinazione.ilike.${term}`,'dettaglio-preventivo.html'],
 ['Viaggio','viaggi','id,numero_viaggio,vettore,autista,targa_trattore',`numero_viaggio.ilike.${term},vettore.ilike.${term},autista.ilike.${term},targa_trattore.ilike.${term}`,'dettaglio-viaggio.html'],
 ['Anagrafica','anagrafiche','id,ragione_sociale,email,telefono',`ragione_sociale.ilike.${term},email.ilike.${term},telefono.ilike.${term}`,'dettaglio-anagrafica.html'],
 ['Autista','autisti','id,nome,cognome,email,telefono',`nome.ilike.${term},cognome.ilike.${term},email.ilike.${term},telefono.ilike.${term}`,'dettaglio-autista.html'],
 ['Mezzo','mezzi','id,targa,marca,modello',`targa.ilike.${term},marca.ilike.${term},modello.ilike.${term}`,'dettaglio-mezzo.html'],
 ['Ricorrenza','ricorrenze_trasporti','id,nome,cliente,partenza,destinazione',`nome.ilike.${term},cliente.ilike.${term},partenza.ilike.${term},destinazione.ilike.${term}`,'ricorrenze.html']];
 const rs=await Promise.all(defs.map(async d=>{try{const {data,error}=await sb.from(d[1]).select(d[2]).or(d[3]).limit(6);return error?[]:(data||[]).map(x=>({d,x}))}catch{return []}}));
 const rows=rs.flat();if(!rows.length){out.innerHTML='<div style="padding:14px;color:#667085">Nessun risultato.</div>';return}
 out.innerHTML=rows.map(({d,x})=>{const title=x.numero_pratica||x.numero_preventivo||x.numero_viaggio||x.nome||x.ragione_sociale||[x.nome,x.cognome].filter(Boolean).join(' ')||x.targa||'Risultato';const sub=[x.cliente,x.partenza&&x.destinazione?`${x.partenza} → ${x.destinazione}`:null,x.vettore,x.autista,x.targa_trattore,x.marca,x.modello,x.email].filter(Boolean).join(' · ');return `<a class="mia-v2-result" href="${d[4]}?id=${encodeURIComponent(x.id)}"><span class="mia-v2-kind">${d[0]}</span><br><strong>${esc(title)}</strong>${sub?`<div>${esc(sub)}</div>`:''}</a>`}).join('');
}

function advancedFilters(){
 const configs={
  'pratiche.html':{table:'table',search:null,status:'operationalStatusFilter'},
  'preventivi.html':{table:'table',search:'search',status:'state'},
  'viaggi.html':{table:'tripsTable',search:null,status:'statusFilter'}
 };const cfg=configs[page];if(!cfg)return;
 const table=document.getElementById(cfg.table)||$('table');if(!table)return;const wrap=table.closest('.card')||table.parentElement;
 const d=document.createElement('details');d.className='mia-v2-adv';d.innerHTML=`<summary>Filtri avanzati e viste salvate</summary><div class="mia-v2-grid"><input data-v2="contains" placeholder="Contiene: cliente, tratta, numero..."><input data-v2="date" type="date" title="Data visibile nella riga"><button data-v2="save">Salva vista</button><button data-v2="clear">Azzera</button></div><div class="mia-v2-saved"></div>`;wrap.insertBefore(d,table.parentElement===wrap?table:wrap.firstChild);
 const contains=$('[data-v2="contains"]',d),date=$('[data-v2="date"]',d),saved=$('.mia-v2-saved',d),key=`matrimia.savedFilters.${page}`;
 function apply(){const q=contains.value.trim().toLowerCase(),dt=date.value?date.value.split('-').reverse().join('/'):'';$$('tbody tr',table).forEach(r=>{const tx=r.innerText.toLowerCase();r.style.display=(!q||tx.includes(q))&&(!dt||tx.includes(dt)||tx.includes(date.value))?'':'none'})}
 contains.oninput=apply;date.onchange=apply;
 function views(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
 function draw(){saved.innerHTML=views().map((v,i)=>`<button class="mia-v2-chip" data-i="${i}">${esc(v.name)}</button>`).join('');$$('.mia-v2-chip',saved).forEach(b=>b.onclick=()=>{const v=views()[+b.dataset.i];contains.value=v.contains||'';date.value=v.date||'';if(cfg.search&&document.getElementById(cfg.search)){document.getElementById(cfg.search).value=v.search||'';document.getElementById(cfg.search).dispatchEvent(new Event('input'))}if(cfg.status&&document.getElementById(cfg.status)){document.getElementById(cfg.status).value=v.status||'';document.getElementById(cfg.status).dispatchEvent(new Event('change'))}apply()})}
 $('[data-v2="save"]',d).onclick=()=>{const name=prompt('Nome della vista salvata:');if(!name)return;const arr=views();arr.push({name,contains:contains.value,date:date.value,search:cfg.search?document.getElementById(cfg.search)?.value:'',status:cfg.status?document.getElementById(cfg.status)?.value:''});localStorage.setItem(key,JSON.stringify(arr.slice(-8)));cloudSavePrefs();draw()};
 $('[data-v2="clear"]',d).onclick=()=>{contains.value='';date.value='';if(cfg.search&&document.getElementById(cfg.search)){document.getElementById(cfg.search).value='';document.getElementById(cfg.search).dispatchEvent(new Event('input'))}if(cfg.status&&document.getElementById(cfg.status)){document.getElementById(cfg.status).value='';document.getElementById(cfg.status).dispatchEvent(new Event('change'))}apply()};draw();
 const qp=new URLSearchParams(location.search);if(qp.get('v2date'))date.value=qp.get('v2date');if(qp.get('v2q'))contains.value=qp.get('v2q');if(qp.get('v2status')&&cfg.status&&document.getElementById(cfg.status)){document.getElementById(cfg.status).value=qp.get('v2status');document.getElementById(cfg.status).dispatchEvent(new Event('change'))}setTimeout(apply,250);document.addEventListener('matrimia:uxprefs',()=>{draw();apply()},{once:true});
 const obs=new MutationObserver(()=>apply());const body=$('tbody',table);if(body)obs.observe(body,{childList:true,subtree:true});
}

function rowActions(){
 const defs={'pratiche.html':['dettaglio-pratica.html','nuova-pratica.html'],'preventivi.html':['dettaglio-preventivo.html','nuovo-preventivo.html'],'viaggi.html':['dettaglio-viaggio.html','nuovo-viaggio.html']};const def=defs[page];if(!def)return;const table=$('table');if(!table)return;
 const add=()=>{$$('tbody tr',table).forEach(r=>{if(r.querySelector('.mia-v2-menu-btn'))return;const id=r.dataset.id||r.getAttribute('data-id');if(!id)return;let cell=document.createElement('td');const b=document.createElement('button');b.type='button';b.className='mia-v2-menu-btn';b.textContent='⋯';b.onclick=e=>{e.preventDefault();e.stopPropagation();openMenu(b,id,def)};cell.appendChild(b);r.appendChild(cell)});const hr=$('thead tr',table);if(hr&&!hr.querySelector('[data-v2-actions]')){const th=document.createElement('th');th.dataset.v2Actions='1';th.textContent='Azioni';hr.appendChild(th)}};add();new MutationObserver(add).observe($('tbody',table),{childList:true,subtree:true});
}
function openMenu(btn,id,def){$('.mia-v2-menu')?.remove();const m=document.createElement('div');m.className='mia-v2-menu';m.innerHTML=`<a href="${def[0]}?id=${encodeURIComponent(id)}">Apri dettaglio</a><a href="${def[1]}?duplica_da=${encodeURIComponent(id)}">Duplica</a><a href="${def[1]}?duplica_da=${encodeURIComponent(id)}&origine=precedente">Crea da precedente</a>`;document.body.appendChild(m);const r=btn.getBoundingClientRect();m.style.left=Math.min(r.left,innerWidth-210)+'px';m.style.top=Math.min(r.bottom+5,innerHeight-120)+'px';setTimeout(()=>document.addEventListener('click',()=>m.remove(),{once:true}),0)}

function duplicateDetail(){
 const defs={'dettaglio-pratica.html':'nuova-pratica.html','dettaglio-preventivo.html':'nuovo-preventivo.html','dettaglio-viaggio.html':'nuovo-viaggio.html'};const target=defs[page];if(!target)return;const id=new URLSearchParams(location.search).get('id');if(!id)return;
 const host=$('.actions')||$('.heading')||$('h1')?.parentElement;if(!host)return;const b=document.createElement('button');b.type='button';b.className='mia-v2-duplicate';b.textContent='⧉ Duplica';b.onclick=()=>location.href=`${target}?duplica_da=${encodeURIComponent(id)}`;host.appendChild(b);
}

async function waitForDuplicateForm(data){
 const deadline=Date.now()+7000;
 while(Date.now()<deadline){
   const baseReady=page==='nuova-pratica.html'?document.getElementById('cliente')&&document.getElementById('partenza'):
     page==='nuovo-preventivo.html'?document.getElementById('cliente')&&document.getElementById('partenza'):
     document.getElementById('practiceSelect');
   let selectsReady=true;
   if(page==='nuova-pratica.html'){
     if(data.cliente_id) selectsReady=!!document.querySelector(`#clienteSelect option[value="${CSS.escape(String(data.cliente_id))}"]`);
     if(selectsReady&&data.vettore_id) selectsReady=!!document.querySelector(`#vettoreSelect option[value="${CSS.escape(String(data.vettore_id))}"]`);
   }
   if(baseReady&&selectsReady)return true;
   await sleep(150);
 }
 return false;
}
function setDuplicateField(id,value){
 const el=document.getElementById(id);if(!el||value===null||value===undefined)return;
 if(el.type==='checkbox')el.checked=!!value;else el.value=value;
 el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));
}
async function duplicatePrefill(){
 const id=new URLSearchParams(location.search).get('duplica_da');
 if(!id)return;
 const defs={'nuova-pratica.html':['pratiche','Pratica'],'nuovo-preventivo.html':['preventivi','Preventivo'],'nuovo-viaggio.html':['viaggi','Viaggio']};
 const def=defs[page]; if(!def)return;
 const {data,error}=await sb.from(def[0]).select('*').eq('id',id).single();
 if(error||!data){console.error('MatRi-mIA Duplica: sorgente non caricata',error);return;}

 const banner=document.createElement('div');
 banner.className='mia-v2-banner';
 banner.textContent=`Stai creando un nuovo elemento duplicando ${def[1].toLowerCase()} ${data.numero_pratica||data.numero_preventivo||data.numero_viaggio||''}. Controlla i dati prima di salvare.`;
 const main=$('main')||$('.main')||$('.content')||document.body;
 main.insertBefore(banner,main.firstChild);

 const waitFor=async(test,timeout=8000)=>{const start=Date.now();while(Date.now()-start<timeout){try{if(test())return true}catch{}await sleep(100)}return false};
 const setValue=(id,value)=>{const el=document.getElementById(id);if(!el||value==null)return false;if(el.type==='checkbox')el.checked=!!value;else el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true};
 const setSelect=async(id,value)=>{if(!value)return false;const ok=await waitFor(()=>{const el=document.getElementById(id);return el&&[...el.options].some(o=>String(o.value)===String(value))});if(!ok)return false;return setValue(id,String(value))};

 if(page==='nuova-pratica.html'){
   // Aspetta il caricamento reale delle anagrafiche e usa i SELECT: così vengono aggiornati anche selectedClienteId/selectedVettoreId della pagina.
   await waitFor(()=>document.getElementById('clienteSelect')?.options?.length>1);
   if(data.cliente_id) await setSelect('clienteSelect',data.cliente_id); else setValue('cliente',data.cliente);
   if(data.vettore_id) await setSelect('vettoreSelect',data.vettore_id); else setValue('vettore',data.vettore);
   const map={ritiro:'ritiro',consegna:'consegna',partenza:'partenza',destinazione:'destinazione',indirizzo_ritiro:'indirizzoRitiro',cap_ritiro:'capRitiro',nazione_ritiro:'nazioneRitiro',indirizzo_consegna:'indirizzoConsegna',cap_consegna:'capConsegna',nazione_consegna:'nazioneConsegna',tipo_merce:'tipoMerce',colli:'colli',peso_kg:'peso',volume_m3:'volume',note:'note'};
   for(const [col,dom] of Object.entries(map))setValue(dom,data[col]);
 }

 if(page==='nuovo-preventivo.html'){
   await waitFor(()=>document.getElementById('clientiList'));
   const map={cliente:'cliente',partenza:'partenza',destinazione:'destinazione',indirizzo_ritiro:'indirizzoRitiro',cap_ritiro:'capRitiro',indirizzo_consegna:'indirizzoConsegna',cap_consegna:'capConsegna',tipo_merce:'tipoMerce',colli:'colli',peso_kg:'peso',volume_m3:'volume',km_tratta:'kmTratta',ritorno_vuoto:'ritornoVuoto',minuti_operazioni:'minutiOperazioni',pedaggi:'pedaggi',altri_costi:'altri',margine_percentuale:'margine',trattamento_iva:'trattamentoIva',condizioni:'condizioni',note:'note'};
   for(const [col,dom] of Object.entries(map))setValue(dom,data[col]);
   setValue('prezzoFinale','');
   document.getElementById('cliente')?.dispatchEvent(new Event('change',{bubbles:true}));
 }

 if(page==='nuovo-viaggio.html'){
   // Aspetta che pratiche, vettori, mezzi e autisti siano stati caricati dalla pagina nativa.
   await waitFor(()=>document.getElementById('practiceSelect')?.options?.length>1);
   // La pratica originale può già avere un viaggio (vincolo 1 viaggio/pratica): la mostriamo solo se selezionabile, altrimenti l'operatore ne sceglie una nuova.
   if(data.pratica_id) await setSelect('practiceSelect',data.pratica_id);
   if(data.vettore_id) await setSelect('vettoreSelect',data.vettore_id); else setValue('vettore',data.vettore);
   if(data.mezzo_id) await setSelect('mezzoSelect',data.mezzo_id);
   if(data.autista_id) await setSelect('autistaSelect',data.autista_id);
   const map={targa_trattore:'targaTrattore',targa_rimorchio:'targaRimorchio',km_previsti:'kmPrevisti',ritorno_vuoto:'ritornoVuoto',tempo_operazioni_ore:'tempoOperazioni',ore_autista_previste:'oreAutista',consumo_km_l:'consumoViaggio',prezzo_carburante_l:'prezzoCarburante',note:'note'};
   for(const [col,dom] of Object.entries(map))setValue(dom,data[col]);
   setValue('dataPartenza',''); setValue('dataArrivo',''); setValue('stato','PROGRAMMATO');
 }
}

async function timeline(){
 if(page!=='dettaglio-pratica.html')return;const id=new URLSearchParams(location.search).get('id');if(!id)return;await sleep(1000);
 const [p,v,d,pr]=await Promise.all([sb.from('pratiche').select('id,numero_pratica,created_at,updated_at,stato_operativo,ricorrenza_id,ricorrenza_data_prevista').eq('id',id).single(),sb.from('viaggi').select('id,numero_viaggio,stato,created_at,updated_at,chiuso_at').eq('pratica_id',id).order('created_at'),sb.from('documenti').select('id,nome_file,tipo,created_at,origine').eq('pratica_id',id).order('created_at'),sb.from('preventivi').select('id,numero_preventivo,stato,created_at,updated_at').eq('pratica_id',id).order('created_at')]);
 const events=[];if(p.data){events.push([p.data.created_at,p.data.ricorrenza_id?'Pratica generata automaticamente':'Pratica creata',p.data.ricorrenza_id?`${p.data.numero_pratica||''} · Ricorrenza del ${p.data.ricorrenza_data_prevista?new Date(p.data.ricorrenza_data_prevista+'T12:00:00').toLocaleDateString('it-IT'):''}`:(p.data.numero_pratica||'')]);if(p.data.updated_at&&p.data.updated_at!==p.data.created_at)events.push([p.data.updated_at,'Pratica aggiornata',p.data.stato_operativo||''])}(pr.data||[]).forEach(x=>events.push([x.created_at,'Preventivo collegato',`${x.numero_preventivo||''} · ${x.stato||''}`]));(v.data||[]).forEach(x=>{events.push([x.created_at,'Viaggio programmato',`${x.numero_viaggio||''} · ${x.stato||''}`]);if(x.chiuso_at)events.push([x.chiuso_at,'Viaggio chiuso',x.numero_viaggio||''])});(d.data||[]).forEach(x=>events.push([x.created_at,'Documento aggiunto',`${x.tipo||'Documento'} · ${x.nome_file||''}${x.origine?` · ${x.origine}`:''}`]));events.sort((a,b)=>new Date(a[0])-new Date(b[0]));
 const sec=document.createElement('section');sec.className='card mia-v2-timeline';sec.innerHTML=`<h2>Timeline della pratica</h2><p style="color:#667085">Cronologia sintetica ricostruita dagli elementi collegati alla pratica.</p>${events.length?events.map(e=>`<div class="mia-v2-event"><time>${new Date(e[0]).toLocaleString('it-IT')}</time><span class="mia-v2-dot"></span><div><strong>${esc(e[1])}</strong><div>${esc(e[2])}</div></div></div>`).join(''):'<p>Nessun evento disponibile.</p>'}`;
 const main=$('main')||$('.main-content')||$('.content')||document.body;let stack=$('.mia-m-injected-stack',main);if(!stack){stack=document.createElement('div');stack.className='mia-m-injected-stack';const footer=$('footer',main);footer?main.insertBefore(stack,footer):main.appendChild(stack)}stack.appendChild(sec);
}

async function todayDashboard(){
 if(page!=='dashboard.html')return;await sleep(700);const now=new Date(),ymd=now.toISOString().slice(0,10);const [v,p,pr,docs]=await Promise.all([sb.from('viaggi').select('id,pratica_id,data_partenza,data_arrivo,stato'),sb.from('pratiche').select('id,stato_operativo'),sb.from('preventivi').select('id,stato'),sb.from('documenti').select('id,pratica_id,tipo')]);
 const same=x=>x&&String(x).slice(0,10)===ymd;const vi=v.data||[],pa=p.data||[],pv=pr.data||[],dd=docs.data||[];const docPractice=new Set(dd.filter(x=>['POD','DDT','CMR'].includes(String(x.tipo||'').toUpperCase())).map(x=>String(x.pratica_id||'')));const missing=vi.filter(x=>['CONSEGNATO','COMPLETATO'].includes(String(x.stato||'').toUpperCase())&&x.pratica_id&&!docPractice.has(String(x.pratica_id))).length;
 const vals=[['Partenze oggi',vi.filter(x=>same(x.data_partenza)).length,`viaggi.html?v2date=${ymd}`],['Arrivi oggi',vi.filter(x=>same(x.data_arrivo)).length,`viaggi.html?v2date=${ymd}`],['Da programmare',pa.filter(x=>['BOZZA','DA_PROGRAMMARE'].includes(String(x.stato_operativo||'').toUpperCase())).length,'pratiche.html?v2status=DA_PROGRAMMARE'],['Viaggi in corso',vi.filter(x=>String(x.stato||'').toUpperCase()==='IN CORSO').length,'viaggi.html?v2status=IN%20CORSO'],['Preventivi da seguire',pv.filter(x=>['DA_INVIARE','INVIATO'].includes(String(x.stato||'').toUpperCase())).length,'preventivi.html'],['Consegne senza POD/DDT/CMR',missing,'viaggi.html']];
 const box=document.createElement('section');box.className='mia-v2-today';box.innerHTML=`<div class="mia-v2-today-head"><h2>Oggi · ${now.toLocaleDateString('it-IT',{day:'2-digit',month:'long'})}</h2><span class="mia-v2-today-note">Attività operative da controllare</span></div><div class="mia-v2-cards">${vals.map(x=>`<a href="${x[2]}" class="mia-v2-card ${x[1]>0?'has-value':''}" style="text-decoration:none"><b>${x[1]}</b><span>${x[0]}</span></a>`).join('')}</div>`;const guide=$('.beta-guide-card');if(guide)guide.insertAdjacentElement('afterend',box);else{const heading=$('.heading')||$('.page-header')||$('h1')?.parentElement;heading?.insertAdjacentElement('afterend',box);}
}



function tableInfo(){
 const map={
  'pratiche.html':{table:'table',states:['BOZZA','DA_PROGRAMMARE','PROGRAMMATA','IN_CORSO','CONSEGNATA','CHIUSA'],db:'pratiche',field:'stato_operativo'},
  'viaggi.html':{table:'tripsTable',states:['PROGRAMMATO','IN CORSO','CONSEGNATO','ANNULLATO'],db:'viaggi',field:'stato'},
  'preventivi.html':{table:'table',states:['BOZZA','DA_INVIARE','INVIATO','ACCETTATO','RIFIUTATO','ANNULLATO'],db:'preventivi',field:'stato'}
 };return map[page]||null;
}
function csvCell(v){v=String(v??'').replace(/\s+/g,' ').trim();return /[;"\n]/.test(v)?'"'+v.replaceAll('"','""')+'"':v}
function visibleTableData(table,onlySelected=false){
 const headers=$$('thead th',table).map(x=>x.innerText.trim()).filter(x=>x!=='Azioni');
 const rows=$$('tbody tr',table).filter(r=>r.style.display!=='none'&&(!onlySelected||r.querySelector('.mia-m-check')?.checked)).map(r=>$$('td',r).filter(td=>!td.querySelector('.mia-v2-menu-btn')).map(td=>td.innerText.trim()));
 return {headers,rows};
}
function downloadBlob(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)}
function exportCsv(table,selected=false){const d=visibleTableData(table,selected),txt='\ufeff'+[d.headers,...d.rows].map(r=>r.map(csvCell).join(';')).join('\r\n');downloadBlob(`matrimia-${page.replace('.html','')}-${new Date().toISOString().slice(0,10)}.csv`,new Blob([txt],{type:'text/csv;charset=utf-8'}))}
function exportExcel(table,selected=false){const d=visibleTableData(table,selected),escXml=x=>String(x??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));const rows=[d.headers,...d.rows].map(r=>'<Row>'+r.map(v=>`<Cell><Data ss:Type="String">${escXml(v)}</Data></Cell>`).join('')+'</Row>').join('');const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Dati"><Table>${rows}</Table></Worksheet></Workbook>`;downloadBlob(`matrimia-${page.replace('.html','')}-${new Date().toISOString().slice(0,10)}.xls`,new Blob([xml],{type:'application/vnd.ms-excel'}))}
function bulkOperations(){
 const cfg=tableInfo();if(!cfg)return;const table=document.getElementById(cfg.table)||$('table');if(!table)return;
 const bar=document.createElement('div');bar.className='mia-m-bulk';bar.innerHTML=`<span class="count">0 selezionati</span><select data-m="state"><option value="">Cambia stato…</option>${cfg.states.map(x=>`<option value="${x}">${x.replaceAll('_',' ')}</option>`).join('')}</select><button data-m="apply">Applica stato</button><button data-m="csv">CSV</button><button data-m="xls">Excel</button>`;const wrap=table.closest('.card')||table.parentElement;table.parentElement===wrap?wrap.insertBefore(bar,table):wrap.insertBefore(bar,wrap.firstChild);
 function decorate(){const hr=$('thead tr',table);if(hr&&!hr.querySelector('[data-m-select]')){const th=document.createElement('th');th.dataset.mSelect='1';th.innerHTML='<input class="mia-m-check" type="checkbox" title="Seleziona tutti">';hr.insertBefore(th,hr.firstChild);th.querySelector('input').onchange=e=>{$$('tbody .mia-m-check',table).forEach(c=>{if(c.closest('tr').style.display!=='none')c.checked=e.target.checked});count()}}
  $$('tbody tr',table).forEach(r=>{if(r.querySelector('.mia-m-check'))return;const td=document.createElement('td');td.innerHTML='<input class="mia-m-check" type="checkbox" aria-label="Seleziona record">';td.onclick=e=>e.stopPropagation();td.querySelector('input').onchange=count;r.insertBefore(td,r.firstChild)});count()}
 function count(){const n=$$('tbody .mia-m-check:checked',table).length;$('.count',bar).textContent=`${n} selezionat${n===1?'o':'i'}`}
 decorate();new MutationObserver(decorate).observe($('tbody',table),{childList:true,subtree:true});
 $('[data-m="csv"]',bar).onclick=()=>exportCsv(table,$$('tbody .mia-m-check:checked',table).length>0);$('[data-m="xls"]',bar).onclick=()=>exportExcel(table,$$('tbody .mia-m-check:checked',table).length>0);
 $('[data-m="apply"]',bar).onclick=async()=>{const ids=$$('tbody tr',table).filter(r=>r.querySelector('.mia-m-check')?.checked).map(r=>r.dataset.id).filter(Boolean),state=$('[data-m="state"]',bar).value;if(!ids.length)return alert('Seleziona almeno un record.');if(!state)return alert('Scegli lo stato da applicare.');if(page==='viaggi.html'){const {data:locked,error:lockErr}=await sb.from('viaggi').select('id,numero_viaggio,chiuso').in('id',ids);if(lockErr)return alert('Verifica viaggi non riuscita: '+lockErr.message);const closed=(locked||[]).filter(x=>x.chiuso);if(closed.length)return alert('Operazione bloccata: '+closed.length+' viaggio/i selezionato/i risultano chiusi. Riaprili dal dettaglio prima di modificarli.')}if(!confirm(`Aggiornare ${ids.length} record a “${state.replaceAll('_',' ')}”?`))return;const {error}=await sb.from(cfg.db).update({[cfg.field]:state}).in('id',ids);if(error)return alert('Aggiornamento non riuscito: '+error.message);location.reload()};
}


function genericExports(){
 if(!['anagrafiche.html','autisti.html','flotta.html'].includes(page))return;const table=$('table');if(!table)return;const bar=document.createElement('div');bar.className='mia-m-bulk';bar.innerHTML='<span class="count">Esporta elenco</span><button data-m="gcsv">CSV</button><button data-m="gxls">Excel</button>';const wrap=table.closest('.table-card')||table.closest('.card')||table.parentElement;wrap.insertBefore(bar,wrap.firstChild);$('[data-m="gcsv"]',bar).onclick=()=>exportCsv(table,false);$('[data-m="gxls"]',bar).onclick=()=>exportExcel(table,false);
}

function currentEntity(){const id=new URLSearchParams(location.search).get('id');const map={'dettaglio-pratica.html':['Pratica','dettaglio-pratica.html'],'dettaglio-preventivo.html':['Preventivo','dettaglio-preventivo.html'],'dettaglio-viaggio.html':['Viaggio','dettaglio-viaggio.html'],'dettaglio-anagrafica.html':['Anagrafica','dettaglio-anagrafica.html'],'dettaglio-autista.html':['Autista','dettaglio-autista.html'],'dettaglio-mezzo.html':['Mezzo','dettaglio-mezzo.html']};return id&&map[page]?{id,type:map[page][0],url:`${map[page][1]}?id=${encodeURIComponent(id)}`} : null}
function favRecent(){
 if(['login.html','index.html','autista.html','viaggio-autista.html','superadmin.html'].includes(page))return;const ent=currentEntity(),rkey='matrimia.recent.v1',fkey='matrimia.favorites.v1';const get=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch{return []}},put=(k,v)=>{localStorage.setItem(k,JSON.stringify(v.slice(0,20)));cloudSavePrefs()};
 if(ent){const label=(document.querySelector('h1')?.innerText||ent.type).trim();let r=get(rkey).filter(x=>x.url!==ent.url);r.unshift({...ent,label,at:Date.now()});put(rkey,r)}
 const btn=document.createElement('button');btn.className='mia-m-fav';btn.textContent='★ Preferiti / Recenti';btn.title='Preferiti e recenti';btn.setAttribute('aria-label','Preferiti e recenti');document.body.appendChild(btn);btn.onclick=()=>openFR();
 if(ent){const h1=$('h1');const host=h1?.parentElement||$('.actions')||$('.heading');if(host){const st=document.createElement('button');st.className='mia-m-star';st.type='button';const draw=()=>{const on=get(fkey).some(x=>x.url===ent.url);st.classList.toggle('on',on);st.textContent=on?'★':'☆';st.title=on?'Rimuovi dai preferiti':'Aggiungi ai preferiti';st.setAttribute('aria-label',st.title)};draw();st.onclick=()=>{let f=get(fkey),i=f.findIndex(x=>x.url===ent.url);if(i>=0)f.splice(i,1);else f.unshift({...ent,label:(document.querySelector('h1')?.innerText||ent.type).trim(),at:Date.now()});put(fkey,f);draw()};h1?h1.insertAdjacentElement('afterend',st):host.appendChild(st)}}
 function openFR(){let modal=document.createElement('div');modal.className='mia-v2-modal open';const fav=get(fkey),rec=get(rkey);const list=a=>a.length?a.map(x=>`<a href="${x.url}"><strong>${esc(x.label||x.type)}</strong><small>${esc(x.type)}${x.at?' · '+new Date(x.at).toLocaleString('it-IT'):''}</small></a>`).join(''):'<div style="color:#667085;padding:8px 0">Nessun elemento.</div>';modal.innerHTML=`<div class="mia-v2-panel"><button class="mia-v2-close">✕</button><h2>Preferiti e recenti</h2><h3 class="mia-m-section-title">Preferiti</h3><div class="mia-m-list">${list(fav)}</div><h3 class="mia-m-section-title">Recenti</h3><div class="mia-m-list">${list(rec)}</div></div>`;document.body.appendChild(modal);$('.mia-v2-close',modal).onclick=()=>modal.remove();modal.onclick=e=>{if(e.target===modal)modal.remove()}}
}

async function internalNotes(){
 const id=new URLSearchParams(location.search).get('id');const type=page==='dettaglio-pratica.html'?'pratica':page==='dettaglio-viaggio.html'?'viaggio':null;if(!id||!type)return;await sleep(500);const main=$('main')||$('.main-content')||$('.content')||document.body;const sec=document.createElement('section');sec.className='card mia-m-note-box';sec.innerHTML=`<h2>Note interne / attività</h2><p style="color:#667085">Annotazioni visibili agli operatori della stessa azienda.</p><div data-m="notes"></div><textarea data-m="noteText" placeholder="Scrivi una nota interna o un'attività da ricordare..."></textarea><button data-m="noteSave">Aggiungi nota</button>`;let stack=$('.mia-m-injected-stack',main);if(!stack){stack=document.createElement('div');stack.className='mia-m-injected-stack';const footer=$('footer',main);footer?main.insertBefore(stack,footer):main.appendChild(stack)}stack.insertBefore(sec,stack.firstChild);const out=$('[data-m="notes"]',sec);
 async function load(){const {data,error}=await sb.from('note_interne').select('id,testo,created_at,created_by').eq('target_type',type).eq('target_id',id).order('created_at',{ascending:false});if(error){out.innerHTML=`<div class="mia-v2-banner">Note interne non ancora attive. Esegui il file SQL incluso nel pacchetto.</div>`;return}const notes=data||[],ids=[...new Set(notes.map(n=>n.created_by).filter(Boolean))];let names={};if(ids.length){const {data:ps}=await sb.from('profiles').select('id,email').in('id',ids);(ps||[]).forEach(p=>names[p.id]=p.email||'Operatore')}out.innerHTML=notes.length?notes.map(n=>`<div class="mia-m-note"><small>${esc(names[n.created_by]||'Operatore')} · ${new Date(n.created_at).toLocaleString('it-IT')}</small><p>${esc(n.testo)}</p></div>`).join(''):'<p style="color:#667085">Nessuna nota interna.</p>'}
 $('[data-m="noteSave"]',sec).onclick=async()=>{const ta=$('[data-m="noteText"]',sec),testo=ta.value.trim();if(!testo)return;const {data:{session}}=await sb.auth.getSession();const {data:prof}=await sb.from('profiles').select('azienda_id').eq('id',session.user.id).single();const {error}=await sb.from('note_interne').insert({azienda_id:prof?.azienda_id,target_type:type,target_id:id,testo,created_by:session.user.id});if(error)return alert('Nota non salvata: '+error.message);ta.value='';load()};load();
}

async function notificationCenter(){
 if(['login.html','index.html','autista.html','viaggio-autista.html','superadmin.html'].includes(page))return;const b=document.createElement('button');b.className='mia-m-center';b.type='button';b.textContent='🔔';b.title='Notifiche interne';document.body.appendChild(b);let items=[];
 try{const today=new Date().toISOString().slice(0,10);const [v,p,q,d,rr]=await Promise.all([sb.from('viaggi').select('id,numero_viaggio,pratica_id,data_partenza,data_arrivo,stato'),sb.from('pratiche').select('id,numero_pratica,stato_operativo'),sb.from('preventivi').select('id,numero_preventivo,stato,created_at'),sb.from('documenti').select('pratica_id,tipo'),sb.from('ricorrenze_trasporti').select('id,nome,prossima_data,attiva').eq('attiva',true)]);const docs=new Set((d.data||[]).filter(x=>['POD','DDT','CMR'].includes(String(x.tipo||'').toUpperCase())).map(x=>String(x.pratica_id)));(p.data||[]).filter(x=>['BOZZA','DA_PROGRAMMARE'].includes(String(x.stato_operativo||'').toUpperCase())).slice(0,8).forEach(x=>items.push({t:'Pratica da programmare',s:x.numero_pratica||x.id,u:`dettaglio-pratica.html?id=${encodeURIComponent(x.id)}`}));(v.data||[]).filter(x=>String(x.data_partenza||'').slice(0,10)===today).forEach(x=>items.push({t:'Partenza oggi',s:x.numero_viaggio||x.id,u:`dettaglio-viaggio.html?id=${encodeURIComponent(x.id)}`}));(v.data||[]).filter(x=>['CONSEGNATO','COMPLETATO'].includes(String(x.stato||'').toUpperCase())&&x.pratica_id&&!docs.has(String(x.pratica_id))).forEach(x=>items.push({t:'Documento POD/DDT/CMR mancante',s:x.numero_viaggio||x.id,u:`dettaglio-viaggio.html?id=${encodeURIComponent(x.id)}`}));(q.data||[]).filter(x=>['DA_INVIARE','INVIATO'].includes(String(x.stato||'').toUpperCase())).slice(0,8).forEach(x=>items.push({t:'Preventivo da seguire',s:x.numero_preventivo||x.id,u:`dettaglio-preventivo.html?id=${encodeURIComponent(x.id)}`}));const lim=new Date();lim.setDate(lim.getDate()+7);(rr.data||[]).filter(x=>x.prossima_data&&new Date(x.prossima_data+'T12:00:00')<=lim).slice(0,8).forEach(x=>items.push({t:'Ricorrenza in scadenza',s:`${x.nome} · ${new Date(x.prossima_data+'T12:00:00').toLocaleDateString('it-IT')}`,u:'ricorrenze.html'}))}catch(e){console.warn('Notifiche MatRi-mIA',e)}
 if(items.length){const badge=document.createElement('span');badge.className='mia-m-badge';badge.textContent=items.length>99?'99+':items.length;b.appendChild(badge)}b.onclick=()=>{const modal=document.createElement('div');modal.className='mia-v2-modal open';modal.innerHTML=`<div class="mia-v2-panel"><button class="mia-v2-close">✕</button><h2>Centro notifiche</h2><p style="color:#667085">Situazioni operative che richiedono attenzione.</p><div class="mia-m-list">${items.length?items.map(x=>`<a href="${x.u}"><strong>${esc(x.t)}</strong><small>${esc(x.s)}</small></a>`).join(''):'<div style="padding:12px;color:#667085">Nessuna notifica operativa.</div>'}</div></div>`;document.body.appendChild(modal);$('.mia-v2-close',modal).onclick=()=>modal.remove();modal.onclick=e=>{if(e.target===modal)modal.remove()}}
}



async function syncUxPreferences(){
 try{const {data:{session}}=await sb.auth.getSession();if(!session)return;const {data:p}=await sb.from('profiles').select('azienda_id').eq('id',session.user.id).single();if(!p?.azienda_id)return;const {data}=await sb.from('ux_preferenze').select('favorites,recent,saved_filters').eq('user_id',session.user.id).maybeSingle();if(data){if(data.favorites) localStorage.setItem('matrimia.favorites.v1',JSON.stringify(data.favorites));if(data.recent) localStorage.setItem('matrimia.recent.v1',JSON.stringify(data.recent));Object.entries(data.saved_filters||{}).forEach(([k,v])=>localStorage.setItem(k,JSON.stringify(v)));document.dispatchEvent(new Event('matrimia:uxprefs'))}}
 catch(e){console.debug('Preferenze cloud non disponibili',e)}
}
let cloudTimer;function cloudSavePrefs(){clearTimeout(cloudTimer);cloudTimer=setTimeout(async()=>{try{const {data:{session}}=await sb.auth.getSession();if(!session)return;const {data:p}=await sb.from('profiles').select('azienda_id').eq('id',session.user.id).single();if(!p?.azienda_id)return;const saved={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('matrimia.savedFilters.')){try{saved[k]=JSON.parse(localStorage.getItem(k)||'[]')}catch{}}}const parse=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch{return []}};await sb.from('ux_preferenze').upsert({user_id:session.user.id,azienda_id:p.azienda_id,favorites:parse('matrimia.favorites.v1'),recent:parse('matrimia.recent.v1'),saved_filters:saved,updated_at:new Date().toISOString()},{onConflict:'user_id'})}catch(e){console.debug('Salvataggio preferenze cloud non disponibile',e)}},500)}

async function recurrenceDashboard(){
 if(page!=='dashboard.html')return;await sleep(850);try{const today=new Date(),limit=new Date();limit.setDate(limit.getDate()+7);const {data,error}=await sb.from('ricorrenze_trasporti').select('id,nome,cliente,partenza,destinazione,prossima_data').eq('attiva',true).order('prossima_data').limit(6);if(error)return;const rows=(data||[]).filter(x=>x.prossima_data&&new Date(x.prossima_data+'T12:00:00')<=limit);if(!rows.length)return;const sec=document.createElement('section');sec.className='mia-v2-today';sec.innerHTML=`<div class="mia-v2-today-head"><h2>Prossimi trasporti ricorrenti</h2><a href="ricorrenze.html" style="font-size:12px;font-weight:900;color:#183b66;text-decoration:none">Gestisci ricorrenze →</a></div><div class="mia-m-list">${rows.map(x=>`<a href="ricorrenze.html"><strong>${esc(x.nome)}</strong><small>${new Date(x.prossima_data+'T12:00:00').toLocaleDateString('it-IT')} · ${esc(x.cliente||'')} · ${esc(x.partenza||'')} → ${esc(x.destinazione||'')}</small></a>`).join('')}</div>`;const todayBox=$('.mia-v2-today');todayBox?.insertAdjacentElement('afterend',sec)}catch(e){console.debug('Dashboard ricorrenze',e)}
}

function organizeUtilityBar(){
 if(['login.html','index.html','autista.html','viaggio-autista.html','superadmin.html'].includes(page))return;
 const nodes=['.mia-m-fav','.mia-m-center','.mia-v2-search'].map(x=>$(x)).filter(Boolean);if(!nodes.length)return;
 const dock=document.createElement('div');dock.className='mia-m-utility';
 const header=$('.app-topbar')||$('.topbar')||$('header');
 const actions=$('.app-topbar-actions',header)||$('.top-actions',header);
 if(actions){actions.appendChild(dock)}
 else if(header){header.style.display='flex';header.style.alignItems='center';header.appendChild(dock)}
 else {const main=$('main')||$('.main-content')||$('.content')||document.body;main.insertBefore(dock,main.firstChild)}
 nodes.forEach(n=>dock.appendChild(n));
}
function compactDetailActions(){
 if(!['dettaglio-pratica.html','dettaglio-preventivo.html','dettaglio-viaggio.html'].includes(page))return;
 const more=document.createElement('div');more.className='mia-m-more';more.innerHTML='<button type="button" class="mia-m-more-btn">⋯ Altre azioni</button><div class="mia-m-more-menu"></div>';const menu=$('.mia-m-more-menu',more),toggle=$('.mia-m-more-btn',more);
 const move=(el,label,danger=false)=>{if(!el)return;const b=document.createElement('button');b.type='button';b.textContent=label;b.className=danger?'danger':'';b.onclick=()=>{more.classList.remove('open');el.click()};menu.appendChild(b);el.style.display='none'};
 if(page==='dettaglio-pratica.html'){
   const host=$('.practice-actions');if(!host)return;host.classList.add('mia-m-detail-actions');
   move($('#reanalyzeButton'),'Rianalizza con AI');move($('.mia-v2-duplicate'),'Duplica');const rec=document.createElement('button');rec.type='button';rec.textContent='Crea ricorrenza';rec.onclick=()=>{location.href=`ricorrenze.html?source_pratica=${encodeURIComponent(new URLSearchParams(location.search).get('id')||'')}`};menu.appendChild(rec);move($('#deleteButton'),'Elimina',true);host.appendChild(more);
 }else if(page==='dettaglio-preventivo.html'){
   const host=$('.head .actions');if(!host)return;host.classList.add('mia-m-detail-actions');
   move($('.mia-v2-duplicate'),'Duplica');move($('#delete'),'Elimina',true);host.appendChild(more);
 }else{
   const cardHost=$('#editButton')?.parentElement;const top=$('.page-header')||$('.header')||$('h1')?.parentElement;if(!cardHost)return;cardHost.classList.add('mia-m-detail-actions');
   move($('.mia-v2-duplicate'),'Duplica');move($('#deleteButton'),'Elimina',true);cardHost.appendChild(more);
 }
 toggle.onclick=e=>{e.stopPropagation();more.classList.toggle('open')};document.addEventListener('click',e=>{if(!more.contains(e.target))more.classList.remove('open')});
}

css();syncUxPreferences();globalSearch();advancedFilters();rowActions();duplicateDetail();timeline();todayDashboard();bulkOperations();genericExports();favRecent();internalNotes();notificationCenter();recurrenceDashboard();setTimeout(()=>{organizeUtilityBar();compactDetailActions()},80);
