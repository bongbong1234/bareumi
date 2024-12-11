const User = require('../model/User');
const conn = require('../config/db.js');

// login 비동기 함수라서 돌아올땐 resolve값에다가 넣기
exports.login = async (id,pwd) => {
    const sql = "select * from tb_user where user_id = ? and user_pwd = SHA2(?,256)";
    return new Promise ((resolve, reject) => {
        conn.query(sql,[id,pwd], (err,rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if(rows.length !== 0) {
                    resolve(rows[0]);
                } else {
                    resolve(null);
                }
            }
        })
    })
}