const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "project-db-campus.smhrd.com",
    port: 3307,
    user: "campus_24IS_IOT2_p2_3",
    password: "smhrd3",
    database: "campus_24IS_IOT2_p2_3"
})

conn.connect()
console.log("Database Connection Success!")

module.exports = conn;