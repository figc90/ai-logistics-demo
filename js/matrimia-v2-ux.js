import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const sb=createClient("https://sctzockiurjsxzdkctmy.supabase.co","sb_publishable_hAZ4e_wz4f9R7wc4YdkbmQ_7HozQD9G");
const page=(location.pathname.split('/').pop()||'').toLowerCase();
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

function css(){
 const st=document.createElement('style');st.textContent=`
 .mia-v2-search{position:fixed;right:22px;top:18px;z-index:1200;border:1px solid #dbe3ec;background:#fff;color:#183b66;border-radius:12px;padding:10px 14px;font-weight:800;box-shadow:0 8px 24px #0d264c18;cursor:pointer}.mia-v2-search:hover{background:#f7f9fc}
 .mia-v2-modal{position:fixed;inset:0;background:#071a30a8;z-index:5000;display:none;align-items:flex-start;justify-content:center;padding:8vh 16px}.mia-v2-modal.open{display:flex}.mia-v2-panel{width:min(850px,96vw);max-height:82vh;overflow:auto;background:#fff;border-radius:18px;box-shadow:0 25px 80px #0005;padding:22px}.mia-v2-panel h2{margin:0 0 14px;color:#0d264c}.mia-v2-input{width:100%;box-sizing:border-box;padding:13px 15px;border:1px solid #ccd7e4;border-radius:11px;font-size:16px}.mia-v2-results{margin-top:14px}.mia-v2-result{display:block;padding:12px 14px;border:1px solid #e4eaf1;border-radius:11px;margin:8px 0;text-decoration:none;color:#1f2937;background:#fff}.mia-v2-result:hover{border-color:#9bb5d1;background:#f7f9fc}.mia-v2-result strong{color:#0d264c}.mia-v2-kind{font-size:11px;font-weight:900;color:#1e4e79;text-transform:uppercase;letter-spacing:.05em}.mia-v2-close{float:right;border:0;background:#eef3f8;border-radius:9px;padding:7px 10px;cursor:pointer}
 .mia-v2-adv{margin:12px 0;padding:12px;border:1px solid #e1e8f0;border-radius:13px;background:#f8fafc}.mia-v2-adv summary{cursor:pointer;font-weight:900;color:#183b66}.mia-v2-grid{display:grid;grid-template-columns:1fr 1fr auto auto;gap:9px;margin-top:10px}.mia-v2-grid input,.mia-v2-grid select,.mia-v2-grid button{min-height:39px;border:1px solid #ccd7e4;border-radius:9px;padding:7px 10px;background:#fff}.mia-v2-grid button{font-weight:800;color:#183b66;cursor:pointer}.mia-v2-saved{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.mia-v2-chip{border:1px solid #cfd9e5;background:#fff;border-radius:999px;padding:6px 10px;cursor:pointer;font-size:12px}
 .mia-v2-menu-btn{border:1px solid #d5dee8;background:#fff;border-radius:8px;padding:5px 9px;font-weight:900;cursor:pointer}.mia-v2-menu{position:fixed;z-index:4500;min-width:190px;background:#fff;border:1px solid #dce4ed;border-radius:12px;box-shadow:0 14px 40px #0d264c30;padding:6px}.mia-v2-menu button,.mia-v2-menu a{display:block;width:100%;box-sizing:border-box;text-align:left;border:0;background:#fff;color:#24364b;padding:10px;border-radius:8px;text-decoration:none;cursor:pointer;font-weight:700}.mia-v2-menu button:hover,.mia-v2-menu a:hover{background:#eef4fa}
 .mia-v2-duplicate{border:1px solid #cfd9e5;background:#fff;color:#183b66;border-radius:10px;padding:10px 14px;font-weight:900;cursor:pointer;margin-left:8px}.mia-v2-banner{padding:11px 14px;border-radius:11px;background:#fff7e6;border:1px solid #f5c46b;color:#7b4b00;margin:0 0 14px;font-weight:700}
 .mia-v2-timeline{margin-top:18px}.mia-v2-event{display:grid;grid-template-columns:145px 18px 1fr;gap:10px;align-items:start;padding:7px 0}.mia-v2-dot{width:10px;height:10px;border-radius:50%;background:#1e4e79;margin-top:5px}.mia-v2-event time{font-size:12px;color:#667085}.mia-v2-event strong{color:#0d264c}
 .mia-v2-today{margin:0 0 24px;padding:15px 18px;border:1px solid #dce5ee;border-radius:16px;background:#fff;box-shadow:0 7px 22px #0d264c0c}.mia-v2-today-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:11px}.mia-v2-today h2{margin:0;color:#0d264c;font-size:17px}.mia-v2-today-note{font-size:11px;color:#8a98aa}.mia-v2-cards{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:9px}.mia-v2-card{padding:10px 8px;border-radius:11px;background:#f7f9fc;border:1px solid #e3e9ef;text-align:center;transition:.15s ease}.mia-v2-card:hover{transform:translateY(-1px);border-color:#b9cadb;background:#fff}.mia-v2-card b{display:block;font-size:21px;color:#183b66;line-height:1.1}.mia-v2-card span{display:block;margin-top:5px;font-size:11px;color:#667085;font-weight:800;line-height:1.25}.mia-v2-card.has-value{background:#fff8ea;border-color:#f1cc84}.mia-v2-card.has-value b{color:#9a5d00}
 @media(max-width:1100px){.mia-v2-cards{grid-template-columns:repeat(3,1fr)}}@media(max-width:850px){.mia-v2-search{top:auto;bottom:18px;right:18px}.mia-v2-grid{grid-template-columns:1fr}.mia-v2-cards{grid-template-columns:repeat(2,1fr)}}`;
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
 ['Mezzo','mezzi','id,targa,marca,modello',`targa.ilike.${term},marca.ilike.${term},modello.ilike.${term}`,'dettaglio-mezzo.html']];
 const rs=await Promise.all(defs.map(async d=>{try{const {data,error}=await sb.from(d[1]).select(d[2]).or(d[3]).limit(6);return error?[]:(data||[]).map(x=>({d,x}))}catch{return []}}));
 const rows=rs.flat();if(!rows.length){out.innerHTML='<div style="padding:14px;color:#667085">Nessun risultato.</div>';return}
 out.innerHTML=rows.map(({d,x})=>{const title=x.numero_pratica||x.numero_preventivo||x.numero_viaggio||x.ragione_sociale||[x.nome,x.cognome].filter(Boolean).join(' ')||x.targa||'Risultato';const sub=[x.cliente,x.partenza&&x.destinazione?`${x.partenza} → ${x.destinazione}`:null,x.vettore,x.autista,x.targa_trattore,x.marca,x.modello,x.email].filter(Boolean).join(' · ');return `<a class="mia-v2-result" href="${d[4]}?id=${encodeURIComponent(x.id)}"><span class="mia-v2-kind">${d[0]}</span><br><strong>${esc(title)}</strong>${sub?`<div>${esc(sub)}</div>`:''}</a>`}).join('');
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
 $('[data-v2="save"]',d).onclick=()=>{const name=prompt('Nome della vista salvata:');if(!name)return;const arr=views();arr.push({name,contains:contains.value,date:date.value,search:cfg.search?document.getElementById(cfg.search)?.value:'',status:cfg.status?document.getElementById(cfg.status)?.value:''});localStorage.setItem(key,JSON.stringify(arr.slice(-8)));draw()};
 $('[data-v2="clear"]',d).onclick=()=>{contains.value='';date.value='';if(cfg.search&&document.getElementById(cfg.search)){document.getElementById(cfg.search).value='';document.getElementById(cfg.search).dispatchEvent(new Event('input'))}if(cfg.status&&document.getElementById(cfg.status)){document.getElementById(cfg.status).value='';document.getElementById(cfg.status).dispatchEvent(new Event('change'))}apply()};draw();
 const qp=new URLSearchParams(location.search);if(qp.get('v2date'))date.value=qp.get('v2date');if(qp.get('v2q'))contains.value=qp.get('v2q');if(qp.get('v2status')&&cfg.status&&document.getElementById(cfg.status)){document.getElementById(cfg.status).value=qp.get('v2status');document.getElementById(cfg.status).dispatchEvent(new Event('change'))}setTimeout(apply,250);
 const obs=new MutationObserver(()=>apply());const body=$('tbody',table);if(body)obs.observe(body,{childList:true,subtree:true});
}

