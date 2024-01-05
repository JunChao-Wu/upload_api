import { ApiCall } from "tsrpc";
import { Reqcontent, Rescontent } from "../../shared/protocols/video/Ptlcontent";
import { Video, _video } from "../../db/Video";

export default async function (call: ApiCall<Reqcontent, Rescontent>) {
  const { id } = call.req;

  const vData = await new Video().findById({id});

  call.succ({
    vcontent: vData
  });
}