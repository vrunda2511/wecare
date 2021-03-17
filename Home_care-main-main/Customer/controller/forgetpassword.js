const client = require("../../Connection/connection");
const sgMail = require("@sendgrid/mail");
var nodemailer = require('nodemailer');
var EmailTemplates = require('swig-email-templates');
exports.Otpsend = function (req, res) {
  (async () => {
    const emailval = req.body;
    const verifymail = await client.query(
      "select customer_id from customer where email =$1",
      [emailval.email],
      (error, response) => {
        if (error) {
          res, status(401).json(error);
        } else {
          if (response.rowCount == 1) {
            var otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
               var smtpConfig =  {
              service: 'smtp.gmail.com',
              host: 'smtp.gmail.com',
              port: 587,
              starttls: {
                  enable: true
              },
              secureConnection: true,
              auth: {
                  user: 'wecarehomecare.2511@gmail.com',
                  pass: 'savaliya1234'
              }
          }
      
          var templates = new EmailTemplates();  
          var transporter = nodemailer.createTransport(smtpConfig);   
          
          var context = {
            email:'wecarehomecare.2511@gmail.com',
            link : 'www.google.co.in'
          };
          
          templates.render('activate_email.html', context, function(err, html,text, subject) {    
          
            transporter.sendMail({
              from: 'wecarehomecare.2511@gmail.com', // sender address
              to:emailval.email,
              subject: "WeCareHomecare Password Reset Code ",
                text: "Your Password Reset Otp is",
                html: "<strong>Your Password Reset Otp is " + otp + "</strong>"
                   
            }, function(err, reply) {
              if(err){
                console.log(err)
            
              }
              else{
                res.status(200).json({
                        status: "Success",
                      });
            
              }});    
      });

            const otpval = client.query(
              "insert into emailotp(email,otp) values($1,$2)",
              [emailval.email, otp]
            );
          } else {
            res.status(200).json({
              status: "Failed",
              msg: "Email is not valid",
              val: response.rowCount,
            });
          }
        }
      }
    );
  })();
};

exports.Verifyotp = function (req, res) {
  (async () => {
    const verifyvalues = req.body;
    console.log(verifyvalues.email);
    const verifyotp = await client.query(
      "select customer_id from emailotp ,customer where customer.email=emailotp.email and emailotp.email=$1 and otp=$2 and otp_status=$3",
      [verifyvalues.email, verifyvalues.otp, 0],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          if (response.rowCount == 1) {
            client.query("update emailotp set otp_status=$1 where email=$2", [
              1,
              verifyvalues.email,
            ]);
            res.status(200).json({
              status: "Success",
              msg: response.rows,
            });
          } else {
            res.status(200).json({
              status: "Failed",
              msg: "OTP is not Correct",
              val: response.rowCount,
            });
          }
        }
      }
    );
  })();
};

//forget password
exports.ForgetPassword = function (req, res) {
  (async () => {
    const forgetpass = req.body;
    // const checkoldpasswpord=await client.query('select customer_id from customer where password=$1',[updatepass.oldpassword],(error,response)=>{

    // })
    const forgetpassword = await client.query(
      "update customer set password=$1 where customer_id=$2",
      [forgetpass.password, forgetpass.customer_id],
      (error) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          msg: "Password Reset Successfully",
        });
      }
    );
  })();
};

exports.UpdatePassword = function (req, res) {
  (async () => {
    const updatepass = req.body;
    const checkoldpasswpord = await client.query(
      "select customer_id from customer where password=$1 and customer_id=$2",
      [updatepass.oldpassword, updatepass.customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          if (response.rowCount == 1) {
            (async () => {
              const updatepassword = await client.query(
                "update customer set password=$1 where customer_id=$2",
                [updatepass.newpassword, updatepass.customer_id],
                (error) => {
                  if (error) {
                    res.status(401).json(error);
                  }
                  res.status(200).json({
                    status: "Success",
                    msg: "Password Updated Successfully",
                  });
                }
              );
            })();
          } else {
            res.status(200).json({
              status: "failed",
              msg: "Your old password is not correct",
            });
          }
        }
      }
    );
  })();
};
