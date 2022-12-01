import express, { Express, Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const app: Express = express();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello ts");
// });

// app.listen(4000, () => {
//   console.log("Server running");
// });

interface Msg {
  text: string;
  author: string;
}

const messages: Msg[] = [
  {
    text: "message1",
    author: "gansukh",
  },
  {
    text: "message 2",
    author: "enku",
  },
];

const typeDefs = `#graphql
    type Message {
        text: String
        author: String
    }
    type Query {
        messages(author: String): [Message]
    }
    input MessageInput {
        text: String
        author: String
    }
    type Mutation {
        sendMessage(input: MessageInput): [Message]
    }

`;

const resolvers = {
  Query: {
    messages: (_: any, args: any, context: any) => {
      console.log(args.author);
      let res: Msg[] = [];
      for (let msg of messages) {
        if (msg.author === args.author) {
          res.push(msg);
        }
      }
      return res;
    },
  },
  Mutation: {
    sendMessage: (_: any, args: any, context: any) => {
      console.log(args);
      messages.push(args.input);
      return messages;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`${url}`);
