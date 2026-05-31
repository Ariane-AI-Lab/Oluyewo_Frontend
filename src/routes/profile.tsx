import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/Icon";
import { getAuth, setAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Mon profil — Oluyewo" },
      { name: "description", content: "Gérez votre compte Oluyewo." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuth()) navigate({ to: "/login" });
  }, [navigate]);

  const logout = () => {
    setAuth(false);
    toast.success("Vous êtes déconnecté");
    navigate({ to: "/" });
  };

  return (
    <section className="px-gutter py-stack-lg flex-grow">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/20 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
              <Icon name="person" className="!text-4xl" />
            </div>
            <div>
              <h1 className="font-headline-md">Mon profil</h1>
              <p className="font-body-md text-on-surface-variant">
                Gérez votre compte et vos préférences.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/archives"
              className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-primary-container/10 transition-colors"
            >
              <span className="flex items-center gap-3 font-label-sm">
                <Icon name="history" className="text-primary" />
                Historique d'analyse
              </span>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </Link>
            <Link
              to="/verification"
              className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-primary-container/10 transition-colors"
            >
              <span className="flex items-center gap-3 font-label-sm">
                <Icon name="fact_check" className="text-primary" />
                Nouvelle vérification
              </span>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </Link>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-error-container/40 text-error font-bold hover:bg-error-container/60 transition-colors active:scale-95"
          >
            <Icon name="logout" />
            Se déconnecter
          </button>
        </div>
      </div>
    </section>
  );
}
