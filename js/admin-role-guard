import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
  "https://sctzockiurjsxzdkctmy.supabase.co",
  "sb_publishable_hAZ4e_wz4f9R7wc4YdkbmQ_7HozQD9G"
);

try {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("ruolo")
      .eq("id", session.user.id)
      .single();

    if (String(profile?.ruolo || "").trim().toLowerCase() === "autista") {
      window.location.replace("autista.html");
    }
  }
} catch (error) {
  console.error("Controllo ruolo amministrativo:", error);
}
