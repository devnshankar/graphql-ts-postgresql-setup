import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there i am gql server`,
        say: (_, {name}: {name: string}) => `Hey ${name}, How are you?`
      },
    },
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`------------------------------------------------------------`);
    console.log(
      `Server with pid=${process.pid} \nis running on http://localhost:${PORT}/graphql`
    );
    console.log(`------------------------------------------------------------`);
  });
}

init();
