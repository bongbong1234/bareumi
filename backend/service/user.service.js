const userDao = require("../dao/user.dao.js")

exports.login = async(id,pwd) => {
    return await userDao.login(id,pwd);
}

exports.duplicate = async(id) => {
    const idDuplicateChk = await userDao.duplicate(id);
    if (idDuplicateChk) {
        return true;
    } else {
        return false;
    }
}

exports.signup = async (id,pwd,name,email) => {
    const signUpChk = await userDao.signup(id,pwd,name,email);
    console.log(signUpChk);
    if(signUpChk) {
        return true;
    } else {
        return false;
    }
}