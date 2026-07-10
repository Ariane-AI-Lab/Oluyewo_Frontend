import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { setAppStatus } from "@/lib/app-state";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Inscription — Oluyewo" },
      { name: "description", content: "Créez votre compte Oluyewo et combattez les rumeurs." },
      { property: "og:title", content: "Inscription — Oluyewo" },
      { property: "og:description", content: "Rejoignez la communauté Oluyewo." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setAppStatus({ loading: true, error: null, message: "Création du compte…" });

    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ nom, prenom, email, password }),
      });

      setAppStatus({ loading: false, error: null, message: "Compte créé avec succès. Connectez-vous pour continuer." });
      navigate({ to: "/login" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Impossible de créer le compte.";
      setError(message);
      setAppStatus({ loading: false, error: message, message: null });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-gutter py-stack-lg flex-grow flex items-center justify-center">
      <form
        onSubmit={submit}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/20 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="font-headline-md">Inscription</h2>
          <p className="font-body-md text-on-surface-variant">
            Commencez votre lutte contre les rumeurs.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-label-sm">Nom</label>
            <input
              required
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm">Prénom</label>
            <input
              required
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm">Mot de passe</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" className="w-full premium-button py-4 rounded-xl font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Création…" : "S'inscrire"}
          </button>
          <p className="text-center text-sm text-on-surface-variant">
            Déjà membre ?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
