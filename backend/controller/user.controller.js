const userService = require("../service/user.service.js")

exports.login = async (req,res) => {
    const {id, pwd} = req.body;
    console.log(id,pwd)
    const user = await userService.login(id,pwd);


    if(user) {
        req.session.user = user;
        console.log("login-session:",req.session);
        return res.status(201).json({messeage:"로그인 성공", item: user});
    } else {
        return res.status(401).json({messeage: "UnAuthlized"});
    }
}