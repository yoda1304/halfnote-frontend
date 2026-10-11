"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError, createHalfnoteClient } from "@halfnote/data";
import { HalfnoteProvider, queryClientDefaults } from "@halfnote/data/react";
import { ReactNode, useState } from "react";
import { logoutUser } from "@/app/actions/account_management_service";

// No onUnauthorized here: it only asks whether the session the browser holds now is still valid.
const probe = createHalfnoteClient({ baseUrl: "/api/halfnote" });
let checking = false;

// A 401 judges the credentials its request carried, which may predate a login.
// Sign out only when the session held now is rejected too. Anonymous visitors (no cookie) never probe.
function onUnauthorized() {
  if (checking || !document.cookie.split("; ").some((c) => c.startsWith("username="))) return;
  checking = true;
  probe.profile().then(
    () => {
      checking = false;
    },
    (err) => {
      // Offline or 5xx says nothing about the session: stay signed in.
      if (!(err instanceof ApiError && err.status === 401)) {
        checking = false;
        return;
      }
      void logoutUser().finally(() => location.assign("/"));
    },
  );
}

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryClientDefaults }));
  const [client] = useState(() =>
    createHalfnoteClient({ baseUrl: "/api/halfnote", onUnauthorized }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HalfnoteProvider client={client}>{children}</HalfnoteProvider>
    </QueryClientProvider>
  );
}
