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



class mailerRepository {

    cancel(req) {
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
                <h2>Greetings from Mighty Ducks Airline!</h2>
                <h3>We understand that you canceled your trip on ${req.body.depdate}, ${req.body.depTime} from ${req.body.departureAirport} to ${req.body.arrivalAirport} and back on ${req.body.retDate}, ${req.body.retTime}.</h3>
                <h3>A refund amount of $${req.body.refund} will be reimbursed to your account.</h3>
                
                <p>Regards,</p>
                <p>Mighty Ducks Airline.</p>
            </body>
            </html>`

    }

    confirm(req) {
        mailOptions.subject = "Mighty Ducks Airline Flight Reservation";
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
                <h2>Greetings from Mighty Ducks Airline!</h2>
                <h3>Here's your upcoming trip's itinirary</h3>
                <br/>
                <h3>Departure: ${req.body.depdate}, ${req.body.depTime} from ${req.body.departureAirport} to ${req.body.arrivalAirport}. ${req.body.depCabin} Class Seats: ${req.body.depSeats}</h3>
                <br/>
                <h3>Return: ${req.body.retDate}, ${req.body.retTime} from ${req.body.arrivalAirport} to ${req.body.departureAirport}. ${req.body.retCabin} Class Seats: ${req.body.retSeats}</h3>
                <br/>
                <br/>
                <h3>Total amount: $${req.body.price} (status: paid)</h3>
                <br/>
                <h3>From all of us here at MDA, we wish you a happy trip and safe travels.</h3>
                
                <p>Regards,</p>
                <p>Mighty Ducks Airline.</p>
            </body>
            </html>`

    }

    async send(req) {
        mailOptions.to = req.body.email;
        if (req.body.type === 'cancel')
            this.cancel(req);
        else if(req.body.type === 'confirm')
            this.confirm(req);

        transport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
                throw(new Error('Email was not sent!'))
            } else {
                console.log(info);

            }
        });
    }
}

const repository = new mailerRepository();
module.exports = repository;