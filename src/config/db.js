import { createPool } from "mysql2/promise"

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "to_do_list",
    port: 3306,
    waitForConnections: true,
})