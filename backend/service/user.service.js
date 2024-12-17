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

exports.validate = async (value,id) => {
    const validateUpdateChk = await userDao.validate(value,id);

    if(validateUpdateChk) {
        return true;
    } else {
        return false;
    }
}

exports.pwdChk = async (id,pwd) => {
    const pwdChk = await userDao.pwdChk(id,pwd);

    if(pwdChk) {
        return true;
    } else {
        return false;
    }
}

exports.userInfoChange = async (userNum,profileImg,name) => {
    const userInfoChangeChk = await userDao.userInfoChange(userNum,profileImg,name);

    if(userInfoChangeChk) {
        return true;
    } else {
        return false;
    }
}

exports.pwdChange = async (userNum,currentPwd, newPwd) => {
    const pwdChangeChk = await userDao.pwdChange(userNum,currentPwd, newPwd)

    if(pwdChangeChk) {
        return true;
    } else {
        return false;
    }
}

exports.resetRecord = async (userNum) => {
    const resetRecordChk = await userDao.resetRecord(userNum);
    if(resetRecordChk) {
        return true;
    } else {
        return false;
    }
}

exports.userDelete = async (userNum) => {
    const deleteChk = await userDao.deleteUser(userNum);

    if(deleteChk) {
        return true;
    } else {
        return false;
    }
}