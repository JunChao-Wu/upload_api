import { BaseFlow } from "../../../utils/flows/impl/BaseFlow";
/**
 * 加载视频大纲
 */
export interface Reqcontent {
  id: number
}

export interface Rescontent {
  vcontent: object,
}

export const conf: BaseFlow = {
  all: false,
}
