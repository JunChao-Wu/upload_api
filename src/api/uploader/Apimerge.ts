import fs from 'fs';
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { ApiCall } from "tsrpc";
import { Reqmerge, Resmerge, fileType } from "../../shared/protocols/uploader/Ptlmerge";
import { Video } from "../../db/Video";

const filterPath = "G:\\projects\\upload_api\\";

const BASE_CHUNK_URL = "uploads/chunks";
const BASE_FILE_URL = "uploads/file";
const TYPE_MAP = {
  img: "img",
  video: "video",
}


export default async function (call: ApiCall<Reqmerge, Resmerge>) {
  const { fileName, fileHash, size, _type } = call.req;

  const FILE_DIR = path.resolve(BASE_FILE_URL, TYPE_MAP[_type]);
  if (!fs.existsSync(FILE_DIR)) {
    fs.mkdirSync(FILE_DIR, { recursive: true });
  }


  const filePath = path.resolve(FILE_DIR, `${fileHash}${extractExt(fileName)}`);
  if (fs.existsSync(filePath)) {
    call.succ({
      msg: "合并成功, 已有"
    })
    return;
  }

  const OUTPUT_DIR = path.resolve(FILE_DIR, "outchunk");
  const outputDir = path.resolve(OUTPUT_DIR, fileHash);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  // const outputPath = path.resolve(outputDir, `${fileHash}.m3u8`);
  const outputPath = path.resolve(outputDir, `${fileHash}.mpd`);

  const chunksDir = path.resolve(BASE_CHUNK_URL, TYPE_MAP[_type], fileHash);
  if (!fs.existsSync(chunksDir)) {
    call.succ({
      msg: "合并失败, 请重新上传"
    })
    return;
  }

  mergerFileChunks(filePath, fileHash, size, _type);


  // 计算视频长度,和总大小
  // ffmpeg.ffprobe(filePath, (err: any, data: any) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   const vsize = data.format.size;
  //   const duration = data.format.duration;
  //   // 存储信息到数据库
  //   new Video().add({
  //     vname: getFileName(fileName),
  //     filepath: filePath.split(filterPath).join("").replace(/\\/g, `/`),
  //     m3u8path: outputPath.split(filterPath).join("").replace(/\\/g, `/`),
  //     vsize: vsize,
  //     duration: duration,
  //   });
  // });




  // 计算视频长度,和总大小
  // ffmpeg.ffprobe(outPath, (err: any, data: any) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   const vsize = data.format.size;
  //   console.log("🚀 ~ file: Apimerge.ts:67 ~ ffmpeg.ffprobe ~ vsize:", vsize)
  //   const duration = data.format.duration;
  //   console.log("🚀 ~ file: Apimerge.ts:69 ~ ffmpeg.ffprobe ~ duration:", duration)
  // });


    // 转格式
    // const command = ffmpeg(filePath)
    // .videoCodec("libx264")
    // .format("hls")
    // .outputOptions("-hls_list_size 0")
    // .outputOption("-hls_time 5")
    // .output(outputPath)
    //   .on("start", (commandLine) => {
    //     console.log("Spawned Ffmpeg with command: " + commandLine)
    //   })
    //   .on("progress", (progress) => {
    //     console.log("progressing: " + progress.percent + "% done")
    //   })
    //   .on("error", (err, stdout, stderr) => {
    //     console.log(err);
    //   })
    //   .on("end", () => {
    //     console.log("已切分");
    //   })
    // command.run();
    // 转格式
    console.log("🚀 ~ file: Apimerge.ts:132 ~ outputPath:", outputPath)
    const command = ffmpeg(filePath)
    .videoCodec("libx264")
    .format("dash")
    .outputOptions("-window_size 5")
    .output(outputPath)
      .on("start", (commandLine) => {
        console.log("Spawned Ffmpeg with command: " + commandLine)
      })
      .on("progress", (progress) => {
        console.log("progressing: " + progress.percent + "% done")
      })
      .on("error", (err, stdout, stderr) => {
        console.log(err);
      })
      .on("end", () => {
        console.log("已切分");
      })
    command.run();


  call.succ({
    msg: "合并成功"
  });
}

async function mergerFileChunks (filePath: string, fileHash: string, size: number, _type: fileType): Promise<void> {
  const chunksDir = path.resolve(BASE_CHUNK_URL, TYPE_MAP[_type], fileHash);
  const chunksPaths = fs.readdirSync(chunksDir);
  chunksPaths.sort((a: string, b: string) => {
    return (a.split("-")[1] as unknown as number) - (b.split("-")[1] as unknown as number);
  })

  const list = chunksPaths.map((chunkName, index) => {
    return pipeStream(
      path.resolve(chunksDir, chunkName),
      fs.createWriteStream(filePath, {
        start: index * size,
      })
    )
  });
  await Promise.all(list);
  fs.rmdir(chunksDir, (err) => {
    if (err) throw err;
  });
}


async function pipeStream (path: string, writeStream: fs.WriteStream): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", async () => {
      fs.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
}

function extractExt (fileName: string): string {
  return fileName.slice(fileName.lastIndexOf("."), fileName.length);
}

function getFileName (fileName: string): string {
  let nameList = fileName.split(".");
  return nameList.slice(0, nameList.length - 1).join(".");
}
