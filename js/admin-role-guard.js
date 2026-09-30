import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://sctzockiurjsxzdkctmy.supabase.co",
  "sb_publishable_hAZ4e_wz4f9R7wc4YdkbmQ_7HozQD9G"
);

const page = (window.location.pathname.split("/").pop() || "").toLowerCase();

/*
  Separazione netta dei tre ambienti:
  - superadmin: gestione piattaforma
  - admin: operatività della propria azienda
  - autista: area autista
*/
const superadminPages = new Set([
  "superadmin.html",
  "aziende.html",
  "dettaglio-azienda.html",
  "nuova-azienda.html"
]);

const driverPages = new Set([
  "autista.html",
  "viaggio-autista.html"
]);

async function blockDisabledCompany(profile) {
  const role = String(profile?.ruolo || "").trim().toLowerCase();

  // Il Superadmin è intenzionalmente indipendente da qualsiasi azienda.
  if (role === "superadmin") return;

  if (!profile?.azienda_id) {
    await supabase.auth.signOut();
    window.location.replace("login.html?reason=account_non_associato");
    throw new Error("Account non associato a un'azienda.");
  }

  const { data: company, error } = await supabase
    .from("aziende")
    .select("id,attiva")
    .eq("id", profile.azienda_id)
    .single();

  if (error || !company) {
    await supabase.auth.signOut();
    window.location.replace("login.html?reason=verifica_azienda");
    throw error || new Error("Azienda non trovata.");
  }

  if (company.attiva === false) {
    await supabase.auth.signOut();
    window.location.replace("login.html?reason=azienda_disattivata");
    throw new Error("Azienda disattivata.");
  }
}

function redirectByRole(role) {
  if (role === "superadmin") {
    if (!superadminPages.has(page)) {
      window.location.replace("superadmin.html");
      return true;
    }
    return false;
  }

  if (role === "autista") {
    if (!driverPages.has(page)) {
      window.location.replace("autista.html");
      return true;
    }
    return false;
  }

  if (role === "admin") {
    // Un amministratore aziendale non deve entrare né nella console
    // piattaforma né nell'interfaccia riservata all'autista.
    if (superadminPages.has(page) || driverPages.has(page)) {
      window.location.replace("dashboard.html");
      return true;
    }
    return false;
  }

  return false;
}

try {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    window.location.replace("login.html");
  } else {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("ruolo,azienda_id")
      .eq("id", session.user.id)
      .single();

    if (error || !profile) {
      await supabase.auth.signOut();
      window.location.replace("login.html");
    } else {
      const role = String(profile.ruolo || "").trim().toLowerCase();

      // Blocca ruoli sconosciuti/non previsti.
      if (!["superadmin", "admin", "autista"].includes(role)) {
        await supabase.auth.signOut();
        window.location.replace("login.html?reason=ruolo_non_valido");
        throw new Error("Ruolo non valido.");
      }

      await blockDisabledCompany(profile);
      redirectByRole(role);
    }
  }
} catch (error) {
  console.error("Controllo accesso MatRi-mIA:", error);
}
