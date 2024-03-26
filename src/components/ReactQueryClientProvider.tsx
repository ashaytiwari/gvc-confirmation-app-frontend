'use client';

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IComponentChildrenProps } from "@/interfaces/uiInterfaces/common";

const ReactQueryClientProvider: React.FC<IComponentChildrenProps> = (props) => {

  const { children } = props;

  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

};

export default ReactQueryClientProvider;