function rowActions(){
 const defs={'pratiche.html':['dettaglio-pratica.html','nuova-pratica.html'],'preventivi.html':['dettaglio-preventivo.html','nuovo-preventivo.html'],'viaggi.html':['dettaglio-viaggio.html','nuovo-viaggio.html']};const def=defs[page];if(!def)return;const table=$('table');if(!table)return;
 const add=()=>{$$('tbody tr',table).forEach(r=>{if(r.querySelector('.mia-v2-menu-btn'))return;const id=r.dataset.id||r.getAttribute('data-id');if(!id)return;let cell=document.createElement('td');const b=document.createElement('button');b.type='button';b.className='mia-v2-menu-btn';b.textContent='⋯';b.onclick=e=>{e.preventDefault();e.stopPropagation();openMenu(b,id,def)};cell.appendChild(b);r.appendChild(cell)});const hr=$('thead tr',table);if(hr&&!hr.querySelector('[data-v2-actions]')){const th=document.createElement('th');th.dataset.v2Actions='1';th.textContent='Azioni';hr.appendChild(th)}};add();new MutationObserver(add).observe($('tbody',table),{childList:true,subtree:true});
}
function openMenu(btn,id,def){$('.mia-v2-menu')?.remove();const m=document.createElement('div');m.className='mia-v2-menu';m.innerHTML=`<a href="${def[0]}?id=${encodeURIComponent(id)}">Apri dettaglio</a><a href="${def[1]}?duplica_da=${encodeURIComponent(id)}">Duplica</a>`;document.body.appendChild(m);const r=btn.getBoundingClientRect();m.style.left=Math.min(r.left,innerWidth-210)+'px';m.style.top=Math.min(r.bottom+5,innerHeight-120)+'px';setTimeout(()=>document.addEventListener('click',()=>m.remove(),{once:true}),0)}

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
 const [p,v,d,pr]=await Promise.all([sb.from('pratiche').select('id,numero_pratica,created_at,updated_at,stato_operativo').eq('id',id).single(),sb.from('viaggi').select('id,numero_viaggio,stato,created_at,updated_at,chiuso_at').eq('pratica_id',id).order('created_at'),sb.from('documenti').select('id,nome_file,tipo,created_at,origine').eq('pratica_id',id).order('created_at'),sb.from('preventivi').select('id,numero_preventivo,stato,created_at,updated_at').eq('pratica_id',id).order('created_at')]);
 const events=[];if(p.data){events.push([p.data.created_at,'Pratica creata',p.data.numero_pratica||'']);if(p.data.updated_at&&p.data.updated_at!==p.data.created_at)events.push([p.data.updated_at,'Pratica aggiornata',p.data.stato_operativo||''])}(pr.data||[]).forEach(x=>events.push([x.created_at,'Preventivo collegato',`${x.numero_preventivo||''} · ${x.stato||''}`]));(v.data||[]).forEach(x=>{events.push([x.created_at,'Viaggio programmato',`${x.numero_viaggio||''} · ${x.stato||''}`]);if(x.chiuso_at)events.push([x.chiuso_at,'Viaggio chiuso',x.numero_viaggio||''])});(d.data||[]).forEach(x=>events.push([x.created_at,'Documento aggiunto',`${x.tipo||'Documento'} · ${x.nome_file||''}${x.origine?` · ${x.origine}`:''}`]));events.sort((a,b)=>new Date(a[0])-new Date(b[0]));
 const sec=document.createElement('section');sec.className='card mia-v2-timeline';sec.innerHTML=`<h2>Timeline della pratica</h2><p style="color:#667085">Cronologia sintetica ricostruita dagli elementi collegati alla pratica.</p>${events.length?events.map(e=>`<div class="mia-v2-event"><time>${new Date(e[0]).toLocaleString('it-IT')}</time><span class="mia-v2-dot"></span><div><strong>${esc(e[1])}</strong><div>${esc(e[2])}</div></div></div>`).join(''):'<p>Nessun evento disponibile.</p>'}`;
 const main=$('main')||$('.main-content')||$('.content')||document.body;main.appendChild(sec);
}

