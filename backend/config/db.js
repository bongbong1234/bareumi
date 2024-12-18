const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "project-db-cgi.smhrd.com",
    port: 3307,
    user: "campus_24IS_IOT2_p2_3",
    password: "smhrd3",
    database: "campus_24IS_IOT2_p2_3",
})

function handleDisConnect() {
    conn.connect((err) => {
        if(err) {
            console.log("Database 연결 에러 : ", err);
            setTimeout(handleDisConnect, 2000)
        } else {
            console.log("Database Connection Success!")
        }
    })

    return conn;
}


// conn.on("error", (err) => {
//     console.error("DB 에러감지!: ", err);
//     if (err) {
//       console.log("DB 연결이 끊어졌습니다. 재연결 시도...");
//       handleDisConnect(); // 재연결
//     } else {
//       throw err;
//     }
//   });


const dbConn = handleDisConnect()
module.exports = dbConn;