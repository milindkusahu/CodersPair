const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (
  toAddress,
  fromAddress,
  subject,
  htmlBody,
  textBody,
) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data:
            textBody ||
            "Please view this email in an HTML-compatible email client.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (toEmail, subject, htmlBody, textBody = null) => {
  // Validate email parameter
  if (!toEmail) {
    throw new Error("Recipient email address is required");
  }

  const sendEmailCommand = createSendEmailCommand(
    toEmail, // Now uses the parameter instead of hardcoded email
    "support@coderspair.com",
    subject,
    htmlBody,
    textBody,
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
