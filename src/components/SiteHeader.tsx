import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Icon } from "./Icon";
import { useAuth } from "@/lib/auth-store";
import { useState } from "react";
import logo from "@/assets/oluyewo-logo.png";

const navLink =
  "font-body-md hover:text-primary transition-colors pb-1 border-b-2 border-transparent text-on-surface-variant";
const navLinkActive = "font-body-md pb-1 border-b-2 text-primary font-bold border-primary";

export function SiteHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const [open, setOpen] = useState(false);

  const items: { to: string; label: string; show?: boolean }[] = [
    { to: "/", label: "Comment ça marche ?" },
    { to: "/verification", label: "Vérifier une rumeur" },
    { to: "/archives", label: "Historique d'analyse", show: isLoggedIn },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm bg-[color:var(--glass-bg)]">
      <div className="flex justify-between items-center px-gutter py-3 max-w-[var(--spacing-container-max)] mx-auto">
        <Link to="/" className="flex items-center gap-2" aria-label="Oluyewo">
          <img src={logo} alt="Oluyewo" className="h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {items
            .filter((i) => i.show !== false)
            .map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className={pathname === i.to ? navLinkActive : navLink}
              >
                {i.label}
              </Link>
            ))}
          {isLoggedIn ? (
            <button
              onClick={() => navigate({ to: "/profile" })}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-container/20 text-primary hover:bg-primary hover:text-on-primary transition-all"
              aria-label="Mon profil"
            >
              <Icon name="person" />
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm active:scale-95 transition-transform"
            >
              Se connecter
            </Link>
          )}
        </nav>

        <button
          className="md:hidden text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant/30 bg-white">
          <div className="flex flex-col p-4 gap-2">
            {items
              .filter((i) => i.show !== false)
              .map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className={pathname === i.to ? "text-primary font-bold py-2" : "text-on-surface-variant py-2"}
                >
                  {i.label}
                </Link>
              ))}
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="text-on-surface-variant py-2"
              >
                Mon profil
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-center mt-2"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
