import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://sctzockiurjsxzdkctmy.supabase.co",
  "sb_publishable_hAZ4e_wz4f9R7wc4YdkbmQ_7HozQD9G"
);

const page = (window.location.pathname.split("/").pop() || "").toLowerCase();
const driverPages = new Set(["autista.html", "viaggio-autista.html"]);

async function blockDisabledCompany(profile) {
  const role = String(profile?.ruolo || "").trim().toLowerCase();
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
      await blockDisabledCompany(profile);

      const role = String(profile.ruolo || "").trim().toLowerCase();
      if (role === "autista" && !driverPages.has(page)) {
        window.location.replace("autista.html");
      }
    }
  }
} catch (error) {
  console.error("Controllo accesso MatRi-mIA:", error);
}
