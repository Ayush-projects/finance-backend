const router = require('express').Router();
const middlewares = require('./middlewares.js')
const uuid = require('uuid').v1();
const express = require('express')
const wallet = require('./models/wallet.js')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
router.use(express.json())
router.use(bodyParser.urlencoded({extended: false}))
router.get('/', (req, res) => {
  res.render("home")
})

router.get('/sign-up', (req,res) => {
    res.render("sign-up");
})

router.get('/login', (req,res) => {
    res.render("login");
})



router.post('/createWallet', async (req, res) => {
       var {fname, lname, phone, email, password, cpassword} = req.body;
       console.log(req.body)
       if(!fname || !lname || !email || !password || !phone)
       {
        res.json({code: 404, message:'Enter all the fields'})
       }
       if(password!=cpassword)
       {
        res.json({code: 404, message:'Enter correct confirmation password'})
       }
       
       var temp_verification_id = uuid + Date.now()
       let hashedPassword = "Ayush" //await bcrypt.hash(password, 10);
       const new_wallet = new wallet({fname, lname, email, password: hashedPassword, phone, verifyId: temp_verification_id});
       new_wallet.save().then((confirmation)=>{
                     res.json({code: 200, message: 'Wallet Created Successfully'})
                     send_verification_mail(temp_verification_id, email)
       }).catch((error)=>{
         if(error.code ==11000)
         res.json({code: 404, message:'User already registed with the given email ID'})
         else
         {  console.log(error)
             res.json({code: 404, message:'Some Error Occured, Please try after some time'})
         }
       })
})

router.get('/walletVerify/:id',async (req,res)=>{
   id = req.params.id
   wallet.findOneAndUpdate({verifyId: id}, {verified: true}).then((confirmation)=>{
    if(confirmation)
    res.render("wallet_verified")
    else
    res.render("error_in_verification")
   }).catch((error)=>{
   res.render("error_in_verification")
   })
})

function send_verification_mail(temp_verification_id, email)
{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
      });
      
      var mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Verify Your Email',
        text: 'Click on the button to verify your email ! ',
//         html: ` <img src="https://user-images.githubusercontent.com/52379890/133371696-2488b42d-62fa-4210-b49f-9ebfea97fcd0.png" style="display: block; margin: auto; border-radius: 15px;"><br>
//         <a href="http://ewallet-server.herokuapp.com/walletVerify/${temp_verification_id}" ><button style="display: block; background-color: rgb(6, 89, 104); height: 50px; border: transparent; border-radius: 10px; margin: auto; font-size: medium; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: white" > Click here to verify</button></a>
// `
  html: `<!DOCTYPE html>
  <html>
  
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 400;
                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
              }
  
              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 700;
                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
              }
          }
  
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          /* RESET STYLES */
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }
  
          table {
              border-collapse: collapse !important;
          }
  
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
  
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          /* MOBILE STYLES */
          @media screen and (max-width:600px) {
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }
  
          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#FFA73B" align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <a href="#" ><img src="https://user-images.githubusercontent.com/52379890/133371696-2488b42d-62fa-4210-b49f-9ebfea97fcd0.png"  style="display: block; border: 0px; border-radius: 20px;" /></a> <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> 
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">We're excited to have you get started. First, you need to verify your email.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="http://ewallet-server.herokuapp.com/walletVerify/${temp_verification_id}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Click here to Verify</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>E-Potli Team</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
              </td>
          </tr>
         
      </table>
  </body>
  
  </html>`                            
 };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
         // console.log('Verification email sent: ' + info.response);
        }
      });

}



module.exports = router