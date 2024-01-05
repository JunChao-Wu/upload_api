
/**
 * 存储上传文件
 */
export interface Requploading {
  chunk: Uint8Array,  // 可直接使用 Uint8Array
  chunkHash: string,
  fileName: string,
  fileHash: string,
  _type: fileType,
}

export interface Resuploading {
  msg: string,
}

export type fileType = "img" | "video";
