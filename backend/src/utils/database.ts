import mysql from "mysql2";

import { DatabaseConfig } from "../config";

const pool = mysql.createPool({
  host: DatabaseConfig.host,
  user: DatabaseConfig.user,
  database: DatabaseConfig.database,
  password: DatabaseConfig.password,
});

export default pool.promise();
