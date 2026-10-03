export const euro = n => new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(Number(n||0));
export const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export const today = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const nature = ['N1','N2.1','N2.2','N3.1','N3.2','N3.3','N3.4','N3.5','N3.6','N4','N5','N6.1','N6.2','N6.3','N6.4','N6.5','N6.6','N6.7','N6.8','N6.9','N7'];
function fixed(v,d){const s=String(v);if(!new RegExp(`^\\d+(?:\\.\\d{1,${d}})?$`).test(s))throw Error(`Valore numerico non valido: ${s}`);const [a,b='']=s.split('.');return BigInt(a+b.padEnd(d,'0'));}
const round = (n,d) => (n+d/2n)/d;
export function totals(rows){
 const groups=new Map();let base=0n;
 const lines=rows.map(r=>{if(!r.descrizione?.trim()||r.descrizione.length>1000)throw Error('Descrizione obbligatoria (massimo 1000 caratteri)');
  const q=fixed(r.quantita,4),p=fixed(r.prezzo,4),s=fixed(r.sconto||0,4),a=fixed(r.aliquota,2);
  if(q<=0n||q>10000000000000n||p>10000000000000n||s>1000000n||a>10000n)throw Error('Quantità, prezzo, sconto o IVA fuori limite');
  if(a===0n&&!nature.includes(r.natura))throw Error('Selezionare la natura per IVA zero');if(a>0n&&r.natura)throw Error('La natura è ammessa solo con IVA zero');
  const b=round(q*p*(1000000n-s),1000000000000n);base+=b;
  const k=`${a}|${r.natura||''}`,g=groups.get(k)||{aliquota:Number(a)/100,natura:r.natura||'',base:0n};g.base+=b;groups.set(k,g);
  return {...r,imponibile:Number(b)/100};
 });
 let tax=0n;const summaries=[...groups.values()].map(g=>{const t=round(g.base*BigInt(Math.round(g.aliquota*100)),10000n);tax+=t;return {aliquota:g.aliquota,natura:g.natura,imponibile:Number(g.base)/100,imposta:Number(t)/100};});
 return {lines,summaries,imponibile:Number(base)/100,iva:Number(tax)/100,totale:Number(base+tax)/100};
}
export function paymentState(f,date=today()){if(f.stato!=='CONFERMATA')return f.stato;if(Number(f.incassato)>=Number(f.totale))return 'PAGATA';if(f.scadenza<date)return 'SCADUTA';return Number(f.incassato)>0?'PARZIALMENTE PAGATA':'DA INCASSARE';}
export function fiscalErrors(c,label){const errors=[];for(const k of ['ragione_sociale','indirizzo','cap','citta','provincia'])if(!String(c[k]||'').trim())errors.push(`${label}: manca ${k.replaceAll('_',' ')}`);
 for(const [k,max] of [['ragione_sociale',80],['indirizzo',60],['citta',60]])if(String(c[k]||'').length>max)errors.push(`${label}: ${k} troppo lungo`);
 if(!/^\d{5}$/.test(c.cap||''))errors.push(`${label}: CAP deve avere 5 cifre`);if(!/^[A-Z]{2}$/.test(c.provincia||''))errors.push(`${label}: provincia deve avere 2 lettere`);
 if(c.nazione&&!['IT','ITALIA','ITALY'].includes(c.nazione.toUpperCase()))errors.push(`${label}: XML disponibile solo per soggetti italiani`);
 if(c.partita_iva&&!/^\d{11}$/.test(c.partita_iva))errors.push(`${label}: partita IVA deve avere 11 cifre`);
 if(!c.partita_iva&&!/^([A-Z0-9]{16}|\d{11})$/.test(c.codice_fiscale||''))errors.push(`${label}: partita IVA o codice fiscale obbligatori`);
 return errors;
}
export function xmlInvoice(f,rows){
 const c=f.cedente,b=f.cliente,errors=[...fiscalErrors(c,'Azienda'),...fiscalErrors(b,'Cliente')];
 if(f.stato!=='CONFERMATA')errors.push('Confermare la fattura prima dell XML');if(!/^\d{11}$/.test(c.partita_iva||''))errors.push('Partita IVA azienda obbligatoria');
 if(c.regime_fiscale!=='RF01')errors.push('XML integrato disponibile per regime ordinario RF01');
 if(!/^[A-Z0-9]{7}$/.test(b.codice_destinatario||'0000000'))errors.push('Codice destinatario deve avere 7 caratteri');
 if(b.pec&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.pec))errors.push('PEC cliente non valida');
 if(!['MP01','MP05','MP08','MP12'].includes(f.modalita_pagamento))errors.push('Modalità pagamento non supportata');
 if(c.iban&&!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(c.iban))errors.push('IBAN non valido');
 if(String(f.numero||'').length>20)errors.push('Numero documento troppo lungo');
 const sums=totals(rows);
 if(sums.summaries.some(g=>g.aliquota===0))errors.push('XML con IVA zero: bollo/esenzioni da completare nel provider. Esportare CSV e stampa.');
 if(Math.abs(sums.totale-Number(f.totale))>.005)errors.push('Totali incoerenti con i dati salvati');
 if(errors.length)throw Error(errors.join('\n'));
 const tag=(k,v)=>`<${k}>${esc(v)}</${k}>`,money=n=>Number(n).toFixed(2),num=n=>Number(n).toFixed(4);
 const sede=x=>`<Sede>${tag('Indirizzo',x.indirizzo)}${tag('CAP',x.cap)}${tag('Comune',x.citta)}${tag('Provincia',x.provincia)}<Nazione>IT</Nazione></Sede>`;
 const anag=x=>`${x.partita_iva?`<IdFiscaleIVA><IdPaese>IT</IdPaese>${tag('IdCodice',x.partita_iva)}</IdFiscaleIVA>`:''}${x.codice_fiscale?tag('CodiceFiscale',x.codice_fiscale):''}<Anagrafica>${tag('Denominazione',x.ragione_sociale)}</Anagrafica>`;
 return `<?xml version="1.0" encoding="UTF-8"?>\n<p:FatturaElettronica xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2" versione="FPR12"><FatturaElettronicaHeader><DatiTrasmissione><IdTrasmittente><IdPaese>IT</IdPaese>${tag('IdCodice',c.partita_iva)}</IdTrasmittente>${tag('ProgressivoInvio',String(f.id).replaceAll('-','').slice(0,10))}<FormatoTrasmissione>FPR12</FormatoTrasmissione>${tag('CodiceDestinatario',b.codice_destinatario||'0000000')}${b.pec&&(!b.codice_destinatario||b.codice_destinatario==='0000000')?tag('PECDestinatario',b.pec):''}</DatiTrasmissione><CedentePrestatore><DatiAnagrafici>${anag(c)}${tag('RegimeFiscale',c.regime_fiscale)}</DatiAnagrafici>${sede(c)}</CedentePrestatore><CessionarioCommittente><DatiAnagrafici>${anag(b)}</DatiAnagrafici>${sede(b)}</CessionarioCommittente></FatturaElettronicaHeader><FatturaElettronicaBody><DatiGenerali><DatiGeneraliDocumento><TipoDocumento>TD01</TipoDocumento><Divisa>EUR</Divisa>${tag('Data',f.data_documento)}${tag('Numero',f.numero)}${tag('ImportoTotaleDocumento',money(f.totale))}${f.note?tag('Causale',f.note.slice(0,200)):''}</DatiGeneraliDocumento></DatiGenerali><DatiBeniServizi>${sums.lines.map((r,i)=>`<DettaglioLinee>${tag('NumeroLinea',i+1)}${tag('Descrizione',r.descrizione)}${tag('Quantita',num(r.quantita))}${tag('PrezzoUnitario',num(r.prezzo))}${Number(r.sconto)?`<ScontoMaggiorazione><Tipo>SC</Tipo>${tag('Percentuale',num(r.sconto))}</ScontoMaggiorazione>`:''}${tag('PrezzoTotale',money(r.imponibile))}${tag('AliquotaIVA',money(r.aliquota))}</DettaglioLinee>`).join('')}${sums.summaries.map(g=>`<DatiRiepilogo>${tag('AliquotaIVA',money(g.aliquota))}${tag('ImponibileImporto',money(g.imponibile))}${tag('Imposta',money(g.imposta))}<EsigibilitaIVA>I</EsigibilitaIVA></DatiRiepilogo>`).join('')}</DatiBeniServizi><DatiPagamento><CondizioniPagamento>TP02</CondizioniPagamento><DettaglioPagamento>${tag('ModalitaPagamento',f.modalita_pagamento)}${tag('DataScadenzaPagamento',f.scadenza)}${tag('ImportoPagamento',money(f.totale))}${c.iban?tag('IBAN',c.iban):''}</DettaglioPagamento></DatiPagamento></FatturaElettronicaBody></p:FatturaElettronica>`;
}
export function csvCell(v){let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
