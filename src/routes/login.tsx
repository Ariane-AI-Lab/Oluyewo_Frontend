import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { setAuth } from "@/lib/auth-store";
import { apiRequest } from "@/lib/api";
import { clearAppStatus, setAppStatus } from "@/lib/app-state";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Oluyewo" },
      { name: "description", content: "Connectez-vous pour accéder à votre historique sécurisé." },
      { property: "og:title", content: "Connexion — Oluyewo" },
      { property: "og:description", content: "Accédez à votre espace personnel Oluyewo." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setAppStatus({ loading: true, error: null, message: "Connexion en cours…" });

    try {
      const payload = await apiRequest<{ access_token?: string; token_type?: string; message?: string }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!payload.access_token) {
        throw new Error(payload.message || "La connexion a échoué.");
      }

      setAuth(true, payload.access_token);
      clearAppStatus();
      navigate({ to: "/" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Impossible de se connecter au serveur.";
      setError(message);
      setAppStatus({ loading: false, error: message, message: null });
    } finally {
      setIsSubmitting(false);
      setAppStatus({ loading: false, error: null, message: null });
    }
  };

  return (
    <section className="px-gutter py-stack-lg flex-grow flex items-center justify-center">
      <form
        onSubmit={submit}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/20 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="font-headline-md">Connexion</h2>
          <p className="font-body-md text-on-surface-variant">
            Accédez à votre historique sécurisé.
          </p>
        </div>
        <div className="space-y-4">
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
            {isSubmitting ? "Connexion…" : "Se connecter"}
          </button>
          <p className="text-center text-sm text-on-surface-variant">
            Pas de compte ?{" "}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
