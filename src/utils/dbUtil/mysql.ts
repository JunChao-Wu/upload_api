import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";


function createMysql(): Sequelize {
  const _sequelize = new Sequelize('db_video', 'root', 'MYSQL', {
    host: '127.0.0.1',
    // 选择一种支持的数据库:
    // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
    dialect: 'mysql'
  });
  return _sequelize;
}


export async function tryMysql(mysql: Sequelize): Promise<void> {
  try {
    await mysql.authenticate();
    console.log('mysql 已成功链接');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export const mysql = createMysql();
