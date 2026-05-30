import { createFileRoute, Link } from "@tanstack/react-router";

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
  const rows = [
    {
      date: "23/05/2026",
      content: "Coupure de courant nationale SBEE...",
      verdict: "FAUX",
      confidence: "85%",
    },
    {
      date: "21/05/2026",
      content: "Nouvelle taxe sur les transferts mobiles...",
      verdict: "FAUX",
      confidence: "92%",
    },
    {
      date: "18/05/2026",
      content: "Calendrier officiel des examens du BAC...",
      verdict: "VRAI",
      confidence: "97%",
    },
  ];

  return (
    <section className="px-gutter py-stack-lg flex-grow">
      <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-stack-md">
        <h2 className="font-headline-md">Historique des Analyses</h2>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
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
                {rows.map((r) => {
                  const isFalse = r.verdict === "FAUX";
                  return (
                    <tr key={r.date} className="hover:bg-emerald-glow transition-colors">
                      <td className="px-6 py-4 text-sm">{r.date}</td>
                      <td className="px-6 py-4 truncate max-w-xs font-medium">{r.content}</td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            isFalse
                              ? "text-error font-bold bg-error-container/40 px-2 py-1 rounded"
                              : "text-primary font-bold bg-primary/10 px-2 py-1 rounded"
                          }
                        >
                          {r.verdict}
                        </span>
                      </td>
                      <td className="px-6 py-4">{r.confidence}</td>
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
