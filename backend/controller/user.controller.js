const userService = require("../service/user.service.js")
const emailUtil = require("../util/sendEmail.js")

exports.login = async (req,res) => {
    const {id, pwd} = req.body;
    const user = await userService.login(id,pwd);


    if(user) {

        if(user.email_validate === 1) {
            req.session.user = user;
            return res.status(201).json({messeage:"로그인 성공", item: user});
        } else {
            return res.status(402).json({messeage:"이메일 인증 실패", item: user});
        }
        
    } else {
        return res.status(401).json({messeage: "UnAuthlized"});
    }
}

exports.duplicate = async (req,res) => {
    const {id} = req.body
    
    const idDuplicateChk = await userService.duplicate(id);
    if (idDuplicateChk) {
        res.status(200).json({message : true});
    } else {
        res.status(401).json({message : false});
    }
}

exports.signup = async (req,res) => {
    const {id,pwd,name,email} = req.body
    
    const signUpChk = await userService.signup(id,pwd,name,email)
    if(signUpChk) {
        res.status(201).json({messeage:"회원가입 성공!"})
    } else {
        res.status(401).json({message:"회원가입 실패"})
    }
}


exports.validateSend = async (req,res) => {
    const {to} = req.body;
    console.log("받아온 이메일:",to);
    try {
        const {info,validateVal} = await emailUtil({to});
        console.log(validateVal);
        res.status(200).json({
            success: true,
            message:"이메일 보내기 성공",
            info,
            validateVal
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.massage,
        })
    }
}

exports.validate = async (req,res) => {
    const {value,id} = req.body
    const validateUpdateChk = await userService.validate(value,id);
    if(validateUpdateChk) {
        res.status(201).json({message: true});
    } else {
        res.status(401).json({message: false});
    }
}

exports.logout = (req,res) => {
    if (req.session.user) {
        req.session.user = null;
        console.log("로그아웃 : ",req.session)
        return res.json({message:true});
    }
}



exports.pwdChk = async (req,res) => {
    const {id,pwd} = req.body
    const pwdChk = await userService.pwdChk(id,pwd);

    console.log(pwdChk)

    if(pwdChk) {
        res.status(201).json({message:true})
    } else {
        res.status(401).json({message: false})
    }
}

exports.userInfoChange = async (req,res) => {
    const {userNum, profileImg, name} = req.body;

    const userInfoChangeChk = await userService.userInfoChange(userNum,profileImg,name);
}

exports.pwdChange = async (req,res) => {
    const {userNum,currentPwd, newPwd} = req.body
    console.log(userNum,currentPwd,newPwd);
    const changePwdChk = await userService.pwdChange(userNum,currentPwd,newPwd);

    if(changePwdChk) {
        return res.status(200).json({message: "변경완료", success : true});
    } else {
        return res.status(401).json({message: "변경실패", success : false});
    }
}

exports.resetReocrd = async (req,res) => {
    const {userNum, profileImg, name} = req.body
    const resetRecordChk = await userService.resetRecord(userNum, profileImg, name);

    if(resetRecordChk) {
        return res.status(201).json({message:"초기화 완료!", success: true});
    } else {
        return res.status(201).json({message:"초기화 실패!", success: false});
    }
}


exports.resetReocrd = async (req,res) => {
    const {userNum} = req.body
    const resetRecordChk = await userService.resetRecord(userNum);

    if(resetRecordChk) {
        return res.status(201).json({message:"초기화 완료!", success: true});
    } else {
        return res.status(201).json({message:"초기화 실패!", success: false});
    }
}

exports.userDelete = async (req,res) => {
    const {userNum} = req.body
    const userDeleteChk = await userService.userDelete(userNum);

    if(userDeleteChk) {
        return res.status(201).json({message:"삭제 완료!", success: true});
    } else {
        return res.status(201).json({message:"삭제 실패!", success: false});
    }
}