import fs from 'fs';
import path from 'path';
import ffmpeg from "fluent-ffmpeg";
import { ApiCall } from "tsrpc";
import { Requploading, Resuploading } from "../../shared/protocols/uploader/Ptluploading";

const baseChunksUrl = "uploads/chunks";
const baseFileUrl = "uploads/file";
const TYPE_MAP = {
  img: "img",
  video: "video",
}


/**
 * 图片上传
 * @param call 
 */
export default async function (call: ApiCall<Requploading, Resuploading>) {
  const { chunkHash, chunk, fileHash, _type } = call.req;
  const CHUNKS_DIR = path.resolve(baseChunksUrl, TYPE_MAP[_type]) ;
  // 写入文件
  const chunksDir = path.resolve(CHUNKS_DIR, fileHash);
  if (!fs.existsSync(chunksDir)) {
    // 建文件路径
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  fs.writeFileSync(`${chunksDir}/${chunkHash}`, chunk);
  call.succ({
    msg: "上传成功"
  });
}