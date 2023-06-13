const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require('dotenv').config();

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

// Create SES service object.
const sesClient = new SESClient(SES_CONFIG);

const sendEmail = async (recipientEmail, name) => {
  let params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: '<h1>This is the body of my email!</h1>',
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the body of my email!"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, ${name}!`,
      }
    },
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendEmailCommand);
    console.log('Email has been sent!', res);
  } catch (error) {
    console.error(error);
  }
}

sendEmail("webwizard0808@gmail.com", "Web Wizard");