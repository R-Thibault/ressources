import "@/assets/scss/main.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { API_URL } from "@/config/config";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { MY_PROFILE } from "@/Request/user";

type UserInfo = {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
};

type UserProviderProps = {
  children: ReactNode;
};

const link = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const publicPages = ["/sign-in", "/sign-up", "/", "/ads/[id]"];

export const UserContext = createContext<UserInfo[] | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const { data, error, loading } = useQuery(MY_PROFILE); 
  const user = data?.item;
// gérer les erreurs 
  console.log("UserContext data:", user);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

function Auth(props: { children: React.ReactNode }) {
  const router = useRouter();

  const { data, error } = useQuery<{ id: number; email: string }>(MY_PROFILE);

  useEffect(() => {
    if (!publicPages.includes(router.pathname)) {
      if (error) {
        router.replace("/sign-in");
      }
    }
  }, [router, error, data]);
  return props.children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
      </UserProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
