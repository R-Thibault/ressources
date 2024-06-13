import "@/assets/scss/main.scss";
// import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  split,
} from "@apollo/client";
import { API_URL } from "@/config/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MY_PROFILE } from "@/requests/user";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { UserType } from "@/types/user.types";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const link = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: API_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  link
);

new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const publicPages = [
  "/sign-in",
  "/sign-up",
  "/",
  "/request-reset-password",
  "/reset-password",
  "/validation",
  "/token-expired",
];

function Auth(props: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, error } = useQuery<{ item: UserType | null }>(MY_PROFILE);

  useEffect(() => {
    if (!publicPages.includes(router.pathname)) {
      if (error || data?.item === null) {
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
