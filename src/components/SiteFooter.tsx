import { Link } from "@tanstack/react-router";
import { Icon } from "./Icon";
import { useAuth } from "@/lib/auth-store";

export function SiteFooter() {
  const isLoggedIn = useAuth();
  return (
    <footer className="w-full py-stack-lg bg-surface-container-highest border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter max-w-[var(--spacing-container-max)] mx-auto">
        <div className="space-y-4">
          <h2 className="font-headline-md text-on-surface font-bold">Oluyewo</h2>
          <p className="font-body-md text-on-surface-variant">
            La transparence au service du citoyen béninois.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-label-sm text-primary uppercase tracking-wider">Navigation</h4>
          <nav className="flex flex-col space-y-1">
            <Link to="/" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors underline">
              Accueil
            </Link>
            {isLoggedIn && (
              <Link to="/archives" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors underline">
                Historique d'analyse
              </Link>
            )}
            <a href="#" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors underline">
              Mentions Légales
            </a>
          </nav>
        </div>
        <div className="space-y-2">
          <h4 className="font-label-sm text-primary uppercase tracking-wider">Aide</h4>
          <nav className="flex flex-col space-y-1">
            <a href="#" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors underline">Contact</a>
            <a href="#" className="font-label-sm text-on-surface-variant hover:text-primary transition-colors underline">Partenariats</a>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-sm text-primary uppercase tracking-wider">Suivez-nous</h4>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
              <Icon name="public" className="!text-lg" />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
              <Icon name="forum" className="!text-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center border-t border-outline-variant/30 pt-8 px-gutter">
        <p className="font-label-sm text-on-surface-variant">
          © 2026 Oluyewo. Tous droits réservés. Plateforme de vérification des faits au Bénin.
        </p>
      </div>
    </footer>
  );
}
