import { mysql } from "../utils/dbUtil/mysql";
import { DataTypes } from "sequelize";
import { BaseDao } from "./impl/BaseDao";

const TABLE_NAME = "videos";

const videos = mysql.define(TABLE_NAME, {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // 是否自增, 默认false
    primaryKey: true,  // 主键, 默认false
  },
  vname: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull 默认为 true
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  m3u8path: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  vsize: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  // 这是其他模型参数
});

export interface _video {
  vname: string
  filepath: string
  m3u8path: string
  vsize: number
  duration: string | number
}


export class Video extends BaseDao {
  constructor() {
    super()
  }

  queryAll (): Promise<any> {
    return videos.findAll({
      order: [
        ["createdAt", "DESC"],
      ],
    });
  }

  findById (vo: { id: number}): Promise<any> {
    return videos.findOne({
      where: {
        id: vo.id
      }
    });
  }

  add (vo: _video) {
    return videos.create({
      vname: vo.vname,
      filepath: vo.filepath,
      m3u8path: vo.m3u8path,
      vsize: vo.vsize,
      duration: vo.duration,
    });
  }

}
