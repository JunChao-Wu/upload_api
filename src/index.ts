import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { initFlows } from "./utils/flow";
import { mysql, tryMysql } from "./utils/dbUtil/mysql";

// Create the Server
const server = new HttpServer(serviceProto, {
  port: 3002,
  // Remove this to use binary mode (remove from the client too)
  json: true
});

// Initialize before server start
async function init() {
  // Auto implement APIs
  await server.autoImplementApi(path.resolve(__dirname, 'api'));
  initFlows(server);
  await tryMysql(mysql);
  // TODO
  // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
  await init();
  await server.start();
};
main();