import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oluyewo — Comment ça marche" },
      {
        name: "description",
        content:
          "Découvrez comment Oluyewo vérifie en quelques secondes les rumeurs qui circulent au Bénin.",
      },
      { property: "og:title", content: "Oluyewo — Comment ça marche" },
      {
        property: "og:description",
        content: "Trois étapes pour démêler le vrai du faux.",
      },
    ],
  }),
  component: ExplanationPage,
});

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function ExplanationPage() {
  const isLoggedIn = useAuth();
  return (
    <section className="px-gutter py-stack-md emerald-gradient-bg relative overflow-hidden flex-grow">
      <div className="step-blob top-0 -left-20" />
      <div className="step-blob bottom-0 -right-20" />
      <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight animate-fade-in">
            La vérité à portée de main, <br />
            <span className="text-primary">certifiée par l'IA.</span>
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto animate-fade-in">
            Oluyewo analyse les rumeurs circulant sur WhatsApp et les réseaux sociaux au Bénin
            pour vous offrir une clarté instantanée.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-4">
              <Pill>Étape 01</Pill>
              <h2 className="text-2xl md:text-3xl font-bold">Déposez votre alerte</h2>
              <p className="font-body-md text-on-surface-variant">
                Collez un texte WhatsApp, transférez un audio ou glissez une image suspecte. Notre
                interface intuitive s'adapte à tous vos formats de contenu pour une analyse
                immédiate.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-body-md text-sm">
                  <Icon name="check_circle" className="text-primary !text-base" /> Supporte les captures WhatsApp
                </li>
                <li className="flex items-center gap-2 font-body-md text-sm">
                  <Icon name="check_circle" className="text-primary !text-base" /> Glisser-déposer ultra-rapide
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-2xl mockup-shadow transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30">
                  <div className="p-3 border-b border-outline-variant/20 flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/30" />
                  </div>
                  <div className="p-6 flex flex-col items-center justify-center min-h-[180px] space-y-3">
                    <div className="w-full h-10 bg-white rounded-lg border-2 border-dashed border-primary/30 flex items-center px-3">
                      <div className="h-2 w-24 bg-primary/10 rounded-full animate-pulse" />
                    </div>
                    <div className="w-full p-3 bg-white rounded-lg shadow-sm border border-outline-variant/10">
                      <p className="text-[10px] text-on-surface-variant italic">
                        "Attention, la SBEE annonce une coupure..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-4">
              <Pill>Étape 02</Pill>
              <h2 className="text-2xl md:text-3xl font-bold">Enquête en direct</h2>
              <p className="font-body-md text-on-surface-variant">
                Nos agents IA parcourent le web, les rapports d'ONG et les sources officielles
                béninoises pour recouper les faits en quelques secondes.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-primary/10">
                  <p className="text-primary font-bold text-lg">150+</p>
                  <p className="text-[11px] text-on-surface-variant">Sources scannées</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-primary/10">
                  <p className="text-primary font-bold text-lg">&lt; 30s</p>
                  <p className="text-[11px] text-on-surface-variant">Temps d'analyse</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-2xl mockup-shadow transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-primary/5 rounded-xl p-6 min-h-[180px]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                        <Icon name="search" className="!text-sm" />
                      </div>
                      <div className="h-2 w-3/4 bg-primary/20 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/60 flex items-center justify-center text-on-primary">
                        <Icon name="language" className="!text-sm" />
                      </div>
                      <div className="h-2 w-1/2 bg-primary/10 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-on-primary">
                        <Icon name="verified_user" className="!text-sm" />
                      </div>
                      <div className="h-2 w-2/3 bg-primary/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-4">
              <Pill>Étape 03</Pill>
              <h2 className="text-2xl md:text-3xl font-bold">Le Verdict Clair</h2>
              <p className="font-body-md text-on-surface-variant">
                Recevez une réponse sans ambiguïté : Vrai, Faux, ou Neutre. Chaque verdict est
                accompagné de preuves tangibles et de liens vers les sources officielles.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-2xl mockup-shadow transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl p-5 border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-on-surface-variant">
                      Rapport de vérification
                    </span>
                    <span className="px-2 py-1 rounded bg-error-container/40 text-error text-[10px] font-bold">
                      FAUX
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-surface-container rounded-full" />
                    <div className="h-2 w-full bg-surface-container rounded-full" />
                    <div className="h-2 w-2/3 bg-surface-container rounded-full" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary-container/40" />
                    <div className="w-5 h-5 rounded-full bg-primary-container/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary rounded-[32px] p-8 md:p-10 text-center text-on-primary space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-2xl md:text-3xl font-bold relative z-10">
            {isLoggedIn
              ? "Prêt à vérifier une nouvelle rumeur ?"
              : "Rejoignez la lutte contre la désinformation"}
          </h2>
          <p className="font-body-md max-w-2xl mx-auto opacity-90 relative z-10">
            {isLoggedIn
              ? "Soumettez un message suspect et obtenez un verdict en moins de 30 secondes."
              : "Gratuit, anonyme et conçu pour les citoyens du Bénin. Ne laissez plus le doute s'installer."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              to="/verification"
              className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-surface-container-low transition-colors"
            >
              {isLoggedIn ? "Lancer une analyse" : "Vérifier mon premier message"}
            </Link>
            {!isLoggedIn && (
              <Link
                to="/signup"
                className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Créer un compte
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
