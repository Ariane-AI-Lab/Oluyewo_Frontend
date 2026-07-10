import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/Icon";
import type { VerificationResult } from "@/lib/types";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Verdict final — Oluyewo" },
      {
        name: "description",
        content: "Résultat détaillé de l'analyse Oluyewo, avec indice de confiance et sources.",
      },
      { property: "og:title", content: "Verdict final — Oluyewo" },
      {
        property: "og:description",
        content: "Verdict, indice de confiance et sources vérifiées.",
      },
    ],
  }),
  component: ResultPage,
});

const STORAGE_KEY = "oluyewo_last_result";

function ResultPage() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      setResult(JSON.parse(raw) as VerificationResult);
    } catch {
      setResult(null);
    }
  }, []);

  const verdict = useMemo(() => {
    const status = result?.statut?.trim();
    return status ? status.toUpperCase() : "NON DISPONIBLE";
  }, [result]);

  const confidence = useMemo(() => {
    if (typeof result?.score_certitude === "number" && Number.isFinite(result.score_certitude)) {
      return Math.round(result.score_certitude * 100);
    }
    return 0;
  }, [result]);

  const summary = useMemo(() => {
    return result?.analyse_narrative || "Le backend n’a pas encore fourni de résumé détaillé pour cette vérification.";
  }, [result]);

  const isFalseish = verdict.toLowerCase().includes("faux") || verdict.toLowerCase().includes("false") || verdict.toLowerCase().includes("non");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Résumé copié dans le presse-papier");
    } catch {
      toast.error("Impossible de copier le résumé");
    }
  };

  const handleExport = () => {
    if (!result) return;
    window.print();
  };

  return (
    <section className="px-gutter py-stack-lg flex-grow">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/verification"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm transition-colors"
        >
          <Icon name="arrow_back" className="!text-base" />
          Analyser un autre message
        </Link>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-headline-md text-on-surface">Verdict Final</h2>
              <p className="text-on-surface-variant font-body-md text-sm">
                Analyse complétée le {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div
              className={
                isFalseish
                  ? "inline-flex items-center gap-3 bg-error-container/40 text-error px-5 py-2 rounded-xl border border-error/20"
                  : "inline-flex items-center gap-3 bg-primary-container/20 text-primary px-5 py-2 rounded-xl border border-primary/20"
              }
            >
              <Icon name={isFalseish ? "dangerous" : "task_alt"} className="!text-2xl font-bold" />
              <span className="font-headline-md">{verdict}</span>
            </div>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle
                  className="text-outline-variant/20"
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <circle
                  className="text-primary-container"
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r="28"
                  stroke="currentColor"
                  strokeDasharray="176"
                  strokeDashoffset="26"
                  strokeWidth="6"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                {confidence}%
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="font-label-sm uppercase tracking-wider text-on-surface text-[10px]">
                Indice de Confiance (Ic)
              </p>
              <p className="text-on-surface-variant text-xs">
                Consensus très élevé entre les agents d'analyse.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h4 className="font-headline-md text-primary-container border-l-4 border-primary-container pl-4 text-lg">
                Résumé de la vérification
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-primary-container hover:bg-primary-container/10 border border-primary-container/20 rounded-lg font-label-sm text-xs transition-all active:scale-95"
                >
                  <Icon name="content_copy" className="!text-lg" />
                  Copier
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary hover:opacity-90 rounded-lg font-label-sm text-xs shadow-sm transition-all active:scale-95"
                >
                  <Icon name="download" className="!text-lg" />
                  Exporter PDF
                </button>
              </div>
            </div>
            <div className="bg-primary-container/5 p-6 rounded-xl space-y-4">
              <p className="font-body-md text-on-surface leading-relaxed">{summary}</p>
              <div className="space-y-2">
                <p className="font-label-sm text-on-surface-variant uppercase text-xs">
                  Sources vérifiées :
                </p>
                <div className="flex flex-wrap gap-2">
                  {result?.sources?.length ? (
                    result.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors"
                      >
                        <Icon name="link" className="!text-sm" />
                        {source.titre?.slice(0, 40) || source.url?.slice(0, 40)}...
                      </a>
                    ))
                  ) : (
                    <span className="text-[12px] inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-outline-variant">
                      <Icon name="info" className="!text-sm" /> Aucune source externe collectée
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-outline-variant/30 rounded-xl overflow-hidden animate-fade-in">
            <button
              onClick={() => setAccordionOpen((v) => !v)}
              className="w-full flex items-center justify-between p-4 bg-surface-container-highest/30 hover:bg-surface-container-highest/50 transition-colors"
            >
              <span className="font-label-sm text-on-surface flex items-center gap-2 text-left">
                <Icon name="search" className="text-primary" />
                Voir le parcours de réflexion détaillé des agents experts
              </span>
              <Icon name={accordionOpen ? "expand_less" : "expand_more"} />
            </button>
            {accordionOpen && (
              <div className="p-6 space-y-6 border-t border-outline-variant/30 bg-surface-container-lowest">
                <div className="relative pl-8 space-y-8 border-l-2 border-outline-variant/30 ml-4">

                  {/* Temps d'exécution */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <h5 className="font-label-sm">Temps d'exécution</h5>
                    <p className="text-sm text-on-surface-variant">
                      Analyse complétée en {result?.performance?.latence_totale_secondes ?? "—"} secondes • {result?.performance?.total_appels_api ?? "—"} appels API effectués
                    </p>
                  </div>

                  {/* Journal dynamique des agents */}
                  {result?.journal_agents?.map((entry, index) => {
                    if (entry.agent === "agent_verificateur_principal") {
                      const isFirst = index === 0;
                      const scorePercent = Math.round((entry.score_confiance ?? 0) * 100);
                      const scoreColor = scorePercent >= 85 ? "text-primary" : "text-amber-600";
                      return (
                        <div key={index} className="relative">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="manage_search" className="!text-sm text-primary-container" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-label-sm">
                                Agent Vérificateur Principal
                                {!isFirst && ` (passage ${entry.iteration + 1})`}
                              </h5>
                              <p className="text-sm text-on-surface-variant">
                                {isFirst
                                  ? "Analyse de l'image via recherche inversée Google Lens et évaluation du texte."
                                  : "Réévaluation du score de confiance après collecte de nouvelles preuves."}
                              </p>
                              <p className={`text-sm font-medium ${scoreColor}`}>
                                Score de confiance : {scorePercent}%
                                {scorePercent >= 85
                                  ? " → Confiance suffisante, direction la synthèse."
                                  : entry.iteration >= 2
                                  ? " → Garde-fou activé (3 itérations atteintes)."
                                  : " → Confiance insuffisante, lancement des recherches."}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (entry.agent === "agent_chercheur_web") {
                      return (
                        <div key={index} className="relative">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="language" className="!text-sm text-primary-container" />
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-label-sm">
                                Agent Chercheur Web (itération {entry.iteration + 1})
                              </h5>
                              <div className="space-y-1">
                                {entry.questions?.map((q: string, qi: number) => (
                                  <p key={qi} className="text-sm text-on-surface-variant flex items-start gap-1">
                                    <Icon name="search" className="!text-sm mt-0.5 flex-shrink-0" />
                                    {q}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}

                  {/* Synthétiseur — toujours en dernier */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="description" className="!text-sm text-primary-container" />
                      </div>
                      <div>
                        <h5 className="font-label-sm">Agent Synthétiseur</h5>
                        <p className="text-sm text-on-surface-variant">
                          Rédaction du rapport final — verdict : <strong>{result?.statut}</strong> avec un indice de confiance de {confidence}%.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
