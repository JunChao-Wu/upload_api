
/**
 * 存储上传文件
 */
export interface Reqmerge {
  fileName: string,
  fileHash: string,
  size: number,
  _type: fileType,
}

export interface Resmerge {
  msg: string,
}

export type fileType = "img" | "video";