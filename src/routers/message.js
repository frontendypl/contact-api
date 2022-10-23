const express = require('express')
const nodemailer = require('nodemailer');

const Message =require('../models/Message')

const router = new express.Router()

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'frontendypl@gmail.com',
//         pass: 'axfuodpvcsmsqhpp'
//     }
// });

const transporter = nodemailer.createTransport({
    pool: true,
    host: "michal-kotula.atthost24.pl",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "ittt.pl@ittt.pl",
        pass: "majkel00atthost",
    },
});


router.post('/messages',async (req, res)=>{

    const message = new Message({
        ...req.body
    })

    try {
        const newMessage = await message.save()

        // const mailOptions = {
        //     // from: 'kotula87@gmail.com',
        //     to: 'frontendypl@gmail.com',
        //     subject: `New message ${req.body.topic}`,
        //     html: `
        //         <div>
        //             <h3>${req.body.content}</h3>
        //             <a href="http://localhost:8083/#/${req.body.topic}">${req.body.topic}</a>
        //         </div>
        //     `
        // };
        // //
        // transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });


        const mailOptions = {
            from: 'ittt.pl@ittt.pl',
            // from: 'ucze.net@ittt.pl', // gmail pokaże nazwe nadawcy ucze.net, ale jeśli damu odpowiedz to wyśle na 'ucze.net@ittt.pl a tekiego meila tam nie mamy
            //trzeba by kilka meili pozakładać w zależności od nadawcy ???
            to: 'frontendypl@gmail.com',
            subject: `New message ${req.body.topic}`,
            html: `
                <div>
                    <h3>${req.body.content}</h3>
                    <a href="http://localhost:8083/#/${req.body.topic}">${req.body.topic}</a>
                </div>
            `
        };
        //
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                // console.log(error);
            } else {
                // console.log('Email sent: ' + info.response);
            }
        });


        res.status(201).send(newMessage)
    }catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router