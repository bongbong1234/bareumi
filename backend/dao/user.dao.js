const User = require('../model/User');
const conn = require('../config/db.js');

// login 비동기 함수라서 돌아올땐 resolve값에다가 넣기
exports.login = async (id,pwd) => {
    const sql = `
        select user_id,
        user_name,user_email,
        profile_img,
        signup_date,
        email_validate
        from tb_user 
        where user_id = ? and user_pwd = SHA2(?,256)
    `;
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

exports.duplicate = async (id) => {
    const sql = "select count(*) as ctn from tb_user where user_id = ?"
    return new Promise ((resolve, reject) => {
        conn.query(sql,[id], (err,rows) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                if(rows[0].ctn === 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}

exports.signup = async (id,pwd,name,email) => {
    const sql = "insert into tb_user(user_id,user_pwd,user_name,user_email,signup_date) values (?,sha2(?,256),?,?,NOW())";

    return new Promise ((resolve, reject) => {
        conn.query(sql,[id,pwd,name,email],(err, rows)=> {
            if(err) {
                console.log(err);
                conn.rollback();
                reject(false);
            } else if(rows) {
                console.log(rows);
                conn.commit();
                resolve(true);
            }
        })
    })
}

exports.validate = async (value,id) => {
    const sql = 'update tb_user set email_validate = ? where user_id = ?'
    return new Promise ((resolve, reject) => {
        conn.query(sql,[value,id], (err,rows) => {
            if(err) {
                console.log(err);
                reject(false);
            } else {
                if(rows.affectedRows === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}


exports.pwdChk = async (id,pwd) => {
    console.log("dao 아이디:",id);
    console.log("dao 비밀번호:",pwd);
    const sql = "select count(*) as ctn from tb_user where user_id =? and user_pwd = sha2(?,256)"
    return new Promise ((resolve,reject) => {
        conn.query(sql, [id,pwd], (err, rows) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                console.log(rows);
                if(rows[0].ctn === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    }) 
}