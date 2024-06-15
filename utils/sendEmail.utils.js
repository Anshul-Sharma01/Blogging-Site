import nodemailer from 'nodemailer';

const sendEmail = async function(email, subject, message) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // Correct the typo here
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 5000, // 5 seconds
            socketTimeout: 5000 // 5 seconds
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject: subject,
            html: message
        });
    } catch (err) {
        console.error('Error sending email:', err); // Log the error
        throw new Error('Could not send email. Please try again later.');
    }
};

export default sendEmail;
