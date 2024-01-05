import "@/styles/globals.css";
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
import { useEffect } from "react";
import { MY_PROFILE } from "@/Request/user";

const link = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const publicPages = ["/sign-in", "/sign-up", "/", "/ads/[id]"];

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
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
