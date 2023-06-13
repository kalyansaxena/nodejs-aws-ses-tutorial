const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
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

const sendMail = async (templateName, recipientEmail) => {
  const sendTemplatedEmailCommand = new SendTemplatedEmailCommand({
    /**
     * Here's an example of how a template would be replaced with user data:
     * Template: <h1>Hello {{contact.firstName}},</h1><p>Don't forget about the party gifts!</p>
     * Destination: <h1>Hello Bilbo,</h1><p>Don't forget about the party gifts!</p>
     */
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    Source: process.env.AWS_SES_SENDER,
    Template: templateName,
    TemplateData: JSON.stringify({ name: 'Web Wizard' }),
  });

  try {
    const res = await sesClient.send(sendTemplatedEmailCommand);
    console.log('Email with SES template has been sent!', res);
  } catch (err) {
    console.error(err);
  }
}

sendMail("SES-Template", "webwizard0808@gmail.com");