async function todayDashboard(){
 if(page!=='dashboard.html')return;await sleep(700);const now=new Date(),ymd=now.toISOString().slice(0,10);const [v,p,pr,docs]=await Promise.all([sb.from('viaggi').select('id,pratica_id,data_partenza,data_arrivo,stato'),sb.from('pratiche').select('id,stato_operativo'),sb.from('preventivi').select('id,stato'),sb.from('documenti').select('id,pratica_id,tipo')]);
 const same=x=>x&&String(x).slice(0,10)===ymd;const vi=v.data||[],pa=p.data||[],pv=pr.data||[],dd=docs.data||[];const docPractice=new Set(dd.filter(x=>['POD','DDT','CMR'].includes(String(x.tipo||'').toUpperCase())).map(x=>String(x.pratica_id||'')));const missing=vi.filter(x=>['CONSEGNATO','COMPLETATO'].includes(String(x.stato||'').toUpperCase())&&x.pratica_id&&!docPractice.has(String(x.pratica_id))).length;
 const vals=[['Partenze oggi',vi.filter(x=>same(x.data_partenza)).length,`viaggi.html?v2date=${ymd}`],['Arrivi oggi',vi.filter(x=>same(x.data_arrivo)).length,`viaggi.html?v2date=${ymd}`],['Da programmare',pa.filter(x=>['BOZZA','DA_PROGRAMMARE'].includes(String(x.stato_operativo||'').toUpperCase())).length,'pratiche.html?v2status=DA_PROGRAMMARE'],['Viaggi in corso',vi.filter(x=>String(x.stato||'').toUpperCase()==='IN CORSO').length,'viaggi.html?v2status=IN%20CORSO'],['Preventivi da seguire',pv.filter(x=>['DA_INVIARE','INVIATO'].includes(String(x.stato||'').toUpperCase())).length,'preventivi.html'],['Consegne senza POD/DDT/CMR',missing,'viaggi.html']];
 const box=document.createElement('section');box.className='mia-v2-today';box.innerHTML=`<div class="mia-v2-today-head"><h2>Oggi · ${now.toLocaleDateString('it-IT',{day:'2-digit',month:'long'})}</h2><span class="mia-v2-today-note">Attività operative da controllare</span></div><div class="mia-v2-cards">${vals.map(x=>`<a href="${x[2]}" class="mia-v2-card ${x[1]>0?'has-value':''}" style="text-decoration:none"><b>${x[1]}</b><span>${x[0]}</span></a>`).join('')}</div>`;const guide=$('.beta-guide-card');if(guide)guide.insertAdjacentElement('afterend',box);else{const heading=$('.heading')||$('.page-header')||$('h1')?.parentElement;heading?.insertAdjacentElement('afterend',box);}
}

css();globalSearch();advancedFilters();rowActions();duplicateDetail();timeline();todayDashboard();
