import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { getAuthToken } from "../services/auth";
import { httpUrl, wsUrl } from "./vars";

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const wsLink = new WebSocketLink({
  uri: wsUrl + "/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(createUploadLink({ uri: httpUrl + "/graphql" }))
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export { client };
