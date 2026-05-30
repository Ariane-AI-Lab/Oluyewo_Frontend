import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: "Vérifier une rumeur — Oluyewo" },
      {
        name: "description",
        content:
          "Soumettez un message ou une image suspecte pour une analyse instantanée par nos agents IA.",
      },
      { property: "og:title", content: "Vérifier une rumeur — Oluyewo" },
      {
        property: "og:description",
        content: "Une analyse multicouche en moins de 30 secondes.",
      },
    ],
  }),
  component: VerificationPage,
});

function VerificationPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const run = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/result" });
    }, 2200);
  };

  return (
    <>
      <section className="px-gutter py-stack-lg flex-grow">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm transition-colors mb-stack-md"
          >
            <Icon name="arrow_back" className="!text-base" />
            Retour aux explications
          </Link>

          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-xl border border-outline-variant/20 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-headline-md md:font-display-lg-mobile">Espace de Vérification</h2>
              <p className="font-body-md text-on-surface-variant">
                Soumettez un contenu pour une analyse instantanée par nos algorithmes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-sm text-on-surface-variant">
                  Contenu texte ou message WhatsApp
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-40 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 focus:ring-2 focus:ring-primary-container focus:border-transparent font-body-md transition-all outline-none"
                  placeholder="Collez ici le message suspect que vous avez reçu..."
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-on-surface-variant">
                  Image ou document (Optionnel)
                </label>
                <div className="border-2 border-dashed border-outline-variant/50 bg-surface-container-low/50 rounded-xl p-10 text-center space-y-4 hover:border-primary-container hover:bg-emerald-glow transition-all cursor-pointer group">
                  <Icon
                    name="cloud_upload"
                    className="!text-4xl text-on-surface-variant group-hover:text-primary-container transition-colors"
                  />
                  <p className="font-body-md text-on-surface-variant">
                    Faites glisser une image ici ou{" "}
                    <span className="text-primary font-bold">parcourez vos fichiers</span>
                  </p>
                  <p className="font-label-sm text-outline">PNG, JPG ou PDF jusqu'à 10MB</p>
                </div>
              </div>

              <button
                disabled={!text.trim()}
                onClick={run}
                className="w-full premium-button font-label-sm text-lg py-5 rounded-xl flex justify-center items-center gap-3 active:scale-95 transition-all"
              >
                Lancer l'analyse
              </button>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="fixed inset-0 z-[60] bg-surface/90 backdrop-blur-md flex items-center justify-center p-gutter">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-primary-container/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-primary-container animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="search_insights" className="!text-3xl text-primary-container" />
                </div>
              </div>
              <h3 className="font-headline-md">Analyse multicouche en cours...</h3>
              <p className="font-body-md text-on-surface-variant">
                Oluyewo coordonne ses agents spécialisés pour authentifier votre contenu.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
