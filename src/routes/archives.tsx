import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { setAppStatus } from "@/lib/app-state";
import type { HistoryItem } from "@/lib/types";

export const Route = createFileRoute("/archives")({
  head: () => ({
    meta: [
      { title: "Historique d'analyse — Oluyewo" },
      {
        name: "description",
        content: "Consultez l'historique de vos vérifications réalisées avec Oluyewo.",
      },
      { property: "og:title", content: "Historique d'analyse — Oluyewo" },
      {
        property: "og:description",
        content: "Tous vos verdicts précédents, en un seul endroit.",
      },
    ],
  }),
  component: ArchivesPage,
});

function ArchivesPage() {
  const [rows, setRows] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      setAppStatus({ loading: true, error: null, message: null });
      try {
        const data = await apiRequest<HistoryItem[]>("/history");
        setRows(data);
        setAppStatus({ loading: false, error: null, message: null });
      } catch {
        setRows([]);
        setAppStatus({ loading: false, error: "Impossible de charger l’historique pour le moment.", message: null });
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <section className="px-gutter py-stack-lg flex-grow">
      <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-stack-md">
        <h2 className="font-headline-md">Historique des Analyses</h2>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
          {loading ? <p className="p-6 text-on-surface-variant">Chargement de l’historique…</p> : null}
          {!loading && rows.length === 0 ? <p className="p-6 text-on-surface-variant">Aucune analyse enregistrée pour le moment.</p> : null}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Contenu</th>
                  <th className="px-6 py-4">Verdict</th>
                  <th className="px-6 py-4">Confiance</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {rows.map((r, index) => {
                  const verdict = r.statut || "Inconnu";
                  const confidence = typeof r.score_certitude === "number" ? `${Math.round(r.score_certitude * 100)}%` : "—";
                  const content = r.contenu || r.analyse_narrative || "Aucun contenu";
                  const dateText = r.created_at || r.date || "—";
                  const isFalse = verdict.toLowerCase().includes("faux") || verdict.toLowerCase().includes("false");
                  return (
                    <tr key={r.id ?? r.verification_id ?? `${dateText}-${index}`} className="hover:bg-emerald-glow transition-colors">
                      <td className="px-6 py-4 text-sm">{dateText}</td>
                      <td className="px-6 py-4 truncate max-w-xs font-medium">{content}</td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            isFalse
                              ? "text-error font-bold bg-error-container/40 px-2 py-1 rounded"
                              : "text-primary font-bold bg-primary/10 px-2 py-1 rounded"
                          }
                        >
                          {verdict}
                        </span>
                      </td>
                      <td className="px-6 py-4">{confidence}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/result" className="text-primary font-label-sm hover:underline">
                          Détails
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
