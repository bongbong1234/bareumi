const userService = require("../service/user.service.js")

exports.login = async (req,res) => {
    const {id, pwd} = req.body;
    const user = await userService.login(id,pwd);


    if(user) {
        req.session.user = user;
        console.log("login-session:",req.session);
        return res.status(201).json({messeage:"로그인 성공", item: user});
    } else {
        return res.status(401).json({messeage: "UnAuthlized"});
    }
}

exports.duplicate = async (req,res) => {
    const {id} = req.body
    
    const idDuplicateChk = await userService.duplicate(id);

    console.log("controller:",idDuplicateChk)

    if (idDuplicateChk) {
        res.status(200).json({message : true});
    } else {
        res.status(401).json({message : false});
    }
}

exports.signup = async (req,res) => {
    const {id,pwd,name,email} = req.body
    
    const signUpChk = await userService.signup(id,pwd,name,email)
    console.log(signUpChk);
}
exports.logout = async (req,res) =>{
    if (req.session.user){
        req.session.user = null;
    }
}