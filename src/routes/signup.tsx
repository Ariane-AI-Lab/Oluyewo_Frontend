import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/login" });
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
            <label className="font-label-sm">Nom complet</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <button type="submit" className="w-full premium-button py-4 rounded-xl font-bold">
            S'inscrire
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
