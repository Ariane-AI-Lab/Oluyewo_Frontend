import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ChangeEvent } from "react";
import { Icon } from "@/components/Icon";
import { apiRequest } from "@/lib/api";
import { setAppStatus } from "@/lib/app-state";
import type { VerificationResult } from "@/lib/types";

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

const AGENTS = [
  { icon: "manage_search", title: "Agent Vérificateur Principal", desc: "Analyse de la rumeur en cours..." },
  { icon: "language", title: "Agent Chercheur Web", desc: "Recherche de preuves sur le web..." },
  { icon: "description", title: "Agent Synthétiseur", desc: "Rédaction du rapport final..." },
];

function VerificationPage() {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const interval = setInterval(() => {
      setStep((s) => s + 1);
    }, 800);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const canSubmit = Boolean(text.trim() || selectedFile);

  const run = async () => {
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    setAppStatus({ loading: true, error: null, message: "Analyse en cours…" });

    try {
      const formData = new FormData();
      formData.append("rumor_text", text.trim() || selectedFile?.name || "Image téléchargée");
      if (selectedFile) {
        formData.append("image_file", selectedFile);
      }

      const result = await apiRequest<VerificationResult>("/verify-rumor", {
        method: "POST",
        body: formData,
      });

      window.localStorage.setItem("oluyewo_last_result", JSON.stringify(result));
      setAppStatus({ loading: false, error: null, message: "Analyse terminée." });
      navigate({ to: "/result" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Impossible de vérifier ce contenu.";
      setError(message);
      setLoading(false);
      setAppStatus({ loading: false, error: message, message: null });
    }
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
                <label className="block border-2 border-dashed border-outline-variant/50 bg-surface-container-low/50 rounded-xl p-10 text-center space-y-4 hover:border-primary-container hover:bg-emerald-glow transition-all cursor-pointer group">
                  <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
                  <Icon
                    name="cloud_upload"
                    className="!text-4xl text-on-surface-variant group-hover:text-primary-container transition-colors"
                  />
                  <p className="font-body-md text-on-surface-variant">
                    Faites glisser une image ici ou{" "}
                    <span className="text-primary font-bold">parcourez vos fichiers</span>
                  </p>
                  <p className="font-label-sm text-outline">PNG, JPG ou PDF jusqu'à 10MB</p>
                  {selectedFile ? (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary-container/40 bg-primary-container/10 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                      <Icon name="check_circle" className="!text-base" />
                      <span>{selectedFile.name}</span>
                    </div>
                  ) : null}
                </label>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                disabled={!canSubmit || loading}
                onClick={run}
                className="w-full premium-button font-label-sm text-lg py-5 rounded-xl flex justify-center items-center gap-3 active:scale-95 transition-all"
              >
                {loading ? "Analyse en cours…" : "Lancer l'analyse"}
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

            <div className="space-y-6">
              {AGENTS.map((a, i) => (
                <div
                  key={a.title}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{ opacity: i <= step ? 1 : 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary flex-shrink-0">
                    <Icon name={a.icon} className="!text-xl" />
                  </div>
                  <div>
                    <p className="font-label-sm text-on-surface">{a.title}</p>
                    <p className="text-[12px] text-on-surface-variant">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
