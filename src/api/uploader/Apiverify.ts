import fs from 'fs';
import path from "path";
import { ApiCall } from "tsrpc";
import { Reqverify, Resverify } from "../../shared/protocols/uploader/Ptlverify";

const BASE_CHUNK_URL = "uploads/chunks";
const BASE_FILE_URL = "uploads/file";
const TYPE_MAP = {
  img: "img",
  video: "video",
}

export default async function (call: ApiCall<Reqverify, Resverify>) {
  const { fileName, fileHash, _type } = call.req;
  const filePath = path.resolve(BASE_FILE_URL, TYPE_MAP[_type], `${fileHash}${extractExt(fileName)}`)

  if (fs.existsSync(filePath)) {
    call.succ({
      msg: "verify成功",
      isUploaded: true
    })
    return;
  }
  const chunkPath = path.resolve(BASE_CHUNK_URL, TYPE_MAP[_type], fileHash);
  const chunkList = fs.existsSync(chunkPath)
                      ? fs.readdirSync(chunkPath)
                      : [];
  call.succ({
    msg: "verify成功",
    isUploaded: false,
    chunkList: chunkList,
  });
}


function extractExt (fileName: string): string {
  return fileName.slice(fileName.lastIndexOf("."), fileName.length);
}