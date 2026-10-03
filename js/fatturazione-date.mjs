export function dateItalian(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  return match ? `${match[3]}/${match[2]}/${match[1]}` : String(value || '');
}
export function dateIso(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || '').trim());
  if (!match) throw new Error('Inserisci la data nel formato GG/MM/AAAA.');
  const [, day, month, year] = match;
  const iso = `${year}-${month}-${day}`;
  const date = new Date(iso + 'T12:00:00Z');
  if (Number(year) < 1 || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
    throw new Error('Inserisci una data valida nel formato GG/MM/AAAA.');
  }
  return iso;
}
