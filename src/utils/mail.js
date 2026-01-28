import Mailgen from "mailgen:";



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
            