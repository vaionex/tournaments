"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import useUser from "@/hooks/auth/useUser";
import { NovuProvider } from "@novu/notification-center";
import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

function CustomNovuProvider({ children }) {
  const { data: user, isLoading } = useUser();
  
  // If loading or no user, render children without NovuProvider
  if (isLoading || !user?.id) {
    return children;
  }

  return (
    <NovuProvider
      subscriberId={user.id}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID}
    >
      {children}
    </NovuProvider>
  );
}

export default function Providers({ children }) {
  const [client] = useState(() => new QueryClient());
  return (
    <Suspense>
      <QueryClientProvider client={client}>
        <CustomNovuProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </CustomNovuProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
