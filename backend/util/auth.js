const express = require('express');
const router = express.Router();

router.get("/session-chk",(req,res) => {
    if (req.session.user) {
        res.status(201).json({item: req.session.user});
    } else {
        res.status(401).json({messsage:"UnAuthlized"});
    }
}) 

module.exports = router;