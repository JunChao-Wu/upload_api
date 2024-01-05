import fs from "fs";
import { HttpConnection, HttpServer } from "tsrpc";


export function vplay(server: HttpServer) {
  server.flows.preRecvDataFlow.push(async v => {
    let conn = v.conn as HttpConnection;

    if (conn.httpReq.method === 'GET' && conn.httpReq.url === "/video/vplay") {
      const headers = conn.httpReq.headers;
      // 从headers拿参数
      const { path, start, end } = conn.httpReq.headers;
      console.log("🚀 ~ file: vplay.ts:13 ~ vplay ~ path:", path)
      // const path = "uploads/file/video/ccba009531000cd576c3b1266e0e3341.mp4";
      const chunkSize = 614400;
      conn.httpRes.setHeader("Content-Range", `bytes ${0}-${chunkSize - 1}/${chunkSize * 100}`)
      conn.httpRes.setHeader("Accept-Ranges", "bytes")
      conn.httpRes.setHeader("Content-Type", "video/mp4")
      conn.httpRes.statusCode = 206;
      // console.log("🚀 ~ file: vplay.ts:17 ~ vplay ~ conn.httpRes:", conn.httpRes)
      let content = await doReadFileRange(path as string, Number(start), Number(end));
      // console.log("🚀 ~ file: vplay.ts:16 ~ vplay ~ content:", content)
      
      conn.httpRes.end(content);
      // conn.httpRes.end("hello");
      return undefined;
    }

    return v;
  })
}


async function doReadFileRange(path: string, start: number, end: number): Promise<ArrayBuffer> {
  let bufferRes = Buffer.alloc(0);
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(path, {
      start: start,
      end: end,
    });
    
    stream.on("data", (chunk) => {
      bufferRes = Buffer.concat([bufferRes, chunk as Buffer]);
    });
    stream.on("end", async () => {
      resolve(bufferRes)
    })
  })
}