const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
 });
 

let mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: '', // List of recipients
    subject: '', // Subject line
    html: ''
};



class mailerRepository{

    cancel(req){
        mailOptions.subject = "Mighty Ducks Airline Flight Refund";
        mailOptions.html = `<html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap');
                    .image {
                        width : 600px;
                        max-width : 100%;
                    }

                    h2 {
                        font-weight: 400;
                        font-size : 18pt;
                    }

                    body {
                        font-family: Raleway, sans-serif;
                        padding: 16px;
                    }
                    a {
                        color: black;
                        text-decoration: none;
                        font-weight: 600;
                    }
                </style>
            </head>

            <body>
                <h3 style="font-size:22pt;">Hello, ${req.body.firstName}</h3>
                <h2>Greatings from Mighty Ducks Airline!</h2>
                <h3>We understand that you canceled your trip on ${req.body.depdate}, ${req.body.depTime} from ${req.body.departureAirport} to ${req.body.arrivalAirport} and back on ${req.body.retDate}, ${req.body.retTime}.</h3>
                <h3>A refund amount of ${req.body.refund} will be reimbursed to your account.</h3>
                
                <p>Regards,</p>
                <p>Mighty Ducks Airline.</p>
            </body>
            </html>`

    }

    async send(req){
        mailOptions.to = req.body.email;
        if(req.body.type == 'cancel')
            this.cancel(req);

        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
         });
    }
}

const repository = new mailerRepository();
module.exports = repository;