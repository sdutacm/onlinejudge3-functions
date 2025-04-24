// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const { isProd } = require('./env');
const { logger } = require('./logger');

const MAX_MYSQL_POOL_CONNECTION = parseInt(process.env.SQL_CONNECTIONS, 10) || 1;

function getOjSqlAgent(connOptions) {
  const dbConf = {
    host: process.env.SQL_HOST,
    port: parseInt(process.env.SQL_PORT, 10) || 3306,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
  }
  const conn = mysql.createPool({
    ...dbConf,
    waitForConnections: true,
    connectionLimit: MAX_MYSQL_POOL_CONNECTION,
    queueLimit: 0,
    ...connOptions,
  });

  async function query(sql, params) {
    const SQL = conn.format(sql, params);
    const _start = Date.now();
    const [rows] = await conn.query(SQL);
    !isProd && logger.info(`[sql (${Date.now() - _start}ms)]`, SQL);
    return rows;
  }

  return { conn, query };
}

module.exports = {
  getOjSqlAgent,
};
