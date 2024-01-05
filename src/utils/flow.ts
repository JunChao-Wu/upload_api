import { HttpServer } from "tsrpc";

import { vplay } from "./flows/vplay";


export function initFlows(server: HttpServer): void {
  const flowList: Function[] = [
    vplay
  ];
  for (let i = 0; i < flowList.length; i++) {
    const flow = flowList[i];
    flow(server);
  }
}
