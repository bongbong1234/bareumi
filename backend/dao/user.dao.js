const conn = require('../config/db.js');


function commitTransaction(resolve,reject) {
    conn.commit(err => {
        if(err) {
            console.log("Commit Error:", err);
            return rollbackTransaction("Commit Failed", reject)
        } else {
            resolve (true);
        }
    })
}

function rollbackTransaction(message, reject) {
    console.log(message);
    conn.rollback(() => reject(false));
}

// login 비동기 함수라서 돌아올땐 resolve값에다가 넣기
exports.login = async (id,pwd) => {
    const sql = `
        select
        user_num,
        user_id,
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
                    conn.commit();
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

exports.userInfoChange = async (userNum,profileImgName,name) => {
    const sql1 = "update tb_user set user_name = ? where user_num = ?";
    const sql2 = "update tb_user set profile_img = ? where user_num = ?";

    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if(err || rows.affectedRows !== 1) {
                console.log("Transaction Start Error:" ,err);
                return reject(false);
            } else {
                conn.query(sql1, [name,userNum],(err,rows) => { 
                    if(err || rows.affectedRows !== 1) {
                        return rollbackTransaction("First Transaction Error!", reject);
                    }

                    if(profileImgName) {
                        conn.query(sql2,[profileImgName,userNum], (err, rows)=> {
                            if(err) {
                                return rollbackTransaction("Second Transaction Error!", reject);
                            }

                            commitTransaction(resolve,reject)
                        })
                    } else {
                        commitTransaction(resolve,reject)
                    }
                })
            }
            
        })
    })
}


exports.pwdChange = async (userNum,currentPwd,newPwd) => {
    const sql = "update tb_user set user_pwd = sha2(?,256) where user_num = ? and user_pwd = sha2(?,256)"
    return new Promise ((resolve, reject) => {
        conn.query(sql, [newPwd,userNum,currentPwd], (err,rows) => {
            if(err) {
                console.log(err);
                conn.rollback();
                reject(false);
            } else {
                console.log(rows)
                if(rows.affectedRows === 1) {
                    resolve(true);
                    conn.commit();
                } else {
                    resolve(false);
                    conn.rollback();
                }
            }
        })
    })
}

exports.resetRecord = async (userNum) => {
    const sql1 = "delete from tb_week_record where user_num = ?";
    const sql2 = "delete from tb_day_rocord where user_num = ?";

    return new Promise((resolve,reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                console.log("Transaction Start Error:" ,err);
                return reject(false);
            } else {
                conn.query(sql1, [userNum], (err,rows) => {
                    if(err) {
                        rollbackTransaction("First Transaction Error", reject);
                    } else {
                        conn.query(sql2,[userNum], (err,rows) => {
                            if(err) {
                                rollbackTransaction("Second Transaction Error", reject)
                            } else {
                                commitTransaction(resolve,reject);
                            }
                        })
                    }
                })
            }
        })
    })
}

exports.deleteUser = async (userNum) => {
    sql = "delete from tb_user where user_num = ?";
    return new Promise ((resolve,reject) => {
        conn.query(sql,[userNum], (err,rows) => {
            if (err) {
                console.log(err);
                rollbackTransaction("Delete failed!", reject);
            } else {
                if (rows.affectedRows === 0) {
                    rollbackTransaction("Delete User None!", reject);
                } else {
                    console.log("회원 탈퇴에 성공했습니다!");
                    commitTransaction(resolve,reject);
                }
            }
        })
    })
}