import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import type { SSRExchange } from "next-urql";
import { NextUrqlClientConfig } from "next-urql";

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange: SSRExchange) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    ssrExchange,
    fetchExchange,
  ],
});