import { BaseFlow } from "../../../utils/flows/impl/BaseFlow";
/**
 * 加载视频大纲
 */
export interface Reqoutline {
  path: string
}

export interface Resoutline {
  videos: Array<object>,
}

export const conf: BaseFlow = {
  all: false,
}
