const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const sendEmail = async ({to}) => {
    try{

        const validateVal = Math.random().toString().slice(2, 10);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'smhrd0113@gmail.com',
                pass: 'bhle fimt huqw mowh',
            },
            tls: {
                rejectUnauthorized: false,
            },
            logger: true,
        })

        const mailOptions = {
            from: 'smhrd0113@gmail.com',
            to: to,
            subject :"바르미에서 보낸 인증메일입니다.",
            text : `인증번호는 ${validateVal}입니다.`,
        }

        const info = await transporter.sendMail(mailOptions);
        return {info,validateVal}
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendEmail;