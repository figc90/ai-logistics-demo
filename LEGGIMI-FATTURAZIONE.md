# MatRi-mIA Logistics — modulo fatturazione

Il pacchetto contiene il progetto originale aggiornato, cinque schermate di fatturazione, una migrazione Supabase additiva e test riproducibili. Il sito e il database online non sono stati modificati durante questo lavoro.

## Installazione

1. Conserva il backup del database attuale prima di applicare la migrazione.
2. Nel SQL Editor del TUO progetto Supabase esegui, una sola volta, l'intero file `supabase/migrations/20261003_fatturazione.sql`. È racchiuso in una transazione: in caso di errore non applicare singoli pezzi. La migrazione presume `aziende.id` e `profiles.azienda_id` UUID, `profiles.id` uguale all'ID utente, ruolo `admin`, campo `aziende.attiva`, e le tabelle operative del progetto allegato. Queste assunzioni sono verificate su fixture; lo schema reale non era incluso nell'archivio.
3. Carica su GitHub tutti i file HTML e JS aggiornati mantenendo la struttura del progetto. Non caricare solamente la nuova pagina: anche sidebar, dettagli dei servizi e backup sono aggiornati.
4. Accedi con un amministratore di azienda attiva. Apri **Fatturazione → Dati fiscali**, controlla i dati importati dall'azienda e salva regime, indirizzo fiscale, partita IVA, IBAN e termini di pagamento.
5. Crea una bozza di prova e verifica cliente, IVA e importi prima di confermarla. La conferma assegna un numero definitivo e blocca le modifiche. Non utilizzare dati fittizi per documenti che intendi trasmettere fiscalmente.

## Cosa include

- Fatturazione: ricerca e filtri per stato, imponibile mese/anno, residuo e scaduto. Sono indicatori gestionali dei documenti confermati, non dichiarazioni fiscali.
- Nuova fattura: dati cliente, destinatario/PEC, righe, quantità decimali, prezzo, sconto, aliquota e natura IVA, scadenza, pagamento e note.
- Calcoli monetari: arrotondamento dell'imponibile per riga e IVA per riepilogo aliquota/natura. Totali ricalcolati sul server; il browser non può imporre un totale diverso.
- Generazione da pratica, viaggio o preventivo. I viaggi ereditano tratta e cliente dalla pratica; quando presente viene recuperato l'importo del preventivo accettato. Per collegamenti con nomi cliente non riconosciuti è richiesta una selezione esplicita.
- Collegamenti univoci: una fattura non annullata per pratica, viaggio o preventivo. Non copre fatturazione frazionata o riepilogativa di molte pratiche nello stesso documento.
- Numerazione atomica per azienda e anno: `MIA-2026-1`, `MIA-2026-2`, ecc. Sezione separata MIA; verificare con il consulente l'uso del sezionale prima di trasmettere. Numeri mai riutilizzati. Data non futura e non antecedente a documenti già numerati nell'anno.
- Incassi parziali, controllo residuo, richieste idempotenti, storno con traccia del movimento, stato pagata/scaduta derivato automaticamente.
- Stampa tramite browser con salvataggio PDF, esportazione elenco CSV, bozza di sollecito da copiare (nessuna email viene inviata).
- XML preparatorio FPR12/TD01 per soggetti italiani privati, regime ordinario RF01, IVA positiva e pagamento semplice.
- Registro manuale degli esiti ricevuti dal servizio fiscale esterno e storico operazioni.
- Backup azienda esteso a fatture, righe, pagamenti, impostazioni, contatori ed eventi, con paginazione delle nuove tabelle.
- RLS e RPC: amministratori attivi accedono solo alla propria azienda; autisti e anonimi sono esclusi. Scritture dirette alle tabelle revocate. Numerazione, salvataggio righe e incassi sono transazionali.

## Distinzione tra gestionale e fatturazione elettronica

**Confermata** significa numerata nel gestionale. **Non inviata / Inviata / Consegnata / Mancata consegna / Scartata** indica un esito SdI registrato separatamente, sulla base di una ricevuta esterna.

Scaricare un XML o registrare un esito non trasmette nulla. Non è presente un account/provider fiscale configurato, un canale SdI, sincronizzazione automatica delle ricevute o conservazione a norma. Non inserire chiavi segrete del provider nel frontend: la futura integrazione deve passare da una Edge Function con segreti e webhook autenticati.

L'XML ha controlli applicativi e deve essere importato nel provider/portale fiscale per la verifica del tracciato corrente e dei controlli fiscali. In questa consegna non è stato validato contro l'XSD ufficiale corrente né inviato allo SdI. Per IVA zero, bollo, forfettario, estero, PA, note di credito, ritenute, cassa previdenziale, split payment, IVA differita e pagamenti rateali occorre completare il documento nel servizio fiscale esterno. L'esportazione XML di IVA zero è bloccata esplicitamente; la gestione interna delle righe IVA zero rimane disponibile.

Le bozze possono essere annullate; i documenti confermati non possono essere cancellati o modificati da questa interfaccia. Correzioni fiscali, scarti e note di credito sono da gestire nel provider e poi allineare al registro gestionale. Questo modulo non è un sistema di contabilità generale, di fatture passive o di conservazione fiscale.

Riferimenti consultati:
- https://www1.agenziaentrate.gov.it/web_app_entrate/bollo_fatture.html
- https://def.finanze.it/DocTribFrontend/getPrassiDetail.do?id=%7B124BFDFF-8B12-47D3-83E3-AFD9DCD9119F%7D

## Verifiche eseguite

- 13 test automatici dei calcoli, degli stati, dell'escape XML, dei blocchi di esportazione e della protezione formule CSV: superati.
- Migrazione eseguita su PostgreSQL tramite PGlite con schema sintetico: superata. Verificati totali, isolamento tra due aziende, esclusione autista/anonimo, divieto di UPDATE diretto, duplicati del servizio, controllo versione, idempotenza incassi, residuo, storno e registrazione esito.
- Cinque schermate caricate in Chromium con Supabase simulato; verificati modifica quantità/prezzo/sconto, payload di salvataggio e sollecito. Controllo visivo desktop e mobile, senza overflow orizzontale della pagina a 390 px: superato.
- Controllo sintassi dei nuovi moduli JavaScript: superato.
- Non eseguiti test sul Supabase reale, trasmissione SdI, verifica fiscale XSD o prove di concorrenza su più sessioni reali. Il database reale e la pubblicazione restano da attivare.

Per ripetere i test:

```sh
node --test tests/fatturazione.test.mjs
cd tests
npm install
npm run db
npx playwright install chromium
npm run ui
```

I test DB creano solo un database temporaneo di prova. I test UI intercettano le richieste e non inviano dati al Supabase online. Le immagini di prova vengono create nella cartella tests. Non servono credenziali.
