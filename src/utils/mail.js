import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendEmail = async (options) =>{
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try{
        await transporter.sendMail(mail)
    }
    catch(err){
        console.log("Error sending email", err)
    }
}
const emailVerificationMailgenContent = (username, verficationUrl) => {
    return {
        body:{
            name: username,
            intro:  "welcome to our app! We're very excited to have you on board.",
            action: {
                instructions: "To verify the email, please click the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verficationUrl
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
}

const forgotPasswordmailgenContent = (username, verficationUrl) => {
    return {    
        body:{
            name: username,
            intro:  "we got a requestto reset yor password of your account.",
            action: {
                instructions: "To reset password, please click the following button",
                button: {
                    color: "#22BC66",
                    text: "reset password",
                    link: passwordResetUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export { emailVerificationMailgenContent, forgotPasswordmailgenContent };