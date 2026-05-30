import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";

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
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full font-label-sm">
      <span className="w-2 h-2 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function ExplanationPage() {
  return (
    <section className="px-gutter py-stack-lg emerald-gradient-bg relative overflow-hidden flex-grow">
      <div className="step-blob top-0 -left-20" />
      <div className="step-blob bottom-0 -right-20" />
      <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h1 className="font-display-lg-mobile md:font-display-lg max-w-4xl mx-auto leading-tight animate-fade-in">
            La vérité à portée de main, <br />
            <span className="text-primary relative">
              certifiée par l'IA.
              <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/10 -z-10" />
            </span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto animate-fade-in">
            Oluyewo analyse les rumeurs circulant sur WhatsApp et les réseaux sociaux au Bénin
            pour vous offrir une clarté instantanée.
          </p>
        </div>

        <div className="space-y-32">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="md:w-1/2 space-y-6">
              <Pill>Étape 01</Pill>
              <h2 className="font-headline-md md:font-display-lg-mobile">Déposez votre alerte</h2>
              <p className="font-body-lg text-on-surface-variant">
                Collez un texte WhatsApp, transférez un audio ou glissez une image suspecte. Notre
                interface intuitive s'adapte à tous vos formats de contenu pour une analyse
                immédiate.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 font-body-md">
                  <Icon name="check_circle" className="text-primary" /> Supporte les captures WhatsApp
                </li>
                <li className="flex items-center gap-3 font-body-md">
                  <Icon name="check_circle" className="text-primary" /> Glisser-déposer ultra-rapide
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-3xl mockup-shadow transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30">
                  <div className="p-4 border-b border-outline-variant/20 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/30" />
                    <div className="w-3 h-3 rounded-full bg-green-400/30" />
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center min-h-[240px] space-y-4">
                    <div className="w-full h-12 bg-white rounded-lg border-2 border-dashed border-primary/30 flex items-center px-4">
                      <div className="h-2 w-32 bg-primary/10 rounded-full animate-pulse" />
                    </div>
                    <div className="w-full p-4 bg-white rounded-xl shadow-sm border border-outline-variant/10">
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
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
            <div className="md:w-1/2 space-y-6">
              <Pill>Étape 02</Pill>
              <h2 className="font-headline-md md:font-display-lg-mobile">Enquête en direct</h2>
              <p className="font-body-lg text-on-surface-variant">
                Nos agents IA parcourent le web, les rapports d'ONG et les sources officielles
                béninoises pour recouper les faits en quelques secondes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-primary/10">
                  <p className="text-primary font-bold text-xl">150+</p>
                  <p className="text-[12px] text-on-surface-variant">Sources scannées</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-primary/10">
                  <p className="text-primary font-bold text-xl">&lt; 30s</p>
                  <p className="text-[12px] text-on-surface-variant">Temps d'analyse</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-3xl mockup-shadow transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-primary/5 rounded-2xl p-8 min-h-[240px]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                        <Icon name="search" className="!text-sm" />
                      </div>
                      <div className="h-2 w-3/4 bg-primary/20 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/60 flex items-center justify-center text-on-primary">
                        <Icon name="language" className="!text-sm" />
                      </div>
                      <div className="h-2 w-1/2 bg-primary/10 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-on-primary">
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
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="md:w-1/2 space-y-6">
              <Pill>Étape 03</Pill>
              <h2 className="font-headline-md md:font-display-lg-mobile">Le Verdict Clair</h2>
              <p className="font-body-lg text-on-surface-variant">
                Recevez une réponse sans ambiguïté : Vrai, Faux, ou Neutre. Chaque verdict est
                accompagné de preuves tangibles et de liens vers les sources officielles.
              </p>
              <Link
                to="/verification"
                className="premium-button font-label-sm text-lg px-10 py-5 rounded-full inline-flex items-center gap-3 active:scale-95 transition-all"
              >
                Commencer maintenant
                <Icon name="bolt" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative p-2 bg-white rounded-3xl mockup-shadow transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-on-surface-variant">
                      Rapport de vérification
                    </span>
                    <span className="px-2 py-1 rounded bg-error-container/40 text-error text-[10px] font-bold">
                      FAUX
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-surface-container rounded-full" />
                    <div className="h-2 w-full bg-surface-container rounded-full" />
                    <div className="h-2 w-2/3 bg-surface-container rounded-full" />
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-container/40" />
                    <div className="w-6 h-6 rounded-full bg-primary-container/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary rounded-[40px] p-12 text-center text-on-primary space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="font-headline-md md:font-display-lg relative z-10">
            Rejoignez la lutte contre la désinformation
          </h2>
          <p className="font-body-lg max-w-2xl mx-auto opacity-90 relative z-10">
            Gratuit, anonyme et conçu pour les citoyens du Bénin. Ne laissez plus le doute
            s'installer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/verification"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-surface-container-low transition-colors"
            >
              Vérifier mon premier message
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
