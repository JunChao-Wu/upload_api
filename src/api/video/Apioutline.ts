import { ApiCall } from "tsrpc";
import { Reqoutline, Resoutline } from "../../shared/protocols/video/Ptloutline";
import { Video, _video } from "../../db/Video";

export default async function (call: ApiCall<Reqoutline, Resoutline>) {
  let video = new Video()
  const list = await video.queryAll();
  call.succ({
    videos: list.map((data: _video) => {
      return data.duration = Number(data.duration);
    })
  })
}