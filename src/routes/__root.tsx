import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { AppContext, useAppStateProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/CommandPalette";
import { ConfirmProvider } from "@/components/ConfirmDialog";
import { GlobalShortcuts } from "@/components/GlobalShortcuts";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sector Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested resource does not exist or has been classified.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "greyLock — Watchlist Intelligence System" },
      {
        name: "description",
        content: "Secure watchlist management and intelligence analysis platform",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

function RootComponent() {
  const appState = useAppStateProvider();
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);

  return (
    <AppContext.Provider value={appState}>
      <ConfirmProvider>
        {isPublic ? (
          <Outlet />
        ) : (
          <AppLayout>
            <Outlet />
          </AppLayout>
        )}
        {!isPublic && <CommandPalette />}
        {!isPublic && <GlobalShortcuts />}
        <Toaster />
      </ConfirmProvider>
    </AppContext.Provider>
  );
}
