import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/Icon";

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

const TIMELINE = [
  {
    title: "Agent Décomposeur",
    desc: "A identifié 3 affirmations clés portant sur la date, la durée et l'origine de la source SBEE.",
  },
  {
    title: "Agent Chercheur",
    desc: "Recherche infructueuse dans la presse locale (La Nation, Banouto) et sur les flux Twitter officiels.",
  },
  {
    title: "Évaluateur Logique",
    desc: "Absence de ton alarmiste suspect, mais ponctuation excessive détectée.",
  },
];

function ResultPage() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const summary = `L'information prétendant une coupure nationale d'électricité prévue pour ce weekend est infondée. Après consultation des canaux officiels de la SBEE et des communiqués gouvernementaux, aucune opération de maintenance de cette envergure n'est programmée.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Résumé copié dans le presse-papier");
    } catch {
      toast.error("Impossible de copier le résumé");
    }
  };

  const handleExport = () => {
    toast.success("Rapport PDF exporté avec succès");
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
                Analyse complétée le 24 Mai 2026
              </p>
            </div>
            <div className="inline-flex items-center gap-3 bg-error-container/40 text-error px-5 py-2 rounded-xl border border-error/20">
              <Icon name="dangerous" className="!text-2xl font-bold" />
              <span className="font-headline-md">FAUX</span>
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
                85%
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
              <p className="font-body-md text-on-surface leading-relaxed">
                L'information prétendant une coupure nationale d'électricité prévue pour ce weekend
                est <strong>infondée</strong>. Après consultation des canaux officiels de la SBEE
                et des communiqués gouvernementaux, aucune opération de maintenance de cette
                envergure n'est programmée. Le texte présente les caractéristiques typiques d'un
                "copier-coller" viral sans source identifiable.
              </p>
              <div className="space-y-2">
                <p className="font-label-sm text-on-surface-variant uppercase text-xs">
                  Sources vérifiées :
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="text-primary hover:underline text-[12px] inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-outline-variant"
                  >
                    <Icon name="link" className="!text-sm" /> Site officiel de la SBEE
                  </a>
                  <a
                    href="#"
                    className="text-primary hover:underline text-[12px] inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-outline-variant"
                  >
                    <Icon name="link" className="!text-sm" /> Portail Gouv.bj
                  </a>
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
                  {TIMELINE.map((t) => (
                    <div key={t.title} className="relative">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                      <h5 className="font-label-sm">{t.title}</h5>
                      <p className="text-sm text-on-surface-variant">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
