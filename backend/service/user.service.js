const userDao = require("../dao/user.dao.js")

exports.login = async(id,pwd) => {
    return await userDao.login(id,pwd);
}