const { SESClient, CreateTemplateCommand } = require("@aws-sdk/client-ses");
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

const run = async (template_name) => {
  const createTemplateCommand = new CreateTemplateCommand({
    /**
     * The template feature in Amazon SES is based on the Handlebars template system.
     */
    Template: {
      /**
       * The name of an existing template in Amazon SES.
       */
      TemplateName: template_name,
      HtmlPart: `
        <h1>Hello, {{name}}!</h1>
        <p>
        Did you know Amazon has a mascot named Peccy?
        </p>
      `,
      TextPart: `Hello, {{name}}! Did you know Amazon has a mascot named Peccy?`,
      SubjectPart: "Amazon Tip",
    },
  });

  try {
    const res = await sesClient.send(createTemplateCommand);
    console.log('SES template has been created!', res);
  } catch (err) {
    console.error("Failed to create template.", err);
  }
}

run('SES-Template');