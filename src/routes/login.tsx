import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { setAuth } from "@/lib/auth-store";

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth(true);
    navigate({ to: "/" });
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
          <button type="submit" className="w-full premium-button py-4 rounded-xl font-bold">
            Se connecter
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
