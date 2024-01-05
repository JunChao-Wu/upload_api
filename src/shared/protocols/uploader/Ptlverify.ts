
/**
 * 存储上传文件
 */
export interface Reqverify {
  fileName: string,
  fileHash: string,
  _type: fileType,
}

export interface Resverify {
  msg: string,
  isUploaded: boolean,
  chunkList?: Array<string>,
}

export type fileType = "img" | "video";