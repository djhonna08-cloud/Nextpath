const serverless = require("serverless-http");
const { createApp } = require("../../server");
const { createPostgresDatabase } = require("../../postgres-database");

const database = createPostgresDatabase({ initializeSchema: false });
const app = createApp({ database, serveClientFiles: false });
const handle = serverless(app);

exports.handler = async (event, context) => {
  await database.ready;
  return handle(event, context);
};
