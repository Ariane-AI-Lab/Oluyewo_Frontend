import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { clearAppStatus, getAppStatus, useAppStatus } from "@/lib/app-state";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Cette page ne s'est pas chargée</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Quelque chose s'est mal passé. Essayez de rafraîchir.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-outline-variant bg-background px-4 py-2 text-sm"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oluyewo — Fact-checking au Bénin" },
      {
        name: "description",
        content:
          "Oluyewo analyse les rumeurs WhatsApp et réseaux sociaux au Bénin avec l'IA pour offrir une clarté instantanée.",
      },
      { property: "og:title", content: "Oluyewo — Fact-checking au Bénin" },
      {
        property: "og:description",
        content:
          "Vérifiez en quelques secondes les rumeurs qui circulent au Bénin grâce à nos agents IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap",
      },
    ],
    htmlAttrs: { lang: "fr" },
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const status = useAppStatus();

  useEffect(() => {
    if (!status.error && !status.message) return;
    const timer = window.setTimeout(() => clearAppStatus(), 4000);
    return () => window.clearTimeout(timer);
  }, [status.error, status.message]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-surface">
        <SiteHeader />
        <main className="pt-20 flex-grow flex flex-col">
          {status.loading ? (
            <div className="mx-auto my-8 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm text-on-surface-variant shadow-sm">
              Chargement en cours…
            </div>
          ) : null}
          {status.error ? (
            <div className="mx-auto my-4 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {status.error}
            </div>
          ) : null}
          {status.message ? (
            <div className="mx-auto my-4 max-w-2xl rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
              {status.message}
            </div>
          ) : null}
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="bottom-center" />
      </div>
    </QueryClientProvider>
  );
}
